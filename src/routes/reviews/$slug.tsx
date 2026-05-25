// TODO(post-launch): Remove noindex below once the first MDX-backed review
// ships at content/reviews/<slug>.mdx. Today the route 404s gracefully
// (notFound() on missing MDX) and is noindex+nofollow so an empty
// /reviews/$slug never leaks into Google's index. Reference pattern:
// poses/$slug.tsx.

import { createFileRoute, notFound } from '@tanstack/react-router'
import { loadContent, loadFrontmatter } from '#/lib/mdx/loader'
import { resolveAuthor } from '#/lib/content/authors'
import { buildHead, SITE_URL } from '#/lib/seo/head'

export const Route = createFileRoute('/reviews/$slug')({
  loader: ({ params }) => {
    try {
      const { frontmatter } = loadFrontmatter('reviews', params.slug)
      const author = resolveAuthor(frontmatter.author)
      return { frontmatter, author }
    } catch {
      throw notFound()
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    const head = buildHead(loaderData.frontmatter, {
      siteUrl: SITE_URL,
      routePath: `/reviews/${params.slug}`,
      author: loaderData.author,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Reviews', url: '/gear' },
        { name: loaderData.frontmatter.title },
      ],
    })
    // Force noindex,nofollow until the reviews collection has real,
    // editorially-approved MDX content. Override anything buildHead set.
    return {
      ...head,
      meta: [
        ...(head.meta ?? []).filter(
          (m) => !(typeof m === 'object' && m && 'name' in m && m.name === 'robots'),
        ),
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    }
  },
  component: ReviewPage,
})

function ReviewPage() {
  const { frontmatter, author } = Route.useLoaderData()
  const { slug } = Route.useParams()
  const { Component } = loadContent('reviews', slug)
  return (
    <main className="prose prose-stone prose-lg mx-auto max-w-3xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="not-prose mb-6 text-sm text-stone-600">
        <a href="/">Home</a>
        {' › '}
        <a href="/gear">Reviews</a>
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
