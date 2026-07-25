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
  // Repointed 2026-07-25. B0CK3NM2YP is a genuine 5mm GRP Adapt but in Jet
  // Black, a colourway Manduka no longer lists for either generation.
  // B0D5ZMVQKD (Terracotta) matches a live Manduka colourway. Note that
  // Amazon US carries no GRP Adapt 2.0 and no Lite 2.1 at all — this link
  // buys the previous 5mm generation, which the review states plainly.
  'manduka-grp-adapt': 'https://www.amazon.com/dp/B0D5ZMVQKD',
  'manduka-grp-adapt-travel': 'https://www.amazon.com/dp/B0F641D1QJ',
  // Foldable roundup picks — every ASIN verified against the live listing
  // 2026-07-25. The eKO SuperLite ships as three colour variants of parent
  // B0B5479GY2; one is pinned here so the on-page specs match what the reader
  // lands on. The Jade Voyager ASIN circulating in competitor content
  // (B08LZX13TH) is stale — B0FJBRL4GL is the live listing.
  'stakt-foldable-mat': 'https://www.amazon.com/dp/B0BHBYS1ML',
  'jade-voyager': 'https://www.amazon.com/dp/B0FJBRL4GL',
  'manduka-eko-superlite': 'https://www.amazon.com/dp/B07WWC5B95',
  'gaiam-foldable-mat': 'https://www.amazon.com/dp/B073WRCQQK',
  'jade-harmony': 'https://www.amazon.com/dp/B000ECBQXE',
  'manduka-eko-lite': 'https://www.amazon.com/dp/B08LNP5XG5',
  'manduka-yogitoes': 'https://www.amazon.com/dp/B0D5ZR3R1M',
  // Repointed 2026-07-25. The previous target B00DGMS8XU is titled "72-inch mat
  // towel" but every structured field on the listing says hand towel (Product
  // Style "eQua Hand Towel", 26.5 x 16, MPN EQ/HAND/MIDNIGHT) — so the hot-yoga
  // guide was sending mat-towel readers to a hand towel. B0GW137Y9V is the real
  // mat-sized eQua (71 x 24, "eQua Mat Towel"), verified on the listing.
  'manduka-equa-towel': 'https://www.amazon.com/dp/B0GW137Y9V',
  // Towel roundup picks — ASINs verified against the live listings 2026-07-25.
  'manduka-yogitoes-hand-towel': 'https://www.amazon.com/dp/B09HWYRS45',
  'eunzel-grip-dot-towel': 'https://www.amazon.com/dp/B0B46S9MWP',
  'heathyoga-silicone-towel': 'https://www.amazon.com/dp/B07ZF9YXVZ',
  'manduka-mat-wash-lavender': 'https://www.amazon.com/dp/B08Q775558',
  // Accessories — verified 2026-05-30, brand-consistent picks (bolster has no
  // Manduka equivalent → Hugger Mugger, the category standard). Inert until a
  // guide/button references the slug.
  'manduka-yoga-block': 'https://www.amazon.com/dp/B000VUAGAS',
  'gaiam-cork-yoga-block': 'https://www.amazon.com/dp/B008R71FI4',
  'manduka-yoga-strap': 'https://www.amazon.com/dp/B01ABWKUXI',
  'manduka-breathe-easy-carrier': 'https://www.amazon.com/dp/B077BJ8315',
  'hugger-mugger-bolster': 'https://www.amazon.com/dp/B000C9LZRQ',
  // Gaiam "best value" second picks for the accessory roundups.
  'gaiam-yoga-block': 'https://www.amazon.com/dp/B075W63K67',
  'gaiam-yoga-bolster': 'https://www.amazon.com/dp/B01ICBTPTK',
  'gaiam-mat-bag': 'https://www.amazon.com/dp/B011NQZBAI',
  // Budget NBR-foam mat — anchor for the Retrospec Solana review (the ½" /
  // XL version with strap). Specs verified from retrospec.com 2026-06-14.
  'retrospec-solana-half-inch': 'https://www.amazon.com/dp/B0CLCB23V1',
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
