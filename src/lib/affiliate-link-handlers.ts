import { track } from '@vercel/analytics'
import { affiliateClickContext, affiliateHref } from './affiliate-tracking'
import type {
  AffiliateClickContext,
  AffiliatePlacement,
} from './affiliate-tracking'

/** The only part of a React mouse event these handlers touch. */
export interface AffiliateAnchorEvent {
  button?: number
  currentTarget: { href: string }
}

export interface AffiliateLinkHandlers<TEvent extends AffiliateAnchorEvent> {
  onClick: (event: TEvent) => void
  onAuxClick: (event: TEvent) => void
  onContextMenu: (event: TEvent) => void
}

/**
 * Event handlers for one affiliate anchor.
 *
 * The href ships bare — `/go/<slug>` with no query — so no tracking parameters
 * end up in prerendered, CDN-cached HTML. It is enriched at click time instead.
 *
 * Enriching on `onClick` alone silently dropped two whole gestures: a middle
 * click fires `auxclick`, and "open link in new tab" from the context menu
 * fires `contextmenu` and never `click` at all. Both left the visitor on the
 * bare URL, so the redirect fell through to pageType `other`, paid the default
 * tag instead of the channel tag, and logged the source page as `/unknown`.
 * Readers who deliberately park a product in a tab are the buying kind — the
 * wrong slice to lose attribution on. Verified in the browser before and after.
 *
 * Analytics fires on a real navigation only: primary click and middle click.
 * Opening a context menu is not yet a click-through, and counting it as one
 * would inflate the click number against unchanged Amazon earnings.
 */
export function affiliateLinkHandlers<TEvent extends AffiliateAnchorEvent>(
  slug: string,
  placement: AffiliatePlacement,
): AffiliateLinkHandlers<TEvent> {
  const enrich = (event: TEvent): AffiliateClickContext => {
    const context = affiliateClickContext(placement)
    event.currentTarget.href = affiliateHref(
      slug,
      placement,
      context.sourcePage,
    )
    return context
  }

  const record = (context: AffiliateClickContext) => {
    track('Affiliate click', { product: slug, ...context })
  }

  return {
    onClick: (event) => record(enrich(event)),
    // auxclick covers every non-primary button; only the middle one navigates.
    onAuxClick: (event) => {
      const context = enrich(event)
      if (event.button === 1) record(context)
    },
    onContextMenu: (event) => {
      enrich(event)
    },
  }
}
