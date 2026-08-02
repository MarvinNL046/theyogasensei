import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import type { RelatedItem } from '#/lib/content/related'

type PageKind = 'gear' | 'practice' | 'pose' | 'review' | 'editorial'

interface RelatedPathwaysProps {
  items: ReadonlyArray<RelatedItem>
  pageKind: PageKind
}

type Pathway = 'choose' | 'compare' | 'care' | 'practice' | 'explore'

const PATHWAY_COPY: Record<Pathway, { eyebrow: string; heading: string }> = {
  choose: { eyebrow: 'Choose', heading: 'Find the option that fits.' },
  compare: { eyebrow: 'Compare', heading: 'See the practical differences.' },
  care: { eyebrow: 'Care', heading: 'Keep your gear working well.' },
  practice: { eyebrow: 'Practise', heading: 'Build on what you learned.' },
  explore: { eyebrow: 'Explore', heading: 'Continue with useful context.' },
}

const ORDER_BY_KIND: Record<PageKind, ReadonlyArray<Pathway>> = {
  review: ['choose', 'compare', 'care', 'practice', 'explore'],
  gear: ['compare', 'choose', 'care', 'practice', 'explore'],
  practice: ['practice', 'explore', 'choose', 'care', 'compare'],
  pose: ['practice', 'explore', 'choose', 'care', 'compare'],
  editorial: ['explore', 'compare', 'practice', 'choose', 'care'],
}

function pathwayFor(item: RelatedItem): Pathway {
  const category = item.category.toLowerCase()
  if (category.includes('comparison')) return 'compare'
  if (category.includes('care')) return 'care'
  if (
    category.includes('review') ||
    category.includes('buying') ||
    category.includes('gear') ||
    category.includes('prop') ||
    category.includes('accessor')
  ) {
    return 'choose'
  }
  if (
    category.includes('practice') ||
    category.includes('pose') ||
    category.includes('beginner') ||
    category.includes('chair yoga')
  ) {
    return 'practice'
  }
  return 'explore'
}

/**
 * Turns the page's curated related links into explicit next-step pathways.
 * The source page kind controls pathway order; destination intent controls the
 * label. This keeps recommendations purposeful without guessing from tags.
 */
export function RelatedPathways({ items, pageKind }: RelatedPathwaysProps) {
  const uniqueItems = Array.from(
    new Map(items.map((item) => [item.href, item] as const)).values(),
  ).slice(0, 6)
  if (uniqueItems.length === 0) return null

  const grouped = new Map<Pathway, Array<RelatedItem>>()
  for (const item of uniqueItems) {
    const pathway = pathwayFor(item)
    grouped.set(pathway, [...(grouped.get(pathway) ?? []), item])
  }
  const pathways = ORDER_BY_KIND[pageKind].filter((key) => grouped.has(key))

  return (
    <section
      aria-labelledby="related-pathways-heading"
      className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)] py-14 md:py-16"
    >
      <Container size="wide">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)]">
          Useful next steps
        </p>
        <h2
          id="related-pathways-heading"
          className="mt-3 max-w-2xl font-serif text-2xl leading-snug tracking-tight text-[color:var(--color-ink)] md:text-3xl"
        >
          Go deeper without losing the thread.
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pathways.map((pathway) => {
            const copy = PATHWAY_COPY[pathway]
            return (
              <div
                key={pathway}
                className="rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)]">
                  {copy.eyebrow}
                </p>
                <h3 className="mt-2 font-serif text-xl text-[color:var(--color-ink)]">
                  {copy.heading}
                </h3>
                <ul className="mt-5 divide-y divide-[color:var(--color-border)]/70">
                  {grouped.get(pathway)?.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="group flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <span>
                          <span className="block text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                            {item.category}
                          </span>
                          <span className="mt-1 block font-medium leading-snug text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent-deep)]">
                            {item.title}
                          </span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-accent-deep)] transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.75}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
