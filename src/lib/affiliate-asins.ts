/**
 * Slug -> Amazon ASIN map, derived from the /go/ registry in affiliate-links.ts.
 *
 * WHY THIS FILE EXISTS SEPARATELY. Convex functions bundle from `convex/` and
 * cannot resolve the `#/` path alias, so they cannot import affiliate-links.ts
 * (which imports `#/lib/affiliate-tracking`). This module is deliberately
 * dependency-free so both the browser bundle and the Convex runtime can import
 * it. `src/lib/affiliate-asins.test.ts` asserts it never drifts from the
 * registry — if you add a /go/ slug and forget this file, that test fails.
 *
 * Adding an ASIN here does not put anything on a page. It enrols the product
 * in the nightly offer refresh, which powers the buy-box audit and the
 * API-sourced product images. Prices are fetched but deliberately never
 * displayed — see ProductCard for why.
 */
export const AFFILIATE_ASINS: Readonly<Record<string, string>> = {
  'manduka-pro-6mm': 'B005NZ7PEQ',
  'manduka-prolite': 'B08LNRMGVW',
  'liforme-original': 'B09X66N6GX',
  'liforme-xl': 'B09X4R2FSF',
  'manduka-pro-long': 'B01F502YCQ',
  'manduka-prolite-long-wide': 'B0B31RDGZW',
  'gaiam-premium-6mm': 'B0D4MDKW3V',
  'gaiam-cork-yoga-mat': 'B079W4FX8B',
  'manduka-eko-5mm': 'B07NQJJW4W',
  'manduka-grp-adapt': 'B0D5ZMVQKD',
  'manduka-grp-adapt-travel': 'B0F641D1QJ',
  'stakt-foldable-mat': 'B0BHBYS1ML',
  'manduka-eko-superlite': 'B07WWC5B95',
  'gaiam-foldable-mat': 'B073WRCQQK',
  'prosourcefit-knee-pad': 'B079K6D3D3',
  'sukhamat-knee-pad': 'B01LRP3JA4',
  'kinesis-knee-pad': 'B06WD3HGJX',
  'gaiam-knee-pads': 'B07G1R42MS',
  'sukhamat-firm-knee-pad': 'B0BH9F1485',
  'skibeaut-grip-socks': 'B0CFD3XP7T',
  'tavi-savvy-grip-socks': 'B0GFPBRQD2',
  'tavi-kai-crew-grip-socks': 'B0C9F11YND',
  'ozaiic-grip-socks': 'B07CQM36X3',
  'ozaiic-five-toe-socks': 'B07FY79LKW',
  'tucketts-allegro-toeless': 'B088JGTHYL',
  'jade-harmony': 'B000ECBQXE',
  'manduka-eko-lite': 'B08LNP5XG5',
  'manduka-yogitoes': 'B0D5ZR3R1M',
  'manduka-equa-towel': 'B0GW137Y9V',
  'manduka-yogitoes-hand-towel': 'B09HWYRS45',
  'eunzel-grip-dot-towel': 'B0B46S9MWP',
  'heathyoga-silicone-towel': 'B07ZF9YXVZ',
  'manduka-mat-wash-lavender': 'B08Q775558',
  'manduka-yoga-block': 'B000VUAGAS',
  'gaiam-cork-yoga-block': 'B008R71FI4',
  'manduka-yoga-strap': 'B01ABWKUXI',
  'manduka-breathe-easy-carrier': 'B077BJ8315',
  'hugger-mugger-bolster': 'B000C9LZRQ',
  'gaiam-yoga-block': 'B075W63K67',
  'gaiam-yoga-bolster': 'B01ICBTPTK',
  'gaiam-mat-bag': 'B011NQZBAI',
  'retrospec-solana-half-inch': 'B0CLCB23V1',
}

/** Every tracked ASIN, deduplicated. Two slugs may point at one ASIN. */
export function allTrackedAsins(): string[] {
  return [...new Set(Object.values(AFFILIATE_ASINS))]
}

/** ASIN for a /go/ slug, or null when the slug is not an Amazon destination. */
export function asinForSlug(slug: string): string | null {
  return AFFILIATE_ASINS[slug] ?? null
}

/**
 * GetItems accepts at most 10 ids per request (Creators API best practices).
 * 42 tracked ASINs is five calls, which is why the refresh is a cron rather
 * than anything driven by page traffic.
 */
export const GET_ITEMS_BATCH_SIZE = 10

export function batchAsins(
  asins: string[],
  size: number = GET_ITEMS_BATCH_SIZE,
): string[][] {
  const batches: string[][] = []
  for (let i = 0; i < asins.length; i += size) {
    batches.push(asins.slice(i, i + size))
  }
  return batches
}
