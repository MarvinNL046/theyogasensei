'use node'

import { Resend } from 'resend'
import { render } from '@react-email/components'
import { v } from 'convex/values'
import { internalAction } from './_generated/server'
import { internal } from './_generated/api'
import { DoubleOptIn } from '../emails/DoubleOptIn'
import { Welcome } from '../emails/Welcome'
import { LeadMagnetDelivery } from '../emails/LeadMagnetDelivery'

const FROM = 'The Yoga Sensei <hello@theyogasensei.com>'
const SITE = process.env.SITE_URL ?? 'https://theyogasensei.com'

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    throw new Error('RESEND_API_KEY is not set in Convex dashboard env vars.')
  }
  return new Resend(key)
}

export const sendDoubleOptIn = internalAction({
  args: {
    subscriberId: v.id('subscribers'),
    email: v.string(),
    optInToken: v.string(),
    leadMagnet: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const confirmUrl = `${SITE}/confirm?token=${encodeURIComponent(args.optInToken)}`
    const html = await render(DoubleOptIn({ confirmUrl, leadMagnet: args.leadMagnet }))
    const text = await render(DoubleOptIn({ confirmUrl, leadMagnet: args.leadMagnet }), {
      plainText: true,
    })

    const resend = getResend()
    await resend.emails.send({
      from: FROM,
      to: args.email,
      subject: 'Confirm your subscription to The Yoga Sensei',
      html,
      text,
      tags: [{ name: 'template', value: 'double-opt-in' }],
    })

    await ctx.runMutation(internal.emailEvents.record, {
      subscriberId: args.subscriberId,
      type: 'sent',
      template: 'double-opt-in',
    })
  },
})

export const sendWelcome = internalAction({
  args: {
    subscriberId: v.id('subscribers'),
    email: v.string(),
    optInToken: v.string(),
    leadMagnet: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const unsubscribeUrl = `${SITE}/unsubscribe?token=${encodeURIComponent(args.optInToken)}`
    const html = await render(
      Welcome({ siteUrl: SITE, leadMagnet: args.leadMagnet, unsubscribeUrl }),
    )
    const text = await render(
      Welcome({ siteUrl: SITE, leadMagnet: args.leadMagnet, unsubscribeUrl }),
      { plainText: true },
    )

    const resend = getResend()
    await resend.emails.send({
      from: FROM,
      to: args.email,
      subject: 'Welcome to The Yoga Sensei',
      html,
      text,
      headers: { 'List-Unsubscribe': `<${unsubscribeUrl}>` },
      tags: [{ name: 'template', value: 'welcome' }],
    })

    await ctx.runMutation(internal.emailEvents.record, {
      subscriberId: args.subscriberId,
      type: 'sent',
      template: 'welcome',
    })
  },
})

export const sendLeadMagnet = internalAction({
  args: {
    subscriberId: v.id('subscribers'),
    email: v.string(),
    optInToken: v.string(),
    leadMagnet: v.string(),
  },
  handler: async (ctx, args) => {
    // Friendly public URL — a Vercel rewrite (/free/:slug → /lead-magnets/:slug.pdf)
    // serves the static PDF without exposing the internal folder or the .pdf suffix.
    const downloadUrl = `${SITE}/free/${args.leadMagnet}`
    const unsubscribeUrl = `${SITE}/unsubscribe?token=${encodeURIComponent(args.optInToken)}`

    const html = await render(
      LeadMagnetDelivery({ siteUrl: SITE, leadMagnet: args.leadMagnet, downloadUrl, unsubscribeUrl }),
    )
    const text = await render(
      LeadMagnetDelivery({ siteUrl: SITE, leadMagnet: args.leadMagnet, downloadUrl, unsubscribeUrl }),
      { plainText: true },
    )

    const resend = getResend()
    await resend.emails.send({
      from: FROM,
      to: args.email,
      subject: 'Your download from The Yoga Sensei',
      html,
      text,
      headers: { 'List-Unsubscribe': `<${unsubscribeUrl}>` },
      tags: [
        { name: 'template', value: 'lead-magnet' },
        { name: 'magnet', value: args.leadMagnet },
      ],
    })

    await ctx.runMutation(internal.emailEvents.record, {
      subscriberId: args.subscriberId,
      type: 'sent',
      template: `lead-magnet:${args.leadMagnet}`,
    })
  },
})
