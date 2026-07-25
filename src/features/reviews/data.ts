/**
 * Editorial review scoring for the yoga-mat roundup.
 *
 * IMPORTANT — honesty / E-E-A-T: these are OUR editorial scores, not invented
 * lab tests and not scraped Amazon ratings (we have no compliant source for
 * those). Each mat is rated 0–5 on an explicit five-part rubric, based on
 * material research, published specs and aggregated owner feedback. The
 * "How we score" section on the page explains this in plain language.
 */

export const SCORING_RUBRIC = [
  { key: 'grip', label: 'Grip' },
  { key: 'cushion', label: 'Cushion' },
  { key: 'durability', label: 'Durability' },
  { key: 'value', label: 'Value' },
  { key: 'eco', label: 'Eco' },
] as const

export type ScoreKey = (typeof SCORING_RUBRIC)[number]['key']

export type MatScores = Record<ScoreKey, number>

export interface MatPick {
  rank: number
  badge: string
  name: string
  /** Review-page slug under /guides/ if we have a dedicated review, else null. */
  reviewSlug: string | null
  /** Redesigned single-product detail route (e.g. /reviews/manduka-pro), if any. */
  detailPath?: string
  image: string
  /** Editorial overall score, 0–5, one decimal. */
  overall: number
  scores: MatScores
  blurb: string
  bestFor: string
  material: string
  thickness: string
  weight: string
  /** Rough price tier, 1–3 → $ $$ $$$. */
  price: 1 | 2 | 3
}

export const MAT_PICKS: MatPick[] = [
  {
    rank: 1,
    badge: 'Best Overall',
    name: 'Manduka PRO 6mm',
    reviewSlug: 'manduka-yoga-mat',
    detailPath: '/reviews/manduka-pro',
    image: '/images/guides/manduka-yoga-mat/hero.webp',
    overall: 4.6,
    scores: { grip: 4.0, cushion: 4.5, durability: 5.0, value: 3.5, eco: 2.5 },
    blurb:
      'Dense, near-indestructible cushioning and a lifetime-warranty story — the archetypal buy-it-for-life mat.',
    bestFor: 'All levels, serious & studio practice',
    material: 'PVC (closed-cell)',
    thickness: '6 mm',
    weight: '3.4 kg',
    price: 3,
  },
  {
    rank: 2,
    badge: 'Best for Hot Yoga',
    name: 'Manduka GRP Adapt 2.0',
    reviewSlug: null,
    image: '/images/reviews/grp.webp',
    overall: 4.4,
    scores: { grip: 4.8, cushion: 4.0, durability: 4.5, value: 3.5, eco: 2.5 },
    blurb:
      'A charcoal-infused top that grips when class gets humid — built for sweat where dry-grip mats fail.',
    bestFor: 'Hot yoga & heated vinyasa',
    material: 'PVC + charcoal',
    thickness: '5 mm',
    weight: '2.9 kg',
    price: 3,
  },
  {
    rank: 3,
    badge: 'Best for Alignment',
    name: 'Liforme Classic (Original)',
    reviewSlug: 'liforme-yoga-mat',
    detailPath: '/reviews/liforme',
    image: '/images/reviews/liforme/hero.webp',
    overall: 4.0,
    scores: { grip: 4.7, cushion: 4.0, durability: 3.0, value: 2.5, eco: 4.0 },
    blurb:
      'Etched alignment markers plus excellent wet grip — visual guidance without a teacher at your shoulder. Liforme offers no warranty and says why.',
    bestFor: 'Beginners & alignment-focused practice',
    material: 'Polyurethane + natural rubber',
    thickness: '4.2 mm',
    weight: '2.5 kg',
    price: 3,
  },
  {
    rank: 4,
    badge: 'Best Natural Rubber',
    name: 'Jade Harmony',
    reviewSlug: 'jade-yoga-mat',
    detailPath: '/reviews/jade',
    image: '/images/guides/jade-yoga-mat/hero.webp',
    overall: 4.2,
    scores: { grip: 4.5, cushion: 3.5, durability: 3.5, value: 4.0, eco: 4.5 },
    blurb:
      'Traditional natural-rubber grip that feels planted to the floor — and a tree planted with every mat.',
    bestFor: 'Grippy, grounded vinyasa',
    material: 'Natural rubber',
    thickness: '5 mm',
    weight: '2.4 kg',
    price: 2,
  },
  {
    rank: 5,
    badge: 'Best Value / Beginners',
    name: 'Gaiam Premium 6mm',
    reviewSlug: 'gaiam-yoga-mat',
    detailPath: '/reviews/gaiam',
    image: '/images/guides/gaiam-yoga-mat/hero.webp',
    overall: 3.9,
    scores: { grip: 3.0, cushion: 4.0, durability: 3.0, value: 4.8, eco: 2.5 },
    blurb:
      'Cheap, cheerful and everywhere — a low-risk first mat with real cushion while you find out if yoga sticks.',
    bestFor: 'Beginners & occasional home practice',
    material: 'PVC',
    thickness: '6 mm',
    weight: '1.6 kg',
    price: 1,
  },
  {
    rank: 6,
    badge: 'Best All-Round Cushion',
    name: 'Manduka eKO 5mm',
    reviewSlug: null,
    image: '/images/reviews/eko.webp',
    overall: 4.2,
    scores: { grip: 4.3, cushion: 4.3, durability: 4.0, value: 3.8, eco: 4.5 },
    blurb:
      'Cushion and grip in one substantial natural-rubber mat — the comfortable all-rounder for home practice.',
    bestFor: 'Home practice & general vinyasa',
    material: 'Natural rubber',
    thickness: '5 mm',
    weight: '3.0 kg',
    price: 2,
  },
  {
    rank: 7,
    badge: 'Best Travel / Lightweight',
    name: 'Manduka eKO Lite 4mm',
    reviewSlug: null,
    image: '/images/reviews/eko-lite.webp',
    overall: 4.0,
    scores: { grip: 4.2, cushion: 3.0, durability: 3.8, value: 4.0, eco: 4.5 },
    blurb:
      'Rubber feel without the heaviest carry — a packable everyday mat for commuters and small spaces.',
    bestFor: 'Travel & carrying often',
    material: 'Natural rubber',
    thickness: '4 mm',
    weight: '2.3 kg',
    price: 2,
  },
]

export const priceTier = (p: 1 | 2 | 3) => '$'.repeat(p)
