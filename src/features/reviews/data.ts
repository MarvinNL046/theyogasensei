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
  affiliateSlug: string
  image: string
  /** Editorial overall score, 0–5, one decimal. */
  overall: number
  scores: MatScores
  blurb: string
  bestFor: string
  material: string
  thickness: string
  weight: string
  length: string
  surface: string
  latexRelevance: string
  mainDrawback: string
  maintenance: string
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
    affiliateSlug: 'manduka-pro-6mm',
    image: '/images/guides/manduka-yoga-mat/hero.webp',
    overall: 4.6,
    scores: { grip: 4.0, cushion: 4.5, durability: 5.0, value: 3.5, eco: 2.5 },
    blurb:
      'Dense, near-indestructible cushioning and a lifetime-warranty story — the archetypal buy-it-for-life mat.',
    bestFor: 'All levels, serious & studio practice',
    material: 'PVC (closed-cell)',
    thickness: '6 mm',
    weight: '3.4 kg',
    length: '71 in',
    surface: 'Textured, closed-cell PVC',
    latexRelevance: 'Specified latex-free',
    mainDrawback: 'Heavy, with a real break-in period',
    maintenance: 'Wipe clean; the closed-cell surface does not absorb sweat.',
    price: 3,
  },
  {
    rank: 2,
    badge: 'Best for Hot Yoga',
    name: 'Manduka GRP Adapt',
    reviewSlug: 'manduka-grp-yoga-mat',
    detailPath: '/reviews/manduka-grp-adapt',
    affiliateSlug: 'manduka-grp-adapt',
    image: '/images/reviews/grp.webp',
    overall: 4.1,
    scores: { grip: 4.8, cushion: 3.5, durability: 3.0, value: 3.0, eco: 2.5 },
    blurb:
      'The highest wet grip anyone has measured — and an open-cell surface Manduka itself says wears faster, with no lifetime guarantee behind it.',
    bestFor: 'Hot yoga & heated vinyasa',
    material: 'Polyurethane + rubber (latex)',
    thickness: '5 mm',
    weight: '2.6 kg',
    length: '71 in',
    surface: 'Absorbent polyurethane top',
    latexRelevance: 'Contains latex',
    mainDrawback: 'Higher-maintenance surface with faster documented wear',
    maintenance: 'Surface-clean gently and air-dry fully before rolling.',
    price: 3,
  },
  {
    rank: 3,
    badge: 'Best for Alignment',
    name: 'Liforme Classic (Original)',
    reviewSlug: 'liforme-yoga-mat',
    detailPath: '/reviews/liforme',
    affiliateSlug: 'liforme-original',
    image: '/images/reviews/liforme/hero.webp',
    overall: 4.0,
    scores: { grip: 4.7, cushion: 4.0, durability: 3.0, value: 2.5, eco: 4.0 },
    blurb:
      'Etched alignment markers plus excellent wet grip — visual guidance without a teacher at your shoulder. Liforme offers no warranty and says why.',
    bestFor: 'Beginners & alignment-focused practice',
    material: 'Polyurethane + natural rubber',
    thickness: '4.2 mm',
    weight: '2.5 kg',
    length: '72.8 in',
    surface: 'Absorbent polyurethane with alignment marks',
    latexRelevance: 'Natural-rubber base',
    mainDrawback: 'Premium price with no product warranty',
    maintenance: 'Use mild surface care and dry the absorbent top completely.',
    price: 3,
  },
  {
    rank: 4,
    badge: 'Best Natural Rubber',
    name: 'Jade Harmony',
    reviewSlug: 'jade-yoga-mat',
    detailPath: '/reviews/jade',
    affiliateSlug: 'jade-harmony',
    image: '/images/guides/jade-yoga-mat/hero.webp',
    overall: 4.2,
    scores: { grip: 4.5, cushion: 3.5, durability: 3.5, value: 4.0, eco: 4.5 },
    blurb:
      'Traditional natural-rubber grip that feels planted to the floor — and a tree planted with every mat.',
    bestFor: 'Grippy, grounded vinyasa',
    material: 'Natural rubber',
    thickness: '5 mm',
    weight: '2.4 kg',
    length: '68 in standard',
    surface: 'Open-cell natural rubber',
    latexRelevance: 'Latex-relevant',
    mainDrawback: 'Absorbs sweat and needs careful drying',
    maintenance: 'Clean gently, air-dry fully and keep out of direct sun.',
    price: 2,
  },
  {
    rank: 5,
    badge: 'Best Value / Beginners',
    name: 'Gaiam Premium 6mm',
    reviewSlug: 'gaiam-yoga-mat',
    detailPath: '/reviews/gaiam',
    affiliateSlug: 'gaiam-premium-6mm',
    image: '/images/guides/gaiam-yoga-mat/hero.webp',
    overall: 3.9,
    scores: { grip: 3.0, cushion: 4.0, durability: 3.0, value: 4.8, eco: 2.5 },
    blurb:
      'Cheap, cheerful and everywhere — a low-risk first mat with real cushion while you find out if yoga sticks.',
    bestFor: 'Beginners & occasional home practice',
    material: 'PVC',
    thickness: '6 mm',
    weight: '1.6 kg',
    length: '68 in',
    surface: 'Textured PVC',
    latexRelevance: 'Specified latex-free',
    mainDrawback: 'Shorter build and limited sweaty-session grip',
    maintenance: 'Wipe after use and air out the initial packaging odor.',
    price: 1,
  },
  {
    rank: 6,
    badge: 'Best All-Round Cushion',
    name: 'Manduka eKO 5mm',
    reviewSlug: null,
    affiliateSlug: 'manduka-eko-5mm',
    image: '/images/reviews/eko.webp',
    overall: 4.2,
    scores: { grip: 4.3, cushion: 4.3, durability: 4.0, value: 3.8, eco: 4.5 },
    blurb:
      'Cushion and grip in one substantial natural-rubber mat — the comfortable all-rounder for home practice.',
    bestFor: 'Home practice & general vinyasa',
    material: 'Natural rubber',
    thickness: '5 mm',
    weight: '3.0 kg',
    length: '71 in',
    surface: 'Textured natural rubber',
    latexRelevance: 'Latex-relevant',
    mainDrawback: 'Heavy and not suitable for latex sensitivity',
    maintenance: 'Clean gently, dry fully and avoid prolonged direct sun.',
    price: 2,
  },
  {
    rank: 7,
    badge: 'Best Travel / Lightweight',
    name: 'Manduka eKO Lite 4mm',
    reviewSlug: null,
    affiliateSlug: 'manduka-eko-lite',
    image: '/images/reviews/eko-lite.webp',
    overall: 4.0,
    scores: { grip: 4.2, cushion: 3.0, durability: 3.8, value: 4.0, eco: 4.5 },
    blurb:
      'Rubber feel without the heaviest carry — a packable everyday mat for commuters and small spaces.',
    bestFor: 'Travel & carrying often',
    material: 'Natural rubber',
    thickness: '4 mm',
    weight: '2.3 kg',
    length: '71 in',
    surface: 'Textured natural rubber',
    latexRelevance: 'Latex-relevant',
    mainDrawback: 'Less cushion without becoming a true travel sheet',
    maintenance: 'Wipe gently and let the rubber dry fully before storage.',
    price: 2,
  },
]

export const priceTier = (p: 1 | 2 | 3) => '$'.repeat(p)
