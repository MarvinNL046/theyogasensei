import { Check } from 'lucide-react'
import { ProductImage } from '#/components/affiliate/ProductImage'
import { AffiliateButton } from '#/components/affiliate/AffiliateButton'

/**
 * Vertical affiliate promo for the blog sidebar: image, product name, an
 * optional line of context, a few reasons, then the shared CTA.
 *
 * Fed from the post's `sidebarProduct` frontmatter so a writer never has to
 * touch layout code. Same compliance shape as ProductCard — no price, no
 * rating, CTA delegated to AffiliateButton so the rel/aria attributes live in
 * one place.
 */
export interface SidebarProductProps {
  slug: string
  productName: string
  image: string
  points: Array<string>
  blurb?: string
}

export function SidebarProduct({
  slug,
  productName,
  image,
  points,
  blurb,
}: SidebarProductProps) {
  return (
    <aside
      aria-label={`${productName} recommendation`}
      className="border border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
    >
      <div className="overflow-hidden border-b border-[color:var(--color-border)]">
        <ProductImage
          slug={slug}
          src={image}
          alt={productName}
          width={800}
          height={600}
        />
      </div>

      <div className="p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
          What I use
        </p>
        <p className="mt-3 font-serif text-lg leading-snug text-[color:var(--color-ink)]">
          {productName}
        </p>

        {blurb ? (
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
            {blurb}
          </p>
        ) : null}

        <ul className="mt-4 space-y-2">
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

        <div className="mt-5">
          <AffiliateButton
            slug={slug}
            productName={productName}
            placement="sidebar"
          />
          <p className="mt-2 text-[11px] text-[color:var(--color-ink-muted)]">
            Affiliate link — we may earn a commission.
          </p>
        </div>
      </div>
    </aside>
  )
}
