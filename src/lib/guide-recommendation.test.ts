import { describe, expect, it } from 'vitest'
import { guideRecommendation } from './guide-recommendation'

describe('guide recommendation', () => {
  it('uses an explicit choice before a list', () => {
    const choice = {
      slug: 'jade-harmony',
      productName: 'Jade Harmony',
      points: [],
    }
    expect(
      guideRecommendation({
        sidebarProduct: choice,
        itemList: [{ name: 'PRO', url: '/go/manduka-pro-6mm' }],
      }),
    ).toBe(choice)
  })
  it('only resolves an actual listed Amazon product', () => {
    expect(
      guideRecommendation({
        itemList: [{ name: 'PRO', url: '/go/manduka-pro-6mm' }],
      })?.slug,
    ).toBe('manduka-pro-6mm')
    expect(
      guideRecommendation({
        itemList: [{ name: 'Unknown', url: '/go/unregistered' }],
      }),
    ).toBeNull()
    expect(
      guideRecommendation({
        itemList: [{ name: 'Direct', url: 'https://example.com' }],
      }),
    ).toBeNull()
    expect(guideRecommendation({})).toBeNull()
  })
  it('does not add a recommendation to a gated page', () => {
    expect(
      guideRecommendation({
        indexable: false,
        itemList: [{ name: 'PRO', url: '/go/manduka-pro-6mm' }],
      }),
    ).toBeNull()
  })
})
