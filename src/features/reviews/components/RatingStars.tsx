import { Star } from 'lucide-react'
import { cn } from '#/lib/utils'

interface RatingStarsProps {
  rating: number
  className?: string
  showValue?: boolean
}

export function RatingStars({ rating, className, showValue = true }: RatingStarsProps) {
  const fullStars = Math.round(rating)

  return (
    <div className={cn('flex items-center gap-2', className)} aria-label={`Rating ${rating} out of 5`}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              'h-3.5 w-3.5',
              index < fullStars
                ? 'fill-[color:var(--color-ink)] text-[color:var(--color-ink)]'
                : 'text-[color:var(--color-border)]',
            )}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showValue ? (
        <span className="text-xs font-medium tabular-nums text-[color:var(--color-ink)]">
          {rating.toFixed(1)}
        </span>
      ) : null}
    </div>
  )
}
