import { v } from 'convex/values'
import { internalMutation, internalQuery, mutation, query } from './_generated/server'
import { internal } from './_generated/api'
import type { Id } from './_generated/dataModel'

// Pragmatic email-format check. Single opt-in means there is no confirmation
// click to weed out typos and fake addresses, so we reject obviously-malformed
// input before it lands on the list and bounces against a young sending domain.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Capture a subscriber (single opt-in) and schedule the welcome email.
 *
 * The subscriber is confirmed the moment they submit — no double-opt-in step.
 * Idempotent on email: a re-submit of an already-subscribed address is a no-op
 * that returns "already-subscribed" instead of re-sending the welcome. A legacy
 * unconfirmed row (from the old double-opt-in era) is upgraded to subscribed.
 */
export const insert = mutation({
  args: {
    email: v.string(),
    source: v.string(),
    leadMagnet: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const normalized = args.email.trim().toLowerCase()

    if (!EMAIL_RE.test(normalized)) {
      return { ok: false as const, status: 'invalid-email' as const }
    }

    // Schedule the welcome (+ lead-magnet) emails. optInToken doubles as the
    // unsubscribe token embedded in every email's footer + List-Unsubscribe.
    const sendOnboarding = async (
      subscriberId: Id<'subscribers'>,
      email: string,
      optInToken: string,
      leadMagnet: string | undefined,
    ) => {
      await ctx.scheduler.runAfter(0, internal.email.sendWelcome, {
        subscriberId,
        email,
        optInToken,
        leadMagnet,
      })
      if (leadMagnet) {
        await ctx.scheduler.runAfter(0, internal.email.sendLeadMagnet, {
          subscriberId,
          email,
          optInToken,
          leadMagnet,
        })
      }
    }

    const existing = await ctx.db
      .query('subscribers')
      .withIndex('by_email', (q) => q.eq('email', normalized))
      .first()

    if (existing) {
      const leadMagnet = existing.leadMagnet ?? args.leadMagnet
      if (existing.unsubscribedAt) {
        // A deliberate re-signup after opting out is fresh consent — reactivate
        // the suppressed row rather than spawning a duplicate.
        await ctx.db.patch(existing._id, {
          confirmedAt: Date.now(),
          unsubscribedAt: undefined,
        })
        await sendOnboarding(existing._id, existing.email, existing.optInToken, leadMagnet)
        return { ok: true as const, status: 'resubscribed' as const }
      }
      if (existing.confirmedAt) {
        return { ok: true as const, status: 'already-subscribed' as const }
      }
      // Legacy pending row (old double-opt-in era): treat this as the signup.
      await ctx.db.patch(existing._id, { confirmedAt: Date.now() })
      await sendOnboarding(existing._id, existing.email, existing.optInToken, leadMagnet)
      return { ok: true as const, status: 'subscribed' as const }
    }

    const optInToken = crypto.randomUUID()
    const subscriberId = await ctx.db.insert('subscribers', {
      email: normalized,
      source: args.source,
      confirmedAt: Date.now(),
      optInToken,
      leadMagnet: args.leadMagnet,
      tags: [],
    })
    await sendOnboarding(subscriberId, normalized, optInToken, args.leadMagnet)

    return { ok: true as const, status: 'subscribed' as const }
  },
})

/**
 * Confirm a subscriber via their opt-in token (link from DoubleOptIn email).
 * Triggers the welcome + lead-magnet-delivery emails.
 */
export const confirm = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query('subscribers')
      .withIndex('by_token', (q) => q.eq('optInToken', args.token))
      .first()

    if (!subscriber) {
      return { ok: false as const, reason: 'invalid-token' as const }
    }
    if (subscriber.confirmedAt) {
      return { ok: true as const, status: 'already-confirmed' as const }
    }

    await ctx.db.patch(subscriber._id, { confirmedAt: Date.now() })

    await ctx.scheduler.runAfter(0, internal.email.sendWelcome, {
      subscriberId: subscriber._id,
      email: subscriber.email,
      optInToken: subscriber.optInToken,
      leadMagnet: subscriber.leadMagnet,
    })

    if (subscriber.leadMagnet) {
      await ctx.scheduler.runAfter(0, internal.email.sendLeadMagnet, {
        subscriberId: subscriber._id,
        email: subscriber.email,
        optInToken: subscriber.optInToken,
        leadMagnet: subscriber.leadMagnet,
      })
    }

    return { ok: true as const, status: 'confirmed' as const }
  },
})

/**
 * Unsubscribe via the per-subscriber token (the link in every email footer and
 * the List-Unsubscribe header). Suppression, not deletion: the row stays with
 * `unsubscribedAt` set, so a future bulk re-add cannot silently resubscribe the
 * person. A deliberate form re-signup reactivates the row (see `insert`).
 */
export const unsubscribe = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query('subscribers')
      .withIndex('by_token', (q) => q.eq('optInToken', args.token))
      .first()

    if (!subscriber) {
      return { ok: false as const, status: 'invalid-token' as const }
    }
    if (subscriber.unsubscribedAt) {
      return { ok: true as const, status: 'already-unsubscribed' as const }
    }

    await ctx.db.patch(subscriber._id, { unsubscribedAt: Date.now() })
    return { ok: true as const, status: 'unsubscribed' as const }
  },
})

/**
 * Light read-only stat for the homepage / footer ("Join N yogis…"). Counts
 * only active confirmed subscribers — unconfirmed and unsubscribed rows are
 * excluded so the number reflects the real live list.
 */
export const confirmedCount = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query('subscribers').collect()
    return all.filter((s) => s.confirmedAt && !s.unsubscribedAt).length
  },
})

/**
 * Internal admin utility — hard-delete a subscriber and their email events by
 * address. Not exposed to the client (run via `npx convex run` / dashboard).
 * Backs GDPR erasure requests (the privacy page promises manual deletion) and
 * test-row cleanup.
 */
export const deleteByEmail = internalMutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const normalized = args.email.trim().toLowerCase()
    const subscriber = await ctx.db
      .query('subscribers')
      .withIndex('by_email', (q) => q.eq('email', normalized))
      .first()

    if (!subscriber) {
      return { ok: false as const, status: 'not-found' as const }
    }

    const events = await ctx.db
      .query('emailEvents')
      .withIndex('by_subscriber', (q) => q.eq('subscriberId', subscriber._id))
      .collect()
    for (const event of events) {
      await ctx.db.delete(event._id)
    }
    await ctx.db.delete(subscriber._id)

    return { ok: true as const, status: 'deleted' as const, events: events.length }
  },
})

/**
 * Internal helper — find a subscriber by email. Used by the Resend webhook
 * to attach events to the right row. Not exposed to the client.
 */
export const findByEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('subscribers')
      .withIndex('by_email', (q) => q.eq('email', args.email.toLowerCase()))
      .first()
  },
})
