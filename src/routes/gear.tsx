import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'

export const Route = createFileRoute('/gear')({
  head: () => ({
    meta: [
      { title: 'Yoga Gear Guides | The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Understand yoga mats, props, meditation gear, storage, cleaning and travel equipment before deciding what is worth buying.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://www.theyogasensei.com/gear' }],
  }),
  component: () => (
    <EditorialHub
      eyebrow="Gear library"
      title="Understand the gear before you buy it."
      intro="Material explainers, care instructions and practical buying frameworks—organized around the problem you need to solve."
      cards={[
        {
          label: 'Start here',
          title: 'How to choose a yoga mat',
          description:
            'A decision framework for material, thickness, grip, size and durability.',
          href: '/guides/how-to-choose-a-yoga-mat',
          image: '/images/guides/how-to-choose-a-yoga-mat/materials.webp',
        },
        {
          label: 'Props',
          title: 'Yoga props explained',
          description:
            'Blocks, straps, bolsters and blankets—plus when household alternatives work.',
          href: '/guides/yoga-props',
          image: '/images/brand/pick-cork-blocks.webp',
        },
        {
          label: 'Meditation',
          title: 'Set up a calm practice space',
          description:
            'Choose supportive seating and skip decorative clutter that does not help.',
          href: '/guides/meditation-room-accessories',
          image: '/images/brand/topic-meditation.webp',
        },
      ]}
      sections={[
        {
          title: 'Yoga mat materials',
          description: 'Cork, rubber, PVC, TPE, NBR and PU explained.',
          href: '/guides/cork-vs-rubber-yoga-mat',
        },
        {
          title: 'Thickness and cushioning',
          description: 'Match floor feel to stability and joint comfort.',
          href: '/guides/how-thick-should-a-yoga-mat-be',
        },
        {
          title: 'Cleaning and care',
          description: 'Use the right method for the mat surface.',
          href: '/guides/how-to-clean-a-yoga-mat',
        },
        {
          title: 'Storage',
          description: 'Keep a mat dry, unwarped and easy to reach.',
          href: '/guides/how-to-store-a-yoga-mat',
        },
        {
          title: 'Travel and carrying',
          description: 'Bags, straps and folding trade-offs.',
          href: '/guides/best-yoga-mat-bag',
        },
        {
          title: 'Independent shortlists',
          description: 'Browse gear selected by concrete use case.',
          href: '/best',
        },
      ]}
    />
  ),
})
