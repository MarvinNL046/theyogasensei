import { v } from 'convex/values'
import { internalQuery, mutation, query } from './_generated/server'
import { internal } from './_generated/api'

/**
 * Capture a new subscriber and schedule the double-opt-in email.
 *
 * Idempotent on email: a re-submit returns ok with status "already-pending"
 * or "already-confirmed" instead of duplicating the row. Resend the
 * confirmation if the existing row is unconfirmed.
 */
export const insert = mutation({
  args: {
    email: v.string(),
    source: v.string(),
    leadMagnet: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const normalized = args.email.trim().toLowerCase()

    const existing = await ctx.db
      .query('subscribers')
      .withIndex('by_email', (q) => q.eq('email', normalized))
      .first()

    if (existing) {
      if (existing.confirmedAt) {
        return { ok: true as const, status: 'already-confirmed' as const }
      }
      // Re-send the double-opt-in for the existing pending row.
      await ctx.scheduler.runAfter(0, internal.email.sendDoubleOptIn, {
        subscriberId: existing._id,
        email: existing.email,
        optInToken: existing.optInToken,
        leadMagnet: existing.leadMagnet,
      })
      return { ok: true as const, status: 'resent-confirmation' as const }
    }

    const optInToken = crypto.randomUUID()
    const subscriberId = await ctx.db.insert('subscribers', {
      email: normalized,
      source: args.source,
      optInToken,
      leadMagnet: args.leadMagnet,
      tags: [],
    })

    await ctx.scheduler.runAfter(0, internal.email.sendDoubleOptIn, {
      subscriberId,
      email: normalized,
      optInToken,
      leadMagnet: args.leadMagnet,
    })

    return { ok: true as const, status: 'pending-confirm' as const }
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
