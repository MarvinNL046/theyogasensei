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
import { RatingStars } from '#/components/reviews/RatingStars'
import { RadarChart } from '#/components/reviews/RadarChart'
import {
  MAT_PICKS,
  SCORING_RUBRIC,
  priceTier,
} from '#/features/reviews/data'
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
          'Our seven best yoga mats for 2026, scored on grip, cushion, durability, value and eco — research-led, honestly compared, no invented testing.',
      },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: ReviewsOverviewPage,
})

const STATS = [
  { icon: Sparkles, label: '7 mats compared', sub: 'Research-led shortlist' },
  { icon: BadgeCheck, label: 'Honest & independent', sub: 'No sponsorship bias' },
  { icon: Leaf, label: 'Real-world lens', sub: 'How they practise' },
  { icon: RefreshCw, label: 'Updated 2026', sub: 'Latest picks' },
]

const IN_THIS_GUIDE = [
  { href: '#top-picks', label: 'Our Top Picks' },
  { href: '#compare', label: 'Comparison Table' },
  { href: '#reviews', label: 'The Reviews' },
  { href: '#how-we-score', label: 'How We Score' },
  { href: '#buying-guide', label: 'Buying Guide' },
  { href: '#faqs', label: 'FAQs' },
]

const reviewHref = (slug: string | null) =>
  slug
    ? { to: '/guides/$slug' as const, params: { slug } }
    : { to: '/guides/$slug' as const, params: { slug: 'best-yoga-mats-2026' } }

function ReviewsOverviewPage() {
  const topPick = MAT_PICKS[0]
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="bg-[color:var(--color-bg)]">
        <Container size="wide">
          <div className="grid items-stretch gap-10 py-10 md:grid-cols-12 md:py-14">
            <div className="md:col-span-6 lg:col-span-5">
              <nav className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                <Link to="/" className="hover:text-[color:var(--color-ink)]">
                  Home
                </Link>{' '}
                ·{' '}
                <Link
                  to="/guides"
                  search={{ category: 'reviews' }}
                  className="hover:text-[color:var(--color-ink)]"
                >
                  Reviews
                </Link>{' '}
                · <span className="text-[color:var(--color-ink)]">Best Yoga Mats</span>
              </nav>
              <div className="mt-6">
                <Eyebrow tone="default">Yoga gear reviews</Eyebrow>
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight md:text-[52px]">
                The 7 best yoga mats
                <br />
                for every practice.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                We compared the mats that actually matter — scored on grip,
                cushion, durability, value and eco — to find the right one for
                every type of practice. Researched and honestly ranked, never
                lab-faked.
              </p>
              <a
                href="#top-picks"
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-olive)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-charcoal)]"
              >
                See our top pick
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            </div>
            <div className="md:col-span-6 lg:col-span-7">
              <div className="h-full overflow-hidden rounded-sm ring-1 ring-[color:var(--color-border)]">
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
                  <div className="mt-2 flex items-center gap-2">
                    <RatingStars score={pick.overall} size={15} />
                    <span className="text-sm font-medium text-[color:var(--color-ink)]">
                      {pick.overall.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                    {pick.blurb}
                  </p>
                  <Link
                    {...reviewHref(pick.reviewSlug)}
                    className="mt-5 inline-flex items-center gap-2 self-start rounded-sm bg-[color:var(--color-olive)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-charcoal)]"
                  >
                    {pick.reviewSlug ? 'Read review' : 'See on the list'}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
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

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[color:var(--color-border)] text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">
                  <th className="py-3 pr-4 font-semibold">Mat</th>
                  <th className="px-3 py-3 font-semibold">Grip</th>
                  <th className="px-3 py-3 font-semibold">Cushion</th>
                  <th className="px-3 py-3 font-semibold">Durability</th>
                  <th className="px-3 py-3 font-semibold">Weight</th>
                  <th className="px-3 py-3 font-semibold">Material</th>
                  <th className="px-3 py-3 font-semibold">Best for</th>
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
                    <td className="px-3 py-4">
                      <RatingStars score={pick.scores.grip} size={12} />
                    </td>
                    <td className="px-3 py-4">
                      <RatingStars score={pick.scores.cushion} size={12} />
                    </td>
                    <td className="px-3 py-4">
                      <RatingStars score={pick.scores.durability} size={12} />
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.weight}
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.material}
                    </td>
                    <td className="px-3 py-4 text-[color:var(--color-ink-soft)]">
                      {pick.bestFor}
                    </td>
                    <td className="px-3 py-4 font-medium text-[color:var(--color-ink)]">
                      {priceTier(pick.price)}
                    </td>
                    <td className="py-4 pl-3 text-right">
                      <Link
                        {...reviewHref(pick.reviewSlug)}
                        className="inline-flex items-center gap-1.5 rounded-sm bg-[color:var(--color-olive)] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-charcoal)]"
                      >
                        View
                        <ArrowRight className="h-3 w-3" strokeWidth={2} />
                      </Link>
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
              if (!detail) return null
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
                    <Link
                      {...reviewHref(pick.reviewSlug)}
                      className="mt-7 inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-olive)] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-charcoal)]"
                    >
                      {pick.reviewSlug
                        ? 'Read the full review'
                        : 'See it on the list'}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </Link>
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
                              Editorial score
                            </p>
                            <p className="font-serif text-4xl leading-none">
                              {pick.overall.toFixed(1)}
                              <span className="text-xl text-[color:var(--color-ink-muted)]">
                                /5
                              </span>
                            </p>
                          </div>
                          <RatingStars score={pick.overall} size={16} />
                        </div>
                        <div className="mt-4 flex justify-center">
                          <RadarChart scores={pick.scores} size={210} />
                        </div>
                        <dl className="mt-4 border-t border-[color:var(--color-border)] text-sm">
                          {[
                            ['Best for', detail.atAGlance.bestFor],
                            ['Grip', detail.atAGlance.grip],
                            ['Cushion', detail.atAGlance.cushion],
                            ['Durability', detail.atAGlance.durability],
                            ['Price', priceTier(pick.price)],
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
              <Eyebrow tone="default">How we score</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
                Honest scores, no fake lab.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                Every mat is rated 0–5 on five things that decide whether you
                actually enjoy practising on it. The scores are editorial — built
                from material research, published specs and aggregated owner
                feedback, weighed by a long-time practitioner. We don&rsquo;t run a
                pretend lab, and we don&rsquo;t borrow star counts we can&rsquo;t
                verify. Where we&rsquo;re unsure, we say so in the full review.
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
                  <dt className="font-serif text-lg">Overall</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                    A weighted read of the five, tilted toward the things that
                    matter most for how that mat is meant to be used.
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

      {/* ===================== BOTTOM CTA ===================== */}
      <section className="bg-[color:var(--color-olive)] py-16 [--color-heading:var(--color-bg)] md:py-20">
        <Container size="wide">
          <Eyebrow tone="onDark">Your practice, our purpose</Eyebrow>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight tracking-tight text-[color:var(--color-bg)] md:text-[40px]">
            Start with our top pick — or read the full guide.
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              {...reviewHref(topPick.reviewSlug)}
              className="inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-bg)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-olive)] transition hover:bg-[color:var(--color-surface)]"
            >
              Read the {topPick.name} review
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
            <Link
              to="/guides/$slug"
              params={{ slug: 'best-yoga-mats-2026' }}
              className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-bg)]/40 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:border-[color:var(--color-bg)]"
            >
              The full buying guide
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </Container>
      </section>
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
