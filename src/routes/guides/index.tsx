import { Link, createFileRoute } from '@tanstack/react-router'
import { listContentSlugs } from '#/lib/mdx/loader'

export const Route = createFileRoute('/guides/')({
  loader: () => ({ slugs: listContentSlugs('guides') }),
  head: () => ({
    meta: [
      { title: 'Guides — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Pillar guides and gear roundups. Yoga for beginners, the gear that actually matters, and the questions every new practitioner asks.',
      },
    ],
  }),
  component: GuidesIndex,
})

function GuidesIndex() {
  const { slugs } = Route.useLoaderData()
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>Guides</h1>
      {slugs.length === 0 ? (
        <p>No guides yet.</p>
      ) : (
        <ul>
          {slugs.map((slug) => (
            <li key={slug}>
              <Link to="/guides/$slug" params={{ slug }}>
                {slug.replace(/-/g, ' ')}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
