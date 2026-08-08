import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

/**
 * Convex schema for theyogasensei.com — scoped to lead capture only.
 *
 * Per ADR-001 and CLAUDE.md: NO product catalog, NO relational data here.
 * The only tables are `subscribers` (email list + opt-in tokens) and
 * `emailEvents` (Resend webhook events for engagement scoring).
 *
 * Products, pose data, gear specs, etc. live in MDX frontmatter under
 * /content/, not in Convex.
 */
export default defineSchema({
  subscribers: defineTable({
    email: v.string(),
    source: v.string(), // "homepage", "pillar:yoga-for-beginners", "exit-intent", etc.
    confirmedAt: v.optional(v.number()), // unix ms; set at signup (single opt-in). absent = legacy never-confirmed row
    unsubscribedAt: v.optional(v.number()), // unix ms; set on unsubscribe (suppression record). absent = active
    optInToken: v.string(), // uuid v4; opt-in + unsubscribe token (per-subscriber, used in email links)
    leadMagnet: v.optional(v.string()), // "30-day-beginner-path", "mat-cheatsheet", etc.
    tags: v.array(v.string()), // for future segmentation
  })
    .index('by_email', ['email'])
    .index('by_token', ['optInToken']),

  emailEvents: defineTable({
    subscriberId: v.id('subscribers'),
    type: v.union(
      v.literal('sent'),
      v.literal('delivered'),
      v.literal('opened'),
      v.literal('clicked'),
      v.literal('bounced'),
      v.literal('complained'),
    ),
    template: v.string(), // "double-opt-in", "welcome", "lead-magnet-delivery", etc.
    timestamp: v.number(), // unix ms
    meta: v.optional(v.any()), // Resend webhook payload extras (clicked URL, bounce reason)
  }).index('by_subscriber', ['subscriberId']),

  affiliateClicks: defineTable({
    slug: v.string(),
    day: v.string(), // UTC YYYY-MM-DD bucket; no IP/user/browser data stored.
    sourcePage: v.optional(v.string()),
    pageType: v.optional(v.string()),
    placement: v.optional(v.string()),
    trackingId: v.optional(v.string()),
    count: v.number(),
    updatedAt: v.number(), // unix ms
  })
    .index('by_slug_and_day', ['slug', 'day'])
    .index('by_attribution_and_day', [
      'slug',
      'sourcePage',
      'pageType',
      'placement',
      'trackingId',
      'day',
    ]),
})
