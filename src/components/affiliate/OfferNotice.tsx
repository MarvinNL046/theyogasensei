import { useEffect, useState } from 'react'
import { convex, isConvexConfigured } from '#/lib/convex/client'
import { api } from '../../../convex/_generated/api'
import { asinForSlug } from '#/lib/affiliate-asins'
import { cn } from '#/lib/utils'

/**
 * Warns a reader when a product currently has no buyable offer on Amazon.
 *
 * WHY THIS CARRIES A TIMESTAMP AND A DISCLAIMER. The Associates Operating
 * Agreement treats availability the same way it treats price: a date/time
 * stamp must sit adjacent to it, along with the standard notice that the
 * information changes and that checkout is what counts. That obligation is why
 * this site shows no prices — the clutter would land on every card. Stock is
 * different: this renders only for an item that has actually gone unbuyable,
 * which today is none of them, so the cost is paid exactly where it buys the
 * reader something.
 *
 * It never renders on missing data. A cold cache, an unknown slug, an
 * unconfigured deployment or a stale row all mean silence, because "we have
 * not looked lately" must never reach a reader as "this is unavailable".
 */

export interface OfferNoticeProps {
  /** Affiliate slug; must exist in src/lib/affiliate-asins.ts */
  slug: string
  className?: string
}

/** One round trip per slug per page, however many buttons ask. */
const cache = new Map<string, Promise<number | null>>()

function loadUnbuyable(slug: string): Promise<number | null> {
  const hit = cache.get(slug)
  if (hit) return hit

  const request = (
    convex.query(api.amazonOffers.unbuyableSlugs, {
      slugs: [slug],
    })
  )
    .then((result) => result[slug] ?? null)
    .catch(() => null)

  cache.set(slug, request)
  return request
}

function formatStamp(checkedAt: number): string {
  const then = new Date(checkedAt)
  const sameDay = new Date().toDateString() === then.toDateString()
  return then.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    ...(sameDay ? {} : { day: 'numeric', month: 'short' }),
  })
}

export function OfferNotice({ slug, className }: OfferNoticeProps) {
  const [checkedAt, setCheckedAt] = useState<number | null>(null)

  useEffect(() => {
    if (!isConvexConfigured || !asinForSlug(slug)) return

    let cancelled = false
    loadUnbuyable(slug)
      .then((result) => {
        if (!cancelled) setCheckedAt(result)
      })
      .catch(() => {
        // Silence is the safe state here.
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (checkedAt === null) return null

  return (
    <span
      role="status"
      className={cn(
        // A span rendered as a block: AffiliateButton is inline and appears
        // inside paragraphs in MDX, where a <p> child would be invalid HTML.
        'mt-2 block text-xs leading-snug text-[color:var(--color-ink-muted)]',
        className,
      )}
    >
      <span className="font-medium text-[color:var(--color-ink-soft)]">
        Out of stock on Amazon
      </span>{' '}
      when we checked at {formatStamp(checkedAt)}. Product prices and
      availability are accurate as of the date/time indicated and are subject to
      change. Any price and availability information displayed on Amazon.com at
      the time of purchase will apply to the purchase of this product.
    </span>
  )
}

export default OfferNotice
