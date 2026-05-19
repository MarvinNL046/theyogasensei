import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  CalendarClock,
  ClipboardCheck,
  PersonStanding,
  ShieldCheck,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

export const Route = createFileRoute('/reviews/$slug')({
  head: () => ({
    meta: [
      { title: '7 Best Yoga Mats for Every Practice (2024) — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'We tested 21 yoga mats to find the ones that offer the best grip, comfort and durability for every type of yogi and every style of practice.',
      },
      { property: 'og:type', content: 'article' },
    ],
  }),
  component: ReviewPage,
})

interface TrustBadge {
  label: string
  sub: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const TRUST_BADGES: Array<TrustBadge> = [
  { label: '21 mats tested', sub: 'Hands-on testing', icon: ClipboardCheck },
  { label: 'Real practice', sub: 'Used in real classes', icon: PersonStanding },
  { label: 'Honest reviews', sub: 'No sponsorship bias', icon: ShieldCheck },
  { label: 'Updated may 2024', sub: 'Latest picks', icon: CalendarClock },
]

const TOC_ITEMS = [
  { label: 'Our Top Picks', href: '#top-picks' },
  { label: 'Comparison Table', href: '#comparison-table' },
  { label: 'How We Test', href: '#how-we-test' },
  { label: 'Buying Guide', href: '#buying-guide' },
  { label: 'FAQs', href: '#faqs' },
] as const

function ReviewPage() {
  return (
    <>
      {/* ============================================================
          BREADCRUMBS — subtle text-only nav above hero
          ============================================================ */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[color:var(--color-bg)] pt-8 md:pt-10"
      >
        <Container size="wide">
          <ol className="flex flex-wrap items-center text-sm text-[color:var(--color-ink-muted)]">
            <li>
              <Link
                to="/"
                className="transition hover:text-[color:var(--color-accent-deep)]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="mx-3 opacity-50">
              ›
            </li>
            <li>
              <Link
                to="/gear"
                className="transition hover:text-[color:var(--color-accent-deep)]"
              >
                Reviews
              </Link>
            </li>
            <li aria-hidden="true" className="mx-3 opacity-50">
              ›
            </li>
            <li className="text-[color:var(--color-ink)]" aria-current="page">
              Best Yoga Mats
            </li>
          </ol>
        </Container>
      </nav>

      {/* ============================================================
          HERO — full-bleed mat photo with fade-left baked in,
          text + trust badges overlay left
          ============================================================ */}
      <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{ backgroundImage: "url('/images/brand/review-hero-best-mats.webp')" }}
        />
        <Container size="wide" className="relative">
          <div className="max-w-xl py-24 md:py-36">
            <Eyebrow tone="accent">Yoga gear reviews</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--color-ink)] md:text-[52px]">
              7 Best Yoga Mats
              <br />
              for Every Practice
              <span className="italic text-[color:var(--color-ink-soft)]"> (2024)</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
              We tested 21 yoga mats to find the ones that offer the best grip, comfort and
              durability for every type of yogi and every style of practice.
            </p>

            {/* Trust badges row */}
            <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 sm:gap-x-2">
              {TRUST_BADGES.map((badge) => (
                <li key={badge.label} className="flex flex-col items-start gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                    <badge.icon
                      className="h-4 w-4 text-[color:var(--color-olive-soft)]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
                      {badge.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-[color:var(--color-ink-muted)]">
                      {badge.sub}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/reviews/$slug"
              params={{ slug: 'best-yoga-mats' }}
              hash="top-picks"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-olive)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
            >
              See our top pick
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
