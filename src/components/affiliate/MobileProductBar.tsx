import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { AffiliateButton } from './AffiliateButton'

export function MobileProductBar({
  slug,
  productName,
}: {
  slug: string
  productName: string
}) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      const footer = document.querySelector('footer')
      const dialog = document.querySelector('[role="dialog"]')
      const editing = document.activeElement?.matches(
        'input, textarea, select, [contenteditable="true"]',
      )
      setVisible(
        window.scrollY > 450 &&
          !dialog &&
          !editing &&
          (!footer || footer.getBoundingClientRect().top > window.innerHeight),
      )
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.addEventListener('focusin', schedule)
    document.addEventListener('focusout', schedule)
    check()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('focusin', schedule)
      document.removeEventListener('focusout', schedule)
    }
  }, [])

  if (dismissed || !visible) return null
  return (
    <aside
      aria-label="Featured product"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--color-border)] bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_#00000012] lg:hidden"
    >
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 truncate text-sm font-semibold text-[color:var(--color-ink)]">
            {productName}
          </p>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Hide product recommendation"
            className="flex h-11 w-11 shrink-0 items-center justify-center text-[color:var(--color-ink-muted)]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="max-w-28 text-[10px] text-[color:var(--color-ink-muted)]">
            Affiliate link · We may earn a commission
          </p>
          <AffiliateButton
            slug={slug}
            productName={productName}
            size="sm"
            placement="mobile-sticky"
          />
        </div>
      </div>
    </aside>
  )
}
