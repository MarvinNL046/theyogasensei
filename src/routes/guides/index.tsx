import { createFileRoute } from '@tanstack/react-router'
import { SITE_URL } from '#/lib/seo/head'
import { listGuides } from '#/features/guides-index/data'
import { GuidesIndexView } from '#/features/guides-index/GuidesIndexView'

const TITLE = 'Yoga Mat Guides — Honest Buying Advice | The Yoga Sensei'
const DESCRIPTION =
  'Honest yoga mat guides from a long-time practitioner — buying guides, comparisons, reviews and care notes. Research-led, never invented testing.'
const CANONICAL = `${SITE_URL}/guides`

export const Route = createFileRoute('/guides/')({
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
  return <GuidesIndexView data={data} />
}
