import { Check } from 'lucide-react'
import { ProductImage } from '#/components/affiliate/ProductImage'
import { AffiliateButton } from '#/components/affiliate/AffiliateButton'
import { cn } from '#/lib/utils'
import { affiliateLinkHandlers } from '#/lib/affiliate-link-handlers'

/**
 * Numbered multi-product block for blog posts: three to five picks, each with a
 * clickable title, a one-line verdict, a few reasons and its own CTA.
 *
 * COMPLIANCE — read before adding fields.
 * There is deliberately no `rating`, no `reviewCount` and no `price` prop.
 * Amazon's Operating Agreement forbids reproducing customer ratings or review
 * text without Product Advertising API access, and this site does not have it
 * yet. scripts/verify-associates-compliance.ts fails the build on star
 * patterns, Amazon review phrasing and static prices anywhere under content/.
 * If you want to convey quality, use `verdict` for our own editorial view or
 * `sourceNote` for a claim attributed to a named independent tester.
 *
 * The title and the button both point at /go/<slug>, so the whole row is
 * actionable — but the link markup lives in AffiliateButton and MdxAnchor,
 * never hand-rolled here.
 */
export interface ProductListItem {
  slug: string
  productName: string
  image: string
  imageAlt?: string
  /** Short label, e.g. "Best overall" or "Best for heavy sweat". */
  badge?: string
  /** One sentence in our own voice. Not a quoted review. */
  verdict: string
  points: Array<string>
  /** Optional context attributed to a NAMED independent source. */
  sourceNote?: string
}

export interface ProductListProps {
  items: Array<ProductListItem>
  className?: string
}

function ProductRow({ item, index }: { item: ProductListItem; index: number }) {
  const href = `/go/${item.slug}`
  return (
    <li className="border-b border-[color:var(--color-border)] last:border-b-0">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:gap-6 sm:p-6">
        <div className="relative w-full flex-shrink-0 overflow-hidden border border-[color:var(--color-border)] sm:w-44">
          <ProductImage
            slug={item.slug}
            src={item.image}
            alt={item.imageAlt ?? item.productName}
            width={800}
            height={600}
          />
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-[color:var(--color-olive)] font-serif text-sm text-[color:var(--color-bg)]"
          >
            {index + 1}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {item.badge ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              {item.badge}
            </p>
          ) : null}

          <p className="mt-1 font-serif text-lg leading-snug">
            <a
              href={href}
              rel="nofollow sponsored noopener"
              target="_blank"
              data-affiliate-slug={item.slug}
              data-affiliate-placement="product-title"
              {...affiliateLinkHandlers(item.slug, 'product-title')}
              aria-label={`Check price for ${item.productName} on Amazon`}
              className="text-[color:var(--color-ink)] no-underline transition hover:text-[color:var(--color-olive)]"
            >
              {item.productName}
            </a>
          </p>

          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            {item.verdict}
          </p>

          <ul className="mt-3 space-y-2">
            {item.points.map((point) => (
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

          {item.sourceNote ? (
            <p className="mt-3 text-sm italic leading-relaxed text-[color:var(--color-ink-muted)]">
              {item.sourceNote}
            </p>
          ) : null}

          <div className="mt-4">
            <AffiliateButton
              slug={item.slug}
              productName={item.productName}
              size="sm"
              placement="product-list-button"
            />
          </div>
        </div>
      </div>
    </li>
  )
}

function ProductList({ items, className }: ProductListProps) {
  return (
    <div
      className={cn(
        'not-prose my-8 border border-[color:var(--color-border)] bg-[color:var(--color-surface)]',
        className,
      )}
    >
      <ol className="list-none p-0">
        {items.map((item, i) => (
          <ProductRow key={item.slug} item={item} index={i} />
        ))}
      </ol>
      <p className="border-t border-[color:var(--color-border)] px-5 py-3 text-[11px] text-[color:var(--color-ink-muted)] sm:px-6">
        Affiliate links — we may earn a commission. Prices and stock change too
        often to print here.
      </p>
    </div>
  )
}

export { ProductList }
