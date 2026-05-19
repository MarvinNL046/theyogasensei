import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarClock, ClipboardCheck, PersonStanding, ShieldCheck } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

interface TrustStat {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  text: string
}

const TRUST_STATS: Array<TrustStat> = [
  { icon: ClipboardCheck, title: '21 mats tested', text: 'Hands-on testing' },
  { icon: PersonStanding, title: 'Real practice', text: 'Used in real classes' },
  { icon: ShieldCheck, title: 'Honest reviews', text: 'No sponsorship bias' },
  { icon: CalendarClock, title: 'Updated may 2024', text: 'Latest picks' },
]

export function HeroReviewSection() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
      {/* Full-bleed bg image — fade-left is baked into the image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: "url('/images/brand/review-hero-best-mats.webp')" }}
      />

      <Container size="wide" className="relative">
        <div className="max-w-xl py-10 md:py-16">
          {/* Breadcrumbs inside hero, top of content */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center text-xs text-[color:var(--color-ink-muted)]">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-[color:var(--color-accent-deep)]"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="mx-2 opacity-50">
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
              <li aria-hidden="true" className="mx-2 opacity-50">
                ›
              </li>
              <li aria-current="page" className="text-[color:var(--color-ink)]">
                Best Yoga Mats
              </li>
            </ol>
          </nav>

          <Eyebrow tone="accent">Yoga gear reviews</Eyebrow>

          <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-[color:var(--color-ink)] md:text-[56px]">
            7 Best Yoga Mats for Every Practice
            <span className="italic text-[color:var(--color-ink-soft)]"> (2024)</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-[color:var(--color-ink-soft)]">
            We tested 21 yoga mats to find the ones that offer the best grip, comfort and
            durability for every type of yogi and every style of practice.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {TRUST_STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <li key={stat.title} className="flex flex-col items-start gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                    <Icon
                      className="h-4 w-4 text-[color:var(--color-olive-soft)]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-[color:var(--color-ink-muted)]">
                      {stat.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          <Link
            to="."
            hash="top-picks"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-olive)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
          >
            See our top pick
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>
      </Container>
    </section>
  )
}
