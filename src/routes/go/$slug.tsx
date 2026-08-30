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

const incrementAffiliateClick =
  'affiliateClicks:increment' as unknown as FunctionReference<
    'mutation',
    'public',
    {
      slug: string
      sourcePage: string
      pageType: string
      placement: string
      trackingId: string
    },
    { ok: boolean; status?: string; reason?: string }
  >

const vendedUrlForSlug =
  'amazonOffers:vendedUrlForSlug' as unknown as FunctionReference<
    'query',
    'public',
    { slug: string; trackingId: string },
    string | null
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

    // Prefer the API-vended link for this tracking ID. Amazon's best practices
    // require a vended link to be passed through unmodified, which is why we
    // fetch one per tag rather than rewriting a single link's tag. It also
    // carries th=1&psc=1, pinning the exact variation — several of our slugs
    // are deliberately pinned colourways that the hand-built URL never held.
    // Any failure falls back to the registry URL, so attribution never breaks.
    const vended = await vendedDestinationBestEffort(
      params.slug,
      resolved.trackingId,
    )

    throw redirect({
      href: vended ?? resolved.destination,
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

/**
 * Vended link lookup that can never delay or break a redirect: no Convex URL,
 * a cold cache, a slow query or an error all resolve to null and the caller
 * uses the registry URL instead.
 */
async function vendedDestinationBestEffort(
  slug: string,
  trackingId: string,
): Promise<string | null> {
  if (!convexUrl) return null

  try {
    const client = new ConvexHttpClient(convexUrl)
    const result = await Promise.race([
      client.query(vendedUrlForSlug, { slug, trackingId }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 600)),
    ])
    return typeof result === 'string' && result.length > 0 ? result : null
  } catch {
    return null
  }
}

function cleanSource(value: unknown): string {
  if (
    typeof value !== 'string' ||
    !value.startsWith('/') ||
    value.startsWith('//')
  ) {
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
