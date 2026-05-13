import type { ReactNode } from 'react'
import { cn } from '#/lib/utils'

/**
 * Constrained heading component — H2 or H3 only. The H1 belongs to the route
 * (one per page, route-owned, never rendered by components) per CLAUDE.md →
 * Heading hierarchy. H4+ is banned per references/voice.md → "Skip H4+. If
 * you need them, you're writing two articles."
 *
 * If you find yourself reaching for level=1, you are in the wrong file —
 * route components own their H1 directly.
 */
export interface HeadingProps {
  level: 2 | 3
  id?: string
  children: ReactNode
  className?: string
}

export function Heading({ level, id, children, className }: HeadingProps) {
  const Tag = level === 2 ? 'h2' : 'h3'
  return (
    <Tag
      id={id}
      className={cn(
        level === 2 && 'mt-12 mb-4 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl',
        level === 3 && 'mt-8 mb-3 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
