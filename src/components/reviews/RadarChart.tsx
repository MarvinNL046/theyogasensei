import { SCORING_RUBRIC, type MatScores } from '#/features/reviews/data'

interface RadarChartProps {
  scores: MatScores
  size?: number
  className?: string
}

const AXES = SCORING_RUBRIC

/**
 * Pentagon radar plotting the five editorial scores (0–5). Pure SVG, no deps.
 * Olive fill on a taupe grid; small uppercase axis labels.
 */
export function RadarChart({ scores, size = 230, className }: RadarChartProps) {
  const cx = size / 2
  const cy = size / 2
  const maxR = size / 2 - 44
  const n = AXES.length
  const angle = (i: number) => (-90 + (360 / n) * i) * (Math.PI / 180)
  const point = (i: number, radius: number): [number, number] => [
    cx + radius * Math.cos(angle(i)),
    cy + radius * Math.sin(angle(i)),
  ]
  const polygon = (radius: (i: number) => number) =>
    AXES.map((_, i) => point(i, radius(i)).join(',')).join(' ')

  const rings = [1, 2, 3, 4, 5].map((lvl) => polygon(() => (lvl / 5) * maxR))
  const dataPolygon = AXES.map((axis, i) =>
    point(i, (scores[axis.key] / 5) * maxR).join(','),
  ).join(' ')

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Editorial score breakdown"
    >
      {rings.map((pts, idx) => (
        <polygon
          key={idx}
          points={pts}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={1}
        />
      ))}
      {AXES.map((_, i) => {
        const [x, y] = point(i, maxR)
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="var(--color-border)"
            strokeWidth={1}
          />
        )
      })}
      <polygon
        points={dataPolygon}
        fill="var(--color-olive)"
        fillOpacity={0.16}
        stroke="var(--color-olive)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {AXES.map((ax, i) => {
        const [x, y] = point(i, (scores[ax.key] / 5) * maxR)
        return <circle key={i} cx={x} cy={y} r={2.5} fill="var(--color-olive)" />
      })}
      {AXES.map((ax, i) => {
        const [x, y] = point(i, maxR + 13)
        const anchor =
          Math.abs(x - cx) < 6 ? 'middle' : x > cx ? 'start' : 'end'
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="8"
            letterSpacing="0.06em"
            fill="var(--color-ink-muted)"
          >
            {ax.label.toUpperCase()}
          </text>
        )
      })}
    </svg>
  )
}
