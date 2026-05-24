export type YogaMat = {
  id: string
  rank: number
  name: string
  category: string
  image: string
  rating: number
  grip: number
  comfort: number
  durability: number
  weight: string
  material: string
  bestFor: string
  priceLevel: '$' | '$$' | '$$$'
  affiliateUrl: string
  highlights?: Array<string>
  /**
   * Short editorial blurb shown in the FeaturedReview hero. Summarise
   * publicly verifiable product traits — do NOT fabricate first-person
   * testing claims or quote nonexistent reviewers.
   */
  reviewBlurb?: string
}

export const yogaMats: Array<YogaMat> = [
  {
    id: 'manduka-pro',
    rank: 1,
    name: 'Manduka PRO Yoga Mat',
    category: 'Best Overall',
    image: '/images/brand/pick-manduka-pro.webp',
    rating: 4.8,
    grip: 5,
    comfort: 4,
    durability: 5,
    weight: '3.4 kg',
    material: 'PVC closed-cell',
    bestFor: 'All levels, hot yoga',
    priceLevel: '$$$',
    affiliateUrl: '#',
    highlights: [
      'Ultra-dense cushioning protects joints',
      'Excellent grip, even when you sweat',
      'Built to last a lifetime',
      'Closed-cell surface keeps moisture out',
      'Great for all types of yoga',
    ],
  },
  {
    id: 'liforme',
    rank: 2,
    name: 'Liforme Yoga Mat',
    category: 'Best Grip',
    image: '/images/brand/pick-manduka-pro.webp',
    rating: 4.7,
    grip: 5,
    comfort: 4,
    durability: 4,
    weight: '2.5 kg',
    material: 'Natural rubber',
    bestFor: 'Alignment, all levels',
    priceLevel: '$$$',
    affiliateUrl: '#',
  },
  {
    id: 'gaiam-essentials',
    rank: 3,
    name: 'Gaiam Essentials Yoga Mat',
    category: 'Best Value',
    image: '/images/brand/pick-manduka-pro.webp',
    rating: 4.5,
    grip: 3,
    comfort: 3,
    durability: 3,
    weight: '1.5 kg',
    material: 'PVC',
    bestFor: 'Beginners',
    priceLevel: '$',
    affiliateUrl: '#',
  },
  {
    id: 'jade-voyager',
    rank: 4,
    name: 'Jade Voyager Yoga Mat',
    category: 'Best for Travel',
    image: '/images/brand/pick-manduka-pro.webp',
    rating: 4.6,
    grip: 4,
    comfort: 3,
    durability: 4,
    weight: '1.6 kg',
    material: 'Natural rubber',
    bestFor: 'Travel, on the go',
    priceLevel: '$$',
    affiliateUrl: '#',
  },
  {
    id: 'hugger-mugger-tapas',
    rank: 5,
    name: 'Hugger Mugger Tapas Mat',
    category: 'Best Cushion',
    image: '/images/brand/pick-manduka-pro.webp',
    rating: 4.6,
    grip: 4,
    comfort: 5,
    durability: 4,
    weight: '2.8 kg',
    material: 'PVC',
    bestFor: 'Joint support',
    priceLevel: '$$',
    affiliateUrl: '#',
  },
  {
    id: 'corkmatters',
    rank: 6,
    name: 'Corkmatters Cork Yoga Mat',
    category: 'Best Eco-Friendly',
    image: '/images/brand/pick-cork-blocks.webp',
    rating: 4.5,
    grip: 4,
    comfort: 4,
    durability: 4,
    weight: '2.7 kg',
    material: 'Cork + rubber',
    bestFor: 'Eco-conscious yogis',
    priceLevel: '$$',
    affiliateUrl: '#',
  },
  {
    id: 'balancefrom-goyoga',
    rank: 7,
    name: 'BalanceFrom GoYoga Mat',
    category: 'Best Budget',
    image: '/images/brand/pick-manduka-pro.webp',
    rating: 4.3,
    grip: 3,
    comfort: 4,
    durability: 3,
    weight: '1.2 kg',
    material: 'NBR foam',
    bestFor: 'New starters',
    priceLevel: '$',
    affiliateUrl: '#',
  },
]

/**
 * Trust signals shown in the review-page hero strip. Strictly claims-safe:
 * no fabricated testing counts, no fabricated experiential claims. Edit
 * here — components (TrustStats, ReviewBadgeStrip) consume this export
 * as the single source of truth.
 */
export const TRUST_STATS = [
  {
    label: 'Independently researched',
    sub: 'No paid placements',
    icon: 'shield-check',
  },
  {
    label: 'Spec-verified',
    sub: 'Cross-checked against brand pages',
    icon: 'clipboard-check',
  },
  {
    label: 'Practice-informed',
    sub: 'Selected for real practice scenarios',
    icon: 'person-standing',
  },
  {
    label: 'Regularly updated',
    sub: 'Refreshed every quarter',
    icon: 'calendar-clock',
  },
] as const
