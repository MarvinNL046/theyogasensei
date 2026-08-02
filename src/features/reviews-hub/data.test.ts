import { describe, expect, it } from 'vitest'
import { filterReviews } from './ReviewsHub'
import { DEFAULT_REVIEW_FILTERS, REVIEW_ENTRIES } from './data'

describe('review research status', () => {
  it('labels only reviews with documented personal use as personally used', () => {
    const personallyUsed = REVIEW_ENTRIES.filter(
      (review) => review.researchStatus === 'Personally used',
    )

    expect(personallyUsed.map((review) => review.slug)).toEqual(['lululemon'])
  })

  it('filters personally used and documentation-led reviews separately', () => {
    expect(
      filterReviews({
        ...DEFAULT_REVIEW_FILTERS,
        researchStatus: 'Personally used',
      }).map((review) => review.slug),
    ).toEqual(['lululemon'])
    expect(
      filterReviews({
        ...DEFAULT_REVIEW_FILTERS,
        researchStatus: 'Documentation-led',
      }),
    ).toHaveLength(REVIEW_ENTRIES.length - 1)
  })
})
