// TODO(post-launch): Migrate to MDX-backed /reviews/$slug once that route
// has its first real review content. Hand-coded launch page kept in place
// because it has inbound links from /gear, /sensei-picks, /start-here,
// and /search. Moving it would cascade-break those CRO pages.
// See content-briefs/_launch-readiness-route-audit.md §5.
import { createFileRoute } from '@tanstack/react-router'
import {
  Award,
  CheckCircle2,
  Leaf,
  Layers,
  MoveRight,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Container } from '#/components/ui/container'
import { JapaneseAccent } from '#/components/ui/japanese-accent'
import { ProductReviewHero } from '#/features/reviews/components/ProductReviewHero'
import { ReviewTocStrip } from '#/features/reviews/components/ReviewTocStrip'
import type { FeatureIcon, ProductReview } from '#/features/reviews/data/manduka-pro'
import { mandukaPro } from '#/features/reviews/data/manduka-pro'

export const Route = createFileRoute('/reviews/manduka-pro')({
  head: () => ({
    meta: [
      { title: 'Manduka PRO Yoga Mat Review (2024) — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Our grounded Manduka PRO yoga mat review: grip, comfort, durability, who it suits, and who should skip it.',
      },
      { property: 'og:type', content: 'article' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/reviews/manduka-pro' }],
  }),
  component: MandukaProPage,
})

function MandukaProPage() {
  return (
    <>
      <ProductReviewHero data={mandukaPro} />
      <ReviewTocStrip />
      <ReviewBody data={mandukaPro} />
    </>
  )
}

function ReviewBody({ data }: { data: ProductReview }) {
  return (
    <article className="bg-[color:var(--color-bg)] py-14 md:py-20">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-12">
            <OverviewSection data={data} />
            <ScoredImageSection
              id="grip-and-performance"
              number="2."
              title="Grip & Performance"
              intro={data.grip.intro}
              image={data.grip.image}
              imageAlt="Practitioner holding a strong plank on a yoga mat in warm studio light"
              scores={data.grip.scores}
            />
            <ScoredImageSection
              id="comfort-and-support"
              number="3."
              title="Comfort & Support"
              intro={data.comfort.intro}
              image={data.comfort.image}
              imageAlt="Close-up of a textured yoga mat surface"
              scores={data.comfort.scores}
            />
            <DurabilitySpecs data={data} />
            <WhoFor data={data} />
            <Alternatives data={data} />
            <QuoteMark />
            <FaqSection data={data} />
          </div>

          <ReviewSidebar data={data} />
        </div>
      </Container>
    </article>
  )
}

function OverviewSection({ data }: { data: ProductReview }) {
  return (
    <section id="overview" className="scroll-mt-36 border-b border-[color:var(--color-border)] pb-10">
      <SectionHeading number="1." title="Overview" />
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--color-ink-soft)]">
        {data.overview.paragraph}
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {data.overview.features.map((feature) => (
          <FeatureCard key={feature.label} feature={feature} />
        ))}
      </div>
    </section>
  )
}

function ScoredImageSection({
  id,
  number,
  title,
  intro,
  image,
  imageAlt,
  scores,
}: {
  id: string
  number: string
  title: string
  intro: string
  image: string
  imageAlt: string
  scores: ProductReview['grip']['scores']
}) {
  return (
    <section id={id} className="scroll-mt-36 border-b border-[color:var(--color-border)] pb-10">
      <SectionHeading number={number} title={title} />
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--color-ink-soft)]">
        {intro}
      </p>
      <div className="mt-6 grid gap-7 md:grid-cols-[minmax(0,1fr)_260px] md:items-center">
        <img
          src={image}
          alt={imageAlt}
          width={720}
          height={320}
          className="h-52 w-full rounded-md object-cover shadow-sm"
        />
        <ScoreList scores={scores} />
      </div>
    </section>
  )
}

function DurabilitySpecs({ data }: { data: ProductReview }) {
  return (
    <section className="grid scroll-mt-36 gap-8 border-b border-[color:var(--color-border)] pb-10 md:grid-cols-2">
      <div id="durability" className="scroll-mt-36">
        <SectionHeading number="4." title="Durability" />
        <p className="mt-4 text-sm leading-7 text-[color:var(--color-ink-soft)]">
          {data.durability.intro}
        </p>
        <div className="mt-5 flex items-center gap-2 text-sm text-[color:var(--color-ink)]">
          <span>Rating:</span>
          <Stars rating={data.durability.rating} />
        </div>
      </div>
      <div id="specs" className="grid scroll-mt-36 gap-6 sm:grid-cols-[140px_minmax(0,1fr)]">
        <img
          src={data.durability.image}
          alt="Rolled Manduka-style yoga mat"
          width={220}
          height={180}
          className="h-44 w-full rounded-md object-cover sm:h-full"
        />
        <div>
          <SectionHeading number="5." title="Specs" />
          <ul className="mt-4 space-y-1.5 text-sm leading-6 text-[color:var(--color-ink-soft)]">
            {data.specs.map((spec) => (
              <li key={spec.label}>
                <span className="font-medium text-[color:var(--color-ink)]">{spec.label}:</span>{' '}
                {spec.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function WhoFor({ data }: { data: ProductReview }) {
  return (
    <section id="who-its-for" className="scroll-mt-36">
      <div className="grid gap-7 sm:grid-cols-[140px_minmax(0,1fr)]">
        <img
          src={data.whoFor.image}
          alt="Rolled yoga mat ready for regular practice"
          width={180}
          height={220}
          className="h-48 w-full rounded-md object-cover sm:h-full"
        />
        <div>
          <SectionHeading number="6." title="Who It's For" />
          <p className="mt-4 text-sm text-[color:var(--color-ink-soft)]">{data.whoFor.intro}</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[color:var(--color-ink-soft)]">
            {data.whoFor.forList.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-olive)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[color:var(--color-ink-soft)]">
            <span className="font-medium text-[color:var(--color-ink)]">Not ideal for:</span>{' '}
            {data.whoFor.notIdeal}
          </p>
        </div>
      </div>
    </section>
  )
}

function Alternatives({ data }: { data: ProductReview }) {
  return (
    <section
      id="alternatives"
      className="scroll-mt-36 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/60"
    >
      <div className="grid divide-y divide-[color:var(--color-border)] md:grid-cols-4 md:divide-x md:divide-y-0">
        {data.alternatives.map((item) => (
          <a
            href={item.href}
            key={item.name}
            className="group p-4 transition hover:bg-[color:var(--color-surface)]"
          >
            <img
              src={item.image}
              alt={item.name}
              width={160}
              height={100}
              className="h-20 w-full rounded-sm object-cover"
            />
            <h2 className="mt-3 font-sans text-sm font-semibold text-[color:var(--color-ink)]">
              {item.name}
            </h2>
            <p className="mt-1 min-h-10 text-xs leading-5 text-[color:var(--color-ink-muted)]">
              {item.blurb}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <Stars rating={item.rating} small />
              <span className="text-xs tabular-nums text-[color:var(--color-ink-muted)]">
                {item.rating.toFixed(1)}
              </span>
            </div>
            <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-ink)]">
              Read Review
              <MoveRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}

function ReviewSidebar({ data }: { data: ProductReview }) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-40 lg:self-start">
      <SidePanel title="At a glance">
        <dl className="space-y-4">
          {data.atAGlance.map((row) => (
            <div key={row.label} className="grid grid-cols-[90px_minmax(0,1fr)] gap-5 text-sm">
              <dt className="text-[color:var(--color-ink-muted)]">{row.label}</dt>
              <dd className="font-medium text-[color:var(--color-ink-soft)]">
                {row.value}
                {row.stars ? <Stars rating={row.stars} className="mt-2" /> : null}
              </dd>
            </div>
          ))}
        </dl>
      </SidePanel>

      <SidePanel title="Compare to other top mats">
        <div className="space-y-4">
          {data.compare.map((row) => (
            <div key={row.name} className="grid grid-cols-[minmax(0,1fr)_92px_32px] items-center gap-2 text-sm">
              <span className={row.current ? 'font-semibold text-[color:var(--color-ink)]' : 'text-[color:var(--color-ink-soft)]'}>
                {row.name}
              </span>
              <Stars rating={row.score} small />
              <span className="text-right text-xs tabular-nums text-[color:var(--color-ink-muted)]">
                {row.score.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
        <a href="/reviews/best-yoga-mats" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)]">
          View full comparison
          <MoveRight className="h-4 w-4" />
        </a>
      </SidePanel>

      <NewsletterPanel />
      <VerdictPanel data={data} />
    </aside>
  )
}

function NewsletterPanel() {
  return (
    <section
      className="overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] bg-cover bg-right-bottom p-7"
      style={{ backgroundImage: "linear-gradient(90deg, rgba(239,231,220,.92), rgba(239,231,220,.62)), url('/images/brand/newsletter-bonsai.webp')" }}
    >
      <h2 className="font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
        Mindful insights.
        <br />
        Straight to your inbox.
      </h2>
      <p className="mt-4 max-w-[15rem] text-xs leading-5 text-[color:var(--color-ink-soft)]">
        Practical tips, honest reviews and quiet recommendations to support your practice.
      </p>
      <form className="mt-5 space-y-3">
        <label htmlFor="manduka-email" className="sr-only">
          Email address
        </label>
        <input
          id="manduka-email"
          type="email"
          placeholder="Your email address"
          className="h-11 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 text-sm outline-none transition placeholder:text-[color:var(--color-ink-muted)] focus:border-[color:var(--color-accent)]"
        />
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-md bg-[color:var(--color-olive)] px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-bg)]"
        >
          Join free
        </button>
      </form>
      <p className="mt-3 text-xs text-[color:var(--color-ink-muted)]">No spam. Unsubscribe anytime.</p>
    </section>
  )
}

function VerdictPanel({ data }: { data: ProductReview }) {
  return (
    <section
      id="verdict"
      className="scroll-mt-36 overflow-hidden rounded-md bg-[color:var(--color-olive-deep)] bg-cover bg-center p-8 text-[color:var(--color-bg)]"
      style={{ backgroundImage: "linear-gradient(90deg, rgba(37,45,34,.94), rgba(37,45,34,.70)), url('/images/brand/minimal-dark-enso-philosophy-bg.webp')" }}
    >
      <h2 className="font-serif text-3xl leading-tight">8. The Verdict</h2>
      <p className="mt-4 text-sm leading-7 text-[color:var(--color-bg)]/82">{data.verdict.paragraph}</p>
      <a
        href={data.verdict.affiliateUrl}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-bg)]/12 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)] ring-1 ring-[color:var(--color-bg)]/20 transition hover:bg-[color:var(--color-bg)]/18"
      >
        Check price on Amazon
        <MoveRight className="h-4 w-4" />
      </a>
      <p className="mt-4 text-xs text-[color:var(--color-bg)]/62">We may earn a commission.</p>
    </section>
  )
}

function FaqSection({ data }: { data: ProductReview }) {
  return (
    <section id="faqs" className="scroll-mt-36 border-t border-[color:var(--color-border)] pt-10">
      <SectionHeading number="9." title="FAQs" />
      <div className="mt-6 divide-y divide-[color:var(--color-border)] rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/55">
        {data.faqs.map((faq) => (
          <details key={faq.q} className="group p-5">
            <summary className="cursor-pointer list-none font-serif text-xl text-[color:var(--color-ink)]">
              {faq.q}
            </summary>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: ProductReview['overview']['features'][number] }) {
  const icons: Record<FeatureIcon, typeof ShieldCheck> = {
    shield: ShieldCheck,
    award: Award,
    leaf: Leaf,
    layers: Layers,
  }
  const Icon = icons[feature.icon]

  return (
    <div className="border-l border-[color:var(--color-border)] pl-6">
      <Icon className="h-8 w-8 text-[color:var(--color-olive)]" strokeWidth={1.5} />
      <h2 className="mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink)]">
        {feature.label}
      </h2>
      <p className="mt-3 text-sm leading-6 text-[color:var(--color-ink-soft)]">{feature.description}</p>
    </div>
  )
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="font-serif text-3xl leading-tight text-[color:var(--color-ink)]">
      <span>{number}</span> {title}
    </h2>
  )
}

function SidePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 p-7 shadow-sm">
      <h2 className="mb-6 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function ScoreList({ scores }: { scores: ProductReview['grip']['scores'] }) {
  return (
    <dl className="space-y-4">
      {scores.map((score) => (
        <div key={score.label} className="grid grid-cols-[minmax(0,1fr)_110px] items-center gap-4 text-sm">
          <dt className="text-[color:var(--color-ink-soft)]">{score.label}</dt>
          <dd>
            <Stars rating={score.score} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Stars({
  rating,
  small = false,
  className,
}: {
  rating: number
  small?: boolean
  className?: string
}) {
  const fullStars = Math.round(rating)
  return (
    <span className={['inline-flex items-center gap-0.5', className].filter(Boolean).join(' ')}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={[
            small ? 'h-3 w-3' : 'h-3.5 w-3.5',
            index < fullStars
              ? 'fill-[color:var(--color-ink)] text-[color:var(--color-ink)]'
              : 'text-[color:var(--color-border)]',
          ].join(' ')}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

function QuoteMark() {
  return (
    <aside className="flex flex-col items-center gap-4 py-4 text-center">
      <Sparkles className="h-7 w-7 text-[color:var(--color-olive)]" strokeWidth={1.5} />
      <blockquote className="font-serif text-2xl italic leading-snug text-[color:var(--color-ink-soft)]">
        “The right tools support your practice. Consistency transforms it.”
      </blockquote>
      <JapaneseAccent phrase="sensei" size="sm" tone="soft" />
    </aside>
  )
}
