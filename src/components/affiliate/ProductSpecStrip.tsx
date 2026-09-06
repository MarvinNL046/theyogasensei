import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Dumbbell, Layers3, Ruler } from 'lucide-react'
import { cn } from '#/lib/utils'
import { ProductImage } from '#/components/affiliate/ProductImage'

type ProductSpec = {
  thickness?: string
  weight?: string
  material?: string
  latexFlag?: boolean
  notes?: string
}

type ProductSpecStripProps = {
  slug?: string
  productName: string
  specs: ProductSpec
  bestFor?: string
  drawback?: string
  children?: ReactNode
}

type SpecItem = {
  key: keyof Pick<ProductSpec, 'thickness' | 'weight' | 'material'>
  label: string
  value: string
  icon: LucideIcon
}

function ProductSpecStrip({
  productName,
  specs,
  slug,
  bestFor,
  drawback,
  children,
}: ProductSpecStripProps) {
  const items = [
    specs.thickness
      ? ({
          key: 'thickness',
          label: 'Thickness',
          value: specs.thickness,
          icon: Ruler,
        } satisfies SpecItem)
      : null,
    specs.weight
      ? ({
          key: 'weight',
          label: 'Weight',
          value: specs.weight,
          icon: Dumbbell,
        } satisfies SpecItem)
      : null,
    specs.material
      ? ({
          key: 'material',
          label: 'Material',
          value: specs.material,
          icon: Layers3,
        } satisfies SpecItem)
      : null,
  ].filter((item): item is SpecItem => item !== null)

  if (items.length === 0 && !specs.latexFlag && !specs.notes) return null

  return (
    <aside
      id={slug ? `product-${slug}` : undefined}
      aria-label={`${productName} product specs`}
      className="not-prose my-5 scroll-mt-24 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 p-4 shadow-sm"
    >
      <div className="flex items-start gap-4 sm:gap-5">
        {slug ? (
          <div className="w-24 shrink-0 sm:w-32">
            <ProductImage
              slug={slug}
              alt={productName}
              width={500}
              height={500}
              className="rounded-sm"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg leading-snug text-[color:var(--color-ink)]">
            {productName}
          </p>
          {bestFor ? (
            <p className="mt-2 text-sm leading-relaxed">
              <strong>Consider it for:</strong> {bestFor}
            </p>
          ) : null}
          {drawback ? (
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
              <strong>Main trade-off:</strong> {drawback}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2.5">
          {items.map(({ key, label, value, icon: Icon }) => (
            <div
              key={key}
              className="inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-surface-muted)] px-3 py-1.5 text-xs text-[color:var(--color-ink-soft)]"
            >
              <Icon
                aria-hidden="true"
                className="h-3.5 w-3.5 text-[color:var(--color-accent-deep)]"
              />
              <span className="font-medium text-[color:var(--color-ink)]">
                {label}:
              </span>
              <span>{value}</span>
            </div>
          ))}
          {specs.latexFlag ? (
            <span
              className={cn(
                'inline-flex items-center rounded-full border border-[color:var(--color-accent-soft)]',
                'bg-[color:var(--color-accent-soft)]/20 px-3 py-1.5 text-xs font-medium text-[color:var(--color-accent-deep)]',
              )}
            >
              Contains latex
            </span>
          ) : null}
        </div>
        {specs.notes ? (
          <p className="mt-3 text-sm italic leading-relaxed text-[color:var(--color-ink-muted)]">
            {specs.notes}
          </p>
        ) : null}
      </div>
      {children ? (
        <div className="mt-4 border-t border-[color:var(--color-border)] pt-4">
          {children}
        </div>
      ) : null}
    </aside>
  )
}

export { ProductSpecStrip, type ProductSpec, type ProductSpecStripProps }
