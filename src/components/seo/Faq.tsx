import { Plus } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

/**
 * Frontmatter-driven FAQ accordion. Visual layer only — the FAQPage JSON-LD is
 * already emitted by buildHead from the same frontmatter.faq, so this must NOT
 * re-emit schema. Native <details>/<summary> keeps it accessible and JS-free for
 * static prerendering; the clay "+" rotates to a "×" on open.
 */
export function Faq({
  items,
  heading = 'Frequently asked questions',
}: {
  items: ReadonlyArray<FaqItem>
  heading?: string
}) {
  if (!items.length) return null
  return (
    <section aria-label={heading} id="faq" className="not-prose mt-14 scroll-mt-28">
      <h2 className="font-serif text-2xl tracking-tight text-[color:var(--color-ink)] md:text-[28px]">
        {heading}
      </h2>
      <div className="mt-6 border-t border-[color:var(--color-border)]">
        {items.map((item, i) => (
          <details key={i} className="group border-b border-[color:var(--color-border)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <span className="font-serif text-lg leading-snug text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-accent-deep)]">
                {item.q}
              </span>
              <Plus
                aria-hidden="true"
                strokeWidth={1.75}
                className="h-4 w-4 flex-none text-[color:var(--color-accent)] transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="-mt-1 pb-6 pr-8 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
