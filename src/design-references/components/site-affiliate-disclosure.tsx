import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'

export interface AffiliateDisclosureProps {
  /** Compact variant for inline use above the fold on review pages. */
  compact?: boolean
  className?: string
}

/**
 * FTC-style affiliate disclosure. Appears above the fold on every monetised
 * page (product reviews, gear roundups) per references/voice.md. Full prose
 * version on /affiliate-disclosure.
 */
export function AffiliateDisclosure({ compact, className }: AffiliateDisclosureProps) {
  if (compact) {
    return (
      <p
        className={cn(
          'not-prose my-4 rounded-md border-l-2 border-accent bg-accent/10 px-4 py-2 text-xs text-stone-700',
          className,
        )}
      >
        This page contains sponsored links. The Yoga Sensei earns a commission when you buy through
        them — that does not change what we recommend.{' '}
        <Link to="/affiliate-disclosure" className="underline hover:text-accent">
          Full disclosure
        </Link>
        .
      </p>
    )
  }

  return (
    <aside
      className={cn(
        'not-prose my-6 rounded-lg border-l-4 border-accent bg-accent/10 px-5 py-4 text-sm text-stone-800',
        className,
      )}
      role="note"
    >
      <p className="mb-1 font-semibold text-accent">Affiliate disclosure</p>
      <p>
        This page contains sponsored links. When you buy through one, The Yoga Sensei earns a
        commission at no extra cost to you. That does not change what gets recommended — we only
        link to gear we have actually tested.{' '}
        <Link to="/affiliate-disclosure" className="underline hover:text-accent">
          Read the full policy
        </Link>
        .
      </p>
    </aside>
  )
}
