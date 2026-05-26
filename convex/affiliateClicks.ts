import { v } from 'convex/values'
import { mutation } from './_generated/server'

/**
 * Aggregated affiliate-click counter.
 *
 * Privacy rule: this function records only slug + UTC day bucket + count.
 * It does not accept or store IP address, user agent, referer, headers, query
 * params, or any user identifier.
 */
export const increment = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const slug = args.slug.trim().toLowerCase()
    if (!slug) {
      return { ok: false as const, reason: 'empty-slug' as const }
    }

    const now = Date.now()
    const day = new Date(now).toISOString().slice(0, 10)

    const existing = await ctx.db
      .query('affiliateClicks')
      .withIndex('by_slug_and_day', (q) => q.eq('slug', slug).eq('day', day))
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
      count: 1,
      updatedAt: now,
    })

    return { ok: true as const, status: 'created' as const }
  },
})
