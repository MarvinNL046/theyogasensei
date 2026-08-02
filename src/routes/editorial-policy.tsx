import { createFileRoute } from '@tanstack/react-router'
import { PolicyPage } from '#/components/site/PolicyPage'

export const Route = createFileRoute('/editorial-policy')({
  head: () => ({
    meta: [
      { title: 'Editorial Policy | The Yoga Sensei' },
      {
        name: 'description',
        content:
          'The editorial standards The Yoga Sensei uses for accuracy, sourcing, independence, safety, authorship and meaningful content updates.',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.theyogasensei.com/editorial-policy',
      },
    ],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Editorial standards"
      title="Clear, useful and honest about uncertainty."
      intro="Our standard is not perfect certainty. It is accurate representation of the best available evidence, with limits and commercial relationships visible."
      sections={[
        {
          title: 'Accuracy and sourcing',
          body: 'Factual claims should be supported by current primary or authoritative sources. Product specifications are checked against official documentation where possible. Health-related language is cautious, specific and never framed as a guaranteed outcome.',
        },
        {
          title: 'Independence',
          body: 'Advertisers, retailers and manufacturers do not approve conclusions or purchase rankings. Affiliate revenue may support the site, but a useful no-purchase option is included when it genuinely solves the reader’s problem.',
        },
        {
          title: 'Authorship and review',
          body: 'Pages identify an author and review date. Credentials are described precisely; we do not imply clinical or teaching qualifications that the author does not hold. Content requiring qualified review remains non-indexable until that review exists.',
        },
        {
          title: 'Originality',
          body: 'Articles synthesize research into concrete decisions, examples and scenarios. We do not reproduce source material at length, fabricate quotes or pad pages merely to hit a word count.',
        },
      ]}
    />
  ),
})
