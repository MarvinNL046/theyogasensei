import { Link, createFileRoute } from '@tanstack/react-router'
import { listContentSlugs } from '#/lib/mdx/loader'

export const Route = createFileRoute('/gear/$category/')({
  loader: ({ params }) => {
    const allSlugs = listContentSlugs('gear')
    const filtered = allSlugs
      .filter((s) => s.startsWith(`${params.category}/`))
      .map((s) => s.slice(params.category.length + 1))
    return { slugs: filtered, category: params.category }
  },
  head: ({ params }) => ({
    meta: [
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
      { title: `${capitalise(params.category)} — The Yoga Sensei` },
      {
        name: 'description',
        content: `Reviews and buying guides for yoga ${params.category}. Tested, not just spec-quoted.`,
      },
    ],
  }),
  component: GearCategoryIndex,
})

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function GearCategoryIndex() {
  const { slugs, category } = Route.useLoaderData()
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>{capitalise(category)}</h1>
      {slugs.length === 0 ? (
        <p>No reviews in this category yet.</p>
      ) : (
        <ul>
          {slugs.map((slug) => (
            <li key={slug}>
              <Link to="/gear/$category/$slug" params={{ category, slug }}>
                {slug.replace(/-/g, ' ')}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
