import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'
import { buildHubHead } from '#/lib/seo/hub'

export const Route = createFileRoute('/gear/yoga-mats')({
  head: () =>
    buildHubHead({
      title: 'Yoga Mat Guides | The Yoga Sensei',
      description:
        'Choose a yoga mat by material, grip, thickness, size, weight and care—not by marketing claims.',
      path: '/gear/yoga-mats',
      name: 'Yoga mat guides',
    }),
  component: () => (
    <EditorialHub
      eyebrow="Yoga mat library"
      title="Choose the surface beneath your practice."
      intro="Start with the way you practise, then compare grip, cushioning, material, dimensions and care. A more expensive mat is not automatically a better fit."
      cards={[
        {
          label: 'Decision framework',
          title: 'How to choose a yoga mat',
          description:
            'Work through material, thickness, grip, size and durability in the right order.',
          href: '/guides/how-to-choose-a-yoga-mat',
          image: '/images/guides/how-to-choose-a-yoga-mat/materials.webp',
        },
        {
          label: 'Independent shortlist',
          title: 'Best yoga mats',
          description:
            'Compare well-known mats by concrete use case and meaningful trade-off.',
          href: '/reviews/best-yoga-mats',
          image: '/images/brand/review-hero-best-mats.webp',
        },
        {
          label: 'Material decision',
          title: 'Cork vs rubber',
          description:
            'Dry and wet grip, weight, latex relevance and care side by side.',
          href: '/guides/cork-vs-rubber-yoga-mat',
          image: '/images/guides/cork-vs-rubber-yoga-mat/cork-vs-rubber.webp',
        },
      ]}
      sections={[
        {
          title: 'Mat materials',
          description: 'Cork, natural rubber, PVC, TPE, NBR and PU explained.',
          href: '/guides/natural-rubber-yoga-mat',
        },
        {
          title: 'Thickness',
          description: 'Balance floor comfort with standing stability.',
          href: '/guides/how-thick-should-a-yoga-mat-be',
        },
        {
          title: 'Size',
          description:
            'Choose length and width for your body and practice space.',
          href: '/guides/yoga-mat-size',
        },
        {
          title: 'Weight',
          description: 'Set a realistic carry limit before comparing products.',
          href: '/guides/yoga-mat-weight',
        },
        {
          title: 'Cleaning',
          description: 'Match the cleaning method to the surface construction.',
          href: '/guides/how-to-clean-a-yoga-mat',
        },
        {
          title: 'Individual reviews',
          description: 'See best-for, skip-if and source status for each mat.',
          href: '/reviews',
        },
      ]}
    />
  ),
})
