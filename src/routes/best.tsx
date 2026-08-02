import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'

export const Route = createFileRoute('/best')({
  head: () => ({
    meta: [
      { title: 'Best Yoga Gear | The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Independent yoga gear shortlists organized by real use case, with materials, trade-offs and source-backed specifications clearly explained.',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://www.theyogasensei.com/best' }],
  }),
  component: () => (
    <EditorialHub
      eyebrow="Independent shortlists"
      title="The right gear for your practice—not more gear."
      intro="Every shortlist starts with the use case, explains the main compromise and includes a no-purchase alternative where one genuinely helps."
      cards={[
        {
          label: 'Flagship guide',
          title: 'Best yoga mats',
          description:
            'Seven well-known mats compared by grip, cushion, material and portability.',
          href: '/reviews/best-yoga-mats',
          image: '/images/brand/review-hero-best-mats.webp',
        },
        {
          label: 'Best for beginners',
          title: 'Beginner yoga mats',
          description:
            'Stable, practical options without paying for features you may not need.',
          href: '/guides/best-yoga-mat-for-beginners',
          image: '/images/guides/best-yoga-mat-for-beginners/hero.webp',
        },
        {
          label: 'Joint comfort',
          title: 'Mats for sensitive knees',
          description:
            'Balance cushioning with the stability your standing poses still require.',
          href: '/guides/best-yoga-mat-for-bad-knees',
          image: '/images/guides/best-yoga-mat-for-bad-knees/hero.webp',
        },
      ]}
      sections={[
        {
          title: 'Hot-yoga mats',
          description: 'Prioritize wet grip and realistic cleaning.',
          href: '/guides/best-yoga-mat-for-hot-yoga',
        },
        {
          title: 'Foldable mats',
          description:
            'Portable options and the trade-offs of thin construction.',
          href: '/guides/best-foldable-yoga-mat',
        },
        {
          title: 'Yoga blocks',
          description: 'Foam and cork options for support and stability.',
          href: '/guides/best-yoga-blocks',
        },
        {
          title: 'Yoga bolsters',
          description: 'Shape, fill and firmness for restorative practice.',
          href: '/guides/best-yoga-bolster',
        },
        {
          title: 'Meditation cushions',
          description: 'Seat height, fill and posture considerations.',
          href: '/guides/best-meditation-cushion',
        },
        {
          title: 'Yoga mat towels',
          description: 'When a towel helps and when it becomes extra clutter.',
          href: '/guides/best-yoga-mat-towel',
        },
      ]}
    />
  ),
})
