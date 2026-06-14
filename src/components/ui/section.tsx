import type { ElementType, ReactNode } from 'react'
import { cn } from '#/lib/utils'

type SectionTone = 'default' | 'muted' | 'dark'
type SectionPadding = 'sm' | 'md' | 'lg' | 'none'

const TONE: Record<SectionTone, string> = {
  default: '',
  muted: 'bg-[color:var(--color-surface-muted)]',
  dark: 'bg-[color:var(--color-olive)] text-[color:var(--color-bg)] [--color-heading:var(--color-bg)]',
}

const PADDING: Record<SectionPadding, string> = {
  none: '',
  sm: 'py-14 md:py-20',
  md: 'py-20 md:py-28',
  lg: 'py-24 md:py-32',
}

export interface SectionProps {
  as?: ElementType
  tone?: SectionTone
  padding?: SectionPadding
  className?: string
  children: ReactNode
}

export function Section({
  as: Tag = 'section',
  tone = 'default',
  padding = 'md',
  className,
  children,
}: SectionProps) {
  return (
    <Tag className={cn(TONE[tone], PADDING[padding], className)}>{children}</Tag>
  )
}
