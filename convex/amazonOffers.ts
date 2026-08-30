import { v } from 'convex/values'
import { internalMutation, query } from './_generated/server'
import { AFFILIATE_ASINS } from '../src/lib/affiliate-asins'
import {
  hasDisplayablePrice,
  isOfferFresh,
  ITEM_TTL_MS,
  OFFER_TTL_MS,
} from '../src/lib/amazon-offer-policy'

/**
 * Read/write side of the Amazon offer cache. The fetching lives in
 * convex/amazon.ts — this file holds only database functions so it stays in
 * the default Convex runtime.
 *
 * THE RULE THAT SHAPES THIS FILE: Amazon's Creators API best practices cap
 * offer caching at one hour. `getBySlugs` therefore treats freshness as a
 * correctness property, not an optimisation — an offer older than the window
 * is not returned at all. A page that gets no price renders exactly as it did
 * before this pipeline existed.
 */

export { ITEM_TTL_MS, OFFER_TTL_MS }

export interface PublicOffer {
  slug: string
  asin: string
  displayAmount: string
  currency: string
  amount: number
  savingsPercentage?: number
  savingsBasisDisplayAmount?: string
  availabilityType?: string
  inStock: boolean
  /** unix ms — the caller MUST render this next to the price. */
  fetchedAt: number
}

/**
 * Offers for a set of /go/ slugs, keyed by slug.
 *
 * Returns an entry only when there is a live, in-window offer with an actual
 * price. Callers get a partial map and must handle a missing slug as "no
 * price", which is the pre-pipeline rendering.
 */
export const getBySlugs = query({
  args: { slugs: v.array(v.string()) },
  returns: v.any(),
  handler: async (ctx, args) => {
    const now = Date.now()
    const out: Record<string, PublicOffer> = {}

    // Deduplicate: several slugs can share one ASIN, and we want one read each.
    const wanted = new Map<string, string[]>()
    for (const slug of args.slugs) {
      const asin = AFFILIATE_ASINS[slug]
      if (!asin) continue
      const slugs = wanted.get(asin)
      if (slugs) slugs.push(slug)
      else wanted.set(asin, [slug])
    }

    for (const [asin, slugs] of wanted) {
      const row = await ctx.db
        .query('amazonOffers')
        .withIndex('by_asin', (q) => q.eq('asin', asin))
        .unique()

      if (!row) continue
      const fetchedAt = row.offersFetchedAt
      if (!isOfferFresh(fetchedAt, now)) continue
      if (!hasDisplayablePrice(row)) continue

      for (const slug of slugs) {
        out[slug] = {
          slug,
          asin,
          displayAmount: row.displayAmount,
          currency: row.currency ?? 'USD',
          amount: row.amount,
          savingsPercentage: row.savingsPercentage,
          savingsBasisDisplayAmount: row.savingsBasisDisplayAmount,
          availabilityType: row.availabilityType,
          inStock: row.availabilityType === 'IN_STOCK',
          fetchedAt,
        }
      }
    }

    return out
  },
})

export interface PublicImage {
  slug: string
  asin: string
  url: string
  width?: number
  height?: number
}

/**
 * API-vended product images for a set of /go/ slugs.
 *
 * Separate from getBySlugs on purpose. Images carry a 1-day TTL rather than the
 * offer hour, and they have no display obligations attached — so a card can
 * show a real product photo on a day when the price is stale or the item has
 * lost its buy box entirely.
 *
 * Amazon requires these URLs be served from their CDN. Never rehost the bytes.
 */
export const getImagesBySlugs = query({
  args: { slugs: v.array(v.string()) },
  returns: v.any(),
  handler: async (ctx, args) => {
    const now = Date.now()
    const out: Record<string, PublicImage> = {}

    const wanted = new Map<string, string[]>()
    for (const slug of args.slugs) {
      const asin = AFFILIATE_ASINS[slug]
      if (!asin) continue
      const slugs = wanted.get(asin)
      if (slugs) slugs.push(slug)
      else wanted.set(asin, [slug])
    }

    for (const [asin, slugs] of wanted) {
      const row = await ctx.db
        .query('amazonOffers')
        .withIndex('by_asin', (q) => q.eq('asin', asin))
        .unique()

      if (!row?.imageUrl) continue
      if (!isOfferFresh(row.itemFetchedAt, now, ITEM_TTL_MS)) continue

      for (const slug of slugs) {
        out[slug] = {
          slug,
          asin,
          url: row.imageUrl,
          width: row.imageWidth,
          height: row.imageHeight,
        }
      }
    }

    return out
  },
})

/** Operational view for the buy-box audit. No price data, so no display rules. */
export const health = query({
  args: {},
  returns: v.any(),
  handler: async (ctx) => {
    const now = Date.now()
    const rows = await ctx.db.query('amazonOffers').collect()
    const tracked = new Set(Object.values(AFFILIATE_ASINS))
    const seen = new Set(rows.map((r) => r.asin))

    return {
      trackedAsins: tracked.size,
      cachedAsins: rows.length,
      neverFetched: [...tracked].filter((a) => !seen.has(a)),
      freshOffers: rows.filter((r) => isOfferFresh(r.offersFetchedAt, now))
        .length,
      // The thing worth alerting on: a tracked ASIN with no headline offer is
      // a link that earns nothing, which is exactly what the manual buy-box
      // audits kept finding by hand.
      noBuyBox: rows
        .filter((r) => r.amount === undefined || r.isBuyBoxWinner === false)
        .map((r) => r.asin),
      withErrors: rows
        .filter((r) => r.lastError !== undefined)
        .map((r) => ({ asin: r.asin, error: r.lastError, at: r.lastErrorAt })),
    }
  },
})

export const upsert = internalMutation({
  args: {
    asin: v.string(),
    amount: v.optional(v.number()),
    currency: v.optional(v.string()),
    displayAmount: v.optional(v.string()),
    savingsPercentage: v.optional(v.number()),
    savingsBasisDisplayAmount: v.optional(v.string()),
    availabilityType: v.optional(v.string()),
    availabilityMessage: v.optional(v.string()),
    isBuyBoxWinner: v.optional(v.boolean()),
    violatesMap: v.optional(v.boolean()),
    title: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    imageWidth: v.optional(v.number()),
    imageHeight: v.optional(v.number()),
    detailPageUrl: v.optional(v.string()),
    hasOffer: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const now = Date.now()
    const { hasOffer, ...fields } = args

    const existing = await ctx.db
      .query('amazonOffers')
      .withIndex('by_asin', (q) => q.eq('asin', args.asin))
      .unique()

    // A successful call with no headline offer must CLEAR the previous price
    // rather than leave it standing — showing a price for an item that has
    // lost its buy box is both wrong and non-compliant.
    const patch = {
      ...fields,
      itemFetchedAt: now,
      offersFetchedAt: hasOffer ? now : undefined,
      lastError: undefined,
      lastErrorAt: undefined,
    }

    if (existing) await ctx.db.patch(existing._id, patch)
    else await ctx.db.insert('amazonOffers', patch)

    return null
  },
})

export const recordError = internalMutation({
  args: { asin: v.string(), error: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const now = Date.now()
    const existing = await ctx.db
      .query('amazonOffers')
      .withIndex('by_asin', (q) => q.eq('asin', args.asin))
      .unique()

    // Deliberately does NOT touch offersFetchedAt: a transient failure should
    // let the existing offer live out its hour, not blank the page instantly.
    if (existing) {
      await ctx.db.patch(existing._id, {
        lastError: args.error,
        lastErrorAt: now,
      })
    } else {
      await ctx.db.insert('amazonOffers', {
        asin: args.asin,
        itemFetchedAt: now,
        lastError: args.error,
        lastErrorAt: now,
      })
    }
    return null
  },
})
