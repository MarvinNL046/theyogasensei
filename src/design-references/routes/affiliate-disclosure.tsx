import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/affiliate-disclosure')({
  head: () => ({
    meta: [
      { title: 'Affiliate Disclosure — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'How affiliate partnerships work on The Yoga Sensei. Which programs we are in, what we earn, and what we do not change because of it.',
      },
    ],
  }),
  component: AffiliateDisclosurePage,
})

function AffiliateDisclosurePage() {
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>Affiliate Disclosure</h1>
      <p>
        Placeholder. Full disclosure (programs, rates, what we promise editorially)
        lands before the first /go/ link goes live.
      </p>
    </main>
  )
}
