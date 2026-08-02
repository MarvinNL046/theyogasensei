import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ReviewsHub } from '#/features/reviews-hub/ReviewsHub'
import {
  DEFAULT_REVIEW_FILTERS,
  REVIEW_BRANDS,
  REVIEW_MATERIALS,
  REVIEW_PRICE_BANDS,
  REVIEW_RESEARCH_STATUSES,
  REVIEW_USE_CASES,
  filterValueSlug,
  valueFromSlug,
} from '#/features/reviews-hub/data'
import type { ReviewFiltersState } from '#/features/reviews-hub/data'
import { buildHubHead } from '#/lib/seo/hub'

interface ReviewsSearch {
  brand?: string
  material?: string
  useCase?: string
  price?: string
  research?: string
}

export const Route = createFileRoute('/reviews/')({
  validateSearch: (search: Record<string, unknown>): ReviewsSearch => {
    const brand = typeof search.brand === 'string' ? search.brand : undefined
    const material = typeof search.material === 'string' ? search.material : undefined
    const useCase = typeof search.useCase === 'string' ? search.useCase : undefined
    const price = typeof search.price === 'string' ? search.price : undefined
    const research =
      typeof search.research === 'string' ? search.research : undefined
    return {
      ...(valueFromSlug(REVIEW_BRANDS, brand, 'All brands') === 'All brands' ? {} : { brand }),
      ...(valueFromSlug(REVIEW_MATERIALS, material, 'All materials') === 'All materials' ? {} : { material }),
      ...(valueFromSlug(REVIEW_USE_CASES, useCase, 'All use cases') === 'All use cases' ? {} : { useCase }),
      ...(valueFromSlug(REVIEW_PRICE_BANDS, price, 'All price bands') === 'All price bands' ? {} : { price }),
      ...(valueFromSlug(
        REVIEW_RESEARCH_STATUSES,
        research,
        'All research statuses',
      ) === 'All research statuses'
        ? {}
        : { research }),
    }
  },
  head: () =>
    buildHubHead({
      title: 'Yoga Gear Reviews | The Yoga Sensei',
      description: 'Filter transparent yoga mat reviews by brand, material, use case, price and research status, with clear trade-offs and alternatives.',
      path: '/reviews',
      name: 'Yoga gear reviews',
    }),
  component: ReviewsIndex,
})

function ReviewsIndex() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  const filters: ReviewFiltersState = hydrated
    ? {
        brand: valueFromSlug(REVIEW_BRANDS, search.brand, 'All brands'),
        material: valueFromSlug(REVIEW_MATERIALS, search.material, 'All materials'),
        useCase: valueFromSlug(REVIEW_USE_CASES, search.useCase, 'All use cases'),
        priceBand: valueFromSlug(REVIEW_PRICE_BANDS, search.price, 'All price bands'),
        researchStatus: valueFromSlug(
          REVIEW_RESEARCH_STATUSES,
          search.research,
          'All research statuses',
        ),
      }
    : DEFAULT_REVIEW_FILTERS

  return (
    <ReviewsHub
      filters={filters}
      onChange={(next) =>
        navigate({
          search: {
            ...(next.brand === 'All brands' ? {} : { brand: filterValueSlug(next.brand) }),
            ...(next.material === 'All materials' ? {} : { material: filterValueSlug(next.material) }),
            ...(next.useCase === 'All use cases' ? {} : { useCase: filterValueSlug(next.useCase) }),
            ...(next.priceBand === 'All price bands' ? {} : { price: filterValueSlug(next.priceBand) }),
            ...(next.researchStatus === 'All research statuses'
              ? {}
              : { research: filterValueSlug(next.researchStatus) }),
          },
          replace: true,
        })
      }
    />
  )
}
