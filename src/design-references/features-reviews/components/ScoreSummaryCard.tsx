import type { YogaMat } from '#/features/reviews/data/yoga-mats'
import { RatingStars } from './RatingStars'

interface ScoreSummaryCardProps {
  mat: YogaMat
  totalReviews?: number
}

interface AxisScore {
  label: string
  value: number // 0-100
}

function RadarChart({ scores }: { scores: Array<AxisScore> }) {
  const size = 200
  const center = size / 2
  const radius = size / 2 - 28
  const n = scores.length

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2

  const gridLevels = [1, 2, 3, 4, 5]
  const gridPolygons = gridLevels.map((level) => {
    const r = (level / 5) * radius
    return scores
      .map((_, i) => {
        const x = center + Math.cos(angle(i)) * r
        const y = center + Math.sin(angle(i)) * r
        return `${x},${y}`
      })
      .join(' ')
  })

  const valuePoints = scores.map((s, i) => {
    const r = (s.value / 100) * radius
    const x = center + Math.cos(angle(i)) * r
    const y = center + Math.sin(angle(i)) * r
    return `${x},${y}`
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" aria-hidden="true">
      {gridPolygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="0.6"
          opacity="0.7"
        />
      ))}
      {scores.map((_, i) => {
        const x = center + Math.cos(angle(i)) * radius
        const y = center + Math.sin(angle(i)) * radius
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="var(--color-border)"
            strokeWidth="0.6"
            opacity="0.5"
          />
        )
      })}
      <polygon
        points={valuePoints.join(' ')}
        fill="var(--color-olive)"
        fillOpacity="0.2"
        stroke="var(--color-olive)"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export function ScoreSummaryCard({ mat, totalReviews = 1254 }: ScoreSummaryCardProps) {
  const ecoValue =
    mat.material.toLowerCase().includes('rubber') ||
    mat.material.toLowerCase().includes('cork')
      ? 5
      : 2
  const valueScore =
    mat.priceLevel === '$' ? 5 : mat.priceLevel === '$$' ? 4 : 3

  const scores: Array<AxisScore> = [
    { label: 'Grip', value: mat.grip * 20 },
    { label: 'Comfort', value: mat.comfort * 20 },
    { label: 'Durability', value: mat.durability * 20 },
    { label: 'Value', value: valueScore * 20 },
    { label: 'Eco-friendly', value: ecoValue * 20 - 4 },
  ]

  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm">
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-olive)]">
        Summary
      </p>

      <div className="mt-4 grid grid-cols-[0.8fr_1.2fr] items-center gap-4">
        <div>
          <div className="font-serif text-5xl leading-none text-[color:var(--color-ink)]">
            {mat.rating.toFixed(1)}
          </div>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
            Overall rating
          </p>
          <div className="mt-3">
            <RatingStars rating={mat.rating} showValue={false} />
          </div>
          <p className="mt-2 text-xs text-[color:var(--color-ink-muted)]">
            Based on {totalReviews.toLocaleString()} reviews
          </p>
        </div>
        <div className="aspect-square">
          <RadarChart scores={scores} />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {scores.map((score) => (
          <div key={score.label}>
            <div className="mb-1 flex justify-between text-xs text-[color:var(--color-ink-soft)]">
              <span>{score.label}</span>
              <span className="tabular-nums">{Math.round(score.value)}</span>
            </div>
            <div className="h-1.5 rounded-full bg-[color:var(--color-border)]">
              <div
                className="h-1.5 rounded-full bg-[color:var(--color-olive)]"
                style={{ width: `${score.value}%` }}
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
