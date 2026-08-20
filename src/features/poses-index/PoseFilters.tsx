import { cn } from '#/lib/utils'

export const POSE_CATEGORIES = [
  'All',
  'Beginner',
  'Standing',
  'Seated',
  'Supine',
  'Balance',
  'Mobility',
  'Relaxation',
  'Props',
  'Chair variations',
  'Flows',
] as const

export type PoseCategory = (typeof POSE_CATEGORIES)[number]

export function poseCategorySlug(category: PoseCategory): string {
  return category.toLowerCase()
}

export function poseCategoryFromSlug(value?: string): PoseCategory {
  return (
    POSE_CATEGORIES.find(
      (category) => category !== 'All' && poseCategorySlug(category) === value,
    ) ?? 'All'
  )
}

export function PoseFilters({
  active,
  counts,
  onSelect,
}: {
  active: PoseCategory
  counts: Record<PoseCategory, number>
  onSelect: (category: PoseCategory) => void
}) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Filter poses by type">
      {POSE_CATEGORIES.map((category) => {
        const isActive = category === active
        const isEmpty = counts[category] === 0
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            disabled={isEmpty}
            onClick={() => onSelect(category)}
            className={cn(
              'rounded-full border px-4 py-2 text-xs font-semibold transition',
              isActive
                ? 'border-[color:var(--color-olive)] bg-[color:var(--color-olive)] text-white'
                : 'border-[color:var(--color-border)] bg-white text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-accent-soft)] disabled:cursor-not-allowed disabled:opacity-45',
            )}
          >
            {category}
            <span
              className={cn(
                'ml-2 tabular-nums',
                isActive
                  ? 'text-white/60'
                  : 'text-[color:var(--color-ink-muted)]',
              )}
            >
              {counts[category]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
