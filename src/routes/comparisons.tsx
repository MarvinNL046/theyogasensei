import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'
import { buildHubHead } from '#/lib/seo/hub'

export const Route = createFileRoute('/comparisons')({
  head: () =>
    buildHubHead({
      title: 'Yoga Comparisons | The Yoga Sensei',
      description:
        'Practical yoga product, material and practice comparisons with direct answers, scenarios and clearly sourced trade-offs.',
      path: '/comparisons',
      name: 'Yoga comparisons',
    }),
  component: () => (
    <EditorialHub
      eyebrow="Side-by-side decisions"
      title="See the difference that changes your choice."
      intro="Direct answers first, then material facts, real practice scenarios, care implications and sensible decision examples."
      cards={[
        {
          label: 'Material comparison',
          title: 'Cork vs rubber yoga mats',
          description:
            'Compare dry and wet grip, weight, care, latex relevance and durability.',
          href: '/guides/cork-vs-rubber-yoga-mat',
          image: '/images/guides/cork-vs-rubber-yoga-mat/cork-vs-rubber.webp',
        },
        {
          label: 'Product comparison',
          title: 'Manduka PRO vs Liforme',
          description:
            'Dense cushioning and longevity versus immediate grip and alignment marks.',
          href: '/guides/manduka-pro-vs-liforme',
          image: '/images/guides/manduka-pro-vs-liforme/hero.webp',
        },
        {
          label: 'Practice comparison',
          title: 'Hatha vs Vinyasa',
          description:
            'Choose based on pace, transitions, structure and what you want from class.',
          href: '/guides/hatha-vs-vinyasa',
          image: '/images/guides/hatha-vs-vinyasa/hero.webp',
        },
      ]}
      sections={[
        {
          title: 'Manduka vs Lululemon',
          description:
            'Two mainstream premium mats compared by practical factors.',
          href: '/guides/manduka-vs-lululemon-yoga-mat',
        },
        {
          title: 'Alo vs Lululemon',
          description: 'Surface, feel, care and use-case differences.',
          href: '/guides/alo-vs-lululemon-yoga-mat',
        },
        {
          title: 'TPE vs NBR',
          description: 'Lightweight resilience versus thick foam cushioning.',
          href: '/guides/tpe-vs-nbr-yoga-mat',
        },
        {
          title: 'Open-cell vs closed-cell',
          description: 'Grip, absorption and cleaning explained.',
          href: '/guides/open-cell-vs-closed-cell-yoga-mat',
        },
        {
          title: 'Yoga mat vs exercise mat',
          description: 'Why dimensions and stability change the experience.',
          href: '/guides/yoga-mat-vs-exercise-mat',
        },
        {
          title: 'Yoga rug vs mat',
          description: 'Traditional texture compared with modern cushioning.',
          href: '/guides/yoga-rug-vs-mat',
        },
      ]}
    />
  ),
})
