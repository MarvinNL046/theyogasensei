/**
 * Affiliate link registry. Keyed by short slug used in /go/<slug> URLs.
 * Values are merchant target URLs (Amazon Associates, Manduka, etc.).
 *
 * Phase C ships this empty. Real entries land alongside the first affiliate
 * post so every monetised outbound link is auditable in git history.
 */
export const affiliateLinks: Record<string, string> = {
  'manduka-pro-6mm': 'https://www.amazon.com/dp/B005NZ7PEQ',
  'liforme-original': 'https://www.amazon.com/dp/B09X66N6GX',
  'gaiam-premium-6mm': 'https://www.amazon.com/dp/B0D4MDKW3V',
  'gaiam-cork-yoga-mat': 'https://www.amazon.com/dp/B079W4FX8B',
  'manduka-eko-5mm': 'https://www.amazon.com/dp/B078YB99H8',
  'manduka-grp-adapt': 'https://www.amazon.com/dp/B0CK3NM2YP',
  'jade-harmony': 'https://www.amazon.com/dp/B000ECBQXE',
  'manduka-eko-lite': 'https://www.amazon.com/dp/B08LNP5XG5',
  'manduka-yogitoes': 'https://www.amazon.com/dp/B0D5ZR3R1M',
  'manduka-equa-towel': 'https://www.amazon.com/dp/B00DGMS8XU',
  'manduka-mat-wash-lavender': 'https://www.amazon.com/dp/B08Q775558',
  // Accessories — verified 2026-05-30, brand-consistent picks (bolster has no
  // Manduka equivalent → Hugger Mugger, the category standard). Inert until a
  // guide/button references the slug.
  'manduka-yoga-block': 'https://www.amazon.com/dp/B000VUAGAS',
  'gaiam-cork-yoga-block': 'https://www.amazon.com/dp/B008R71FI4',
  'manduka-align-strap': 'https://www.amazon.com/dp/B01ABWKUXI',
  'manduka-breathe-easy-carrier': 'https://www.amazon.com/dp/B077BJ8315',
  'hugger-mugger-bolster': 'https://www.amazon.com/dp/B000C9LZRQ',
}

// Keep all outbound affiliate redirects disabled until Associates approval.
// Flip AFFILIATE_REDIRECTS_ENABLED=true in the deployment environment after
// approval. Default false means registered and unknown slugs both return the
// same 404 + noindex/no-store response.
export function affiliateRedirectsEnabled(): boolean {
  const env = getAffiliateRedirectsEnabledEnv()
  return env === 'true' || env === '1'
}

// Amazon Associates store/tracking ID — approved and live (2026-05-30).
export const AMAZON_ASSOCIATES_TAG = 'theyogasensei-20'

export function withAffiliateTag(rawUrl: string): string {
  const url = new URL(rawUrl)
  const host = url.hostname.toLowerCase()

  if (isAmazonHost(host) && !url.searchParams.has('tag')) {
    url.searchParams.set('tag', AMAZON_ASSOCIATES_TAG)
  }

  return url.toString()
}

function isAmazonHost(host: string): boolean {
  return host === 'amazon.com' || host.startsWith('amazon.') || host.includes('.amazon.')
}

export function resolveAffiliateDestination(slug: string): string | null {
  const target = affiliateLinks[slug]
  if (!target || !affiliateRedirectsEnabled()) return null
  return withAffiliateTag(target)
}

function getAffiliateRedirectsEnabledEnv(): string | undefined {
  if (typeof process !== 'undefined') {
    return process.env.AFFILIATE_REDIRECTS_ENABLED
  }

  return undefined
}
