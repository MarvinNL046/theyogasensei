import type { ReactNode } from 'react'
import { cn } from '#/lib/utils'

export interface DiagramFrameProps {
  /** Small uppercase label above the diagram (e.g. "Grip vs. moisture"). */
  eyebrow?: string
  /** Caption beneath the diagram — should add context, not restate the title. */
  caption?: ReactNode
  /**
   * When true, shows a small "Illustrative" tag. Set on any diagram that shows
   * direction/relationships rather than measured data — keeps the brand's
   * no-fake-precision promise explicit.
   */
  illustrative?: boolean
  children: ReactNode
  className?: string
}

/**
 * Shared wrapper for in-body informational diagrams. A sibling of <Figure>:
 * same rounded border + caption treatment, but on a soft surface background
 * because the content is drawn, not photographed. Lives outside .prose.
 */
export function DiagramFrame({
  eyebrow,
  caption,
  illustrative,
  children,
  className,
}: DiagramFrameProps) {
  return (
    <figure className={cn('not-prose my-8', className)}>
      <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 sm:p-7">
        {(eyebrow || illustrative) && (
          <div className="mb-4 flex items-baseline justify-between gap-4">
            {eyebrow ? (
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                {eyebrow}
              </p>
            ) : (
              <span />
            )}
            {illustrative ? (
              <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]/70">
                Illustrative
              </p>
            ) : null}
          </div>
        )}
        {children}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
