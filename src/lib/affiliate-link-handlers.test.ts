import { beforeEach, describe, expect, it, vi } from 'vitest'
import { affiliateLinkHandlers } from './affiliate-link-handlers'
import type { AffiliateAnchorEvent } from './affiliate-link-handlers'

const gemeld: Array<Record<string, unknown>> = []

vi.mock('@vercel/analytics', () => ({
  track: (naam: string, payload: Record<string, unknown>) => {
    gemeld.push({ naam, ...payload })
  },
}))

function anker(): AffiliateAnchorEvent & { button?: number } {
  return { currentTarget: { href: '/go/gaiam-mat-bag' } }
}

describe('affiliateLinkHandlers', () => {
  beforeEach(() => {
    gemeld.length = 0
  })

  it('enriches the bare href on a primary click', () => {
    const event = anker()
    affiliateLinkHandlers('gaiam-mat-bag', 'affiliate-button').onClick({
      ...event,
      currentTarget: event.currentTarget,
    } as never)

    expect(event.currentTarget.href).toContain('pageType=')
    expect(event.currentTarget.href).toContain('product=gaiam-mat-bag')
    expect(gemeld).toHaveLength(1)
  })

  it('enriches on a middle click — the gesture onClick never sees', () => {
    // Regression: middle click fires auxclick, not click. Before this, the
    // visitor left on the bare URL, so the redirect fell through to pageType
    // `other` and paid the default tag instead of the channel tag.
    const event = { ...anker(), button: 1 }
    affiliateLinkHandlers('gaiam-mat-bag', 'affiliate-button').onAuxClick(
      event as never,
    )

    expect(event.currentTarget.href).toContain('pageType=')
    expect(gemeld).toHaveLength(1)
  })

  it('enriches before the context menu opens, without counting a click', () => {
    // "Open link in new tab" fires contextmenu and never click. The href must
    // already be correct when the menu appears — but the reader has not
    // clicked through yet, so nothing is recorded.
    const event = anker()
    affiliateLinkHandlers('gaiam-mat-bag', 'affiliate-button').onContextMenu(
      event as never,
    )

    expect(event.currentTarget.href).toContain('pageType=')
    expect(gemeld).toHaveLength(0)
  })

  it('does not count a right-click auxclick as a navigation', () => {
    // auxclick fires for every non-primary button; only the middle one
    // navigates. Counting button 2 would inflate clicks against unchanged
    // Amazon earnings.
    const event = { ...anker(), button: 2 }
    affiliateLinkHandlers('gaiam-mat-bag', 'affiliate-button').onAuxClick(
      event as never,
    )

    expect(event.currentTarget.href).toContain('pageType=')
    expect(gemeld).toHaveLength(0)
  })

  it('carries the placement and page type through to the redirect', () => {
    const event = anker()
    affiliateLinkHandlers('gaiam-mat-bag', 'product-title').onClick({
      ...event,
      currentTarget: event.currentTarget,
    } as never)

    const search = new URL(event.currentTarget.href, 'https://x.test')
      .searchParams
    expect(search.get('placement')).toBe('product-title')
    expect(search.get('product')).toBe('gaiam-mat-bag')
    expect(search.get('pageType')).toBeTruthy()
  })
})
