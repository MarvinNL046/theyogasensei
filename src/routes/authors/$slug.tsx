import { createFileRoute, notFound } from '@tanstack/react-router'
import { resolveAuthor } from '#/lib/content/authors'
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
    return {
      meta: [
        { title: `${a.name} — The Yoga Sensei` },
        ...(a.bio ? [{ name: 'description', content: a.bio }] : []),
        { property: 'og:title', content: `${a.name} — The Yoga Sensei` },
        ...(a.bio ? [{ property: 'og:description', content: a.bio }] : []),
        { property: 'og:url', content: canonical },
        { property: 'og:type', content: 'profile' },
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
