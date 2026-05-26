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
    confirmedAt: v.optional(v.number()), // unix ms; absent = pending double-opt-in
    optInToken: v.string(), // single-use confirmation token (uuid v4)
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
    count: v.number(),
    updatedAt: v.number(), // unix ms
  }).index('by_slug_and_day', ['slug', 'day']),
})
