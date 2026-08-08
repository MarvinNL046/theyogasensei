export const affiliatePageTypes = [
  'review', 'roundup', 'comparison', 'buying-guide', 'blog', 'guide', 'other',
] as const

export type AffiliatePageType = (typeof affiliatePageTypes)[number]

export const affiliatePlacements = [
  'affiliate-button', 'inline-link', 'product-title', 'product-card',
  'product-list-button', 'closing-band', 'sidebar', 'review-section',
  'review-sidebar', 'review-verdict', 'roundup-card', 'roundup-detail',
] as const

export type AffiliatePlacement = (typeof affiliatePlacements)[number]

export interface AffiliateClickContext {
  sourcePage: string
  pageType: AffiliatePageType
  placement: AffiliatePlacement
}

export function pageTypeFromPath(pathname: string): AffiliatePageType {
  if (pathname === '/reviews/best-yoga-mats') return 'roundup'
  if (pathname.startsWith('/reviews/')) return 'review'
  if (pathname.startsWith('/blog/')) return 'blog'
  if (!pathname.startsWith('/guides/')) return 'other'

  const slug = pathname.slice('/guides/'.length)
  if (slug.includes('-vs-')) return 'comparison'
  if (slug.startsWith('best-') || slug.includes('-best-')) return 'roundup'
  if (slug.startsWith('how-to-') || slug.startsWith('how-')) return 'buying-guide'
  return 'guide'
}

export function affiliateHref(
  slug: string,
  placement: AffiliatePlacement,
  pathname = typeof window === 'undefined' ? '' : window.location.pathname,
): string {
  const sourcePage = normalizeSourcePage(pathname)
  const search = new URLSearchParams({
    source: sourcePage,
    product: slug,
    placement,
    pageType: pageTypeFromPath(sourcePage),
  })
  return `/go/${encodeURIComponent(slug)}?${search.toString()}`
}

export function affiliateClickContext(
  placement: AffiliatePlacement,
  pathname = typeof window === 'undefined' ? '' : window.location.pathname,
): AffiliateClickContext {
  const sourcePage = normalizeSourcePage(pathname)
  return { sourcePage, pageType: pageTypeFromPath(sourcePage), placement }
}

function normalizeSourcePage(pathname: string): string {
  if (!pathname.startsWith('/') || pathname.startsWith('//')) return '/unknown'
  return pathname.slice(0, 160)
}
