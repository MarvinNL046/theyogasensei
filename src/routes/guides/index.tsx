import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SITE_URL } from '#/lib/seo/head'
import {
  GUIDE_CATEGORIES,
  categoryFromSlug,
  categorySlug,
  listGuides,
} from '#/features/guides-index/data'
import { GuidesIndexView } from '#/features/guides-index/GuidesIndexView'

interface GuidesSearch {
  category?: string
}

const TITLE = 'Yoga Mat Guides — Honest Buying Advice | The Yoga Sensei'
const DESCRIPTION =
  'Honest yoga mat guides from a long-time practitioner — buying guides, comparisons, reviews and care notes. Research-led, never invented testing.'
const CANONICAL = `${SITE_URL}/guides`

export const Route = createFileRoute('/guides/')({
  // Client-side filter state lives in the URL (?category=care) so it is
  // shareable + deep-linkable. The loader never reads this (SSG-safe); only
  // the component does. Unknown / 'all' values normalise to a clean /guides.
  validateSearch: (search: Record<string, unknown>): GuidesSearch => {
    const raw =
      typeof search.category === 'string' ? search.category : undefined
    const known =
      raw !== undefined &&
      GUIDE_CATEGORIES.some((c) => c !== 'All' && categorySlug(c) === raw)
    return known ? { category: raw } : {}
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:url', content: CANONICAL },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:image',
        content: `${SITE_URL}/images/brand/journal-hero-bg.webp`,
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: TITLE },
      { name: 'twitter:description', content: DESCRIPTION },
      {
        name: 'twitter:image',
        content: `${SITE_URL}/images/brand/journal-hero-bg.webp`,
      },
    ],
    links: [{ rel: 'canonical', href: CANONICAL }],
  }),
  loader: () => ({ data: listGuides() }),
  component: GuidesIndexPage,
})

function GuidesIndexPage() {
  const { data } = Route.useLoaderData()
  const { category } = Route.useSearch()
  const navigate = Route.useNavigate()
  // Defer the URL-driven category until after hydration so the first client
  // render matches the prerendered "All" HTML — avoids a hydration mismatch on
  // direct ?category= deep-links. The brief All → category flash is acceptable.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  const active = hydrated ? categoryFromSlug(category) : 'All'

  return (
    <GuidesIndexView
      data={data}
      active={active}
      onSelect={(c) =>
        navigate({
          search: c === 'All' ? {} : { category: categorySlug(c) },
          replace: true,
        })
      }
    />
  )
}
