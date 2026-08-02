import { createFileRoute } from '@tanstack/react-router'
import { PolicyPage } from '#/components/site/PolicyPage'

export const Route = createFileRoute('/ai-imagery-policy')({
  head: () => ({
    meta: [
      { title: 'AI Imagery Policy | The Yoga Sensei' },
      {
        name: 'description',
        content:
          'How The Yoga Sensei uses generated editorial imagery without presenting it as product evidence, testing or medical instruction.',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://www.theyogasensei.com/ai-imagery-policy',
      },
    ],
  }),
  component: () => (
    <PolicyPage
      eyebrow="Visual transparency"
      title="Illustration is not evidence."
      intro="Generated visuals can make an explanation clearer, but they must never imply that a product was tested or that a pictured body position is individualized medical instruction."
      sections={[
        {
          title: 'Where generated imagery may appear',
          body: 'We may use original generated imagery for editorial hero images, calm contextual scenes and explanatory visuals when suitable licensed photography is unavailable. Alt text describes the useful visual content rather than the generation method.',
        },
        {
          title: 'Where it must not mislead',
          body: 'Generated product scenes are not proof of dimensions, color accuracy, packaging, hands-on use or performance. Pose imagery is reviewed for obvious anatomical errors and is paired with written cues and safety nuance.',
        },
        {
          title: 'How visuals are checked',
          body: 'Images are inspected before publication for malformed anatomy, incorrect text, misleading product details and visual artifacts. Decorative imagery is kept separate from cited factual claims.',
        },
      ]}
    />
  ),
})
