import { Link, createFileRoute } from '@tanstack/react-router'
import { listContentSlugs } from '#/lib/mdx/loader'

export const Route = createFileRoute('/styles/')({
  loader: () => ({ slugs: listContentSlugs('styles') }),
  head: () => ({
    meta: [
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
      { title: 'Yoga Styles — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Hatha, Vinyasa, Yin, Ashtanga, Iyengar, Restorative — what each style is, who it suits, and where to start.',
      },
    ],
  }),
  component: StylesIndex,
})

function StylesIndex() {
  const { slugs } = Route.useLoaderData()
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>Yoga Styles</h1>
      {slugs.length === 0 ? (
        <p>No style pages yet. First one lands post-Phase 1.</p>
      ) : (
        <ul>
          {slugs.map((slug) => (
            <li key={slug}>
              <Link to="/styles/$slug" params={{ slug }}>
                {slug.replace(/-/g, ' ')}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
