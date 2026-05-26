/**
 * Affiliate link registry. Keyed by short slug used in /go/<slug> URLs.
 * Values are merchant target URLs (Amazon Associates, Manduka, etc.).
 *
 * Phase C ships this empty. Real entries land alongside the first affiliate
 * post so every monetised outbound link is auditable in git history.
 */
export const affiliateLinks: Record<string, string> = {
  'manduka-pro-6mm': 'https://www.amazon.com/dp/B005NZ7PEQ',
  'liforme-original': 'https://www.amazon.com/dp/B01CGLCGRA',
  'gaiam-premium-6mm': 'https://www.amazon.com/dp/B0D4MDKW3V',
  'manduka-eko-5mm': 'https://www.amazon.com/dp/B078YB99H8',
  'manduka-grp-adapt': 'https://www.amazon.com/dp/B0CK3NM2YP',
  'jade-harmony': 'https://www.amazon.com/dp/B000ECBQXE',
  'manduka-eko-lite': 'https://www.amazon.com/dp/B08LNP5XG5',
  'manduka-yogitoes': 'https://www.amazon.com/dp/B09MXDWWDH',
  'manduka-equa-towel': 'https://www.amazon.com/dp/B0CK4985F7',
  'manduka-mat-wash-lavender': 'https://www.amazon.com/dp/B08Q775558',
}

// Keep all outbound affiliate redirects disabled until Associates approval.
// Flip AFFILIATE_REDIRECTS_ENABLED=true in the deployment environment after
// approval. Default false means registered and unknown slugs both return the
// same 404 + noindex/no-store response.
export function affiliateRedirectsEnabled(): boolean {
  const env = getAffiliateRedirectsEnabledEnv()
  return env === 'true' || env === '1'
}

// REVIEW: replace with the actual Amazon Associates tracking ID once issued.
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
