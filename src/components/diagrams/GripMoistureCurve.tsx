import type { ReactNode } from 'react'
import { DiagramFrame } from '#/components/diagrams/DiagramFrame'

export interface GripMoistureCurveProps {
  caption?: ReactNode
}

/**
 * Illustrative grip-vs-moisture curve: cork grip tends to rise as the surface
 * dampens; natural rubber grip tends to fade once it is genuinely wet. Shows
 * direction and the crossover only — no measured values (brand no-fake-precision
 * rule). Used on the cork-vs-rubber and hot-yoga guides.
 */
export function GripMoistureCurve({ caption }: GripMoistureCurveProps) {
  return (
    <DiagramFrame eyebrow="Grip vs. moisture" illustrative caption={caption}>
      <svg
        viewBox="0 0 640 360"
        className="h-auto w-full"
        role="img"
        aria-label="As the mat surface goes from dry to damp, cork grip rises while natural rubber grip falls; the two cross over in the middle."
      >
        {/* axes */}
        <line x1="78" y1="40" x2="78" y2="290" stroke="var(--color-border)" strokeWidth="1.5" />
        <line x1="78" y1="290" x2="610" y2="290" stroke="var(--color-border)" strokeWidth="1.5" />

        {/* y-axis label */}
        <text x="70" y="34" textAnchor="end" className="fill-[color:var(--color-ink-muted)]" fontSize="16">
          More grip ↑
        </text>

        {/* x-axis labels */}
        <text x="78" y="316" textAnchor="start" className="fill-[color:var(--color-ink-muted)]" fontSize="16">
          Dry hands
        </text>
        <text x="610" y="316" textAnchor="end" className="fill-[color:var(--color-ink-muted)]" fontSize="16">
          Damp / sweaty
        </text>

        {/* rubber: tacky when dry, fades when wet (clay) */}
        <path
          d="M 88 80 C 250 92 420 205 600 245"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* cork: firm when dry, locks in when damp (olive) */}
        <path
          d="M 88 232 C 250 214 410 120 600 78"
          fill="none"
          stroke="var(--color-olive)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* end dots */}
        <circle cx="600" cy="78" r="4.5" fill="var(--color-olive)" />
        <circle cx="600" cy="245" r="4.5" fill="var(--color-accent)" />

        {/* line labels */}
        <text x="590" y="64" textAnchor="end" className="fill-[color:var(--color-olive)]" fontSize="18" fontWeight="600">
          Cork
        </text>
        <text x="590" y="265" textAnchor="end" className="fill-[color:var(--color-accent-deep)]" fontSize="18" fontWeight="600">
          Natural rubber
        </text>
      </svg>
    </DiagramFrame>
  )
}
