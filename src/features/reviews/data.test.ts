import { describe, expect, it } from 'vitest'
import { affiliateLinks } from '#/lib/affiliate-links'
import { MAT_PICKS } from './data'

describe('best yoga mat decision data', () => {
  it('keeps every quick pick decision-complete', () => {
    expect(MAT_PICKS).toHaveLength(7)
    expect(new Set(MAT_PICKS.map((pick) => pick.affiliateSlug)).size).toBe(
      MAT_PICKS.length,
    )

    for (const pick of MAT_PICKS) {
      expect(pick.affiliateSlug, `${pick.name}: affiliate`).toBeTruthy()
      expect(
        affiliateLinks[pick.affiliateSlug],
        `${pick.name}: registered affiliate route`,
      ).toBeTruthy()
      expect(pick.length, `${pick.name}: length`).toBeTruthy()
      expect(pick.surface, `${pick.name}: surface`).toBeTruthy()
      expect(pick.latexRelevance, `${pick.name}: latex`).toBeTruthy()
      expect(pick.mainDrawback, `${pick.name}: drawback`).toBeTruthy()
      expect(pick.maintenance, `${pick.name}: maintenance`).toBeTruthy()
    }
  })
})
