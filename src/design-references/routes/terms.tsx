import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Terms of Use — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'The terms that govern using The Yoga Sensei: content rights, disclaimers, and liability scope.',
      },
    ],
  }),
  component: TermsPage,
})

function TermsPage() {
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>Terms of Use</h1>
      <p>Placeholder. Full terms go here before launch.</p>
    </main>
  )
}
