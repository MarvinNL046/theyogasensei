import { Link, createFileRoute } from '@tanstack/react-router'
import { listContentSlugs } from '#/lib/mdx/loader'

export const Route = createFileRoute('/poses/')({
  loader: () => ({ slugs: listContentSlugs('poses') }),
  head: () => ({
    meta: [
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
      { title: 'Yoga Poses — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'A growing library of yoga poses — step-by-step guides, common mistakes, and modifications for beginners.',
      },
    ],
  }),
  component: PosesIndex,
})

function PosesIndex() {
  const { slugs } = Route.useLoaderData()
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>Yoga Poses</h1>
      {slugs.length === 0 ? (
        <p>No pose pages yet. The first one lands in Phase 1 Step 9.</p>
      ) : (
        <ul>
          {slugs.map((slug) => (
            <li key={slug}>
              <Link to="/poses/$slug" params={{ slug }}>
                {slug.replace(/-/g, ' ')}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
