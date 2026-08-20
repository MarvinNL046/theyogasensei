import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'
import { buildHubHead } from '#/lib/seo/hub'

export const Route = createFileRoute('/gear/')({
  head: () =>
    buildHubHead({
      title: 'Yoga Gear Guides | The Yoga Sensei',
      description:
        'Understand yoga mats, props, meditation gear, storage, cleaning and travel equipment before deciding what is worth buying.',
      path: '/gear',
      name: 'Yoga gear guides',
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
          href: '/gear/yoga-mats',
          image: '/images/guides/how-to-choose-a-yoga-mat/materials.webp',
        },
        {
          label: 'Props',
          title: 'Yoga props explained',
          description:
            'Blocks, straps, bolsters and blankets—plus when household alternatives work.',
          href: '/gear/props',
          image: '/images/brand/pick-cork-blocks.webp',
        },
        {
          label: 'Meditation',
          title: 'Set up a calm practice space',
          description:
            'Choose supportive seating and skip decorative clutter that does not help.',
          href: '/gear/meditation',
          image: '/images/brand/topic-meditation.webp',
        },
      ]}
      sections={[
        {
          title: 'Yoga mats',
          description: 'Buying, material, sizing and care guidance.',
          href: '/gear/yoga-mats',
        },
        {
          title: 'Props',
          description:
            'Blocks, straps, bolsters, blankets and specialist support.',
          href: '/gear/props',
        },
        {
          title: 'Meditation',
          description: 'Cushions, benches, chairs, mats and timers.',
          href: '/gear/meditation',
        },
        {
          title: 'Travel',
          description:
            'Foldable mats, carrying systems and packing trade-offs.',
          href: '/gear/travel',
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
