import { describe, expect, it } from 'vitest'
import { affiliateLinks } from '#/lib/affiliate-links'
import {
  AFFILIATE_ASINS,
  allTrackedAsins,
  asinForSlug,
  batchAsins,
  GET_ITEMS_BATCH_SIZE,
} from '#/lib/affiliate-asins'

/**
 * The drift guard. affiliate-asins.ts is a hand-maintained copy of the Amazon
 * half of the /go/ registry, because Convex cannot import the registry itself.
 * These tests are the only thing keeping the two honest.
 */

const AMAZON_DP = /^https:\/\/www\.amazon\.com\/dp\/([A-Z0-9]{10})$/

function amazonSlugsFromRegistry(): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [slug, url] of Object.entries(affiliateLinks)) {
    const match = AMAZON_DP.exec(url)
    if (match?.[1]) out[slug] = match[1]
  }
  return out
}

describe('affiliate ASIN registry', () => {
  it('covers every Amazon /dp/ slug in the affiliate registry', () => {
    const expected = amazonSlugsFromRegistry()
    const missing = Object.keys(expected).filter((s) => !(s in AFFILIATE_ASINS))
    expect(
      missing,
      `add these slugs to src/lib/affiliate-asins.ts: ${missing.join(', ')}`,
    ).toEqual([])
  })

  it('has no slug the affiliate registry does not have', () => {
    const expected = amazonSlugsFromRegistry()
    const extra = Object.keys(AFFILIATE_ASINS).filter((s) => !(s in expected))
    expect(
      extra,
      `these slugs are no longer Amazon destinations: ${extra.join(', ')}`,
    ).toEqual([])
  })

  it('maps every slug to the same ASIN the registry points at', () => {
    const expected = amazonSlugsFromRegistry()
    for (const [slug, asin] of Object.entries(expected)) {
      expect(AFFILIATE_ASINS[slug], `slug ${slug} points at a different ASIN`).toBe(asin)
    }
  })

  it('only contains well-formed ASINs', () => {
    for (const [slug, asin] of Object.entries(AFFILIATE_ASINS)) {
      expect(asin, `${slug} has a malformed ASIN`).toMatch(/^[A-Z0-9]{10}$/)
    }
  })

  it('returns null for a slug that is not an Amazon destination', () => {
    expect(asinForSlug('not-a-real-slug')).toBeNull()
  })

  it('deduplicates ASINs shared by more than one slug', () => {
    const all = allTrackedAsins()
    expect(new Set(all).size).toBe(all.length)
  })

  it('batches into groups GetItems will accept', () => {
    const batches = batchAsins(allTrackedAsins())
    expect(batches.every((b) => b.length <= GET_ITEMS_BATCH_SIZE)).toBe(true)
    expect(batches.flat()).toEqual(allTrackedAsins())
  })

  it('handles an empty list without producing an empty batch', () => {
    expect(batchAsins([])).toEqual([])
  })
})
