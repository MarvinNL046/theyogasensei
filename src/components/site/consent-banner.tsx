import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'

const STORAGE_KEY = 'ga-consent'
const GA_MEASUREMENT_ID = 'G-7F7ZGQ25J4'
const GA_SCRIPT_ID = 'google-analytics-script'

type ConsentValue = 'granted' | 'denied'

declare global {
  interface Window {
    dataLayer?: Array<unknown>
    gtag?: (...args: unknown[]) => void
  }
}

function loadGoogleAnalytics() {
  if (document.getElementById(GA_SCRIPT_ID)) return

  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args)
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID)

  const script = document.createElement('script')
  script.id = GA_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.append(script)
}

function updateConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // localStorage unavailable (private mode / blocked) — do not persist.
  }
  if (value === 'granted') {
    loadGoogleAnalytics()
  } else {
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
  }
}

/**
 * GDPR consent banner for Google Analytics 4 (Consent Mode v2).
 *
 * GA4 is not requested until the visitor grants consent. The choice is
 * persisted in localStorage and re-read on subsequent loads.
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
    if (stored === 'granted') loadGoogleAnalytics()
    else if (stored !== 'denied') setVisible(true)
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
