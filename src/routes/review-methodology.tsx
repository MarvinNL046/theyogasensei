import { createFileRoute } from '@tanstack/react-router'
import { PolicyPage } from '#/components/site/PolicyPage'

export const Route = createFileRoute('/review-methodology')({
  head: () => ({
    meta: [
      { title: 'Review Methodology | The Yoga Sensei' },
      {
        name: 'description',
        content:
          'How The Yoga Sensei verifies yoga gear specifications, distinguishes research from hands-on use and reaches qualitative product verdicts.',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.theyogasensei.com/review-methodology',
      },
    ],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Product methodology"
      title="A useful verdict starts with an honest evidence boundary."
      intro="We compare the factors that change a purchase while keeping documentation-led research distinct from hands-on testing."
      sections={[
        {
          title: 'Review status',
          body: 'Every review should state its basis. “Personally used” means the author has practised with the product. “Researched from primary sources” means the conclusion is based on official documentation and attributed independent evidence. One status must never be written to sound like the other.',
        },
        {
          title: 'The factors we compare',
          body: 'For yoga mats, the recurring factors are dry and wet grip, cushioning, standing stability, dimensions, weight, surface construction, cleaning, latex relevance and durability evidence. Other categories use their own decision-specific factors.',
        },
        {
          title: 'Why we use qualitative assessments',
          body: 'Strong, Good, Mixed and Limited communicate editorial judgment without implying laboratory precision. Exact decimal scores are inappropriate when every product has not been measured under the same repeatable conditions.',
        },
        {
          title: 'Best for and skip if',
          body: 'A recommendation needs a defined use case and a meaningful limitation. We do not name a universal winner when body, practice style, budget or maintenance tolerance can change the answer.',
        },
        {
          title: 'Commercial links',
          body: 'Affiliate availability does not determine inclusion or placement. Calls to action are visually distinct, and official specification sources remain separate from retailer links.',
        },
      ]}
    />
  ),
})
