import { v } from 'convex/values'
import { internalQuery, mutation, query } from './_generated/server'
import { internal } from './_generated/api'

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

    const existing = await ctx.db
      .query('subscribers')
      .withIndex('by_email', (q) => q.eq('email', normalized))
      .first()

    if (existing) {
      if (existing.confirmedAt) {
        return { ok: true as const, status: 'already-subscribed' as const }
      }
      // Legacy pending row: treat this submit as the subscription itself.
      await ctx.db.patch(existing._id, { confirmedAt: Date.now() })
      await ctx.scheduler.runAfter(0, internal.email.sendWelcome, {
        subscriberId: existing._id,
        email: existing.email,
        leadMagnet: existing.leadMagnet ?? args.leadMagnet,
      })
      if (existing.leadMagnet ?? args.leadMagnet) {
        await ctx.scheduler.runAfter(0, internal.email.sendLeadMagnet, {
          subscriberId: existing._id,
          email: existing.email,
          leadMagnet: (existing.leadMagnet ?? args.leadMagnet)!,
        })
      }
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

    await ctx.scheduler.runAfter(0, internal.email.sendWelcome, {
      subscriberId,
      email: normalized,
      leadMagnet: args.leadMagnet,
    })
    if (args.leadMagnet) {
      await ctx.scheduler.runAfter(0, internal.email.sendLeadMagnet, {
        subscriberId,
        email: normalized,
        leadMagnet: args.leadMagnet,
      })
    }

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
      leadMagnet: subscriber.leadMagnet,
    })

    if (subscriber.leadMagnet) {
      await ctx.scheduler.runAfter(0, internal.email.sendLeadMagnet, {
        subscriberId: subscriber._id,
        email: subscriber.email,
        leadMagnet: subscriber.leadMagnet,
      })
    }

    return { ok: true as const, status: 'confirmed' as const }
  },
})

/**
 * Light read-only stat for the homepage / footer ("Join N yogis…"). Only
 * counts confirmed subscribers so spam signups do not inflate the number.
 */
export const confirmedCount = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query('subscribers').collect()
    return all.filter((s) => s.confirmedAt).length
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
