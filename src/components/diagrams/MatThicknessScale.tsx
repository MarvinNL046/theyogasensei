import type { ReactNode } from 'react'
import { DiagramFrame } from '#/components/diagrams/DiagramFrame'

interface Tier {
  label: string
  feel: string
  /** Representative mm used only to scale the block height. */
  mm: number
  recommended?: boolean
}

// Tiers + feel words trimmed from the how-thick mm→feel table's "How it feels"
// column. Block heights below are exaggerated for clarity (see Illustrative).
const TIERS: Array<Tier> = [
  { label: '1.5–2mm', feel: 'Very thin', mm: 2 },
  { label: '3mm', feel: 'Firm, stable', mm: 3 },
  { label: '4–5mm', feel: 'Balanced', mm: 4.5, recommended: true },
  { label: '6mm', feel: 'Cushioned', mm: 6 },
  { label: '8–10mm', feel: 'Plush, soft', mm: 9 },
]

export interface MatThicknessScaleProps {
  caption?: ReactNode
}

/**
 * Side-profile blocks for the common mat thicknesses (real values from the
 * page's own table). Block heights are exaggerated for clarity, hence the
 * "Illustrative" tag. The 4–5mm tier is highlighted as the general starting
 * point. Used on the how-thick guide.
 */
export function MatThicknessScale({ caption }: MatThicknessScaleProps) {
  const baseline = 250
  const scale = 13 // px per mm (visual only)
  const blockW = 84
  // Column x derived from index so it stays length-matched to TIERS.
  const colX = (i: number) => 70 + i * 120

  return (
    <DiagramFrame
      eyebrow="Thickness at a glance"
      illustrative
      caption={caption}
    >
      <svg
        viewBox="0 0 640 320"
        className="h-auto w-full"
        role="img"
        aria-label="Yoga mat thickness from 1.5mm up to 10mm, shown as side-profile blocks of increasing height, with the 4 to 5mm balanced tier marked as the usual starting point."
      >
        {/* floor baseline */}
        <line
          x1="40"
          y1={baseline}
          x2="600"
          y2={baseline}
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />

        {TIERS.map((t, i) => {
          const h = t.mm * scale
          const x = colX(i)
          const y = baseline - h
          return (
            <g key={t.label}>
              <rect
                x={x}
                y={y}
                width={blockW}
                height={h}
                rx="3"
                fill={
                  t.recommended ? 'var(--color-accent)' : 'var(--color-olive)'
                }
                opacity={t.recommended ? 0.9 : 0.82}
              />
              <text
                x={x + blockW / 2}
                y={y - 12}
                textAnchor="middle"
                className="fill-[color:var(--color-ink)]"
                fontSize="16"
                fontWeight="600"
              >
                {t.label}
              </text>
              <text
                x={x + blockW / 2}
                y={baseline + 24}
                textAnchor="middle"
                className="fill-[color:var(--color-ink-muted)]"
                fontSize="14.5"
              >
                {t.feel}
              </text>
              {t.recommended ? (
                <text
                  x={x + blockW / 2}
                  y={baseline + 44}
                  textAnchor="middle"
                  className="fill-[color:var(--color-accent-deep)]"
                  fontSize="13"
                  fontWeight="600"
                >
                  start here
                </text>
              ) : null}
            </g>
          )
        })}

        {/* trade-off annotation */}
        <text
          x="40"
          y="302"
          textAnchor="start"
          className="fill-[color:var(--color-ink-muted)]"
          fontSize="13.5"
        >
          ← firmer, more stable
        </text>
        <text
          x="600"
          y="302"
          textAnchor="end"
          className="fill-[color:var(--color-ink-muted)]"
          fontSize="13.5"
        >
          softer, more cushion →
        </text>
      </svg>
    </DiagramFrame>
  )
}
