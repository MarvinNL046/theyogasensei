import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { ConvexHttpClient } from 'convex/browser'
import type { FunctionReference } from 'convex/server'
import { resolveAffiliateDestination } from '#/lib/affiliate-links'
import { affiliateRedirectHeaders } from '#/lib/affiliate-redirect-headers'

const incrementAffiliateClick = 'affiliateClicks:increment' as unknown as FunctionReference<
  'mutation',
  'public',
  { slug: string },
  { ok: boolean; status?: string; reason?: string }
>

const convexUrl = import.meta.env.VITE_CONVEX_URL ?? ''

/**
 * Affiliate redirect. Excluded from prerender via vite.config.ts → prerender.filter.
 *
 * Privacy rule: click logging records only the slug/day aggregate in Convex.
 * We never forward IP, user-agent, referer, headers, query params, or user IDs.
 */
export const Route = createFileRoute('/go/$slug')({
  loader: async ({ params }) => {
    const target = resolveAffiliateDestination(params.slug)
    if (!target) {
      throw notFound({ headers: affiliateRedirectHeaders })
    }

    await incrementClickBestEffort(params.slug)

    throw redirect({
      href: target,
      statusCode: 302,
      headers: {
        ...affiliateRedirectHeaders,
      },
    })
  },
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  }),
  headers: () => affiliateRedirectHeaders,
  // Component never renders — the loader either redirects or throws 404.
  component: () => null,
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
