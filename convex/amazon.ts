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
 * Every Associates tracking ID the site redirects under, mirroring
 * trackingIdEnvByPageType in src/lib/affiliate-links.ts. Vended links are
 * fetched once per tag because a vended link must be used unmodified — a
 * single link with its tag rewritten is not a vended link any more.
 */
const TRACKING_ID_ENV_VARS = [
  'AMAZON_ASSOCIATES_TAG_REVIEW',
  'AMAZON_ASSOCIATES_TAG_ROUNDUP',
  'AMAZON_ASSOCIATES_TAG_COMPARISON',
  'AMAZON_ASSOCIATES_TAG_BUYING_GUIDE',
  'AMAZON_ASSOCIATES_TAG_BLOG',
  'AMAZON_ASSOCIATES_TAG_GUIDE',
  'AMAZON_ASSOCIATES_TAG_OTHER',
]

function configuredTrackingIds(): string[] {
  const ids = new Set<string>()
  for (const name of TRACKING_ID_ENV_VARS) {
    const value = process.env[name]
    if (value) ids.add(value)
  }
  // Always include the base tag so a deployment with no per-type vars still
  // gets one usable vended link per ASIN.
  ids.add(process.env.AMAZON_ASSOCIATES_PARTNER_TAG ?? DEFAULT_PARTNER_TAG)
  return [...ids]
}

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
  parentASIN?: string
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

/** Offer-level fields — 1 hour TTL, fetched by the half-hourly job. */
const OFFER_RESOURCES = [
  'itemInfo.title',
  'images.primary.large',
  'offersV2.listings.price',
  'offersV2.listings.availability',
  'offersV2.listings.isBuyBoxWinner',
]

/** Item-level fields — 1 day TTL, fetched by the daily job, once per tag. */
const ITEM_RESOURCES = [
  'itemInfo.title',
  'images.primary.large',
  'parentASIN',
]

async function fetchBatch(
  token: string,
  asins: string[],
  partnerTag: string,
  resources: string[] = OFFER_RESOURCES,
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
      resources,
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

    let batchIndex = 0
    for (const batch of batchAsins(asins)) {
      // Creators API quota is TPS-based and the guide asks callers to spread
      // load. Firing five batches back to back earned a 429 ThrottleException
      // on 2026-08-30, so batches are paced. A refresh of ~45 ASINs still
      // finishes in a few seconds, and it runs on a cron so latency is free.
      if (batchIndex > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1200))
      }
      batchIndex += 1

      let items: CreatorsItem[]
      try {
        items = await fetchBatch(token, batch, partnerTag)
      } catch (error) {
        const message = String(error)
        // One retry on a throttle, after a longer pause. Anything else is
        // reported straight away rather than hammering a failing endpoint.
        let recovered: CreatorsItem[] | null = null
        if (message.includes('429') || message.includes('Throttle')) {
          await new Promise((resolve) => setTimeout(resolve, 4000))
          try {
            recovered = await fetchBatch(token, batch, partnerTag)
            console.log('[amazon] batch recovered after throttle')
          } catch (retryError) {
            console.error(
              '[amazon] retry after throttle failed:',
              String(retryError),
            )
          }
        }

        if (recovered === null) {
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
        items = recovered
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

/**
 * Daily item refresh: images, title, parent ASIN and one vended link per
 * Associates tracking ID.
 *
 * Separate from refreshOffers on purpose. Amazon caps offer caching at one
 * hour but allows a day for everything here, so this runs daily and the
 * offer job stays cheap. It is also the expensive one — seven tracking IDs
 * means seven passes over the catalogue — which is exactly why it should not
 * ride along with a half-hourly cron.
 */
export const refreshItems = internalAction({
  args: { asins: v.optional(v.array(v.string())) },
  returns: v.any(),
  handler: async (
    ctx,
    args,
  ): Promise<{
    ok: boolean
    reason?: string
    updated: number
    failed: number
    trackingIds: number
  }> => {
    const asins = args.asins ?? allTrackedAsins()
    const trackingIds = configuredTrackingIds()

    let token: string
    try {
      token = await getAccessToken()
    } catch (error) {
      console.error('[amazon] item refresh token failed:', String(error))
      return {
        ok: false,
        reason: 'token',
        updated: 0,
        failed: asins.length,
        trackingIds: trackingIds.length,
      }
    }

    // asin -> { itemFields, vended: [{trackingId, url}] }
    const collected = new Map<
      string,
      {
        title?: string
        imageUrl?: string
        imageWidth?: number
        imageHeight?: number
        parentAsin?: string
        vended: Array<{ trackingId: string; url: string }>
      }
    >()

    let failed = 0
    let call = 0

    for (const trackingId of trackingIds) {
      for (const batch of batchAsins(asins)) {
        // Same pacing rule as the offer job, and this one makes far more
        // calls, so it matters more here.
        if (call > 0) await new Promise((r) => setTimeout(r, 1200))
        call += 1

        let items: CreatorsItem[]
        try {
          items = await fetchBatch(token, batch, trackingId, ITEM_RESOURCES)
        } catch (error) {
          const message = String(error)
          if (message.includes('429') || message.includes('Throttle')) {
            await new Promise((r) => setTimeout(r, 4000))
            try {
              items = await fetchBatch(token, batch, trackingId, ITEM_RESOURCES)
            } catch {
              failed += batch.length
              continue
            }
          } else {
            console.error('[amazon] item batch failed:', message)
            failed += batch.length
            continue
          }
        }

        for (const item of items) {
          const entry = collected.get(item.asin) ?? { vended: [] }
          // Item-level fields are identical across tags; take them once.
          entry.title ??= item.itemInfo?.title?.displayValue
          entry.imageUrl ??= item.images?.primary?.large?.url
          entry.imageWidth ??= item.images?.primary?.large?.width
          entry.imageHeight ??= item.images?.primary?.large?.height
          entry.parentAsin ??= item.parentASIN
          if (item.detailPageURL) {
            entry.vended.push({ trackingId, url: item.detailPageURL })
          }
          collected.set(item.asin, entry)
        }
      }
    }

    let updated = 0
    for (const [asin, entry] of collected) {
      await ctx.runMutation(internal.amazonOffers.upsertItem, {
        asin,
        title: entry.title,
        imageUrl: entry.imageUrl,
        imageWidth: entry.imageWidth,
        imageHeight: entry.imageHeight,
        parentAsin: entry.parentAsin,
        vendedUrls: entry.vended,
      })
      updated += 1
    }

    console.log(
      `[amazon] item refresh: ${updated} asin(s) across ${trackingIds.length} tracking id(s), ${failed} failed`,
    )
    return { ok: true, updated, failed, trackingIds: trackingIds.length }
  },
})
