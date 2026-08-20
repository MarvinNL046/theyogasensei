import { cn } from '#/lib/utils'
import { Container } from '#/components/ui/container'
import { GUIDE_CATEGORIES } from '#/features/guides-index/data'
import type { GuideCategory } from '#/features/guides-index/data'

export interface GuideFiltersProps {
  active: GuideCategory
  counts: Record<GuideCategory, number>
  onSelect: (category: GuideCategory) => void
}

/**
 * Category filter chips. Real, working client-side filter — categories with
 * zero guides are hidden so we never show an empty tab.
 */
export function GuideFilters({ active, counts, onSelect }: GuideFiltersProps) {
  const visible = GUIDE_CATEGORIES.filter((c) => counts[c] > 0)

  return (
    <section className="border-y border-[color:var(--color-border)]/70 bg-[color:var(--color-bg)]">
      <Container size="wide" className="py-5">
        <ul
          className="flex flex-wrap items-center gap-2 md:gap-3"
          aria-label="Filter guides by category"
        >
          {visible.map((cat) => {
            const isActive = cat === active
            return (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => onSelect(cat)}
                  aria-pressed={isActive}
                  className={cn(
                    'rounded-sm px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] transition',
                    isActive
                      ? 'bg-[color:var(--color-olive)] text-[color:var(--color-bg)]'
                      : 'border border-[color:var(--color-border)] text-[color:var(--color-ink-muted)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-deep)]',
                  )}
                >
                  {cat}
                  <span
                    className={cn(
                      'ml-2 tabular-nums',
                      isActive
                        ? 'text-[color:var(--color-bg)]/60'
                        : 'text-[color:var(--color-ink-muted)]/60',
                    )}
                  >
                    {counts[cat]}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
