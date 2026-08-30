import { describe, expect, it } from 'vitest'
import {
  hasDisplayablePrice,
  isOfferFresh,
  ITEM_TTL_MS,
  OFFER_TTL_MS,
} from '#/lib/amazon-offer-policy'

/**
 * These tests guard a compliance rule, not a performance one. Showing an offer
 * past its one-hour window breaches the Associates terms, so the boundary
 * cases matter more here than they would for an ordinary cache.
 */
const NOW = 1_788_000_000_000

describe('offer freshness', () => {
  it('accepts an offer fetched just now', () => {
    expect(isOfferFresh(NOW, NOW)).toBe(true)
  })

  it('accepts an offer at exactly the TTL boundary', () => {
    expect(isOfferFresh(NOW - OFFER_TTL_MS, NOW)).toBe(true)
  })

  it('rejects an offer one millisecond past the TTL', () => {
    expect(isOfferFresh(NOW - OFFER_TTL_MS - 1, NOW)).toBe(false)
  })

  it('rejects an offer that was never fetched', () => {
    expect(isOfferFresh(undefined, NOW)).toBe(false)
  })

  it('rejects a timestamp from the future rather than trusting it', () => {
    expect(isOfferFresh(NOW + 1000, NOW)).toBe(false)
  })

  it('rejects NaN and Infinity', () => {
    expect(isOfferFresh(Number.NaN, NOW)).toBe(false)
    expect(isOfferFresh(Number.POSITIVE_INFINITY, NOW)).toBe(false)
  })

  it('honours a caller-supplied TTL for item-level data', () => {
    const sixHours = NOW - 6 * 60 * 60 * 1000
    expect(isOfferFresh(sixHours, NOW)).toBe(false)
    expect(isOfferFresh(sixHours, NOW, ITEM_TTL_MS)).toBe(true)
  })

  it('keeps the prescribed windows: 1 hour for offers, 1 day for items', () => {
    expect(OFFER_TTL_MS).toBe(3_600_000)
    expect(ITEM_TTL_MS).toBe(86_400_000)
  })
})

describe('displayable price', () => {
  it('accepts a complete price', () => {
    expect(hasDisplayablePrice({ amount: 94, displayAmount: '$94.00' })).toBe(true)
  })

  it('rejects an amount with no display string', () => {
    expect(hasDisplayablePrice({ amount: 94 })).toBe(false)
  })

  it('rejects a display string with no amount', () => {
    expect(hasDisplayablePrice({ displayAmount: '$94.00' })).toBe(false)
  })

  it('rejects an item that lost its buy box entirely', () => {
    expect(hasDisplayablePrice({})).toBe(false)
  })

  it('accepts a genuinely free item rather than treating 0 as missing', () => {
    expect(hasDisplayablePrice({ amount: 0, displayAmount: '$0.00' })).toBe(true)
  })
})
