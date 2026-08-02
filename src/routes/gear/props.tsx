import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'
import { buildHubHead } from '#/lib/seo/hub'

export const Route = createFileRoute('/gear/props')({
  head: () => buildHubHead({ title: 'Yoga Props Guides | The Yoga Sensei', description: 'Choose yoga blocks, straps, bolsters, blankets and specialist props by the support they actually provide.', path: '/gear/props', name: 'Yoga props guides' }),
  component: () => <EditorialHub eyebrow="Props library" title="Add support only where it helps." intro="Props should make a shape clearer, safer or more comfortable. Learn what each one changes—and when a household alternative already solves the problem." cards={[
    { label: 'Start here', title: 'Yoga props explained', description: 'Blocks, straps, bolsters, blankets and the jobs each prop can do.', href: '/guides/yoga-props', image: '/images/brand/pick-cork-blocks.webp' },
    { label: 'Support and reach', title: 'Best yoga blocks', description: 'Compare foam and cork through stability, weight and hand comfort.', href: '/guides/best-yoga-blocks', image: '/images/guides/best-yoga-blocks/hero.webp' },
    { label: 'Restorative practice', title: 'Best yoga bolsters', description: 'Choose shape, fill and firmness for the position you need to support.', href: '/guides/best-yoga-bolster', image: '/images/guides/best-yoga-bolster/hero.webp' },
  ]} sections={[
    { title: 'Yoga straps', description: 'Length, buckle design, material and care.', href: '/guides/yoga-strap' },
    { title: 'Yoga blankets', description: 'Weave, weight and fold retention for reliable support.', href: '/guides/best-yoga-blanket' },
    { title: 'Yoga wheels', description: 'Dimensions, padding and realistic practice use.', href: '/guides/best-yoga-wheel' },
    { title: 'Yoga wedges', description: 'Foam and cork slopes for wrists, heels and seated work.', href: '/guides/yoga-wedge' },
    { title: 'Starter kits', description: 'Check whether the bundle contains genuinely useful pieces.', href: '/guides/yoga-starter-kit' },
    { title: 'Prop storage', description: 'Plan shelves and racks around the equipment you own.', href: '/guides/yoga-equipment-storage' },
  ]} />,
})
