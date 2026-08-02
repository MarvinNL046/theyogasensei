import { createFileRoute } from '@tanstack/react-router'
import { EditorialHub } from '#/components/site/EditorialHub'
import { buildHubHead } from '#/lib/seo/hub'

export const Route = createFileRoute('/gear/travel')({
  head: () => buildHubHead({ title: 'Travel Yoga Gear Guides | The Yoga Sensei', description: 'Choose foldable mats, bags, straps and lightweight yoga gear by packed size, carry weight and real travel trade-offs.', path: '/gear/travel', name: 'Travel yoga gear guides' }),
  component: () => <EditorialHub eyebrow="Travel gear" title="Pack for the practice you will actually do." intro="Travel gear earns its place through low weight, sensible packed dimensions and simple care. Thin and portable always involves a comfort trade-off." cards={[
    { label: 'Travel mat', title: 'Best foldable yoga mats', description: 'Separate true packing mats from thick fold-flat storage mats.', href: '/guides/best-foldable-yoga-mat', image: '/images/guides/best-foldable-yoga-mat/hero.webp' },
    { label: 'Carry system', title: 'Best yoga mat bags', description: 'Compare openings, ventilation, strap design and useful capacity.', href: '/guides/best-yoga-mat-bag', image: '/images/guides/best-yoga-mat-bag/hero.webp' },
    { label: 'Minimal carry', title: 'How to use a mat strap', description: 'Secure the roll without buying a full bag you do not need.', href: '/guides/how-to-use-yoga-mat-strap', image: '/images/guides/how-to-use-yoga-mat-strap/hero.webp' },
  ]} sections={[
    { title: 'Mat weight guide', description: 'Choose a realistic carry weight for walking or commuting.', href: '/guides/yoga-mat-weight' },
    { title: 'Mat size guide', description: 'Check whether extra length still fits your luggage and room.', href: '/guides/yoga-mat-size' },
    { title: 'Gym bags with mat holders', description: 'Check attachment position and roll diameter compatibility.', href: '/guides/gym-bag-with-yoga-mat-holder' },
    { title: 'Yoga mat alternatives', description: 'Know when a destination floor or borrowed mat is enough.', href: '/guides/yoga-mat-alternatives' },
    { title: 'Yoga socks', description: 'A compact option where mat use is impractical or restricted.', href: '/guides/yoga-socks' },
    { title: 'Store a mat correctly', description: 'Dry and roll it before the next leg of the journey.', href: '/guides/how-to-store-a-yoga-mat' },
  ]} />,
})
