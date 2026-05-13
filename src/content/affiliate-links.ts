/**
 * Affiliate link registry. Keyed by short slug used in /go/<slug> URLs.
 * Values are the merchant target URLs (Amazon Associates, Manduka, etc.).
 *
 * Phase 1 ships empty. Real entries land alongside the first product reviews.
 *
 * Rule: every entry here is a sponsored link. The /go/$slug route adds
 * rel="sponsored nofollow" semantics and noindex, and Vercel logs the click.
 */
export const affiliateLinks: Record<string, string> = {}
