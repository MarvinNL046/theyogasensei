import { Info } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { yogaMats } from '#/features/reviews/data/yoga-mats'
import { ProductPickCard } from './ProductPickCard'

export function TopPicksGrid() {
  return (
    <section id="top-picks" className="bg-[color:var(--color-bg)] py-12 md:py-16">
      <Container size="wide">
        <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
          Our top picks
        </p>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {yogaMats.map((mat) => (
            <li key={mat.id} className="h-full">
              <ProductPickCard mat={mat} />
            </li>
          ))}
        </ul>

        <p className="mt-8 flex items-start gap-2 text-xs text-[color:var(--color-ink-muted)]">
          <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 opacity-70" strokeWidth={1.5} aria-hidden="true" />
          <span>
            We may earn a commission when you buy through links on our site.{' '}
            <a
              href="/affiliate-disclosure"
              className="underline underline-offset-2 transition hover:text-[color:var(--color-accent-deep)]"
            >
              Learn more about our review process.
            </a>
          </span>
        </p>
      </Container>
    </section>
  )
}
