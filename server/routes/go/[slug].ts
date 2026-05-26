import { defineEventHandler, getRouterParam, sendRedirect, setHeaders, setResponseStatus } from 'h3'
import { ConvexHttpClient } from 'convex/browser'
import type { FunctionReference } from 'convex/server'
import { resolveAffiliateDestination } from '../../../src/lib/affiliate-links'
import { affiliateRedirectHeaders } from '../../../src/lib/affiliate-redirect-headers'

const incrementAffiliateClick = 'affiliateClicks:increment' as unknown as FunctionReference<
  'mutation',
  'public',
  { slug: string },
  { ok: boolean; status?: string; reason?: string }
>

const convexUrl = process.env.VITE_CONVEX_URL ?? process.env.CONVEX_URL ?? ''

export default defineEventHandler(async (event) => {
  setHeaders(event, affiliateRedirectHeaders)

  const slug = getRouterParam(event, 'slug') ?? ''
  const target = resolveAffiliateDestination(slug)
  if (!target) {
    setResponseStatus(event, 404, 'Affiliate link not found')
    return 'Affiliate link not found'
  }

  await incrementClickBestEffort(slug)

  return sendRedirect(event, target, 302)
})

async function incrementClickBestEffort(slug: string) {
  if (!convexUrl) return

  try {
    const client = new ConvexHttpClient(convexUrl)
    await client.mutation(incrementAffiliateClick, { slug })
  } catch {
    // Do not block the user redirect if analytics logging is unavailable.
  }
}
