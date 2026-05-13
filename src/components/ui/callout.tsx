import type { ReactNode } from 'react'
import { cn } from '#/lib/utils'

type CalloutType = 'tip' | 'note' | 'warning' | 'info'

const STYLES: Record<CalloutType, { box: string; label: string; labelText: string }> = {
  tip: {
    box: 'border-accent-300 bg-accent-50/60',
    label: 'bg-accent-500 text-white',
    labelText: 'Tip',
  },
  note: {
    box: 'border-stone-300 bg-stone-50',
    label: 'bg-stone-700 text-white',
    labelText: 'Note',
  },
  warning: {
    box: 'border-amber-300 bg-amber-50/70',
    label: 'bg-amber-600 text-white',
    labelText: 'Warning',
  },
  info: {
    box: 'border-sky-300 bg-sky-50/70',
    label: 'bg-sky-700 text-white',
    labelText: 'Info',
  },
}

export interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
  className?: string
}

/**
 * One-insight callout box. Voice-spec rule: one per major section, max.
 * Lives outside .prose by default — set className="not-prose" inside prose
 * containers to keep typography clean.
 */
export function Callout({
  type = 'note',
  title,
  children,
  className,
}: CalloutProps) {
  const styles = STYLES[type]
  return (
    <aside
      className={cn(
        'not-prose my-6 rounded-lg border-l-4 px-5 py-4 text-sm leading-relaxed text-stone-800',
        styles.box,
        className,
      )}
      role="note"
    >
      <span
        className={cn(
          'mb-2 inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
          styles.label,
        )}
      >
        {title ?? styles.labelText}
      </span>
      <div className="mt-1">{children}</div>
    </aside>
  )
}
