import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { internal } from './_generated/api'
import { RESEND_EVENT_TO_TYPE } from './emailEvents'

interface ResendEvent {
  type?: string
  data?: {
    email_id?: string
    to?: Array<string> | string
    tags?: Array<{ name: string; value: string }>
    [k: string]: unknown
  }
}

/**
 * Resend → Convex webhook. Configure in the Resend dashboard:
 *   URL:    https://<your-convex-deployment>.convex.cloud/resend-webhook
 *   Events: email.delivered, email.opened, email.clicked, email.bounced, email.complained
 *
 * Signing-secret verification is left for Phase 2 (Resend uses a Svix HMAC
 * header; we record events optimistically for Phase 1 with no secret check).
 */
const handleResendWebhook = httpAction(async (ctx, request) => {
  let payload: ResendEvent
  try {
    payload = (await request.json()) as ResendEvent
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const eventType = payload.type ?? ''
  const mappedType = RESEND_EVENT_TO_TYPE[eventType]
  if (!mappedType) {
    return new Response(`Ignored event: ${eventType}`, { status: 200 })
  }

  const recipient = Array.isArray(payload.data?.to)
    ? payload.data?.to[0]
    : payload.data?.to
  if (!recipient) {
    return new Response('No recipient in payload', { status: 400 })
  }

  const subscriber = await ctx.runQuery(internal.subscribers.findByEmail, {
    email: recipient.toLowerCase(),
  })
  if (!subscriber) {
    // Event for an unknown address — ignore silently (likely a test send).
    return new Response('OK', { status: 200 })
  }

  const template =
    payload.data?.tags?.find((t) => t.name === 'template')?.value ?? 'unknown'

  await ctx.runMutation(internal.emailEvents.record, {
    subscriberId: subscriber._id,
    type: mappedType,
    template,
    meta: payload.data,
  })

  return new Response('OK', { status: 200 })
})

const http = httpRouter()

http.route({
  path: '/resend-webhook',
  method: 'POST',
  handler: handleResendWebhook,
})

export default http
