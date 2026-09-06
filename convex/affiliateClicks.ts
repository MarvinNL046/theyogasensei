import { v } from 'convex/values'
import { mutation } from './_generated/server'

/**
 * Aggregated affiliate-click counter.
 *
 * Privacy rule: this function records only editorial attribution dimensions,
 * UTC day bucket and count.
 * It does not accept or store IP address, user agent, referer, headers, query
 * params, or any user identifier.
 */
export const increment = mutation({
  args: {
    slug: v.string(),
    sourcePage: v.string(),
    pageType: v.union(
      v.literal('review'),
      v.literal('roundup'),
      v.literal('comparison'),
      v.literal('buying-guide'),
      v.literal('blog'),
      v.literal('guide'),
      v.literal('other'),
    ),
    placement: v.union(
      v.literal('affiliate-button'),
      v.literal('inline-link'),
      v.literal('product-title'),
      v.literal('product-card'),
      v.literal('product-list-button'),
      v.literal('closing-band'),
      v.literal('sidebar'),
      v.literal('mobile-sticky'),
      v.literal('review-section'),
      v.literal('review-sidebar'),
      v.literal('review-verdict'),
      v.literal('roundup-card'),
      v.literal('roundup-detail'),
    ),
    trackingId: v.string(),
  },
  returns: v.object({
    ok: v.boolean(),
    status: v.optional(v.string()),
    reason: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    const slug = args.slug.trim().toLowerCase()
    if (!slug) {
      return { ok: false as const, reason: 'empty-slug' as const }
    }

    const now = Date.now()
    const day = new Date(now).toISOString().slice(0, 10)
    const sourcePage = normalize(args.sourcePage, '/unknown', 160)
    const pageType = normalize(args.pageType, 'other', 32)
    const placement = normalize(args.placement, 'unknown', 48)
    const trackingId = normalize(args.trackingId, 'unknown', 64)

    // Deployment smoke test: verifies validators and function availability
    // without polluting production attribution totals.
    if (sourcePage === '/internal/verification') {
      return { ok: true as const, status: 'verified' as const }
    }

    const existing = await ctx.db
      .query('affiliateClicks')
      .withIndex('by_attribution_and_day', (q) =>
        q
          .eq('slug', slug)
          .eq('sourcePage', sourcePage)
          .eq('pageType', pageType)
          .eq('placement', placement)
          .eq('trackingId', trackingId)
          .eq('day', day),
      )
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, {
        count: existing.count + 1,
        updatedAt: now,
      })
      return { ok: true as const, status: 'incremented' as const }
    }

    await ctx.db.insert('affiliateClicks', {
      slug,
      day,
      sourcePage,
      pageType,
      placement,
      trackingId,
      count: 1,
      updatedAt: now,
    })

    return { ok: true as const, status: 'created' as const }
  },
})

function normalize(value: string, fallback: string, maxLength: number): string {
  const normalized = value.trim().slice(0, maxLength)
  return normalized || fallback
}
