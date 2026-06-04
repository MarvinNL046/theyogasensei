import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'

const STORAGE_KEY = 'ga-consent'

type ConsentValue = 'granted' | 'denied'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function updateConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // localStorage unavailable (private mode / blocked) — consent stays at the
    // denied default set in the head; nothing else to do.
  }
  window.gtag?.('consent', 'update', {
    analytics_storage: value,
  })
}

/**
 * GDPR consent banner for Google Analytics 4 (Consent Mode v2).
 *
 * The head script defaults analytics_storage to 'denied'. This banner lets the
 * visitor grant or refuse; the choice is persisted in localStorage and re-read
 * by the head script on subsequent loads. Until a choice is made GA4 runs in
 * cookieless (modeled) mode, so no consent is required to show the page.
 */
export function ConsentBanner() {
  // Default hidden so SSR and the first client paint match (no hydration flash).
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch {
      stored = null
    }
    if (stored !== 'granted' && stored !== 'denied') setVisible(true)
  }, [])

  if (!visible) return null

  function choose(value: ConsentValue) {
    updateConsent(value)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]/95 px-4 py-4 shadow-lg backdrop-blur"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[color:var(--color-ink-soft)]">
          We use analytics cookies to understand how the site is used. You can
          accept or decline — see our{' '}
          <Link
            to="/privacy"
            className="font-medium text-[color:var(--color-olive)] underline underline-offset-4"
          >
            privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => choose('denied')}
            type="button"
          >
            Decline
          </Button>
          <Button size="sm" onClick={() => choose('granted')} type="button">
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
