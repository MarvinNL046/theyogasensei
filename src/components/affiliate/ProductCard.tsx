import { Check } from 'lucide-react'
import { AffiliateButton } from '#/components/affiliate/AffiliateButton'
import { cn } from '#/lib/utils'

/**
 * In-body product recommendation card for blog posts: a thumbnail, the product
 * name, a few plain-language reasons, and the standard affiliate CTA.
 *
 * Deliberately has NO price and NO rating prop. `content/` is scanned by
 * scripts/verify-associates-compliance.ts, so a price or an "x.y out of 5"
 * written into MDX props would fail the build — and Associates forbids both
 * outside the Product Advertising API. Keep it that way.
 *
 * The CTA is always the shared AffiliateButton so the rel/target/aria
 * compliance attributes stay in exactly one place.
 */
export interface ProductCardProps {
  /** Affiliate slug; must exist in src/lib/affiliate-links.ts */
  slug: string
  productName: string
  /** Root-relative image path, e.g. /images/blog/<slug>/product.webp */
  image: string
  imageAlt?: string
  /** Two to four short reasons. Written as plain sentences, not marketing copy. */
  points: string[]
  className?: string
}

function ProductCard({
  slug,
  productName,
  image,
  imageAlt,
  points,
  className,
}: ProductCardProps) {
  return (
    <aside
      aria-label={`${productName} recommendation`}
      className={cn(
        'not-prose my-8 border border-[color:var(--color-border)] bg-[color:var(--color-surface)]',
        className,
      )}
    >
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="w-full flex-shrink-0 overflow-hidden border border-[color:var(--color-border)] sm:w-40">
          <img
            src={image}
            alt={imageAlt ?? productName}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg leading-snug text-[color:var(--color-ink)]">
            {productName}
          </p>
          <ul className="mt-3 space-y-2">
            {points.map((point) => (
              <li
                key={point}
                className="flex gap-2 text-sm leading-snug text-[color:var(--color-ink-soft)]"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-olive)]"
                  strokeWidth={2}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-shrink-0 flex-col items-start gap-2 sm:items-end">
          <AffiliateButton
            slug={slug}
            productName={productName}
            placement="product-card"
          />
          <p className="text-[11px] text-[color:var(--color-ink-muted)]">
            Affiliate link — we may earn a commission.
          </p>
        </div>
      </div>
    </aside>
  )
}

export { ProductCard }
