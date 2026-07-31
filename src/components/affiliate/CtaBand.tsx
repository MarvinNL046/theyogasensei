import { AffiliateButton } from '#/components/affiliate/AffiliateButton'
import { cn } from '#/lib/utils'

/**
 * Closing call-to-action band for blog posts: a short line of context on the
 * left, the affiliate CTA on the right.
 *
 * Same compliance shape as ProductCard — no price, no rating, CTA delegated to
 * the shared AffiliateButton. Use once, at the end of a post, and only when the
 * post has genuinely recommended the product above it. A band on a page that
 * did not earn it reads as a banner, which the design rules forbid.
 */
export interface CtaBandProps {
  slug: string
  productName: string
  /** One or two short sentences. Ends the argument; does not restate the post. */
  children: React.ReactNode
  className?: string
}

function CtaBand({ slug, productName, children, className }: CtaBandProps) {
  return (
    <aside
      aria-label={`${productName} call to action`}
      className={cn(
        'not-prose my-8 border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)]',
        className,
      )}
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <div className="min-w-0 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
          {children}
        </div>
        <div className="flex flex-shrink-0 flex-col items-start gap-2 sm:items-end">
          <AffiliateButton slug={slug} productName={productName} />
          <p className="text-[11px] text-[color:var(--color-ink-muted)]">
            Affiliate link — we may earn a commission.
          </p>
        </div>
      </div>
    </aside>
  )
}

export { CtaBand }
