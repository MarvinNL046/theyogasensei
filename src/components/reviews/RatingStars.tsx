import { Star } from 'lucide-react'
import { cn } from '#/lib/utils'

interface RatingStarsProps {
  /** Score on a 0–5 scale. Rendered with fractional fill. */
  score: number
  /** Star size in px. */
  size?: number
  className?: string
}

/**
 * Five stars with fractional fill driven by an editorial 0–5 score.
 * Filled = ink, empty = taupe. The overlay is clipped to score/5 so half and
 * quarter scores read correctly. Decorative + an accessible label.
 */
export function RatingStars({ score, size = 14, className }: RatingStarsProps) {
  const pct = Math.max(0, Math.min(100, (score / 5) * 100))
  const stars = [0, 1, 2, 3, 4]
  return (
    <span
      role="img"
      aria-label={`${score.toFixed(1)} out of 5`}
      className={cn('relative inline-flex w-fit align-middle', className)}
    >
      <span className="inline-flex text-[color:var(--color-border)]">
        {stars.map((i) => (
          <Star
            key={i}
            width={size}
            height={size}
            strokeWidth={1.25}
            className="fill-current"
          />
        ))}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 inline-flex overflow-hidden text-[color:var(--color-ink)]"
        style={{ width: `${pct}%` }}
      >
        {stars.map((i) => (
          <Star
            key={i}
            width={size}
            height={size}
            strokeWidth={1.25}
            className="flex-shrink-0 fill-current"
          />
        ))}
      </span>
    </span>
  )
}
