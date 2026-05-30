import type { ReactNode } from 'react'
import { DiagramFrame } from '#/components/diagrams/DiagramFrame'

export interface CushionStabilitySpectrumProps {
  caption?: ReactNode
}

/**
 * The cushion-vs-stability trade-off for sore knees: very soft mats are kind
 * kneeling but wobbly standing; very thin mats are stable but harsh on knees;
 * the practical balance lands around 6mm of dense material. Conceptual (no
 * measured values) — hence the "Illustrative" tag. Used on the bad-knees guide.
 *
 * The track is a solid token fill (no gradient — design non-negotiable); colour
 * is carried by the two end dots and the highlighted sweet-spot marker.
 */
export function CushionStabilitySpectrum({
  caption,
}: CushionStabilitySpectrumProps) {
  return (
    <DiagramFrame eyebrow="Cushion vs. stability" illustrative caption={caption}>
      <svg
        viewBox="0 0 640 230"
        className="h-auto w-full"
        role="img"
        aria-label="A spectrum from all-cushion to all-stability. Soft 8 to 10mm foam sits at the cushion end, thin 3mm at the stability end, and a dense 6mm mat marks the practical balance for sore knees in the middle."
      >
        {/* track (solid token fill) */}
        <rect x="60" y="108" width="520" height="12" rx="6" fill="var(--color-border)" />

        {/* soft / cushion end */}
        <line x1="115" y1="108" x2="115" y2="92" stroke="var(--color-border)" strokeWidth="1.5" />
        <circle cx="115" cy="114" r="6" fill="var(--color-accent-deep)" />
        <text x="115" y="72" textAnchor="middle" className="fill-[color:var(--color-ink)]" fontSize="16" fontWeight="600">
          Soft 8–10mm
        </text>
        <text x="115" y="52" textAnchor="middle" className="fill-[color:var(--color-ink-muted)]" fontSize="13.5">
          kind kneeling, wobbly standing
        </text>

        {/* thin / stability end */}
        <line x1="525" y1="108" x2="525" y2="92" stroke="var(--color-border)" strokeWidth="1.5" />
        <circle cx="525" cy="114" r="6" fill="var(--color-olive)" />
        <text x="525" y="72" textAnchor="middle" className="fill-[color:var(--color-ink)]" fontSize="16" fontWeight="600">
          Thin 3mm
        </text>
        <text x="525" y="52" textAnchor="middle" className="fill-[color:var(--color-ink-muted)]" fontSize="13.5">
          stable, harsh on knees
        </text>

        {/* sweet spot */}
        <line x1="320" y1="120" x2="320" y2="140" stroke="var(--color-accent-deep)" strokeWidth="1.5" />
        <circle cx="320" cy="114" r="8.5" fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="2" />
        <text x="320" y="164" textAnchor="middle" className="fill-[color:var(--color-accent-deep)]" fontSize="16" fontWeight="700">
          ~6mm dense
        </text>
        <text x="320" y="184" textAnchor="middle" className="fill-[color:var(--color-ink-muted)]" fontSize="13.5">
          enough cushion, still stable
        </text>

        {/* axis end words */}
        <text x="60" y="214" textAnchor="start" className="fill-[color:var(--color-ink-muted)]" fontSize="13.5">
          ← more cushion
        </text>
        <text x="580" y="214" textAnchor="end" className="fill-[color:var(--color-ink-muted)]" fontSize="13.5">
          more stability →
        </text>
      </svg>
    </DiagramFrame>
  )
}
