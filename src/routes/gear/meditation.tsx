import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'
import { buildHubHead } from '#/lib/seo/hub'

export const Route = createFileRoute('/gear/meditation')({
  head: () => buildHubHead({ title: 'Meditation Gear Guides | The Yoga Sensei', description: 'Choose meditation cushions, benches, chairs, mats and timers by posture, dimensions, materials and practical use.', path: '/gear/meditation', name: 'Meditation gear guides' }),
  component: () => <EditorialHub eyebrow="Meditation gear" title="Build a seat, not a showroom." intro="Begin with a position you can sustain comfortably. Then choose only the seating, timing or storage tools that remove a real distraction." cards={[
    { label: 'Seating guide', title: 'Best meditation cushions', description: 'Compare shape, seat height, fill, cover and care.', href: '/guides/best-meditation-cushion', image: '/images/guides/best-meditation-cushion/hero.webp' },
    { label: 'Home setup', title: 'Meditation room essentials', description: 'Build a calm functional corner without decorative clutter.', href: '/guides/meditation-room-accessories', image: '/images/brand/topic-meditation.webp' },
    { label: 'Simple timing', title: 'Meditation timers', description: 'Browser, app and physical chime formats compared.', href: '/guides/meditation-timer', image: '/images/guides/meditation-timer/hero.webp' },
  ]} sections={[
    { title: 'Meditation benches', description: 'Seat angle, height and fixed or folding construction.', href: '/guides/meditation-bench' },
    { title: 'Meditation chairs', description: 'Floor, folding and raised formats with back support.', href: '/guides/meditation-chair' },
    { title: 'Meditation mats', description: 'Zabuton, wool and foldable floor formats.', href: '/guides/meditation-mat' },
    { title: 'Cushion sets', description: 'Match zafu and zabuton dimensions before buying a bundle.', href: '/guides/meditation-cushion-set' },
    { title: 'Meditation tables', description: 'Fixed, folding and low altar-style formats.', href: '/guides/meditation-table' },
    { title: 'Eye pillows', description: 'Fill, weight, cover construction and cleaning.', href: '/guides/yoga-eye-pillow' },
  ]} />,
})
