import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'
import { buildHubHead } from '#/lib/seo/hub'

export const Route = createFileRoute('/materials')({
  head: () =>
    buildHubHead({
      title: 'Yoga Mat Materials | The Yoga Sensei',
      description:
        'Compare yoga mat materials by grip, cushioning, weight, care, durability and allergy relevance before choosing a surface.',
      path: '/materials',
      name: 'Yoga mat materials',
    }),
  component: () => (
    <EditorialHub
      eyebrow="Material library"
      title="Understand the surface before choosing the mat."
      intro="Material names are useful only when they explain grip, support, cleaning and the compromises you will notice in practice."
      cards={[
        {
          label: 'Natural material',
          title: 'Natural-rubber yoga mats',
          description:
            'Traction, weight, latex relevance and the care that rubber requires.',
          href: '/guides/natural-rubber-yoga-mat',
          image: '/images/guides/natural-rubber-yoga-mat/hero.webp',
        },
        {
          label: 'Plant-based surface',
          title: 'Cork yoga mats',
          description:
            'How cork behaves when dry, damp and paired with different bases.',
          href: '/guides/cork-yoga-mat',
          image: '/images/guides/cork-yoga-mat/hero.webp',
        },
        {
          label: 'Lightweight foam',
          title: 'TPE yoga mats',
          description:
            'Low weight and accessible cushioning with durability caveats.',
          href: '/guides/tpe-yoga-mat',
          image: '/images/guides/tpe-yoga-mat/hero.webp',
        },
      ]}
      sections={[
        { title: 'PVC', description: 'Dense support, closed cells and long service-life claims.', href: '/guides/pvc-yoga-mat' },
        { title: 'NBR foam', description: 'Thick cushioning with less standing stability.', href: '/guides/nbr-yoga-mat' },
        { title: 'Polyurethane', description: 'Immediate grip paired with precise care requirements.', href: '/guides/pu-yoga-mat' },
        { title: 'Jute', description: 'Natural texture, blended constructions and cleaning limits.', href: '/guides/jute-yoga-mat' },
        { title: 'Wool', description: 'Warmth and comfort for slower floor-based practices.', href: '/guides/wool-yoga-mat' },
        { title: 'Open-cell vs closed-cell', description: 'Absorption, grip and cleaning compared directly.', href: '/guides/open-cell-vs-closed-cell-yoga-mat' },
      ]}
    />
  ),
})
