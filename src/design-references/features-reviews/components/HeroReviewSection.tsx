import {
  CalendarClock,
  ClipboardCheck,
  PersonStanding,
  ShieldCheck,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { Link } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { TRUST_STATS } from '#/features/reviews/data/yoga-mats'

type IconKey = (typeof TRUST_STATS)[number]['icon']

const ICONS: Record<IconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  'clipboard-check': ClipboardCheck,
  'person-standing': PersonStanding,
  'shield-check': ShieldCheck,
  'calendar-clock': CalendarClock,
}

export function HeroReviewSection() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
      {/* Full-bleed bg image — fade-left is baked into the image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: "url('/images/brand/review-hero-best-mats.webp')",
        }}
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
              <li className="text-[color:var(--color-ink)]" aria-current="page">
                Best Yoga Mats
              </li>
            </ol>
          </nav>

          <Eyebrow tone="accent">Yoga gear reviews</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--color-ink)] md:text-[52px]">
            Best Yoga Mats
            <br />
            for Every Practice
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
            A claims-safe roundup of the yoga mats most frequently recommended
            for grip, cushioning and durability — selected from publicly
            available specifications and aggregated reviews across trusted
            industry sources.
          </p>

          {/* Trust badges — sourced from shared TRUST_STATS (claims-safe) */}
          <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 sm:gap-x-2">
            {TRUST_STATS.map((stat) => {
              const Icon = ICONS[stat.icon]
              return (
                <li
                  key={stat.label}
                  className="flex flex-col items-start gap-2"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                    <Icon
                      className="h-4 w-4 text-[color:var(--color-olive-soft)]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-[color:var(--color-ink-muted)]">
                      {stat.sub}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}
