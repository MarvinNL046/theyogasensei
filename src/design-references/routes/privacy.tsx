import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'How The Yoga Sensei collects, uses, and protects your data. Newsletter subscriptions, analytics, and affiliate-link tracking.',
      },
    ],
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>Privacy Policy</h1>
      <p>
        Placeholder. Full policy goes here before the first newsletter
        subscriber lands.
      </p>
    </main>
  )
}
