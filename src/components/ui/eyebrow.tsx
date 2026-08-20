import type { ReactNode } from 'react'
import { cn } from '#/lib/utils'

type EyebrowTone = 'default' | 'accent' | 'onDark'

const TONE: Record<EyebrowTone, string> = {
  default: 'text-[color:var(--color-ink-muted)]',
  accent: 'text-[color:var(--color-accent)]',
  onDark: 'text-[color:var(--color-accent-soft)]',
}

export interface EyebrowProps {
  tone?: EyebrowTone
  className?: string
  children: ReactNode
}

export function Eyebrow({
  tone = 'default',
  className,
  children,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs font-medium uppercase tracking-[0.18em]',
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
