import { createFileRoute } from '@tanstack/react-router'
import { PolicyPage } from '#/components/site/PolicyPage'

export const Route = createFileRoute('/medical-review-policy')({
  head: () => ({
    meta: [
      { title: 'Medical Review Policy | The Yoga Sensei' },
      {
        name: 'description',
        content:
          'How The Yoga Sensei handles injury, health and safety-sensitive yoga claims, qualified review and the limits of educational content.',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.theyogasensei.com/medical-review-policy',
      },
    ],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Health and safety"
      title="Educational guidance is not individualized medical care."
      intro="Yoga content can be useful without promising treatment. We identify safety-sensitive claims, use cautious language and keep pages out of search when qualified review is required but unavailable."
      sections={[
        {
          title: 'Claims we avoid',
          body: 'We do not promise that a pose, routine or product will diagnose, cure or prevent a condition. Pain is not treated as proof that a stretch is working, and generic modifications are not presented as suitable for every injury.',
        },
        {
          title: 'Source standard',
          body: 'Health-related factual claims should rely on current medical, academic, government or established professional sources. Anecdotes and manufacturer marketing are not medical evidence.',
        },
        {
          title: 'Qualified review',
          body: 'Content that materially depends on clinical judgment is flagged for qualified review. Under the site’s publishing rules, such a page remains non-indexable until that review is completed.',
        },
        {
          title: 'When to seek help',
          body: 'Readers are encouraged to stop if movement causes sharp, worsening or unusual symptoms and to seek appropriate professional guidance for injuries, pregnancy, recent surgery, balance risk or ongoing health concerns.',
        },
        {
          title: 'Corrections',
          body: 'Safety corrections receive priority. A meaningful change updates the review date and should be documented in the page history.',
        },
      ]}
    />
  ),
})
