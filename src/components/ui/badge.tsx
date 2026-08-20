import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '#/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-sm px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] transition',
  {
    variants: {
      variant: {
        default: 'bg-[color:var(--color-olive)] text-[color:var(--color-bg)]',
        accent: 'bg-[color:var(--color-accent)] text-[color:var(--color-bg)]',
        soft: 'bg-[color:var(--color-surface)] text-[color:var(--color-ink)] ring-1 ring-[color:var(--color-border)]',
        outline: 'border border-[color:var(--color-border)] text-[color:var(--color-ink-soft)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
