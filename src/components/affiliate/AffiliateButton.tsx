import { ExternalLink } from 'lucide-react'
import { cn } from '#/lib/utils'
import { OfferNotice } from '#/components/affiliate/OfferNotice'
import { affiliateLinkHandlers } from '#/lib/affiliate-link-handlers'
import type { AffiliatePlacement } from '#/lib/affiliate-tracking'

type AffiliateButtonProps = {
  slug: string
  productName: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  placement?: AffiliatePlacement
}

const variantClasses: Record<
  NonNullable<AffiliateButtonProps['variant']>,
  string
> = {
  primary:
    'bg-[color:var(--color-accent-deep)] text-white shadow-sm hover:bg-[color:var(--color-olive-deep)]',
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
  placement = 'affiliate-button',
}: AffiliateButtonProps) {
  return (
    <>
      <a
        href={`/go/${slug}`}
        aria-label={`Check price for ${productName} on Amazon`}
        rel="nofollow sponsored noopener"
        target="_blank"
        data-affiliate-slug={slug}
        data-affiliate-placement={placement}
        {...affiliateLinkHandlers(slug, placement)}
        className={cn(
          'not-prose inline-flex w-fit items-center justify-center gap-2 rounded-sm font-medium no-underline transition-colors duration-200 outline-none focus-visible:ring-3 focus-visible:ring-[color:var(--color-ring)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)]',
          variantClasses[variant],
          sizeClasses[size],
        )}
      >
        <span>Check price on Amazon</span>
        <ExternalLink
          aria-hidden="true"
          className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'}
          strokeWidth={1.8}
        />
      </a>
      {/* Renders nothing unless this product has actually gone unbuyable, so
          every CTA on the site gets the warning without any of them carrying
          the disclosure clutter in the normal case. */}
      <OfferNotice slug={slug} />
    </>
  )
}

export { AffiliateButton, type AffiliateButtonProps }
