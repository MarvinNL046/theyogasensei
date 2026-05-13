import { v } from 'convex/values'
import { internalMutation } from './_generated/server'

const EVENT_TYPES = [
  'sent',
  'delivered',
  'opened',
  'clicked',
  'bounced',
  'complained',
] as const

/**
 * Record a single email event for a subscriber. Called both from the
 * outbound email action (immediately after Resend accepts the send) and
 * from the Resend webhook (when opens/clicks/bounces come in).
 */
export const record = internalMutation({
  args: {
    subscriberId: v.id('subscribers'),
    type: v.union(
      v.literal('sent'),
      v.literal('delivered'),
      v.literal('opened'),
      v.literal('clicked'),
      v.literal('bounced'),
      v.literal('complained'),
    ),
    template: v.string(),
    meta: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('emailEvents', {
      subscriberId: args.subscriberId,
      type: args.type,
      template: args.template,
      timestamp: Date.now(),
      meta: args.meta,
    })
  },
})

export const RESEND_EVENT_TO_TYPE: Record<string, (typeof EVENT_TYPES)[number] | undefined> = {
  'email.sent': 'sent',
  'email.delivered': 'delivered',
  'email.opened': 'opened',
  'email.clicked': 'clicked',
  'email.bounced': 'bounced',
  'email.complained': 'complained',
}
