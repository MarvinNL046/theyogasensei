import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Curator and gear-tester for The Yoga Sensei. What we test, what we recommend, and what we do not claim to be.',
      },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>About The Yoga Sensei</h1>
      <p>
        Placeholder. Real copy lands in Step 11 (home page) and a follow-up
        about-page pass, written to the voice spec in references/voice.md.
      </p>
    </main>
  )
}
