import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'
import { buildHubHead } from '#/lib/seo/hub'

export const Route = createFileRoute('/brands')({
  head: () =>
    buildHubHead({
      title: 'Yoga Mat Brands and Reviews | The Yoga Sensei',
      description:
        'Browse independent yoga mat reviews and brand comparisons with research status, specifications, care and practical compromises shown.',
      path: '/brands',
      name: 'Yoga mat brands',
    }),
  component: () => (
    <EditorialHub
      eyebrow="Brand library"
      title="Compare the product, not the size of the logo."
      intro="Each route separates current specifications from editorial inference and clearly labels whether a mat was personally used or documentation-led."
      cards={[
        {
          label: 'Documentation-led review',
          title: 'Manduka PRO',
          description:
            'Dense PVC support, a long break-in period and substantial carry weight.',
          href: '/reviews/manduka-pro',
          image: '/images/brand/pick-manduka-pro.webp',
        },
        {
          label: 'Documentation-led review',
          title: 'Liforme Original',
          description:
            'Alignment marks, immediate grip and a premium-price service-life trade-off.',
          href: '/reviews/liforme',
          image: '/images/reviews/liforme/hero.webp',
        },
        {
          label: 'Personally used',
          title: 'Lululemon The Mat',
          description:
            'Reversible grip, versatile cushioning and a maintenance-sensitive surface.',
          href: '/reviews/lululemon',
          image: '/images/guides/lululemon-yoga-mat/hero.webp',
        },
      ]}
      sections={[
        { title: 'Alo', description: 'The Warrior Mat and its oversized home-studio format.', href: '/reviews/alo' },
        { title: 'JadeYoga', description: 'Natural-rubber traction, latex relevance and care.', href: '/reviews/jade' },
        { title: 'Gaiam', description: 'Entry-level PVC options and realistic limitations.', href: '/reviews/gaiam' },
        { title: 'Retrospec', description: 'Thick cushioning balanced against standing stability.', href: '/reviews/retrospec' },
        { title: 'Manduka GRP', description: 'Wet-grip construction with strict care requirements.', href: '/reviews/manduka-grp-adapt' },
        { title: 'All brand comparisons', description: 'See product-to-product decisions across the library.', href: '/comparisons' },
      ]}
    />
  ),
})
