import { createFileRoute, notFound } from '@tanstack/react-router'
import { loadContent, loadFrontmatter } from '#/lib/mdx/loader'
import { resolveAuthor } from '#/lib/content/authors'
import { buildHead, SITE_URL } from '#/lib/seo/head'

export const Route = createFileRoute('/styles/$slug')({
  loader: ({ params }) => {
    try {
      const { frontmatter } = loadFrontmatter('styles', params.slug)
      const author = resolveAuthor(frontmatter.author)
      return { frontmatter, author }
    } catch {
      throw notFound()
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    return buildHead(loaderData.frontmatter, {
      siteUrl: SITE_URL,
      routePath: `/styles/${params.slug}`,
      author: loaderData.author,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Styles', url: '/styles' },
        { name: loaderData.frontmatter.title },
      ],
    })
  },
  component: StylePage,
})

function StylePage() {
  const { frontmatter, author } = Route.useLoaderData()
  const { slug } = Route.useParams()
  const { Component } = loadContent('styles', slug)
  return (
    <main className="prose prose-lg mx-auto max-w-3xl px-4 py-12">
      <nav
        aria-label="Breadcrumb"
        className="not-prose mb-6 text-sm text-stone-600"
      >
        <a href="/">Home</a>
        {' › '}
        <a href="/styles">Styles</a>
        {' › '}
        <span>{frontmatter.title}</span>
      </nav>
      <h1>{frontmatter.title}</h1>
      <p className="not-prose text-sm text-stone-600">
        by {author.name} · Last reviewed {frontmatter.lastReviewedAt}
      </p>
      <Component />
    </main>
  )
}
