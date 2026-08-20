export const REVIEW_BRANDS = [
  'All brands',
  'Alo',
  'Gaiam',
  'JadeYoga',
  'Liforme',
  'Lululemon',
  'Manduka',
  'Retrospec',
] as const

export const REVIEW_MATERIALS = [
  'All materials',
  'Natural rubber',
  'NBR foam',
  'Polyurethane + rubber',
  'PVC',
] as const

export const REVIEW_USE_CASES = [
  'All use cases',
  'Alignment',
  'Beginners',
  'Durability',
  'Home practice',
  'Hot yoga',
  'Sensitive joints',
] as const

export const REVIEW_PRICE_BANDS = [
  'All price bands',
  'Budget',
  'Premium',
] as const

export const REVIEW_RESEARCH_STATUSES = [
  'All research statuses',
  'Personally used',
  'Documentation-led',
] as const

export type ReviewBrand = (typeof REVIEW_BRANDS)[number]
export type ReviewMaterial = (typeof REVIEW_MATERIALS)[number]
export type ReviewUseCase = (typeof REVIEW_USE_CASES)[number]
export type ReviewPriceBand = (typeof REVIEW_PRICE_BANDS)[number]
export type ReviewResearchStatus = (typeof REVIEW_RESEARCH_STATUSES)[number]

export interface ReviewHubEntry {
  slug: string
  title: string
  description: string
  image: string
  brand: Exclude<ReviewBrand, 'All brands'>
  material: Exclude<ReviewMaterial, 'All materials'>
  useCases: Array<Exclude<ReviewUseCase, 'All use cases'>>
  priceBand: Exclude<ReviewPriceBand, 'All price bands'>
  bestFor: string
  compromise: string
  researchStatus: Exclude<ReviewResearchStatus, 'All research statuses'>
}

export interface ReviewFiltersState {
  brand: ReviewBrand
  material: ReviewMaterial
  useCase: ReviewUseCase
  priceBand: ReviewPriceBand
  researchStatus: ReviewResearchStatus
}

export const DEFAULT_REVIEW_FILTERS: ReviewFiltersState = {
  brand: 'All brands',
  material: 'All materials',
  useCase: 'All use cases',
  priceBand: 'All price bands',
  researchStatus: 'All research statuses',
}

export const REVIEW_ENTRIES: Array<ReviewHubEntry> = [
  {
    slug: 'manduka-pro',
    title: 'Manduka PRO',
    description:
      'Dense closed-cell construction intended for a long service life.',
    image: '/images/brand/pick-manduka-pro.webp',
    brand: 'Manduka',
    material: 'PVC',
    useCases: ['Durability', 'Home practice'],
    priceBand: 'Premium',
    bestFor: 'A long-term mat that mostly stays in one place',
    compromise: 'Heavy, with a real break-in period',
    researchStatus: 'Documentation-led',
  },
  {
    slug: 'liforme',
    title: 'Liforme Original',
    description: 'A polyurethane-topped mat with a prominent alignment system.',
    image: '/images/reviews/liforme/hero.webp',
    brand: 'Liforme',
    material: 'Polyurethane + rubber',
    useCases: ['Alignment', 'Hot yoga'],
    priceBand: 'Premium',
    bestFor: 'Visible alignment cues and immediate grip',
    compromise: 'Premium price and a finite service life',
    researchStatus: 'Documentation-led',
  },
  {
    slug: 'jade',
    title: 'Jade Harmony',
    description:
      'An open-cell natural-rubber mat known for straightforward traction.',
    image: '/images/guides/jade-yoga-mat/hero.webp',
    brand: 'JadeYoga',
    material: 'Natural rubber',
    useCases: ['Home practice'],
    priceBand: 'Premium',
    bestFor: 'Natural-rubber grip without a coated top',
    compromise: 'Latex relevance and more demanding care',
    researchStatus: 'Documentation-led',
  },
  {
    slug: 'lululemon',
    title: 'Lululemon The Mat',
    description:
      'A reversible polyurethane-and-rubber mat built around versatile grip.',
    image: '/images/guides/lululemon-yoga-mat/hero.webp',
    brand: 'Lululemon',
    material: 'Polyurethane + rubber',
    useCases: ['Hot yoga', 'Home practice'],
    priceBand: 'Premium',
    bestFor: 'Mixed practices and damp-hand grip',
    compromise: 'Weight, staining and surface care',
    researchStatus: 'Personally used',
  },
  {
    slug: 'manduka-grp-adapt',
    title: 'Manduka GRP Adapt',
    description:
      'An absorbent polyurethane-and-rubber construction for sweat-heavy practice.',
    image: '/images/reviews/manduka-grp-adapt/hero.webp',
    brand: 'Manduka',
    material: 'Polyurethane + rubber',
    useCases: ['Hot yoga'],
    priceBand: 'Premium',
    bestFor: 'Heated classes and wet grip',
    compromise: 'Strict cleaning and storage requirements',
    researchStatus: 'Documentation-led',
  },
  {
    slug: 'alo',
    title: 'Alo Warrior Mat',
    description:
      'An oversized polyurethane-topped mat with a substantial home-studio feel.',
    image: '/images/reviews/alo/hero.webp',
    brand: 'Alo',
    material: 'Polyurethane + rubber',
    useCases: ['Home practice', 'Hot yoga'],
    priceBand: 'Premium',
    bestFor: 'A roomy mat that stays at home',
    compromise: 'Very heavy and maintenance-sensitive',
    researchStatus: 'Documentation-led',
  },
  {
    slug: 'gaiam',
    title: 'Gaiam Premium 6mm',
    description:
      'An entry-level PVC mat with approachable cushioning and simple construction.',
    image: '/images/guides/gaiam-yoga-mat/hero.webp',
    brand: 'Gaiam',
    material: 'PVC',
    useCases: ['Beginners'],
    priceBand: 'Budget',
    bestFor: 'Trying yoga without a premium first purchase',
    compromise: 'Less grip and durability than premium mats',
    researchStatus: 'Documentation-led',
  },
  {
    slug: 'retrospec',
    title: 'Retrospec Solana',
    description:
      'A thick closed-cell NBR mat focused on floor comfort rather than precision.',
    image: '/images/guides/retrospec-solana-yoga-mat/hero.webp',
    brand: 'Retrospec',
    material: 'NBR foam',
    useCases: ['Beginners', 'Sensitive joints'],
    priceBand: 'Budget',
    bestFor: 'Floor work and generous cushioning',
    compromise: 'Softness reduces standing stability',
    researchStatus: 'Documentation-led',
  },
]

export function filterValueSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s*\+\s*/g, '-')
    .replace(/\s+/g, '-')
}

export function valueFromSlug<T extends readonly string[]>(
  values: T,
  slug: string | undefined,
  fallback: T[number],
): T[number] {
  return values.find((value) => filterValueSlug(value) === slug) ?? fallback
}
