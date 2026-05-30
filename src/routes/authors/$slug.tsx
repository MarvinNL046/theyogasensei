import { createFileRoute, notFound } from '@tanstack/react-router'
import { resolveAuthor } from '#/lib/content/authors'
import { buildAbsoluteImageUrl } from '#/lib/images/variants'
import { buildPersonSchema } from '#/lib/seo/schema'
import { SITE_URL } from '#/lib/seo/head'

export const Route = createFileRoute('/authors/$slug')({
  loader: ({ params }) => {
    try {
      const author = resolveAuthor(params.slug)
      return { author }
    } catch {
      throw notFound()
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    const a = loaderData.author
    const canonical = `${SITE_URL.replace(/\/$/, '')}/authors/${params.slug}`
    const image = a.image
      ? buildAbsoluteImageUrl(a.image, 'og', SITE_URL)
      : 'https://www.theyogasensei.com/images/brand/avatar-yoga-sensei.webp'
    // Concise, SERP-length description (the full bio renders on the page itself).
    const description = `${a.name} of The Yoga Sensei — a long-time practitioner, not a certified instructor, who writes and edits every honest yoga gear guide on the site.`
    return {
      meta: [
        { title: `${a.name} — The Yoga Sensei` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${a.name} — The Yoga Sensei` },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonical },
        { property: 'og:type', content: 'profile' },
        { property: 'og:image', content: image },
        { property: 'og:site_name', content: 'The Yoga Sensei' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${a.name} — The Yoga Sensei` },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
      ],
      links: [{ rel: 'canonical', href: canonical }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(buildPersonSchema(a, SITE_URL)),
        },
      ],
    }
  },
  component: AuthorPage,
})

function AuthorPage() {
  const { author } = Route.useLoaderData()
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>{author.name}</h1>
      {author.jobTitle && <p className="text-stone-600">{author.jobTitle}</p>}
      {author.bio && <p>{author.bio}</p>}
      {author.knowsAbout && (
        <>
          <h2>Topics</h2>
          <ul>
            {author.knowsAbout.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}
