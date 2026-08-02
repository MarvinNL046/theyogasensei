import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'
import { buildHubHead } from '#/lib/seo/hub'

export const Route = createFileRoute('/practice')({
  head: () =>
    buildHubHead({
      title: 'Yoga Practice Guides | The Yoga Sensei',
      description:
        'Build a safe, sustainable yoga practice with beginner routines, chair yoga, morning yoga, balance and flexibility guidance.',
      path: '/practice',
      name: 'Yoga practice guides',
    }),
  component: () => (
    <EditorialHub
      eyebrow="Practice library"
      title="Build a practice that fits real life."
      intro="Choose by goal, time and experience—not by pressure to perform. These guides pair concrete routines with modifications and clear safety context."
      cards={[
        {
          label: 'Begin here',
          title: 'Yoga for beginners',
          description:
            'Set up your first calm home practice, learn foundational poses and avoid common early mistakes.',
          href: '/guides/yoga-for-beginners',
          image: '/images/guides/yoga-for-beginners/hero.webp',
        },
        {
          label: '10-minute routine',
          title: 'Morning yoga',
          description:
            'A short sequence for days when consistency matters more than intensity.',
          href: '/guides/morning-yoga-routine',
          image: '/images/brand/article-hero-morning-yoga.webp',
        },
        {
          label: 'Gentle practice',
          title: 'Chair yoga',
          description:
            'A safety-aware seated starting point with practical variations.',
          href: '/guides/chair-yoga-for-beginners',
          image: '/images/guides/chair-yoga-for-beginners/hero.webp',
        },
      ]}
      sections={[
        {
          title: 'Start as a beginner',
          description: 'Foundations, setup and a manageable first routine.',
          href: '/starter-guide',
        },
        {
          title: 'Choose by time available',
          description: 'Short routines for mornings and busy days.',
          href: '/guides/morning-yoga-routine',
        },
        {
          title: 'Practise with a chair',
          description: 'Seated variations and clear safety notes.',
          href: '/guides/chair-yoga-for-seniors',
        },
        {
          title: 'Compare yoga styles',
          description:
            'Understand how Hatha and Vinyasa differ in pace and structure.',
          href: '/guides/hatha-vs-vinyasa',
        },
        {
          title: 'Learn individual poses',
          description: 'Step-by-step cues, modifications and common mistakes.',
          href: '/poses',
        },
        {
          title: 'Choose helpful props',
          description: 'Use support when it solves a real practice problem.',
          href: '/guides/yoga-props',
        },
      ]}
    />
  ),
})
