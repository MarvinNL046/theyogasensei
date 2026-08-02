import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PracticeHub } from '#/features/practice-hub/PracticeHub'
import {
  DEFAULT_PRACTICE_FILTERS,
  PRACTICE_EXPERIENCE,
  PRACTICE_GOALS,
  PRACTICE_TIMES,
  filterSlug,
  practiceValueFromSlug,
} from '#/features/practice-hub/data'
import type { PracticeFilters } from '#/features/practice-hub/data'
import { buildHubHead } from '#/lib/seo/hub'

interface PracticeSearch {
  goal?: string
  time?: string
  experience?: string
}

export const Route = createFileRoute('/practice')({
  validateSearch: (search: Record<string, unknown>): PracticeSearch => {
    const goal = typeof search.goal === 'string' ? search.goal : undefined
    const time = typeof search.time === 'string' ? search.time : undefined
    const experience =
      typeof search.experience === 'string' ? search.experience : undefined
    return {
      ...(practiceValueFromSlug(PRACTICE_GOALS, goal, 'All goals') ===
      'All goals'
        ? {}
        : { goal }),
      ...(practiceValueFromSlug(PRACTICE_TIMES, time, 'Any duration') ===
      'Any duration'
        ? {}
        : { time }),
      ...(practiceValueFromSlug(
        PRACTICE_EXPERIENCE,
        experience,
        'All experience levels',
      ) === 'All experience levels'
        ? {}
        : { experience }),
    }
  },
  head: () =>
    buildHubHead({
      title: 'Yoga Practice Guides | The Yoga Sensei',
      description:
        'Filter safe, practical yoga routines, poses and beginner guides by goal, time available and experience level.',
      path: '/practice',
      name: 'Yoga practice guides',
    }),
  component: PracticeIndex,
})

function PracticeIndex() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  const filters: PracticeFilters = hydrated
    ? {
        goal: practiceValueFromSlug(PRACTICE_GOALS, search.goal, 'All goals'),
        time: practiceValueFromSlug(
          PRACTICE_TIMES,
          search.time,
          'Any duration',
        ),
        experience: practiceValueFromSlug(
          PRACTICE_EXPERIENCE,
          search.experience,
          'All experience levels',
        ),
      }
    : DEFAULT_PRACTICE_FILTERS
  return (
    <PracticeHub
      filters={filters}
      onChange={(next) =>
        navigate({
          search: {
            ...(next.goal === 'All goals'
              ? {}
              : { goal: filterSlug(next.goal) }),
            ...(next.time === 'Any duration'
              ? {}
              : { time: filterSlug(next.time) }),
            ...(next.experience === 'All experience levels'
              ? {}
              : { experience: filterSlug(next.experience) }),
          },
          replace: true,
        })
      }
    />
  )
}
