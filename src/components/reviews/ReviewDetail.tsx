import { Link } from '@tanstack/react-router'
import { ProductImage } from '#/components/affiliate/ProductImage'
import { ArrowRight, Check, Minus } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { AffiliateButton } from '#/components/affiliate/AffiliateButton'
import { AffiliateDisclosure } from '#/components/site/AffiliateDisclosure'
import { ArticleNewsletterBand } from '#/components/site/article-newsletter-band'
import { RelatedPathways } from '#/components/site/RelatedPathways'
import { resolveRelated } from '#/lib/content/related'
import {
  DecisionSummary,
  EvidenceLabels,
  ResearchStatus,
  UpdateHistory,
  qualitativeScore,
} from '#/components/editorial/TrustBlocks'

export interface SubRating {
  label: string
  score: number
}

export interface ReviewSection {
  id: string
  title: string
  body: string
  image?: string
  /** Overrides the auto-generated "<product> — <section>" alt, which reads badly. */
  imageAlt?: string
  ratings?: SubRating[]
  rating?: number
  /**
   * Routing CTA for a section that tells the reader to buy something else.
   * Only use it where the copy genuinely sends them elsewhere — a review that
   * sprouts a button under every paragraph stops reading as a review.
   */
  cta?: { slug: string; productName: string; label?: string }
}

export interface AltMat {
  name: string
  badge: string
  overall: number
  image: string
  /** Pre-resolved href string (detail route, MDX guide, or the roundup). */
  href: string
}

export interface DetailReview {
  productName: string
  title: string
  intro: string
  byline: { author: string; date: string; readTime: string }
  /** Affiliate /go/ slug, or null when we have no compliant affiliate link. */
  affiliateSlug: string | null
  heroImage: string
  overall: number
  pros: string[]
  cons: string[]
  features: { title: string; body: string }[]
  sections: ReviewSection[]
  specs: { label: string; value: string }[]
  whoFor: string[]
  notIdealFor: string
  whoForImage: string
  atAGlance: { label: string; value: string }[]
  verdict: string
  alternatives: AltMat[]
  researchStatus?: 'Personally used' | 'Documentation-led'
  updatedAt?: string
  sources?: { title: string; url: string }[]
}

const SITE = 'https://www.theyogasensei.com'

// Reviews are editorial: the publisher is the brand. These pages deliberately
// use Article schema because documentation-led research is not a reproducible
// product test and should not generate a review-snippet star rating.
const REVIEW_ORG = {
  '@type': 'Organization',
  name: 'The Yoga Sensei',
  url: SITE,
} as const

/** "June 15, 2026" -> "2026-06-15"; falls back to the raw string if unparseable. */
function reviewDateIso(human: string): string {
  const d = new Date(human)
  if (Number.isNaN(d.getTime())) return human
  // Format from local date parts: toISOString() converts to UTC and rolls the
  // date back a day on UTC+ build machines, so schema and byline disagree.
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** Build the route head (title, description, OG, self-canonical, JSON-LD) for a detail page. */
export function buildReviewHead(detail: DetailReview, slug: string) {
  const url = `${SITE}/reviews/${slug}`
  const image = `${SITE}${detail.heroImage}`
  const desc = `An honest, research-led ${detail.productName} review — grip, cushion, durability, specs and who it’s really for. Qualitative assessments, no invented lab tests.`

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: detail.title,
    description: desc,
    image,
    author: {
      '@type': 'Person',
      name: detail.byline.author,
      url: `${SITE}/authors/marvin`,
    },
    publisher: REVIEW_ORG,
    datePublished: reviewDateIso(detail.byline.date),
    dateModified: reviewDateIso(detail.updatedAt ?? detail.byline.date),
    mainEntityOfPage: url,
    url,
  }

  // Mirrors the visible breadcrumb: Home › Reviews › product. Every crumb but
  // the last carries `item` (the last is optional per Google's spec).
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Reviews',
        item: `${SITE}/reviews/best-yoga-mats`,
      },
      { '@type': 'ListItem', position: 3, name: detail.productName },
    ],
  }

  return {
    meta: [
      { title: `${detail.title} | The Yoga Sensei` },
      { name: 'description', content: desc },
      { property: 'og:title', content: detail.title },
      { property: 'og:description', content: desc },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'article' },
      { property: 'og:image', content: image },
    ],
    links: [{ rel: 'canonical', href: url }],
    scripts: [
      { type: 'application/ld+json', children: JSON.stringify(reviewSchema) },
      {
        type: 'application/ld+json',
        children: JSON.stringify(breadcrumbSchema),
      },
    ],
  }
}

/**
 * The nav is derived from the review's own sections so it can never point at an
 * anchor the page does not render. The trailing three are rendered by this
 * component for every review, so they are always present.
 */
function sectionNav(sections: ReviewSection[]) {
  return [
    ...sections.map((s) => ({ href: `#${s.id}`, label: s.title })),
    { href: '#specs', label: 'Specs' },
    { href: '#who', label: "Who It's For" },
    { href: '#verdict', label: 'Verdict' },
  ]
}

function Paragraphs({ body }: { body: string }) {
  return (
    <>
      {body.split('\n\n').map((p, i) => (
        <p
          key={i}
          className="mt-4 text-base leading-relaxed text-[color:var(--color-ink-soft)] first:mt-0"
        >
          {p}
        </p>
      ))}
    </>
  )
}

function RatingsBox({ ratings }: { ratings: SubRating[] }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
      <dl className="space-y-3">
        {ratings.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-4"
          >
            <dt className="text-sm text-[color:var(--color-ink-soft)]">
              {r.label}
            </dt>
            <dd className="rounded-full bg-[color:var(--color-surface-muted)] px-3 py-1 text-xs font-semibold text-[color:var(--color-olive-deep)]">
              {qualitativeScore(r.score)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function displayAssessment(value: string): string {
  const score = Number(value)
  return Number.isFinite(score) && score >= 0 && score <= 5
    ? qualitativeScore(score)
    : value
}

/**
 * Single-product review layout shared by every /reviews/<mat> page. Driven
 * entirely by the `detail` prop so each product is just a data file + a thin
 * route. Alternatives use pre-resolved href strings (plain anchors) to stay
 * type-safe across detail routes, MDX guides and the roundup.
 */
export function ReviewDetail({ detail: d }: { detail: DetailReview }) {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="bg-[color:var(--color-surface-muted)]">
        <Container size="wide">
          <div className="grid items-center gap-10 py-10 md:grid-cols-12 md:py-14">
            <div className="md:col-span-6">
              <nav className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                <Link to="/" className="hover:text-[color:var(--color-ink)]">
                  Home
                </Link>{' '}
                ·{' '}
                <Link
                  to="/reviews"
                  className="hover:text-[color:var(--color-ink)]"
                >
                  Reviews
                </Link>{' '}
                ·{' '}
                <span className="text-[color:var(--color-ink)]">
                  {d.productName}
                </span>
              </nav>
              <div className="mt-6">
                <Eyebrow tone="default">Yoga mat review</Eyebrow>
              </div>
              <div className="mt-4">
                <ResearchStatus
                  status={
                    d.researchStatus === 'Personally used'
                      ? 'Personally used and independently researched'
                      : 'Based on current documentation and independent evidence'
                  }
                />
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight md:text-[52px]">
                {d.title}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                {d.intro}
              </p>
              <div className="mt-7 flex items-center gap-3">
                <img
                  src="/images/brand/avatar-yoga-sensei.webp"
                  alt={d.byline.author}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
                />
                <div className="text-sm">
                  <p className="font-medium text-[color:var(--color-ink)]">
                    By {d.byline.author}
                  </p>
                  <p className="text-[color:var(--color-ink-muted)]">
                    {d.byline.date} · {d.byline.readTime}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-[color:var(--color-border)] shadow-[0_24px_55px_-42px_rgba(24,49,41,.65)]">
                {/* Upgrades to the real Amazon listing photo when one is
                    cached. The card already sits on a white ground, so a
                    product-on-white shot lands without a seam. The section
                    images further down stay editorial — those are ours. */}
                <ProductImage
                  slug={d.affiliateSlug}
                  src={d.heroImage}
                  alt={`${d.productName} yoga mat`}
                  width={1000}
                  height={750}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== SECTION NAV ===================== */}
      <section className="sticky top-0 z-30 border-y border-[color:var(--color-border)] bg-[color:var(--color-bg)]/90 backdrop-blur">
        <Container size="wide">
          {/* Scrolls as one row on mobile — wrapping a long section list turned the
              sticky bar into a quarter of the viewport. Unchanged from md up. */}
          <div className="flex flex-nowrap items-center gap-x-5 overflow-x-auto py-3.5 md:flex-wrap md:gap-y-2 md:overflow-x-visible">
            {sectionNav(d.sections).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[12px] text-[color:var(--color-ink-soft)] transition hover:text-[color:var(--color-accent-deep)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== BODY ===================== */}
      <section className="bg-[color:var(--color-bg)] py-14 md:py-16">
        <Container size="wide">
          {/* FTC/Amazon: disclosure sits above the affiliate links in the body. */}
          <div className="max-w-2xl">
            <AffiliateDisclosure />
          </div>
          <div className="mt-8 max-w-4xl">
            <DecisionSummary
              bestFor={d.whoFor[0] ?? d.productName}
              skipIf={d.notIdealFor}
              strength={d.pros[0] ?? 'See the full evidence below.'}
              compromise={d.cons[0] ?? 'No major limitation documented.'}
            />
          </div>
          <div className="mt-6 grid max-w-4xl gap-4 md:grid-cols-2">
            <EvidenceLabels />
            <UpdateHistory
              entries={[
                {
                  date: d.updatedAt ?? d.byline.date,
                  note: 'Specifications, source links, alternatives and editorial conclusion reviewed.',
                },
              ]}
            />
          </div>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* MAIN */}
            <div className="lg:col-span-8">
              {/* Overview */}
              <div id="overview" className="scroll-mt-16">
                <h2 className="font-serif text-3xl leading-tight tracking-tight">
                  Overview
                </h2>
                <div className="mt-5">
                  <Paragraphs body={d.sections[0]?.body ?? ''} />
                </div>
                <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2">
                  {d.features.map((f) => (
                    <div
                      key={f.title}
                      className="bg-[color:var(--color-surface)] p-5"
                    >
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-olive)]">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                        {f.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rated sections: grip, comfort, durability */}
              {d.sections.slice(1).map((s) => (
                <div key={s.id} id={s.id} className="mt-14 scroll-mt-16">
                  <h2 className="font-serif text-3xl leading-tight tracking-tight">
                    {s.title}
                  </h2>
                  <div className="mt-5">
                    <Paragraphs body={s.body} />
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:items-start">
                    {s.image && (
                      <div className="overflow-hidden rounded-sm ring-1 ring-[color:var(--color-border)]">
                        <img
                          src={s.image}
                          alt={s.imageAlt ?? `${d.productName} — ${s.title}`}
                          width={800}
                          height={600}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </div>
                    )}
                    {s.ratings ? (
                      <RatingsBox ratings={s.ratings} />
                    ) : s.rating ? (
                      <div className="border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                          Editorial assessment
                        </p>
                        <p className="mt-2 font-serif text-2xl">
                          {qualitativeScore(s.rating)}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  {s.cta && (
                    <div className="mt-6">
                      <p className="mb-3 text-sm text-[color:var(--color-ink-muted)]">
                        {s.cta.label ?? 'Mentioned above:'}
                      </p>
                      <AffiliateButton
                        slug={s.cta.slug}
                        productName={s.cta.productName}
                        variant="secondary"
                        placement="review-section"
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Specs */}
              <div id="specs" className="mt-14 scroll-mt-16">
                <h2 className="font-serif text-3xl leading-tight tracking-tight">
                  Specs
                </h2>
                <dl className="mt-6 grid border-t border-[color:var(--color-border)] sm:grid-cols-2">
                  {d.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex gap-4 border-b border-[color:var(--color-border)] py-3"
                    >
                      <dt className="w-28 flex-shrink-0 text-sm text-[color:var(--color-ink-muted)]">
                        {spec.label}
                      </dt>
                      <dd className="text-sm text-[color:var(--color-ink-soft)]">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {d.sources && d.sources.length > 0 && (
                <section aria-labelledby="review-sources" className="mt-10">
                  <h2 id="review-sources" className="font-serif text-2xl">
                    Sources you can check
                  </h2>
                  <ul className="mt-4 space-y-3 text-sm">
                    {d.sources.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          className="break-words underline underline-offset-4"
                        >
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Who it's for */}
              <div id="who" className="mt-14 scroll-mt-16">
                <h2 className="font-serif text-3xl leading-tight tracking-tight">
                  Who it’s for
                </h2>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:items-start">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                      Buy it if
                    </p>
                    <ul className="mt-3 space-y-2">
                      {d.whoFor.map((w) => (
                        <li
                          key={w}
                          className="flex gap-2 text-sm leading-snug text-[color:var(--color-ink-soft)]"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-olive)]"
                            strokeWidth={2}
                          />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 border-t border-[color:var(--color-border)] pt-5 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                      <span className="font-medium text-[color:var(--color-ink)]">
                        Not ideal for:{' '}
                      </span>
                      {d.notIdealFor}
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-sm ring-1 ring-[color:var(--color-border)]">
                    <img
                      src={d.whoForImage}
                      alt={`${d.productName} with yoga props`}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-20">
                {/* Decision profile */}
                <div className="border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                    Editorial assessment
                  </p>
                  <p className="mt-2 font-serif text-4xl leading-none">
                    {qualitativeScore(d.overall)}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[color:var(--color-ink-muted)]">
                    A qualitative verdict—not a lab score.
                  </p>
                  <div className="mt-5 space-y-2 border-t border-[color:var(--color-border)] pt-5">
                    {d.pros.slice(0, 5).map((pro) => (
                      <div
                        key={pro}
                        className="flex gap-2 text-sm leading-snug text-[color:var(--color-ink-soft)]"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-olive)]"
                          strokeWidth={2}
                        />
                        <span>{pro}</span>
                      </div>
                    ))}
                    {d.cons.slice(0, 3).map((con) => (
                      <div
                        key={con}
                        className="flex gap-2 text-sm leading-snug text-[color:var(--color-ink-muted)]"
                      >
                        <Minus
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-accent-deep)]"
                          strokeWidth={2}
                        />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5">
                    {d.affiliateSlug ? (
                      <AffiliateButton
                        slug={d.affiliateSlug}
                        productName={d.productName}
                        variant="primary"
                        placement="review-sidebar"
                      />
                    ) : (
                      <Link
                        to="/reviews/best-yoga-mats"
                        className="inline-flex w-fit items-center gap-2 rounded-sm bg-[color:var(--color-olive)] px-5 py-3 text-sm font-medium text-[color:var(--color-bg)] no-underline transition hover:bg-[color:var(--color-charcoal)]"
                      >
                        See our top picks
                        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                      </Link>
                    )}
                  </div>
                  {d.affiliateSlug && (
                    <p className="mt-3 text-[11px] text-[color:var(--color-ink-muted)]">
                      We may earn a commission.
                    </p>
                  )}
                </div>

                {/* At a glance */}
                <div className="border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                    At a glance
                  </p>
                  <dl className="mt-3 text-sm">
                    {d.atAGlance.map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between gap-4 border-b border-[color:var(--color-border)] py-2 last:border-b-0"
                      >
                        <dt className="text-[color:var(--color-ink-muted)]">
                          {row.label}
                        </dt>
                        <dd className="text-right text-[color:var(--color-ink-soft)]">
                          {displayAssessment(row.value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Compare */}
                <div className="border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                    Compare to other mats
                  </p>
                  <ul className="mt-3 divide-y divide-[color:var(--color-border)]">
                    {d.alternatives.map((alt) => (
                      <li key={alt.name} className="py-3">
                        <a
                          href={alt.href}
                          className="group flex items-center justify-between gap-3"
                        >
                          <span className="text-sm text-[color:var(--color-ink-soft)] transition group-hover:text-[color:var(--color-accent-deep)]">
                            {alt.name}
                          </span>
                          <span className="flex-shrink-0 rounded-full bg-[color:var(--color-surface-muted)] px-2.5 py-1 text-[10px] font-semibold text-[color:var(--color-olive-deep)]">
                            {qualitativeScore(alt.overall)}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/reviews/best-yoga-mats"
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
                  >
                    View full comparison
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ===================== VERDICT ===================== */}
      <section
        id="verdict"
        className="scroll-mt-16 bg-[color:var(--color-olive)] py-16 [--color-heading:var(--color-bg)] md:py-20"
      >
        <Container size="wide">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <Eyebrow tone="onDark">The verdict</Eyebrow>
              <p className="mt-5 max-w-2xl font-serif text-2xl leading-snug text-[color:var(--color-bg)] md:text-[28px]">
                {d.verdict}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <div className="inline-flex flex-col items-start gap-3 md:items-end">
                <span className="font-serif text-4xl text-[color:var(--color-bg)]">
                  {qualitativeScore(d.overall)}
                </span>
                {d.affiliateSlug && (
                  <AffiliateButton
                    slug={d.affiliateSlug}
                    productName={d.productName}
                    variant="secondary"
                    placement="review-verdict"
                  />
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== RELATED ===================== */}
      <section className="bg-[color:var(--color-bg)] py-16 md:py-20">
        <Container size="wide">
          <Eyebrow tone="default">Keep comparing</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[36px]">
            Other mats worth a look.
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {d.alternatives.map((alt) => (
              <li
                key={alt.name}
                className="group flex flex-col border border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
              >
                <a href={alt.href} className="flex flex-1 flex-col">
                  <div className="overflow-hidden">
                    <img
                      src={alt.image}
                      alt={`${alt.name} yoga mat`}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                      {alt.badge}
                    </p>
                    <h3 className="mt-2 font-serif text-lg leading-snug transition group-hover:text-[color:var(--color-accent-deep)]">
                      {alt.name}
                    </h3>
                    <p className="mt-2 text-xs font-semibold text-[color:var(--color-olive-deep)]">
                      {qualitativeScore(alt.overall)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 self-start text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)] transition group-hover:text-[color:var(--color-accent)]">
                      Read review
                      <ArrowRight className="h-3 w-3" strokeWidth={2} />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-16 max-w-2xl text-center font-serif text-xl italic leading-snug text-[color:var(--color-ink-soft)] md:text-2xl">
            “The right tools support your practice. Consistency transforms it.”
          </p>
        </Container>
      </section>

      {/* ===================== READ NEXT ===================== */}
      {/* Same trio on every individual mat review (roundup + choosing + care):
          always relevant, never self-referencing. */}
      <RelatedPathways
        pageKind="review"
        items={resolveRelated([
          'best-yoga-mats-2026',
          'how-to-choose-a-yoga-mat',
          'how-to-clean-a-yoga-mat',
        ])}
      />

      {/* ===================== CLOSING NEWSLETTER CAPTURE ===================== */}
      <ArticleNewsletterBand source={`review:${d.productName}`} />
    </>
  )
}
