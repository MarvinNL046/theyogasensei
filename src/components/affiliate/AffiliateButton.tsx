import { ExternalLink } from 'lucide-react'
import { track } from '@vercel/analytics'
import { cn } from '#/lib/utils'

type AffiliateButtonProps = {
  slug: string
  productName: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
}

const variantClasses: Record<NonNullable<AffiliateButtonProps['variant']>, string> = {
  primary:
    'bg-[color:var(--color-accent)] text-[color:var(--color-surface)] shadow-sm hover:bg-[color:var(--color-accent-deep)]',
  secondary:
    'border border-[color:var(--color-accent-soft)] bg-[color:var(--color-surface)] text-[color:var(--color-accent-deep)] hover:bg-[color:var(--color-surface-muted)]',
}

const sizeClasses: Record<NonNullable<AffiliateButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
}

function AffiliateButton({
  slug,
  productName,
  variant = 'primary',
  size = 'md',
}: AffiliateButtonProps) {
  return (
    <a
      href={`/go/${slug}`}
      aria-label={`Check price for ${productName} on Amazon`}
      rel="nofollow sponsored noopener"
      target="_blank"
      data-affiliate-slug={slug}
      onClick={() =>
        track('Affiliate click', {
          product: slug,
          placement: 'affiliate-button',
        })
      }
      className={cn(
        'not-prose inline-flex w-fit items-center justify-center gap-2 rounded-sm font-medium no-underline transition-colors duration-200 outline-none focus-visible:ring-3 focus-visible:ring-[color:var(--color-ring)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)]',
        variantClasses[variant],
        sizeClasses[size],
      )}
    >
      <span>Check price on Amazon</span>
      <ExternalLink aria-hidden="true" className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} strokeWidth={1.8} />
    </a>
  )
}

export { AffiliateButton, type AffiliateButtonProps }
