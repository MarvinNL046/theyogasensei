import { createFileRoute } from '@tanstack/react-router'
import { PolicyPage } from '#/components/site/PolicyPage'
export const Route = createFileRoute('/corrections-policy')({
  head: () => ({
    meta: [
      { title: 'Corrections Policy | The Yoga Sensei' },
      {
        name: 'description',
        content:
          'How The Yoga Sensei reviews reader feedback, corrects factual errors and documents meaningful editorial changes.',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.theyogasensei.com/corrections-policy',
      },
    ],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Corrections"
      title="When something is wrong, we fix it clearly."
      intro="A quiet correction still needs a real process. We prioritize errors that could change a safety decision, purchase or understanding of the evidence."
      sections={[
        {
          title: 'What to report',
          body: 'Send the page URL, the exact statement that appears wrong or unclear, and a reliable supporting source when available. Broken links, changed specifications and unclear disclosures are also useful reports.',
        },
        {
          title: 'How we assess a report',
          body: 'We check the cited claim against primary or authoritative sources and the version currently on the page. A disagreement in preference is not automatically a factual error, but unclear separation between fact and opinion is worth correcting.',
        },
        {
          title: 'How changes appear',
          body: 'Typos may be fixed without a note. Material corrections and recommendation changes should update the review date and add a concise revision note explaining what changed. We do not erase a substantial mistake without acknowledging it.',
        },
      ]}
    />
  ),
})
