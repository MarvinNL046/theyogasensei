import { useEffect, useState } from 'react'
import { convex, isConvexConfigured } from '#/lib/convex/client'
import { api } from '../../../convex/_generated/api'
import { asinForSlug } from '#/lib/affiliate-asins'
import { cn } from '#/lib/utils'

/**
 * Live Amazon price, fetched client-side from the Creators API offer cache.
 *
 * THE COMPLIANCE RULE THIS COMPONENT EXISTS TO ENFORCE. The Associates
 * Operating Agreement does not merely permit an API price — it requires that a
 * date/time stamp sit adjacent to it, plus a disclaimer that prices change and
 * that the price at checkout is the one that applies. This component renders
 * price, timestamp and disclaimer together or renders nothing at all. Do not
 * add a prop that separates them, and do not read the offer query anywhere
 * else to print a bare number.
 *
 * WHY CLIENT-SIDE. Pages are prerendered at build time and Amazon caps offer
 * caching at one hour, so a price baked into static HTML would be stale and
 * non-compliant within the hour. Prices are progressive enhancement: the
 * server-rendered page has no price, and the component adds one only if a
 * fresh offer exists. Nothing shifts layout on arrival — the slot reserves no
 * space and appears below the product name.
 */

interface Offer {
  displayAmount: string
  savingsPercentage?: number
  savingsBasisDisplayAmount?: string
  inStock: boolean
  fetchedAt: number
}

export interface ProductPriceProps {
  /** Affiliate slug; must exist in src/lib/affiliate-asins.ts */
  slug: string
  className?: string
}

/** Module-level cache so ten cards on one page make one round trip, not ten. */
const inflight = new Map<string, Promise<Record<string, Offer>>>()
const resolved = new Map<string, Offer | null>()

async function loadOffer(slug: string): Promise<Offer | null> {
  if (resolved.has(slug)) return resolved.get(slug) ?? null

  let request = inflight.get(slug)
  if (!request) {
    request = convex.query(api.amazonOffers.getBySlugs, {
      slugs: [slug],
    }) as Promise<Record<string, Offer>>
    inflight.set(slug, request)
  }

  try {
    const offers = await request
    const offer = offers[slug] ?? null
    resolved.set(slug, offer)
    return offer
  } finally {
    inflight.delete(slug)
  }
}

/**
 * Amazon allows the date to be dropped when the data was refreshed the same
 * day, which ours always is. Time-only reads better and stays inside the rule.
 */
function formatStamp(fetchedAt: number): string {
  const then = new Date(fetchedAt)
  const sameDay = new Date().toDateString() === then.toDateString()
  return then.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    ...(sameDay ? {} : { day: 'numeric', month: 'short' }),
  })
}

export function ProductPrice({ slug, className }: ProductPriceProps) {
  const [offer, setOffer] = useState<Offer | null>(null)

  useEffect(() => {
    // An unknown slug or an unconfigured Convex deployment is not an error
    // state worth showing — it is simply the price-less page.
    if (!isConvexConfigured || !asinForSlug(slug)) return

    let cancelled = false
    loadOffer(slug)
      .then((result) => {
        if (!cancelled) setOffer(result)
      })
      .catch(() => {
        // Network failure, cold cache, or the eligibility gate closing again.
        // All three degrade to the same thing: no price.
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (!offer) return null

  return (
    <p
      className={cn(
        'mt-2 text-sm leading-snug text-[color:var(--color-ink-soft)]',
        className,
      )}
    >
      <span className="font-medium text-[color:var(--color-ink)]">
        {offer.displayAmount}
      </span>
      {offer.savingsBasisDisplayAmount && offer.savingsPercentage ? (
        <span className="ml-2">
          was {offer.savingsBasisDisplayAmount} ({offer.savingsPercentage}% off)
        </span>
      ) : null}
      {!offer.inStock ? <span className="ml-2">currently unavailable</span> : null}{' '}
      <span className="whitespace-nowrap text-xs text-[color:var(--color-ink-muted)]">
        (as of {formatStamp(offer.fetchedAt)})
      </span>{' '}
      <span className="block text-xs leading-snug text-[color:var(--color-ink-muted)]">
        Product prices and availability are accurate as of the date/time
        indicated and are subject to change. Any price and availability
        information displayed on Amazon.com at the time of purchase will apply
        to the purchase of this product.
      </span>
    </p>
  )
}

export default ProductPrice
