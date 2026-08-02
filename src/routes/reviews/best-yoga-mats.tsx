import type { ReactNode } from 'react'
import type { MatPick } from '#/features/reviews/data'
import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Leaf,
  Minus,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { AffiliateDisclosure } from '#/components/site/AffiliateDisclosure'
import { AffiliateButton } from '#/components/affiliate/AffiliateButton'
import { ArticleNewsletterBand } from '#/components/site/article-newsletter-band'
import {
  EvidenceLabels,
  ResearchStatus,
  UpdateHistory,
  qualitativeScore,
} from '#/components/editorial/TrustBlocks'
import { MAT_PICKS, SCORING_RUBRIC, priceTier } from '#/features/reviews/data'
import {
  BUYING_GUIDE,
  PICK_DETAILS,
  REVIEW_FAQS,
} from '#/features/reviews/content'

export const Route = createFileRoute('/reviews/best-yoga-mats')({
  head: () => ({
    meta: [
      { title: 'Best Yoga Mats for Every Practice (2026) | The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Seven yoga mats compared by grip, cushion, durability and materials—with clear use cases, limitations and no invented product testing.',
      },
      {
        property: 'og:title',
        content: 'Best Yoga Mats for Every Practice (2026)',
      },
      {
        property: 'og:description',
        content:
          'Seven yoga mats compared by use case, material and meaningful trade-offs—research-led and honestly presented.',
      },
      {
        property: 'og:url',
        content: 'https://www.theyogasensei.com/reviews/best-yoga-mats',
      },
      { property: 'og:type', content: 'article' },
      {
        property: 'og:image',
        content:
          'https://www.theyogasensei.com/images/guides/best-yoga-mats-2026/hero.webp',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.theyogasensei.com/reviews/best-yoga-mats',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'The 7 Best Yoga Mats for Every Practice',
          description:
            'A research-led shortlist organized by use case, material and practical trade-offs.',
          mainEntityOfPage:
            'https://www.theyogasensei.com/reviews/best-yoga-mats',
          author: {
            '@type': 'Person',
            name: 'Marvin Smit',
            url: 'https://www.theyogasensei.com/authors/marvin',
          },
          publisher: {
            '@type': 'Organization',
            name: 'The Yoga Sensei',
            url: 'https://www.theyogasensei.com',
          },
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Best yoga mats by use case',
          numberOfItems: MAT_PICKS.length,
          itemListElement: MAT_PICKS.map((pick) => ({
            '@type': 'ListItem',
            position: pick.rank,
            name: pick.name,
            url: pick.detailPath
              ? `https://www.theyogasensei.com${pick.detailPath}`
              : `https://www.theyogasensei.com/reviews/best-yoga-mats#pick-${pick.rank}`,
          })),
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.theyogasensei.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Best gear',
              item: 'https://www.theyogasensei.com/best',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Best yoga mats',
            },
          ],
        }),
      },
    ],
  }),
  component: ReviewsOverviewPage,
})

const STATS = [
  { icon: Sparkles, label: '7 mats compared', sub: 'Research-led shortlist' },
  {
    icon: BadgeCheck,
    label: 'Honest & independent',
    sub: 'No sponsorship bias',
  },
  { icon: Leaf, label: 'Real-world lens', sub: 'How they practise' },
  { icon: RefreshCw, label: 'Updated 2026', sub: 'Latest picks' },
]

const IN_THIS_GUIDE = [
  { href: '#top-picks', label: 'Our Top Picks' },
  { href: '#compare', label: 'Comparison Table' },
  { href: '#reviews', label: 'The Reviews' },
  { href: '#how-we-score', label: 'Methodology' },
  { href: '#buying-guide', label: 'Buying Guide' },
  { href: '#faqs', label: 'FAQs' },
]

const RELATED_GUIDES = [
  {
    slug: 'how-to-choose-a-yoga-mat',
    label: 'How to choose a yoga mat',
    note: 'The full decision framework',
  },
  {
    slug: 'best-yoga-mat-for-hot-yoga',
    label: 'Best mats for hot yoga',
    note: 'Solve wet grip first',
  },
  {
    slug: 'eco-friendly-yoga-mat',
    label: 'Eco-friendly yoga mats',
    note: 'Natural materials, honestly',
  },
  {
    slug: 'how-thick-should-a-yoga-mat-be',
    label: 'How thick should a mat be?',
    note: '4 vs 5 vs 6 mm',
  },
  {
    slug: 'best-yoga-mat-for-bad-knees',
    label: 'Best mats for bad knees',
    note: 'Cushion vs stability',
  },
  {
    slug: 'how-to-clean-a-yoga-mat',
    label: 'How to clean a yoga mat',
    note: 'Material-by-material care',
  },
]

const ACCESSORIES = [
  {
    slug: 'best-yoga-blocks',
    label: 'Yoga blocks',
    note: 'Height & support for folds and balance',
  },
  {
    slug: 'best-yoga-bolster',
    label: 'Yoga bolsters',
    note: 'Firm support for restorative practice',
  },
  {
    slug: 'best-yoga-mat-bag',
    label: 'Mat bags & carriers',
    note: 'Carry it to class without the under-arm shuffle',
  },
]

// Single-product deep-dives. Surfaced here so every full review is reachable
// from the roundup hub — not just the three picks that link out inline.
const FULL_REVIEWS = [
  {
    to: '/reviews/manduka-pro',
    label: 'Manduka PRO',
    note: 'The buy-it-for-life benchmark',
  },
  { to: '/reviews/jade', label: 'Jade Harmony', note: 'Grippy natural rubber' },
  {
    to: '/reviews/gaiam',
    label: 'Gaiam Premium',
    note: 'Best budget beginner mat',
  },
  {
    to: '/reviews/lululemon',
    label: 'Lululemon The Mat',
    note: 'The grip that tops the lists',
  },
  {
    to: '/reviews/retrospec',
    label: 'Retrospec Solana',
    note: 'Thick foam for sore knees',
  },
  {
    to: '/reviews/liforme',
    label: 'Liforme Classic',
    note: 'Grip plus an alignment guide',
  },
  {
    to: '/reviews/manduka-grp-adapt',
    label: 'Manduka GRP Adapt',
    note: 'The measured grip king',
  },
  {
    to: '/reviews/alo',
    label: 'Alo Warrior Mat',
    note: 'The plush oversized home mat',
  },
] as const

type ReviewLink =
  | { to: '/reviews/manduka-pro' }
  | { to: '/reviews/jade' }
  | { to: '/reviews/gaiam' }
  | { to: '/reviews/best-yoga-mats' }

// Every mat with its own review page must appear here, or its CTA silently
// falls through to this same roundup. Add a line when a review ships.
const REVIEW_PATHS = [
  '/reviews/manduka-pro',
  '/reviews/jade',
  '/reviews/gaiam',
  '/reviews/lululemon',
  '/reviews/retrospec',
  '/reviews/liforme',
  '/reviews/manduka-grp-adapt',
  '/reviews/alo',
] as const

const reviewHref = (pick: { detailPath?: string }): ReviewLink =>
  REVIEW_PATHS.includes(pick.detailPath as (typeof REVIEW_PATHS)[number])
    ? ({ to: pick.detailPath } as ReviewLink)
    : { to: '/reviews/best-yoga-mats' }

/**
 * CTA for a pick. Mats with a dedicated review page link straight to it; mats
 * that only appear in this roundup scroll to their own entry in the detailed-
 * reviews section (#pick-N) instead of dead-ending back on the current page.
 */
function PickCta({
  pick,
  className,
  children,
}: {
  pick: MatPick
  className?: string
  children: ReactNode
}) {
  if (pick.detailPath) {
    return (
      <Link {...reviewHref(pick)} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={`#pick-${pick.rank}`} className={className}>
      {children}
    </a>
  )
}

function ReviewsOverviewPage() {
  const topPick = MAT_PICKS[0]
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="bg-[color:var(--color-surface-muted)]">
        <Container size="wide">
          <div className="grid items-stretch gap-10 py-10 md:grid-cols-12 md:py-14">
            <div className="md:col-span-6 lg:col-span-5">
              <nav className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                <Link to="/" className="hover:text-[color:var(--color-ink)]">
                  Home
                </Link>{' '}
                ·{' '}
                <span className="text-[color:var(--color-ink)]">
                  Best Yoga Mats
                </span>
              </nav>
              <div className="mt-6">
                <Eyebrow tone="default">Yoga gear reviews</Eyebrow>
              </div>
              <div className="mt-4">
                <ResearchStatus status="Shortlist researched from current sources" />
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight md:text-[52px]">
                The 7 best yoga mats
                <br />
                for every practice.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                We compared the mats that actually matter by grip, cushion,
                durability, materials and use case. Every pick includes a real
                limitation; no lab testing or hands-on experience is invented.
              </p>
              <p className="mt-5 text-sm text-[color:var(--color-ink-muted)]">
                By{' '}
                <Link
                  to="/authors/$slug"
                  params={{ slug: 'marvin' }}
                  className="font-semibold text-[color:var(--color-ink)] underline decoration-[color:var(--color-border)] underline-offset-4"
                >
                  Marvin Smit
                </Link>{' '}
                · Updated August 2, 2026
              </p>
              <div className="mt-5 max-w-lg [&>p]:mb-0">
                <AffiliateDisclosure />
              </div>
              <a
                href="#top-picks"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-olive)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--color-olive-deep)]"
              >
                See our top pick
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            </div>
            <div className="md:col-span-6 lg:col-span-7">
              <div className="h-full overflow-hidden rounded-2xl bg-white ring-1 ring-[color:var(--color-border)] shadow-[0_24px_55px_-42px_rgba(24,49,41,.65)]">
                <img
                  src="/images/guides/best-yoga-mats-2026/hero.webp"
                  alt="A rolled sage-green yoga mat in a calm, light Japanese-inspired studio"
                  width={1200}
                  height={800}
                  loading="eager"
                  className="h-full min-h-[260px] w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* stat strip */}
          <div className="grid grid-cols-2 gap-6 border-y border-[color:var(--color-border)] py-7 md:grid-cols-4">
            {STATS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--color-olive)]"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
                    {label}
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--color-ink-muted)]">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-4 py-8 md:grid-cols-2">
            <EvidenceLabels title="Why you can trust this guide" />
            <UpdateHistory
              entries={[
                {
                  date: 'August 2026',
                  note: 'Reframed ratings as qualitative assessments and rechecked the decision criteria, product specifications and disclosures.',
                },
                {
                  date: 'June 2026',
                  note: 'First published with seven use-case-based recommendations.',
                },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* ===================== IN THIS GUIDE ===================== */}
      <section className="sticky top-0 z-30 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/90 backdrop-blur">
        <Container size="wide">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
              In this guide
            </span>
            {IN_THIS_GUIDE.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[12px] text-[color:var(--color-ink-soft)] transition hover:text-[color:var(--color-accent-deep)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== OUR TOP PICKS ===================== */}
      <section
        id="top-picks"
        className="scroll-mt-16 bg-[color:var(--color-bg)] py-16 md:py-20"
      >
        <Container size="wide">
          <Eyebrow tone="default">Our top picks</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
            Seven mats, honestly ranked.
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MAT_PICKS.map((pick) => (
              <li
                key={pick.name}
                className="group flex flex-col border border-[color:var(--color-border)] bg-[color:var(--color-surface)] transition hover:border-[color:var(--color-olive)]/40"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={pick.image}
                    alt={`${pick.name} yoga mat`}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center bg-[color:var(--color-olive)] font-serif text-base text-[color:var(--color-bg)]">
                    {pick.rank}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                    {pick.badge}
                  </p>
                  <h3 className="mt-2 font-serif text-xl leading-snug">
                    {pick.name}
                  </h3>
                  <p className="mt-2 text-xs font-semibold text-[color:var(--color-olive-deep)]">
                    {qualitativeScore(pick.overall)} fit
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                    {pick.blurb}
                  </p>
                  <dl className="mt-4 space-y-2 border-t border-[color:var(--color-border)] pt-4 text-xs">
                    <div>
                      <dt className="font-semibold text-[color:var(--color-ink)]">
                        Core specs
                      </dt>
                      <dd className="mt-0.5 text-[color:var(--color-ink-muted)]">
                        {pick.material} · {pick.thickness} · {pick.weight}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-[color:var(--color-accent-deep)]">
                        Main limitation
                      </dt>
                      <dd className="mt-0.5 text-[color:var(--color-ink-muted)]">
                        {pick.mainDrawback}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <AffiliateButton
                      slug={pick.affiliateSlug}
                      productName={pick.name}
                      size="sm"
                    />
                    <PickCta
                      pick={pick}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--color-olive-deep)] underline decoration-[color:var(--color-border)] underline-offset-4"
                    >
                      {pick.detailPath ? 'Full review' : 'Full pick'}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </PickCta>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ===================== COMPARISON TABLE ===================== */}
      <section
        id="compare"
        className="scroll-mt-16 bg-[color:var(--color-surface-muted)] py-16 md:py-20"
      >
        <Container size="wide">
          <Eyebrow tone="default">Compare</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
            The shortlist, side by side.
          </h2>

          <p className="mt-4 text-sm text-[color:var(--color-ink-muted)] md:hidden">
            Scroll sideways to compare every factor.
          </p>
          <div
            className="mt-8 overflow-x-auto"
            tabIndex={0}
            aria-label="Yoga mat comparison; scroll horizontally on smaller screens"
          >
            <table className="w-full min-w-[1280px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[color:var(--color-border)] text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">
                  <th className="py-3 pr-4 font-semibold">Mat</th>
                  <th className="px-3 py-3 font-semibold">Material</th>
                  <th className="px-3 py-3 font-semibold">Thickness</th>
                  <th className="px-3 py-3 font-semibold">Weight</th>
                  <th className="px-3 py-3 font-semibold">Length</th>
                  <th className="px-3 py-3 font-semibold">Surface</th>
                  <th className="px-3 py-3 font-semibold">Latex relevance</th>
                  <th className="px-3 py-3 font-semibold">Best for</th>
                  <th className="px-3 py-3 font-semibold">Main drawback</th>
                  <th className="px-3 py-3 font-semibold">Price</th>
                  <th className="py-3 pl-3" />
                </tr>
              </thead>
              <tbody>
                {MAT_PICKS.map((pick) => (
                  <tr
                    key={pick.name}
                    className="border-b border-[color:var(--color-border)] align-middle"
                  >
                    <td className="py-4 pr-4 font-serif text-base">
                      {pick.name}
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.material}
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.thickness}
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.weight}
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.length}
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.surface}
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.latexRelevance}
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.bestFor}
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.mainDrawback}
                    </td>
                    <td className="px-3 py-4 font-medium text-[color:var(--color-ink)]">
                      {priceTier(pick.price)}
                    </td>
                    <td className="py-4 pl-3 text-right">
                      <PickCta
                        pick={pick}
                        className="inline-flex items-center gap-1.5 rounded-sm bg-[color:var(--color-olive)] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-charcoal)]"
                      >
                        View
                        <ArrowRight className="h-3 w-3" strokeWidth={2} />
                      </PickCta>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ===================== DETAILED REVIEWS ===================== */}
      <section
        id="reviews"
        className="scroll-mt-16 bg-[color:var(--color-bg)] py-16 md:py-20"
      >
        <Container size="wide">
          <Eyebrow tone="default">The reviews</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
            Every pick, in detail.
          </h2>

          <div className="mt-12 space-y-16">
            {MAT_PICKS.map((pick) => {
              const detail = PICK_DETAILS[pick.name]
              return (
                <article
                  key={pick.name}
                  id={`pick-${pick.rank}`}
                  className="grid scroll-mt-20 gap-8 border-t border-[color:var(--color-border)] pt-12 md:grid-cols-12 md:gap-10"
                >
                  {/* content */}
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center bg-[color:var(--color-olive)] font-serif text-sm text-[color:var(--color-bg)]">
                        {pick.rank}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                        {pick.badge}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-3xl leading-snug">
                      {pick.name}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                      {detail.whyPicked}
                    </p>
                    <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                          What we like
                        </p>
                        <ul className="mt-3 space-y-2">
                          {detail.pros.map((pro) => (
                            <li
                              key={pro}
                              className="flex gap-2 text-sm leading-snug text-[color:var(--color-ink-soft)]"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-olive)]"
                                strokeWidth={2}
                              />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                          Worth knowing
                        </p>
                        <ul className="mt-3 space-y-2">
                          {detail.cons.map((con) => (
                            <li
                              key={con}
                              className="flex gap-2 text-sm leading-snug text-[color:var(--color-ink-muted)]"
                            >
                              <Minus
                                className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-accent-deep)]"
                                strokeWidth={2}
                              />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <AffiliateButton
                        slug={pick.affiliateSlug}
                        productName={pick.name}
                      />
                      {pick.detailPath ? (
                        <Link
                          {...reviewHref(pick)}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--color-olive-deep)] underline decoration-[color:var(--color-border)] underline-offset-4"
                        >
                          Read the full review
                          <ArrowRight
                            className="h-3.5 w-3.5"
                            strokeWidth={1.75}
                          />
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  {/* summary card */}
                  <div className="md:col-span-5">
                    <div className="overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                      <img
                        src={pick.image}
                        alt={`${pick.name} yoga mat`}
                        width={800}
                        height={600}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                              Editorial assessment
                            </p>
                            <p className="mt-1 font-serif text-3xl leading-none">
                              {qualitativeScore(pick.overall)}
                            </p>
                          </div>
                        </div>
                        <dl className="mt-4 border-t border-[color:var(--color-border)] text-sm">
                          {[
                            ['Best for', detail.atAGlance.bestFor],
                            ['Skip if', detail.cons[0]],
                            ['Grip', detail.atAGlance.grip],
                            ['Cushion', detail.atAGlance.cushion],
                            ['Durability', detail.atAGlance.durability],
                            ['Price', priceTier(pick.price)],
                            ['Maintenance', pick.maintenance],
                            [
                              'Source status',
                              'Manufacturer specifications + independent evidence',
                            ],
                          ].map(([k, v]) => (
                            <div
                              key={k}
                              className="flex gap-4 border-b border-[color:var(--color-border)] py-2"
                            >
                              <dt className="w-24 flex-shrink-0 text-[color:var(--color-ink-muted)]">
                                {k}
                              </dt>
                              <dd className="text-[color:var(--color-ink-soft)]">
                                {v}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-4 font-serif text-base italic leading-snug text-[color:var(--color-ink)]">
                          {detail.verdict}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ===================== HOW WE SCORE ===================== */}
      <section
        id="how-we-score"
        className="scroll-mt-16 bg-[color:var(--color-bg)] py-16 md:py-20"
      >
        <Container size="wide">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <Eyebrow tone="default">Our methodology</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
                Qualitative decisions, no fake lab.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                We assess every mat across five factors that change how it feels
                in a real practice. The labels are editorial judgments built
                from material research, published specifications and clearly
                attributed independent evidence. They are not measurements from
                a controlled lab, so we do not present them as decimal scores.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                This page is a cross-referenced shortlist, not a lab-test
                report. The picks come from three layers — stable product specs,
                manufacturer documentation, and broad consensus across serious
                review publications and practitioner communities. It tells you
                what can be known from the outside: material, thickness,
                construction, care, recurring praise and recurring complaints.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                We also separate <em>best</em> from <em>most premium</em>. A mat
                can be the best beginner buy because it removes friction, even
                if it isn&rsquo;t the one a teacher keeps for ten years. So
                every pick is framed by use case first, then material, then the
                trade-off — and live prices and review counts, which change
                constantly, are kept out of evergreen copy on purpose.
              </p>
            </div>
            <div className="md:col-span-7">
              <dl className="grid gap-px overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2">
                {SCORING_RUBRIC.map((dim) => (
                  <div
                    key={dim.key}
                    className="bg-[color:var(--color-surface)] p-6"
                  >
                    <dt className="font-serif text-lg">{dim.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                      {RUBRIC_BLURB[dim.key]}
                    </dd>
                  </div>
                ))}
                <div className="bg-[color:var(--color-surface)] p-6">
                  <dt className="font-serif text-lg">Overall fit</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                    A qualitative read of the five factors, weighted toward the
                    use case the mat is recommended for.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== BUYING GUIDE ===================== */}
      <section
        id="buying-guide"
        className="scroll-mt-16 bg-[color:var(--color-surface-muted)] py-16 md:py-20"
      >
        <Container size="wide">
          <div className="max-w-2xl">
            <Eyebrow tone="default">Buying guide</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
              How to pick the right mat.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[color:var(--color-ink-soft)]">
              {BUYING_GUIDE.intro}
            </p>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {BUYING_GUIDE.points.map((pt, i) => (
              <div key={pt.title} className="flex gap-4">
                <span className="font-serif text-2xl text-[color:var(--color-olive)]/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif text-xl leading-snug">
                    {pt.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                    {pt.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== RELATED + ACCESSORIES ===================== */}
      <section className="bg-[color:var(--color-bg)] py-16 md:py-20">
        <Container size="wide">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 md:gap-12">
            <div>
              <Eyebrow tone="default">Keep reading</Eyebrow>
              <h2 className="mt-4 font-serif text-2xl leading-tight tracking-tight md:text-[28px]">
                Related guides
              </h2>
              <ul className="mt-6 divide-y divide-[color:var(--color-border)] border-t border-[color:var(--color-border)]">
                {RELATED_GUIDES.map((g) => (
                  <li key={g.slug}>
                    <Link
                      to="/guides/$slug"
                      params={{ slug: g.slug }}
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span>
                        <span className="font-serif text-lg leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                          {g.label}
                        </span>
                        <span className="mt-0.5 block text-sm text-[color:var(--color-ink-muted)]">
                          {g.note}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 flex-shrink-0 text-[color:var(--color-ink-muted)] transition group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent-deep)]"
                        strokeWidth={1.75}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow tone="default">Round out your kit</Eyebrow>
              <h2 className="mt-4 font-serif text-2xl leading-tight tracking-tight md:text-[28px]">
                Essential accessories
              </h2>
              <ul className="mt-6 divide-y divide-[color:var(--color-border)] border-t border-[color:var(--color-border)]">
                {ACCESSORIES.map((a) => (
                  <li key={a.slug}>
                    <Link
                      to="/guides/$slug"
                      params={{ slug: a.slug }}
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span>
                        <span className="font-serif text-lg leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                          {a.label}
                        </span>
                        <span className="mt-0.5 block text-sm text-[color:var(--color-ink-muted)]">
                          {a.note}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 flex-shrink-0 text-[color:var(--color-ink-muted)] transition group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent-deep)]"
                        strokeWidth={1.75}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow tone="default">Go deeper</Eyebrow>
              <h2 className="mt-4 font-serif text-2xl leading-tight tracking-tight md:text-[28px]">
                Full reviews
              </h2>
              <ul className="mt-6 divide-y divide-[color:var(--color-border)] border-t border-[color:var(--color-border)]">
                {FULL_REVIEWS.map((r) => (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span>
                        <span className="font-serif text-lg leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                          {r.label}
                        </span>
                        <span className="mt-0.5 block text-sm text-[color:var(--color-ink-muted)]">
                          {r.note}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 flex-shrink-0 text-[color:var(--color-ink-muted)] transition group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent-deep)]"
                        strokeWidth={1.75}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== FAQ ===================== */}
      <section
        id="faqs"
        className="scroll-mt-16 bg-[color:var(--color-bg)] py-16 md:py-20"
      >
        <Container size="wide">
          <Eyebrow tone="default">FAQs</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
            Questions, answered honestly.
          </h2>
          <dl className="mt-10 max-w-3xl divide-y divide-[color:var(--color-border)] border-t border-[color:var(--color-border)]">
            {REVIEW_FAQS.map((faq) => (
              <div key={faq.q} className="py-6">
                <dt className="font-serif text-xl leading-snug text-[color:var(--color-ink)]">
                  {faq.q}
                </dt>
                <dd className="mt-3 text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ===================== FINAL VERDICT ===================== */}
      <section className="bg-[color:var(--color-surface-muted)] py-16 md:py-20">
        <Container size="wide">
          <Eyebrow tone="default">The verdict</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
            What I&rsquo;d actually buy.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-ink-soft)]">
            No single mat wins for everyone — the right pick is the one that
            fits how you actually practise. Three honest shortcuts:
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { when: 'For one serious long-term mat', pick: MAT_PICKS[0] },
              { when: 'If you practise hot yoga often', pick: MAT_PICKS[1] },
              { when: 'If you’re starting from scratch', pick: MAT_PICKS[4] },
            ].map(({ when, pick }) => (
              <PickCta
                key={pick.name}
                pick={pick}
                className="group flex flex-col justify-between border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 transition hover:border-[color:var(--color-olive)]/40"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                  {when}
                </p>
                <p className="mt-4 font-serif text-2xl leading-snug transition group-hover:text-[color:var(--color-accent-deep)]">
                  {pick.name}
                </p>
                <p className="mt-3 text-sm font-semibold text-[color:var(--color-olive-deep)]">
                  {qualitativeScore(pick.overall)} fit
                </p>
              </PickCta>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== BOTTOM CTA ===================== */}
      <section className="bg-[color:var(--color-olive)] py-16 [--color-heading:var(--color-bg)] md:py-20">
        <Container size="wide">
          <Eyebrow tone="onDark">Your practice, our purpose</Eyebrow>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight tracking-tight text-[color:var(--color-bg)] md:text-[40px]">
            Start with our top pick — or read the full guide.
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              {...reviewHref(topPick)}
              className="inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-bg)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-olive)] transition hover:bg-[color:var(--color-surface)]"
            >
              Read the {topPick.name} review
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
            <Link
              to="/guides/$slug"
              params={{ slug: 'how-to-choose-a-yoga-mat' }}
              className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-bg)]/40 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:border-[color:var(--color-bg)]"
            >
              How to choose a mat
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ===================== CLOSING NEWSLETTER CAPTURE ===================== */}
      <ArticleNewsletterBand source="review:best-yoga-mats" />
    </>
  )
}

const RUBRIC_BLURB: Record<string, string> = {
  grip: 'Does it hold your hands and feet — dry, and when you sweat?',
  cushion: 'Joint comfort under knees and wrists, without going unstable.',
  durability: 'How well it survives months and years of real practice.',
  value: 'What you get for the price, not just how cheap it is.',
  eco: 'Material story — natural vs synthetic, and how it’s made.',
}
