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

  /**
   * Amazon Creators API offer cache. NOT a product catalog — ADR-001 still
   * holds. This is a short-lived mirror of data Amazon requires us to refresh
   * on a schedule, and nothing here is editorial: specs, names and opinions
   * stay in MDX.
   *
   * Cache lifetimes are prescribed by the Creators API best practices, not
   * chosen by us: offers expire after 1 hour, item info (title, image, link)
   * after 1 day. `getBySlugs` refuses to serve an offer past its window, so a
   * stalled cron degrades to no price rather than a stale one.
   */
  amazonOffers: defineTable({
    asin: v.string(),
    // Offer fields — 1 hour TTL. All optional: an ASIN can lose its buy box.
    amount: v.optional(v.number()),
    currency: v.optional(v.string()),
    displayAmount: v.optional(v.string()),
    savingsPercentage: v.optional(v.number()),
    savingsBasisDisplayAmount: v.optional(v.string()),
    availabilityType: v.optional(v.string()),
    availabilityMessage: v.optional(v.string()),
    isBuyBoxWinner: v.optional(v.boolean()),
    violatesMap: v.optional(v.boolean()),
    // Item fields — 1 day TTL.
    title: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    // The API-vended link. Amazon forbids modifying it, so it is stored whole
    // and never recomposed. Currently unused by /go/, which builds its own
    // tagged URL; kept so the switch is a data change, not a fetch change.
    detailPageUrl: v.optional(v.string()),
    offersFetchedAt: v.optional(v.number()), // unix ms; absent = never had an offer
    itemFetchedAt: v.number(), // unix ms
    lastErrorAt: v.optional(v.number()),
    lastError: v.optional(v.string()),
  }).index('by_asin', ['asin']),

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
