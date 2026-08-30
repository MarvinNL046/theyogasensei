import { v } from 'convex/values'
import { internalAction } from './_generated/server'
import { internal } from './_generated/api'
import { allTrackedAsins, batchAsins } from '../src/lib/affiliate-asins'

/**
 * Amazon Creators API client — the successor to PA-API 5.0.
 *
 * Access is gated on qualifying sales and opened for this account on
 * 2026-08-30. It can close again if sales drop, so every function here treats
 * failure as normal: an error never throws past the cron, and a page with no
 * cached offer renders exactly as it did before this pipeline existed.
 *
 * Credentials come from Convex env vars, never from the repo:
 *   AMAZON_CREATORS_CREDENTIAL_ID
 *   AMAZON_CREATORS_CREDENTIAL_SECRET
 *   AMAZON_ASSOCIATES_PARTNER_TAG   (defaults to theyogasensei-20)
 *
 * Two rules from the best-practices guide are load-bearing:
 *  - Offers may be cached for at most 1 hour, everything else for a day. The
 *    cron interval and the read-side TTL both derive from that.
 *  - Vended links (detailPageURL) must be passed through unmodified. We store
 *    them whole and never recompose them.
 */

const TOKEN_ENDPOINT = 'https://api.amazon.com/auth/o2/token'
const CATALOG_ENDPOINT = 'https://creatorsapi.amazon/catalog/v1/getItems'
const MARKETPLACE = 'www.amazon.com'
const DEFAULT_PARTNER_TAG = 'theyogasensei-20'

/**
 * Module-scope token cache. Convex may reuse a warm isolate between calls, so
 * this often saves the token round-trip; when it does not, we simply fetch
 * again. Tokens live 1 hour — we refresh at 55 minutes to avoid using one that
 * expires mid-batch.
 */
let cachedToken: { value: string; expiresAt: number } | null = null
const TOKEN_SAFETY_MARGIN_MS = 5 * 60 * 1000

async function getAccessToken(): Promise<string> {
  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt - TOKEN_SAFETY_MARGIN_MS > now) {
    return cachedToken.value
  }

  const clientId = process.env.AMAZON_CREATORS_CREDENTIAL_ID
  const clientSecret = process.env.AMAZON_CREATORS_CREDENTIAL_SECRET
  if (!clientId || !clientSecret) {
    throw new Error(
      'AMAZON_CREATORS_CREDENTIAL_ID / _SECRET are not set on this Convex deployment',
    )
  }

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'creatorsapi::default',
    }),
  })

  if (!res.ok) {
    throw new Error(`token endpoint returned ${res.status}`)
  }

  const body = (await res.json()) as {
    access_token?: string
    expires_in?: number
  }
  if (!body.access_token) throw new Error('token response carried no access_token')

  cachedToken = {
    value: body.access_token,
    expiresAt: now + (body.expires_in ?? 3600) * 1000,
  }
  return cachedToken.value
}

interface CreatorsListing {
  price?: {
    money?: { amount?: number; currency?: string; displayAmount?: string }
    savings?: { percentage?: number }
    savingBasis?: { money?: { displayAmount?: string } }
  }
  availability?: { type?: string; message?: string }
  isBuyBoxWinner?: boolean
  violatesMAP?: boolean
}

interface CreatorsItem {
  asin: string
  detailPageURL?: string
  images?: {
    primary?: { large?: { url?: string; width?: number; height?: number } }
  }
  itemInfo?: { title?: { displayValue?: string } }
  offersV2?: { listings?: CreatorsListing[] }
}

/**
 * Pick the listing a shopper would actually get. Amazon returns several; the
 * buy-box winner is the offer the Add to Cart button uses, so anything else
 * would be a price the reader never sees.
 */
function pickListing(item: CreatorsItem): CreatorsListing | null {
  const listings = item.offersV2?.listings
  if (!listings || listings.length === 0) return null
  return listings.find((l) => l.isBuyBoxWinner) ?? listings[0] ?? null
}

async function fetchBatch(
  token: string,
  asins: string[],
  partnerTag: string,
): Promise<CreatorsItem[]> {
  const res = await fetch(CATALOG_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-marketplace': MARKETPLACE,
    },
    body: JSON.stringify({
      itemIds: asins,
      partnerTag,
      partnerType: 'Associates',
      marketplace: MARKETPLACE,
      resources: [
        'itemInfo.title',
        'images.primary.large',
        'offersV2.listings.price',
        'offersV2.listings.availability',
        'offersV2.listings.isBuyBoxWinner',
      ],
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    // 403 AssociateNotEligible is the sales-threshold gate closing again. It
    // is a normal state for this account, not a bug — surface it plainly.
    throw new Error(`getItems ${res.status}: ${text.slice(0, 300)}`)
  }

  const body = (await res.json()) as {
    itemsResult?: { items?: CreatorsItem[] }
  }
  return body.itemsResult?.items ?? []
}

/**
 * Refresh every tracked ASIN. Driven by the cron in convex/crons.ts; also safe
 * to run by hand from the dashboard.
 *
 * Batches run sequentially on purpose. Creators API quota is TPS-based and the
 * guide asks callers to spread load, and five sequential calls every half hour
 * is nowhere near any limit.
 */
export const refreshOffers = internalAction({
  args: { asins: v.optional(v.array(v.string())) },
  returns: v.any(),
  // Explicit return type: this handler references internal.amazonOffers, which
  // pulls in the generated api types, which include this function. Without the
  // annotation TypeScript reports a circular inference (TS7022/TS7023).
  handler: async (
    ctx,
    args,
  ): Promise<{
    ok: boolean
    reason?: string
    updated: number
    failed: number
    withoutOffer?: number
    pruned?: number
  }> => {
    const asins = args.asins ?? allTrackedAsins()
    const partnerTag =
      process.env.AMAZON_ASSOCIATES_PARTNER_TAG ?? DEFAULT_PARTNER_TAG

    let token: string
    try {
      token = await getAccessToken()
    } catch (error) {
      // No token means no refresh at all. Existing rows keep serving until
      // their hour is up, then the site quietly returns to price-less.
      console.error('[amazon] token failed:', String(error))
      return { ok: false, reason: 'token', updated: 0, failed: asins.length }
    }

    let updated = 0
    let failed = 0
    let withoutOffer = 0

    for (const batch of batchAsins(asins)) {
      let items: CreatorsItem[]
      try {
        items = await fetchBatch(token, batch, partnerTag)
      } catch (error) {
        const message = String(error)
        console.error('[amazon] batch failed:', message)
        for (const asin of batch) {
          await ctx.runMutation(internal.amazonOffers.recordError, {
            asin,
            error: message.slice(0, 300),
          })
          failed += 1
        }
        continue
      }

      const returned = new Set(items.map((i) => i.asin))
      for (const asin of batch) {
        if (!returned.has(asin)) {
          // Amazon omits ids it cannot resolve — a dead or region-locked ASIN.
          await ctx.runMutation(internal.amazonOffers.recordError, {
            asin,
            error: 'not returned by getItems (unresolvable ASIN)',
          })
          failed += 1
        }
      }

      for (const item of items) {
        const listing = pickListing(item)
        const money = listing?.price?.money
        const hasOffer = Boolean(money?.amount !== undefined && money?.displayAmount)
        if (!hasOffer) withoutOffer += 1

        await ctx.runMutation(internal.amazonOffers.upsert, {
          asin: item.asin,
          amount: money?.amount,
          currency: money?.currency,
          displayAmount: money?.displayAmount,
          savingsPercentage: listing?.price?.savings?.percentage,
          savingsBasisDisplayAmount:
            listing?.price?.savingBasis?.money?.displayAmount,
          availabilityType: listing?.availability?.type,
          availabilityMessage: listing?.availability?.message,
          isBuyBoxWinner: listing?.isBuyBoxWinner,
          violatesMap: listing?.violatesMAP,
          title: item.itemInfo?.title?.displayValue,
          imageUrl: item.images?.primary?.large?.url,
          imageWidth: item.images?.primary?.large?.width,
          imageHeight: item.images?.primary?.large?.height,
          detailPageUrl: item.detailPageURL,
          hasOffer,
        })
        updated += 1
      }
    }

    // Drop rows for ASINs that have since been repointed away from, so the
    // health report never blames a link that no longer exists.
    const pruned: number = await ctx.runMutation(
      internal.amazonOffers.pruneUntracked,
      {},
    )

    console.log(
      `[amazon] refreshed ${updated} asin(s), ${withoutOffer} without a headline offer, ${failed} failed, ${pruned} retired row(s) pruned`,
    )
    return { ok: true, updated, failed, withoutOffer, pruned }
  },
})
