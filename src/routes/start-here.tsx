import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/start-here')({
  head: () => ({
    meta: [
      { title: 'Start Here — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'New to yoga? Start here. The 7-day beginner path, the gear that actually matters, and the first ten poses to learn.',
      },
    ],
  }),
  component: StartHerePage,
})

function StartHerePage() {
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>Start Here</h1>
      <p>Placeholder funnel entry. Real copy lands post-Phase 1.</p>
    </main>
  )
}
