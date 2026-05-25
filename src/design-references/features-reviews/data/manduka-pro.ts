/**
 * Template 5 — single product review. Design-phase placeholder data.
 * Copy is transcribed from the design mock; voice pass + real MDX wiring
 * happen in the later SEO + EEAT phase.
 */

export type FeatureIcon = 'shield' | 'award' | 'leaf' | 'layers'

export interface OverviewFeature {
  icon: FeatureIcon
  label: string
  description: string
}

/** A labelled score, 0–5, halves allowed. */
export interface ScoreRow {
  label: string
  score: number
}

export interface SpecRow {
  label: string
  value: string
}

export interface GlanceRow {
  label: string
  value: string
  /** When set, render a star row under the value (used for Overall Rating). */
  stars?: number
}

export interface CompareRow {
  name: string
  score: number
  /** The product this page is about — highlighted in the compare list. */
  current?: boolean
}

export interface AltProduct {
  name: string
  image: string
  blurb: string
  rating: number
  href: string
}

export interface ReviewFaq {
  q: string
  a: string
}

export interface ProductReview {
  slug: string
  category: string
  categoryHref: string
  productName: string
  eyebrow: string
  title: { line1: string; line2: string }
  intro: string
  heroImage: string
  byline: {
    author: string
    avatar: string
    date: string
    readTime: string
  }
  rating: number
  reviewCount: number
  pros: Array<string>
  cons: Array<string>
  priceLabel: string
  affiliateUrl: string
  overview: {
    paragraph: string
    features: Array<OverviewFeature>
  }
  grip: { intro: string; image: string; scores: Array<ScoreRow> }
  comfort: { intro: string; image: string; scores: Array<ScoreRow> }
  durability: { intro: string; image: string; rating: number }
  specs: Array<SpecRow>
  whoFor: {
    image: string
    intro: string
    forList: Array<string>
    notIdeal: string
  }
  alternatives: Array<AltProduct>
  atAGlance: Array<GlanceRow>
  compare: Array<CompareRow>
  verdict: { paragraph: string; affiliateUrl: string }
  faqs: Array<ReviewFaq>
}

export const mandukaPro: ProductReview = {
  slug: 'manduka-pro',
  category: 'Yoga Mats',
  categoryHref: '/gear',
  productName: 'Manduka PRO',
  eyebrow: 'Yoga Mat Review',
  title: { line1: 'Manduka PRO', line2: 'Yoga Mat Review' },
  intro:
    'The Manduka PRO sets the standard for performance, durability and support. Here is our grounded review of where it excels, and where it asks for compromise.',
  heroImage: '/images/brand/review-hero-best-mats.webp',
  byline: {
    author: 'The Yoga Sensei',
    avatar: '/images/brand/avatar-yoga-sensei.webp',
    date: 'May 12, 2024',
    readTime: '8 min read',
  },
  rating: 4.8,
  reviewCount: 5,
  pros: [
    'Exceptional grip, even when wet',
    'Incredibly durable',
    'Excellent joint support',
    'Non-toxic, PVC-free',
    'Built to last for years',
  ],
  cons: ['Requires a break-in period', 'Heavier than most mats', 'Higher price point'],
  priceLabel: 'Check Price',
  affiliateUrl: '#',
  overview: {
    paragraph:
      'The Manduka PRO Yoga Mat is a premium, dense and incredibly durable mat designed for serious yogis who want stability, support and long-term performance. It is a studio favorite for a reason.',
    features: [
      {
        icon: 'shield',
        label: 'Lifetime guarantee',
        description: "Built to last — covered by Manduka's lifetime guarantee.",
      },
      {
        icon: 'award',
        label: 'Professional grade',
        description: 'Trusted in yoga studios worldwide for its performance.',
      },
      {
        icon: 'leaf',
        label: 'PVC-free',
        description: 'Made with non-toxic materials that are safe for you and the planet.',
      },
      {
        icon: 'layers',
        label: 'Closed-cell design',
        description: 'Keeps moisture and bacteria out for a cleaner practice.',
      },
    ],
  },
  grip: {
    intro:
      'The PRO mat has a closed-cell surface that offers outstanding grip, even during sweaty sessions. It does require a short break-in period (5–10 practices) but becomes stickier and better with time.',
    image: '/images/brand/topic-yoga-styles.webp',
    scores: [
      { label: 'Dry Grip', score: 5 },
      { label: 'Wet Grip', score: 4 },
      { label: 'Stability', score: 5 },
      { label: 'Slip Resistance', score: 4 },
    ],
  },
  comfort: {
    intro:
      'At 6mm thick, the PRO mat offers excellent cushioning and joint support without sacrificing stability. It is firmer than most mats, which many experienced yogis prefer.',
    image: '/images/brand/topic-yoga-mats.webp',
    scores: [
      { label: 'Cushioning', score: 4 },
      { label: 'Joint Support', score: 4 },
      { label: 'Stability', score: 4 },
      { label: 'Overall Comfort', score: 3.5 },
    ],
  },
  durability: {
    intro:
      'This is where the PRO truly shines. The high-density material is designed to withstand years of daily practice.',
    image: '/images/brand/pick-manduka-pro.webp',
    rating: 5,
  },
  specs: [
    { label: 'Dimensions', value: '180cm x 66cm' },
    { label: 'Thickness', value: '6mm' },
    { label: 'Weight', value: '3.4kg' },
    { label: 'Material', value: 'PVC-free thermoplastic elastomer' },
    { label: 'Made in', value: 'Germany' },
    { label: 'Colors', value: 'Midnight, Sage, Black' },
  ],
  whoFor: {
    image: '/images/brand/pick-manduka-pro.webp',
    intro: 'The Manduka PRO is perfect for:',
    forList: [
      'Practitioners who want a mat that will last for years',
      'People who practice sweaty styles (Vinyasa, Hot Yoga, Power Yoga)',
      'Anyone needing extra joint support and stability',
      'Yoga teachers and daily practitioners',
    ],
    notIdeal: 'Travelers looking for a lightweight mat.',
  },
  alternatives: [
    {
      name: 'Liforme Yoga Mat',
      image: '/images/brand/pick-manduka-pro.webp',
      blurb: 'Excellent alignment system and great grip.',
      rating: 4.6,
      href: '#',
    },
    {
      name: 'Jade Voyager Yoga Mat',
      image: '/images/brand/pick-cork-blocks.webp',
      blurb: 'Great eco-friendly option with solid performance.',
      rating: 4.5,
      href: '#',
    },
    {
      name: 'Hugger Mugger Tapas Mat',
      image: '/images/brand/pick-studio-bolster.webp',
      blurb: 'Excellent grip and cushion at a slightly lower price.',
      rating: 4.5,
      href: '#',
    },
    {
      name: 'Gaiam Essentials Mat',
      image: '/images/brand/topic-yoga-mats.webp',
      blurb: 'Budget-friendly mat for beginners.',
      rating: 4.2,
      href: '#',
    },
  ],
  atAGlance: [
    { label: 'Best For', value: 'All levels, serious practice' },
    { label: 'Grip', value: 'Excellent' },
    { label: 'Cushioning', value: 'Excellent' },
    { label: 'Durability', value: 'Exceptional' },
    { label: 'Weight', value: 'Heavier' },
    { label: 'Price', value: '$$$' },
    { label: 'Overall Rating', value: '4.8 / 5', stars: 5 },
  ],
  compare: [
    { name: 'Manduka PRO', score: 4.8, current: true },
    { name: 'Liforme Yoga Mat', score: 4.6 },
    { name: 'Jade Voyager', score: 4.5 },
    { name: 'Hugger Mugger Tapas', score: 4.5 },
  ],
  verdict: {
    paragraph:
      'The Manduka PRO Yoga Mat is an investment, but one that will serve you for many years. If you value performance, durability and joint support, it is one of the best mats you can buy.',
    affiliateUrl: '#',
  },
  faqs: [
    {
      q: 'Is the Manduka PRO worth the price?',
      a: 'For most regular practitioners, yes. It costs more than a budget mat, but it outlasts several of them — so the cost per year of use ends up lower.',
    },
    {
      q: 'How long does the break-in period take?',
      a: 'Most people find the grip improves after 5 to 10 practices. A salt scrub, or simply using it daily, speeds this up.',
    },
    {
      q: 'Is the Manduka PRO good for hot yoga?',
      a: 'The closed-cell surface keeps sweat on top of the mat rather than soaking in, so it stays hygienic — but it can get slippery when very wet. Pair it with a towel for hot classes.',
    },
    {
      q: 'Is the Manduka PRO too heavy to carry?',
      a: 'At 3.4kg it is heavier than most mats. It is fine for a fixed studio spot, less so if you commute with it every day.',
    },
    {
      q: 'Does the Manduka PRO have a warranty?',
      a: 'Yes — Manduka backs the PRO with a lifetime guarantee against the mat wearing out under normal use.',
    },
  ],
}
