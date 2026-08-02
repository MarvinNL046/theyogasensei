import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'
import { buildHubHead } from '#/lib/seo/hub'

export const Route = createFileRoute('/reviews/')({
  head: () =>
    buildHubHead({
      title: 'Yoga Gear Reviews | The Yoga Sensei',
      description:
        'Transparent yoga mat reviews with clear best-for and skip-if advice, verified specifications, trade-offs and practical alternatives.',
      path: '/reviews',
      name: 'Yoga gear reviews',
    }),
  component: () => (
    <EditorialHub
      eyebrow="Product reviews"
      title="Clear verdicts, with the limits shown."
      intro="We distinguish first-hand use from documentation-led research and never invent testing. Start with who a product suits, who should skip it and the compromise that matters most."
      cards={[
        {
          label: 'High cushioning',
          title: 'Manduka PRO review',
          description:
            'Dense support and longevity evidence, balanced against weight and a slower break-in.',
          href: '/reviews/manduka-pro',
          image: '/images/brand/pick-manduka-pro.webp',
        },
        {
          label: 'Alignment system',
          title: 'Liforme review',
          description:
            'A grippy premium mat with useful markings and a substantial price trade-off.',
          href: '/reviews/liforme',
          image: '/images/reviews/liforme/hero.webp',
        },
        {
          label: 'Natural rubber',
          title: 'Jade Harmony review',
          description:
            'Strong traction and a simpler construction, with latex and care considerations.',
          href: '/reviews/jade',
          image: '/images/guides/jade-yoga-mat/hero.webp',
        },
      ]}
      sections={[
        {
          title: 'Lululemon The Mat',
          description: 'Reversible grip and care considerations.',
          href: '/reviews/lululemon',
        },
        {
          title: 'Manduka GRP Adapt',
          description:
            'A sweat-focused surface with specific maintenance needs.',
          href: '/reviews/manduka-grp-adapt',
        },
        {
          title: 'Alo Warrior Mat',
          description: 'A premium polyurethane-topped option.',
          href: '/reviews/alo',
        },
        {
          title: 'Gaiam mats',
          description: 'Budget-friendly context and realistic limitations.',
          href: '/reviews/gaiam',
        },
        {
          title: 'Retrospec Solana',
          description: 'Extra cushioning versus standing stability.',
          href: '/reviews/retrospec',
        },
        {
          title: 'Compare all leading mats',
          description: 'See the flagship shortlist and decision framework.',
          href: '/reviews/best-yoga-mats',
        },
      ]}
    />
  ),
})
