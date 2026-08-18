import type { AffiliatePageType } from '#/lib/affiliate-tracking'

/**
 * Affiliate link registry. Keyed by short slug used in /go/<slug> URLs.
 * Values are merchant target URLs (Amazon Associates, Manduka, etc.).
 *
 * Phase C ships this empty. Real entries land alongside the first affiliate
 * post so every monetised outbound link is auditable in git history.
 */
export const affiliateLinks: Record<string, string> = {
  'manduka-pro-6mm': 'https://www.amazon.com/dp/B005NZ7PEQ',
  // PROlite added 2026-08-18 for the PRO vs PROlite comparison. ASIN verified
  // against the live listing: brand field "Manduka", title "Manduka PROlite
  // Yoga Mat 4.7mm", Item Dimensions 71"L x 24"W x 0.18"Th, Item Weight 4.6 lb,
  // material Polyvinyl Chloride, model PL71-DK. Every one of those matches
  // Manduka's own PRO-series compare page, which is why this is the pinned
  // variant. Like the eKO SuperLite, this is one colourway (Deep Sea) of a
  // parent listing (B0H2JN3MZT) — pinned so the specs in the post match what
  // the reader actually lands on.
  'manduka-prolite': 'https://www.amazon.com/dp/B08LNRMGVW',
  'liforme-original': 'https://www.amazon.com/dp/B09X66N6GX',
  'gaiam-premium-6mm': 'https://www.amazon.com/dp/B0D4MDKW3V',
  'gaiam-cork-yoga-mat': 'https://www.amazon.com/dp/B079W4FX8B',
  // Repointed 2026-08-18. The previous target B078YB99H8 (eKO 5mm, Charcoal) is
  // still a live page but returns NO buy-box price — no headline offer, so the
  // click earns nothing and the reader lands on a page they cannot buy from.
  // B07NQJJW4W is the same mat from the same parent (B0D7N35VCW): Manduka, 5mm,
  // 71"L x 24"W x 0.2"Th, natural rubber — Acai Midnight instead of Charcoal,
  // with a live buy box and Amazon's Choice. No page names an eKO colourway, so
  // nothing in content/ needed changing. This slug is used by five live guides.
  'manduka-eko-5mm': 'https://www.amazon.com/dp/B07NQJJW4W',
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
  // Knee pad roundup — every ASIN verified live 2026-07-25, title and
  // structured fields cross-checked. Note SukhaMat's own site prints
  // "3/8in (15mm)" for B01LRP3JA4, which is self-contradictory (3/8in is
  // 9.5mm); Amazon's structured field says 5/8in, which does equal 15mm.
  'prosourcefit-knee-pad': 'https://www.amazon.com/dp/B079K6K7TX',
  'sukhamat-knee-pad': 'https://www.amazon.com/dp/B01LRP3JA4',
  'kinesis-knee-pad': 'https://www.amazon.com/dp/B06WD3HGJX',
  'gaiam-knee-pads': 'https://www.amazon.com/dp/B07G1R42MS',
  'sukhamat-firm-knee-pad': 'https://www.amazon.com/dp/B0BH9F1485',
  // Pilates grip socks — every ASIN verified live 2026-07-25, title checked
  // against structured fields, and pack size confirmed in a structured field
  // or the brand's own comparison table (not from the title alone).
  // Deliberately NOT included: Gaiam B0DNR8F333, whose Style field says
  // "2 Pair" while Unit Count says "3 Count" and whose own table contradicts
  // its description on toe style.
  'skibeaut-grip-socks': 'https://www.amazon.com/dp/B0CFD3XP7T',
  'tavi-savvy-grip-socks': 'https://www.amazon.com/dp/B0GFPBRQD2',
  'tavi-kai-crew-grip-socks': 'https://www.amazon.com/dp/B0C9F11YND',
  'ozaiic-grip-socks': 'https://www.amazon.com/dp/B07CQM36X3',
  'ozaiic-five-toe-socks': 'https://www.amazon.com/dp/B07FY79LKW',
  'tucketts-allegro-toeless': 'https://www.amazon.com/dp/B088JGTHYL',
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

const trackingIdEnvByPageType: Record<AffiliatePageType, string> = {
  review: 'AMAZON_ASSOCIATES_TAG_REVIEW',
  roundup: 'AMAZON_ASSOCIATES_TAG_ROUNDUP',
  comparison: 'AMAZON_ASSOCIATES_TAG_COMPARISON',
  'buying-guide': 'AMAZON_ASSOCIATES_TAG_BUYING_GUIDE',
  blog: 'AMAZON_ASSOCIATES_TAG_BLOG',
  guide: 'AMAZON_ASSOCIATES_TAG_GUIDE',
  other: 'AMAZON_ASSOCIATES_TAG_OTHER',
}

export interface ResolvedAffiliateLink {
  destination: string
  trackingId: string
}

export function withAffiliateTag(rawUrl: string): string {
  return withTrackingId(rawUrl, AMAZON_ASSOCIATES_TAG)
}

export function withTrackingId(rawUrl: string, trackingId: string): string {
  const url = new URL(rawUrl)
  const host = url.hostname.toLowerCase()

  if (isAmazonHost(host) && !url.searchParams.has('tag')) {
    url.searchParams.set('tag', trackingId)
  }

  return url.toString()
}

function isAmazonHost(host: string): boolean {
  return host === 'amazon.com' || host.startsWith('amazon.') || host.includes('.amazon.')
}

export function resolveAffiliateDestination(slug: string): string | null {
  return resolveAffiliateLink(slug, 'other')?.destination ?? null
}

export function resolveAffiliateLink(
  slug: string,
  pageType: AffiliatePageType,
): ResolvedAffiliateLink | null {
  const target = affiliateLinks[slug]
  if (!target || !affiliateRedirectsEnabled()) return null
  const trackingId = trackingIdForPageType(pageType)
  return { destination: withTrackingId(target, trackingId), trackingId }
}

export function trackingIdForPageType(pageType: AffiliatePageType): string {
  const configured = getServerEnv(trackingIdEnvByPageType[pageType])?.trim()
  return configured || AMAZON_ASSOCIATES_TAG
}

function getAffiliateRedirectsEnabledEnv(): string | undefined {
  return getServerEnv('AFFILIATE_REDIRECTS_ENABLED')
}

function getServerEnv(name: string): string | undefined {
  if (typeof process !== 'undefined') {
    return process.env[name]
  }

  return undefined
}
