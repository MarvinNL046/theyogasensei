import { createFileRoute } from '@tanstack/react-router'
import { PolicyPage } from '#/components/site/PolicyPage'
export const Route = createFileRoute('/how-we-research')({
  head: () => ({
    meta: [
      { title: 'How We Research | The Yoga Sensei' },
      {
        name: 'description',
        content:
          'How The Yoga Sensei researches yoga gear and practice guidance, verifies claims, labels evidence, handles affiliate links and documents updates.',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.theyogasensei.com/how-we-research',
      },
    ],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Our methodology"
      title="Useful advice should show its work."
      intro="We separate what we know, what a manufacturer says and what we infer. That distinction matters more than sounding certain."
      sections={[
        {
          title: 'How a guide starts',
          body: 'We define the reader’s decision and search intent, then check whether an existing page already answers it. Research begins with primary sources: manufacturer specifications and care instructions for products, and established medical, academic or professional sources for safety-sensitive practice claims.',
        },
        {
          title: 'How we describe evidence',
          body: 'Manufacturer specification — a dimension, material or feature stated by the maker.\nOfficial care guidance — cleaning or storage instructions from the maker.\nIndependent evidence — a measurement or finding published by a credible third party.\nPractitioner observation — clearly attributed first-hand experience.\nEditorial inference — our reasoned interpretation of the available facts, labelled as such.',
        },
        {
          title: 'What we do not claim',
          body: 'We do not invent hands-on tests, lab measurements, certifications, prices, availability or user experiences. If a review is based on primary-source research rather than personal use, the page should say so. Yoga guidance is educational and does not replace individualized medical care.',
        },
        {
          title: 'How recommendations are made',
          body: 'A shortlist is organized by use case rather than one universal winner. We compare the factors that change the decision—such as grip, cushioning, stability, weight, care and material sensitivities—and state a meaningful limitation for each recommendation. Commercial relationships do not buy placement.',
        },
        {
          title: 'Updates and corrections',
          body: 'Important pages show when they were reviewed. Meaningful changes—such as a replaced product, revised specification or corrected safety statement—should be documented in an update note. Readers can report unclear or outdated details through the contact page.',
        },
        {
          title: 'Affiliate independence',
          body: 'Some buying links may earn The Yoga Sensei a commission at no extra cost to the reader. Editorial pages are written to remain useful without a purchase, and affiliate calls to action are visually distinct from informational links.',
        },
      ]}
    />
  ),
})
