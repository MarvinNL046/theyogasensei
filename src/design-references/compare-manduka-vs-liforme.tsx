// ─────────────────────────────────────────────────────────────────────
// PARKED DESIGN TEMPLATE — NOT a live route.
//
// Originally lived at src/routes/compare/manduka-vs-liforme.tsx and was
// auto-routed by TanStack's file-route plugin. Moved here 2026-05-25 by
// Phase A of the launch-readiness route audit because:
//   - Zero inbound links at time of move
//   - No /compare/$slug content collection exists or is planned for launch
//   - Compare-content is not in the yoga-mats cluster plan
//
// The `createFileRoute('/compare/manduka-vs-liforme')` call below is
// commented out so this file does not register a route from outside
// src/routes/ via any code path. The component body is kept verbatim as
// a visual reference for whenever a real /compare/$slug route lands.
//
// To revive: copy this file back into src/routes/ at the desired path,
// re-enable the createFileRoute call, and wire the data to a real
// content loader instead of the hardcoded blocks below.
// ─────────────────────────────────────────────────────────────────────

// import { createFileRoute } from '@tanstack/react-router'
import {
  Award,
  Check,
  ChevronDown,
  Cloud,
  Crosshair,
  Leaf,
  Minus,
  MoveRight,
  Scale,
  ShieldCheck,
  Star,
  Tag,
  UserRound,
  Waves,
  Weight,
} from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

export const Route = createFileRoute('/compare/manduka-vs-liforme')({
  head: () => ({
    meta: [
      { title: 'Manduka vs Liforme Yoga Mats - The Yoga Sensei' },
      {
        name: 'description',
        content:
          'A calm, practical comparison of Manduka PRO and Liforme Classic yoga mats: grip, cushioning, durability, weight, materials, alignment and best use.',
      },
      { property: 'og:title', content: 'Manduka vs Liforme Yoga Mats - The Yoga Sensei' },
      { property: 'og:type', content: 'article' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/compare/manduka-vs-liforme' }],
  }),
  component: MandukaVsLiformePage,
})

const TRUST_POINTS = [
  {
    title: 'Independent & Honest',
    text: 'No brand bias, just the practical trade-offs.',
    icon: ShieldCheck,
  },
  {
    title: 'Practice-Focused',
    text: 'Compared for grip, comfort and daily use.',
    icon: Scale,
  },
  {
    title: 'Sustainable Focus',
    text: 'We look at materials, not just features.',
    icon: Leaf,
  },
] as const

const MANDUKA_REASONS = [
  'Want maximum durability',
  'Prefer more cushioning',
  'Practice intense styles',
  'Do not mind a heavier mat',
] as const

const LIFORME_REASONS = [
  'Want alignment guidance',
  'Sweat a lot in practice',
  'Value PVC-free materials',
  'Prefer a lighter mat',
] as const

const COMPARISON_ROWS = [
  {
    feature: 'Grip',
    icon: Waves,
    manduka: 'Reliable dry grip that can improve with use. Closed-cell surfaces may feel slick when sweaty.',
    liforme: 'Strong wet and dry grip with a grippy top surface designed for sweaty practice.',
    winner: 'Liforme',
    winnerTone: 'win',
  },
  {
    feature: 'Cushioning',
    icon: Cloud,
    manduka: '6mm thickness gives dense joint support and a more grounded studio feel.',
    liforme: 'Approx. 4.2mm thickness balances stability with moderate cushioning.',
    winner: 'Manduka',
    winnerTone: 'win',
  },
  {
    feature: 'Durability',
    icon: ShieldCheck,
    manduka: 'Built around a dense PRO construction and known for long service life.',
    liforme: 'Durable for regular practice, but natural rubber and PU surfaces tend to need gentler care.',
    winner: 'Manduka',
    winnerTone: 'win',
  },
  {
    feature: 'Weight',
    icon: Weight,
    manduka: 'Standard mat is 7.5 lb, so it feels stable but less travel-friendly.',
    liforme: 'Approx. 2.5 kg / 5.5 lb, easier to carry to class.',
    winner: 'Liforme',
    winnerTone: 'win',
  },
  {
    feature: 'Materials',
    icon: Leaf,
    manduka: 'OEKO-TEX certified PVC with a closed-cell surface.',
    liforme: 'PVC-free mat with natural rubber base and polyurethane top surface.',
    winner: 'Liforme',
    winnerTone: 'win',
  },
  {
    feature: 'Alignment Guide',
    icon: Crosshair,
    manduka: 'No alignment system on the standard PRO surface.',
    liforme: 'AlignForMe markers help with hand, foot and body positioning.',
    winner: 'Liforme',
    winnerTone: 'win',
  },
  {
    feature: 'Price',
    icon: Tag,
    manduka: 'Premium investment.',
    liforme: 'Similar premium range.',
    winner: 'Tie',
    winnerTone: 'tie',
  },
  {
    feature: 'Best For',
    icon: UserRound,
    manduka: 'Power yoga, Ashtanga, home studios and durability seekers.',
    liforme: 'Hot yoga, alignment-focused practice and mindful movement.',
    winner: 'It depends',
    winnerTone: 'tie',
  },
] as const

const FAQS = [
  {
    question: 'Which mat has better grip?',
    answer:
      'Liforme is the safer pick if wet grip is your priority. Manduka PRO can be excellent for dry practice, but the closed-cell surface can feel slick when sweat pools.',
  },
  {
    question: 'Are these mats good for beginners?',
    answer:
      'Yes, but for different reasons. Manduka is supportive and durable. Liforme is helpful if visual alignment markers make practice feel less confusing.',
  },
  {
    question: 'How do I clean these mats?',
    answer:
      'Use the cleaning instructions from the brand. In general, avoid soaking premium mats and avoid harsh cleaners that can damage the surface.',
  },
  {
    question: 'Which mat is more eco-friendly?',
    answer:
      'Liforme has the clearer PVC-free material story. Manduka emphasizes durability and OEKO-TEX certification for the PRO line.',
  },
] as const

const RELATED = [
  {
    label: 'Comparison',
    title: 'Cork vs Foam Yoga Blocks',
    action: 'See Comparison',
    image: '/images/brand/pick-cork-blocks.webp',
    href: '/gear',
  },
  {
    label: 'Guide',
    title: 'How to Choose the Right Yoga Mat',
    action: 'Read Guide',
    image: '/images/brand/topic-yoga-mats.webp',
    href: '/gear',
  },
  {
    label: 'Review',
    title: 'Best Yoga Mats for Hot Yoga',
    action: 'Read Review',
    image: '/images/brand/pick-studio-bolster.webp',
    href: '/reviews/best-yoga-mats',
  },
  {
    label: 'Practice',
    title: 'Morning Yoga Routine',
    action: 'View Routine',
    image: '/images/aiko-persona/aiko-meditation-back-view-sage-yoga-mat.webp',
    href: '/guides/morning-yoga-routine',
  },
] as const

function MandukaVsLiformePage() {
  return (
    <>
      <ComparisonHero />
      <section className="bg-[color:var(--color-bg)] pb-16 pt-6">
        <Container size="wide">
          <VerdictPanel />
          <ComparisonTable />
          <DecisionFaqGrid />
          <RelatedGuides />
          <NewsletterBand />
        </Container>
      </section>
    </>
  )
}

function ComparisonHero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-right-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/brand/review-hero-best-mats.webp')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, rgba(246,241,234,.98) 36%, rgba(246,241,234,.48) 61%, rgba(246,241,234,0) 100%)',
        }}
      />
      <Container size="wide" className="relative">
        <div className="grid min-h-[430px] items-center md:grid-cols-[minmax(0,460px)_1fr]">
          <div className="py-14 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-3 text-xs text-[color:var(--color-ink-muted)]">
              <a href="/" className="transition hover:text-[color:var(--color-ink)]">
                Home
              </a>
              <span aria-hidden="true">›</span>
              <a href="/reviews/best-yoga-mats" className="transition hover:text-[color:var(--color-ink)]">
                Reviews
              </a>
              <span aria-hidden="true">›</span>
              <span className="font-medium text-[color:var(--color-ink)]">Manduka vs Liforme</span>
            </nav>
            <Eyebrow tone="accent">Comparison Guide</Eyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-[color:var(--color-ink)] md:text-[64px]">
              Manduka vs Liforme
              <br />
              Yoga Mats
            </h1>
            <p className="mt-7 max-w-md text-base leading-8 text-[color:var(--color-ink-soft)]">
              Two of the most trusted yoga mat brands. Different philosophies, different feel:
              which one is right for your practice?
            </p>
            <div className="mt-9 grid max-w-lg grid-cols-3 gap-5">
              {TRUST_POINTS.map((point) => (
                <HeroPoint key={point.title} point={point} />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 right-8 hidden w-[min(58%,620px)] grid-cols-[1fr_64px_1fr] items-center gap-4 md:grid">
          <ProductChip title="Manduka" text="The performance standard" />
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] font-serif text-3xl text-[color:var(--color-ink)] shadow-sm">
            vs
          </div>
          <ProductChip title="Liforme" text="The alignment innovator" />
        </div>
      </Container>
    </section>
  )
}

function VerdictPanel() {
  return (
    <section className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 p-6 shadow-sm">
      <div className="grid gap-7 lg:grid-cols-[1.15fr_1px_0.9fr_1px_0.9fr]">
        <div className="flex gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-olive)]/35 text-[color:var(--color-bg)]">
            <Star className="h-7 w-7 fill-[color:var(--color-bg)]" strokeWidth={1.3} />
          </div>
          <div>
            <SectionLabel>Our verdict</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl text-[color:var(--color-ink)]">It depends on your practice.</h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-ink-soft)]">
              Manduka is built for durability and cushioning. Liforme is built for alignment and
              wet grip. Your choice depends on what you value most.
            </p>
          </div>
        </div>
        <Divider />
        <ChooseList title="Choose Manduka if you:" items={MANDUKA_REASONS} />
        <Divider />
        <ChooseList title="Choose Liforme if you:" items={LIFORME_REASONS} />
      </div>
    </section>
  )
}

function ComparisonTable() {
  return (
    <section className="mt-8">
      <SectionLabel>Head-to-head comparison</SectionLabel>
      <div className="mt-5 overflow-x-auto rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/56">
        <table className="w-full min-w-[940px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[color:var(--color-border)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
              <th className="w-[220px] px-8 py-4">Feature</th>
              <th className="px-8 py-4 text-center">Manduka PRO</th>
              <th className="px-8 py-4 text-center">Liforme Original</th>
              <th className="w-[180px] px-8 py-4 text-center">Winner</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.feature} className="border-b border-[color:var(--color-border)] last:border-b-0">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-5">
                    <row.icon className="h-7 w-7 text-[color:var(--color-ink)]" strokeWidth={1.25} />
                    <span className="font-serif text-[22px] text-[color:var(--color-ink)]">{row.feature}</span>
                  </div>
                </td>
                <td className="border-l border-[color:var(--color-border)] px-8 py-5 text-sm leading-6 text-[color:var(--color-ink-soft)]">
                  {row.manduka}
                </td>
                <td className="border-l border-[color:var(--color-border)] px-8 py-5 text-sm leading-6 text-[color:var(--color-ink-soft)]">
                  {row.liforme}
                </td>
                <td className="border-l border-[color:var(--color-border)] px-8 py-5 text-center">
                  <WinnerBadge label={row.winner} tone={row.winnerTone} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function DecisionFaqGrid() {
  return (
    <section className="mt-8 grid gap-7 lg:grid-cols-2">
      <div
        className="rounded-md border border-[color:var(--color-border)] bg-cover bg-right-bottom p-8"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,253,249,.96), rgba(255,253,249,.8)), url('/images/brand/review-hero-best-mats.webp')",
        }}
      >
        <SectionLabel>Which mat is right for you?</SectionLabel>
        <h2 className="mt-4 font-serif text-3xl text-[color:var(--color-ink)]">Think about your priorities.</h2>
        <p className="mt-5 max-w-sm text-sm leading-7 text-[color:var(--color-ink-soft)]">
          There is no best mat for everyone. The best mat is the one that supports your body, your
          practice and your values.
        </p>
        <a
          href="/search?q=yoga%20mat"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-olive)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)]"
        >
          Take the quiz <MoveRight className="h-4 w-4" />
        </a>
      </div>

      <div className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/62 p-7">
        <SectionLabel>Frequently asked questions</SectionLabel>
        <div className="mt-5 divide-y divide-[color:var(--color-border)]">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-[color:var(--color-ink)]">
                {faq.question}
                <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">{faq.answer}</p>
            </details>
          ))}
        </div>
        <a href="/search?q=yoga%20mat" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)]">
          View all FAQs <MoveRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

function RelatedGuides() {
  return (
    <section className="mt-10">
      <SectionLabel>You might also like</SectionLabel>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {RELATED.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="grid overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/64 transition hover:-translate-y-0.5 sm:grid-cols-[112px_minmax(0,1fr)]"
          >
            <img src={item.image} alt="" width={160} height={150} className="h-full min-h-32 w-full object-cover" />
            <div className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                {item.label}
              </p>
              <h3 className="mt-3 font-serif text-xl leading-tight text-[color:var(--color-ink)]">{item.title}</h3>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-[color:var(--color-ink)]">
                {item.action} <MoveRight className="h-4 w-4" />
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function NewsletterBand() {
  return (
    <section
      className="mt-9 overflow-hidden rounded-md bg-[color:var(--color-olive-deep)] bg-cover bg-left-center p-6 text-[color:var(--color-bg)] md:p-9"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(37,45,34,.32), rgba(37,45,34,.92) 34%, rgba(37,45,34,.98)), url('/images/brand/journal-cta-bg.webp')",
      }}
    >
      <div className="ml-auto max-w-3xl">
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">Stay inspired. Practice with intention.</h2>
        <p className="mt-3 text-sm leading-6 text-[color:var(--color-bg)]/74">
          Join The Mindful Journal for weekly insights, routines and honest recommendations.
        </p>
        <form className="mt-5 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <label htmlFor="compare-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="compare-newsletter-email"
            type="email"
            placeholder="Your email address"
            className="h-12 flex-1 rounded-md border border-[color:var(--color-bg)]/15 bg-[color:var(--color-bg)] px-4 text-sm text-[color:var(--color-ink)] outline-none"
          />
          <button
            type="submit"
            className="h-12 rounded-md border border-[color:var(--color-bg)]/50 px-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)]"
          >
            Join the journey
          </button>
        </form>
        <p className="mt-3 text-xs text-[color:var(--color-bg)]/64">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}

function HeroPoint({ point }: { point: (typeof TRUST_POINTS)[number] }) {
  const Icon = point.icon
  return (
    <div className="border-r border-[color:var(--color-border)] pr-4 text-center last:border-r-0">
      <Icon className="mx-auto h-8 w-8 text-[color:var(--color-olive)]" strokeWidth={1.35} />
      <h2 className="mt-3 text-xs font-semibold leading-5 text-[color:var(--color-ink)]">{point.title}</h2>
      <p className="mt-1 text-xs leading-5 text-[color:var(--color-ink-soft)]">{point.text}</p>
    </div>
  )
}

function ProductChip({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/88 px-8 py-5 text-center shadow-sm backdrop-blur-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">{title}</p>
      <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">{text}</p>
    </div>
  )
}

function ChooseList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <ul className="mt-4 space-y-3 text-sm text-[color:var(--color-ink-soft)]">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <Check className="h-4 w-4 text-[color:var(--color-olive)]" strokeWidth={1.8} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WinnerBadge({ label, tone }: { label: string; tone: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-ink)]">
        {label}
      </span>
      <span
        className={[
          'flex h-8 w-8 items-center justify-center rounded-full',
          tone === 'win'
            ? 'bg-[color:var(--color-olive)]/45 text-[color:var(--color-bg)]'
            : 'bg-[color:var(--color-ink-muted)]/35 text-[color:var(--color-bg)]',
        ].join(' ')}
      >
        {tone === 'win' ? <Award className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
      </span>
    </div>
  )
}

function Divider() {
  return <div className="hidden w-px bg-[color:var(--color-border)] lg:block" aria-hidden="true" />
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
      {children}
    </p>
  )
}
