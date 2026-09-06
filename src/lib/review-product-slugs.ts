/** Exact linked product for each individual review; direct-only brands omit it. */
const REVIEW_PRODUCTS: Record<string, string> = {
  'manduka-pro': 'manduka-pro-6mm',
  'manduka-grp-adapt': 'manduka-grp-adapt',
  jade: 'jade-harmony',
  gaiam: 'gaiam-premium-6mm',
  liforme: 'liforme-original',
  retrospec: 'retrospec-solana-half-inch',
}

export function productSlugForReview(path: string): string | null {
  const slug = path.replace(/^\/reviews\//, '').split(/[?#]/)[0]
  return (slug && REVIEW_PRODUCTS[slug]) || null
}
