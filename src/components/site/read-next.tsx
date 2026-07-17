import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import type { RelatedItem } from '#/lib/content/related'

export interface ReadNextProps {
  /** Resolved items — build them with resolveRelated() from a page's related[] slugs. */
  items: RelatedItem[]
  /** Micro-label above the heading. */
  eyebrow?: string
  heading?: string
}

/**
 * End-of-article "Read next" band: 2–3 calm text cards linking to related
 * content. The single highest-leverage element against one-page sessions —
 * it gives a finished reader an obvious next step inside the site.
 *
 * Reusable across poses, reviews and any long-form route. Feed it with
 * resolveRelated() (hop-free, registry-validated links) so a stale slug can
 * never render a broken card. Renders nothing when there are no items.
 */
export function ReadNext({
  items,
  eyebrow = 'Keep reading',
  heading = 'If this helped, try one of these next.',
}: ReadNextProps) {
  if (items.length === 0) return null

  return (
    <section className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)] py-14 md:py-16">
      <Container size="wide">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)]">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-xl font-serif text-2xl leading-snug tracking-tight text-[color:var(--color-ink)] md:text-3xl">
          {heading}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex flex-col justify-between rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7 transition hover:border-[color:var(--color-accent)]/50"
            >
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                  {item.category}
                </p>
                <p className="mt-3 font-serif text-lg leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                  {item.title}
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition group-hover:text-[color:var(--color-accent)]">
                Read the guide
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
