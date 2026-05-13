import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gear/')({
  head: () => ({
    meta: [
      { title: 'Yoga Gear & Reviews — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'The mats, blocks, straps, and props we have actually tested. Honest reviews, real testing notes, no review-by-spec-sheet.',
      },
    ],
  }),
  component: GearIndex,
})

function GearIndex() {
  return (
    <main className="prose mx-auto max-w-3xl px-4 py-12">
      <h1>Yoga Gear &amp; Reviews</h1>
      <p>Categories: Mats, Blocks, Straps, Apparel, Travel. First reviews land post-Phase 1.</p>
    </main>
  )
}
