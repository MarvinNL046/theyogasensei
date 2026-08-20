import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { ConvexHttpClient } from 'convex/browser'
import type { FunctionReference } from 'convex/server'
import { resolveAffiliateLink } from '#/lib/affiliate-links'
import { affiliateRedirectHeaders } from '#/lib/affiliate-redirect-headers'
import {
  affiliatePageTypes,
  affiliatePlacements,
} from '#/lib/affiliate-tracking'
import type {
  AffiliatePageType,
  AffiliatePlacement,
} from '#/lib/affiliate-tracking'

const incrementAffiliateClick = 'affiliateClicks:increment' as unknown as FunctionReference<
  'mutation',
  'public',
  { slug: string; sourcePage: string; pageType: string; placement: string; trackingId: string },
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
  validateSearch: (search: Record<string, unknown>) => ({
    source: cleanSource(search.source),
    pageType: cleanPageType(search.pageType),
    placement: cleanPlacement(search.placement),
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ params, deps }) => {
    const resolved = resolveAffiliateLink(params.slug, deps.pageType)
    if (!resolved) {
      throw notFound({ headers: affiliateRedirectHeaders })
    }

    await incrementClickBestEffort({
      slug: params.slug,
      sourcePage: deps.source,
      pageType: deps.pageType,
      placement: deps.placement,
      trackingId: resolved.trackingId,
    })

    throw redirect({
      href: resolved.destination,
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

async function incrementClickBestEffort(args: {
  slug: string
  sourcePage: string
  pageType: AffiliatePageType
  placement: AffiliatePlacement
  trackingId: string
}) {
  if (!convexUrl) return

  try {
    const client = new ConvexHttpClient(convexUrl)
    await client.mutation(incrementAffiliateClick, args)
  } catch {
    // Do not block the user redirect if analytics logging is unavailable.
  }
}

function cleanSource(value: unknown): string {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) {
    return '/unknown'
  }
  return value.slice(0, 160)
}

function cleanPageType(value: unknown): AffiliatePageType {
  return affiliatePageTypes.includes(value as AffiliatePageType)
    ? (value as AffiliatePageType)
    : 'other'
}

function cleanPlacement(value: unknown): AffiliatePlacement {
  return affiliatePlacements.includes(value as AffiliatePlacement)
    ? (value as AffiliatePlacement)
    : 'affiliate-button'
}
