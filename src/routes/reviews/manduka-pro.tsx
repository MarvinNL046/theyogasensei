import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check, Minus } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { RatingStars } from '#/components/reviews/RatingStars'
import { AffiliateButton } from '#/components/affiliate/AffiliateButton'
import { MAT_PICKS } from '#/features/reviews/data'
import { MANDUKA_PRO as D } from '#/features/reviews/manduka-pro'

export const Route = createFileRoute('/reviews/manduka-pro')({
  head: () => ({
    meta: [
      { title: `${D.title} | The Yoga Sensei` },
      {
        name: 'description',
        content:
          'An honest, research-led Manduka PRO review — grip, cushion, durability, specs and who it’s really for. Editorial scores, no invented lab tests.',
      },
      { property: 'og:title', content: D.title },
      {
        property: 'og:description',
        content:
          'An honest, research-led Manduka PRO review — grip, cushion, durability, specs and who it’s really for.',
      },
      {
        property: 'og:url',
        content: 'https://www.theyogasensei.com/reviews/manduka-pro',
      },
      { property: 'og:type', content: 'article' },
      {
        property: 'og:image',
        content:
          'https://www.theyogasensei.com/images/guides/manduka-yoga-mat/hero.webp',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.theyogasensei.com/reviews/manduka-pro',
      },
    ],
  }),
  component: MandukaProReviewPage,
})

const PICK = MAT_PICKS[0]
const ALTS = MAT_PICKS.filter((p) => p.name !== D.productName).slice(0, 4)

const SECTION_NAV = [
  { href: '#overview', label: 'Overview' },
  { href: '#grip', label: 'Grip & Performance' },
  { href: '#comfort', label: 'Comfort & Support' },
  { href: '#durability', label: 'Durability' },
  { href: '#specs', label: 'Specs' },
  { href: '#who', label: "Who It's For" },
  { href: '#verdict', label: 'Verdict' },
]

const altHref = (slug: string | null) =>
  slug
    ? { to: '/guides/$slug' as const, params: { slug } }
    : { to: '/reviews/best-yoga-mats' as const }

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

function RatingsBox({
  ratings,
}: {
  ratings: { label: string; score: number }[]
}) {
  return (
    <div className="border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
      <dl className="space-y-3">
        {ratings.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4">
            <dt className="text-sm text-[color:var(--color-ink-soft)]">
              {r.label}
            </dt>
            <dd className="flex items-center gap-2">
              <RatingStars score={r.score} size={13} />
              <span className="w-6 text-right text-xs font-medium text-[color:var(--color-ink)]">
                {r.score.toFixed(1)}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function MandukaProReviewPage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="bg-[color:var(--color-bg)]">
        <Container size="wide">
          <div className="grid items-center gap-10 py-10 md:grid-cols-12 md:py-14">
            <div className="md:col-span-6">
              <nav className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                <Link to="/" className="hover:text-[color:var(--color-ink)]">
                  Home
                </Link>{' '}
                ·{' '}
                <Link
                  to="/reviews/best-yoga-mats"
                  className="hover:text-[color:var(--color-ink)]"
                >
                  Reviews
                </Link>{' '}
                ·{' '}
                <span className="text-[color:var(--color-ink)]">
                  {D.productName}
                </span>
              </nav>
              <div className="mt-6">
                <Eyebrow tone="default">Yoga mat review</Eyebrow>
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight md:text-[52px]">
                {D.title}
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                {D.intro}
              </p>
              <div className="mt-7 flex items-center gap-3">
                <img
                  src="/images/brand/avatar-yoga-sensei.webp"
                  alt={D.byline.author}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
                />
                <div className="text-sm">
                  <p className="font-medium text-[color:var(--color-ink)]">
                    By {D.byline.author}
                  </p>
                  <p className="text-[color:var(--color-ink-muted)]">
                    {D.byline.date} · {D.byline.readTime}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="overflow-hidden rounded-sm ring-1 ring-[color:var(--color-border)]">
                <img
                  src={PICK.image}
                  alt={`${D.productName} yoga mat`}
                  width={1000}
                  height={750}
                  loading="eager"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== SECTION NAV ===================== */}
      <section className="sticky top-0 z-30 border-y border-[color:var(--color-border)] bg-[color:var(--color-bg)]/90 backdrop-blur">
        <Container size="wide">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3.5">
            {SECTION_NAV.map((item) => (
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

      {/* ===================== BODY ===================== */}
      <section className="bg-[color:var(--color-bg)] py-14 md:py-16">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* MAIN */}
            <div className="lg:col-span-8">
              {/* Overview */}
              <div id="overview" className="scroll-mt-16">
                <h2 className="font-serif text-3xl leading-tight tracking-tight">
                  Overview
                </h2>
                <div className="mt-5">
                  <Paragraphs body={D.sections[0].body} />
                </div>
                <div className="mt-8 grid gap-px overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2">
                  {D.features.map((f) => (
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
              {D.sections.slice(1).map((s) => (
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
                          alt={`${D.productName} — ${s.title}`}
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
                      <div className="flex items-center gap-3 border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
                        <span className="font-serif text-3xl">
                          {s.rating.toFixed(1)}
                          <span className="text-base text-[color:var(--color-ink-muted)]">
                            /5
                          </span>
                        </span>
                        <RatingStars score={s.rating} size={16} />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {/* Specs */}
              <div id="specs" className="mt-14 scroll-mt-16">
                <h2 className="font-serif text-3xl leading-tight tracking-tight">
                  Specs
                </h2>
                <dl className="mt-6 grid border-t border-[color:var(--color-border)] sm:grid-cols-2">
                  {D.specs.map((spec) => (
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
                      {D.whoFor.map((w) => (
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
                      {D.notIdealFor}
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-sm ring-1 ring-[color:var(--color-border)]">
                    <img
                      src={D.whoForImage}
                      alt={`${D.productName} with yoga props`}
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
                {/* Rating card */}
                <div className="border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                    Our rating
                  </p>
                  <div className="mt-1 flex items-end gap-3">
                    <span className="font-serif text-5xl leading-none">
                      {PICK.overall.toFixed(1)}
                      <span className="text-2xl text-[color:var(--color-ink-muted)]">
                        /5
                      </span>
                    </span>
                  </div>
                  <div className="mt-2">
                    <RatingStars score={PICK.overall} size={18} />
                  </div>
                  <p className="mt-1 text-xs text-[color:var(--color-ink-muted)]">
                    Our editorial score
                  </p>
                  <div className="mt-5 space-y-2 border-t border-[color:var(--color-border)] pt-5">
                    {D.pros.slice(0, 5).map((pro) => (
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
                    {D.cons.slice(0, 3).map((con) => (
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
                    <AffiliateButton
                      slug={D.affiliateSlug}
                      productName={D.productName}
                      variant="primary"
                    />
                  </div>
                  <p className="mt-3 text-[11px] text-[color:var(--color-ink-muted)]">
                    We may earn a commission.
                  </p>
                </div>

                {/* At a glance */}
                <div className="border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                    At a glance
                  </p>
                  <dl className="mt-3 text-sm">
                    {D.atAGlance.map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between gap-4 border-b border-[color:var(--color-border)] py-2 last:border-b-0"
                      >
                        <dt className="text-[color:var(--color-ink-muted)]">
                          {row.label}
                        </dt>
                        <dd className="text-right text-[color:var(--color-ink-soft)]">
                          {row.value}
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
                    {ALTS.map((alt) => (
                      <li key={alt.name} className="py-3">
                        <Link
                          {...altHref(alt.reviewSlug)}
                          className="group flex items-center justify-between gap-3"
                        >
                          <span className="text-sm text-[color:var(--color-ink-soft)] transition group-hover:text-[color:var(--color-accent-deep)]">
                            {alt.name}
                          </span>
                          <span className="flex flex-shrink-0 items-center gap-1.5">
                            <RatingStars score={alt.overall} size={11} />
                            <span className="text-xs font-medium text-[color:var(--color-ink)]">
                              {alt.overall.toFixed(1)}
                            </span>
                          </span>
                        </Link>
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
                {D.verdict}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <div className="inline-flex flex-col items-start gap-3 md:items-end">
                <span className="font-serif text-5xl text-[color:var(--color-bg)]">
                  {PICK.overall.toFixed(1)}
                  <span className="text-2xl text-[color:var(--color-bg)]/60">
                    /5
                  </span>
                </span>
                <AffiliateButton
                  slug={D.affiliateSlug}
                  productName={D.productName}
                  variant="secondary"
                />
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
            {ALTS.map((alt) => (
              <li
                key={alt.name}
                className="group flex flex-col border border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
              >
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
                  <h3 className="mt-2 font-serif text-lg leading-snug">
                    {alt.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <RatingStars score={alt.overall} size={13} />
                    <span className="text-xs font-medium text-[color:var(--color-ink)]">
                      {alt.overall.toFixed(1)}
                    </span>
                  </div>
                  <Link
                    {...altHref(alt.reviewSlug)}
                    className="mt-4 inline-flex items-center gap-1.5 self-start text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
                  >
                    {alt.reviewSlug ? 'Read review' : 'See the list'}
                    <ArrowRight className="h-3 w-3" strokeWidth={2} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-16 max-w-2xl text-center font-serif text-xl italic leading-snug text-[color:var(--color-ink-soft)] md:text-2xl">
            “The right tools support your practice. Consistency transforms it.”
          </p>
        </Container>
      </section>
    </>
  )
}
