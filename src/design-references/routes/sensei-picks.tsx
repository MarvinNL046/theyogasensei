import { createFileRoute } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import {
  Archive,
  Blocks,
  Heart,
  Leaf,
  MoveRight,
  Package,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sprout,
  Star,
  UserRound,
  Waves,
} from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { JapaneseAccent } from '#/components/ui/japanese-accent'

export const Route = createFileRoute('/sensei-picks')({
  head: () => ({
    meta: [
      { title: 'Sensei Picks — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Handpicked yoga essentials for a mindful practice: mats, blocks, straps, bolsters and useful gear chosen for quality over hype.',
      },
      { property: 'og:type', content: 'website' },
    ],
    links: [
      { rel: 'canonical', href: 'https://theyogasensei.com/sensei-picks' },
    ],
  }),
  component: SenseiPicksPage,
})

const CATEGORIES = [
  { label: 'Mats', icon: Waves },
  { label: 'Blocks', icon: Blocks },
  { label: 'Props', icon: Package },
  { label: 'Bolsters', icon: Archive },
  { label: 'Clothing', icon: Shirt },
  { label: 'Bags', icon: ShoppingBag },
  { label: 'Apps & Tech', icon: Smartphone },
  { label: 'Accessories', icon: Sprout },
] as const

const ESSENTIALS = [
  {
    badge: 'Best Overall Mat',
    name: 'Manduka PRO Yoga Mat',
    image: '/images/brand/pick-manduka-pro.webp',
    description:
      'Exceptional grip, lifetime durability and outstanding performance.',
    bullets: [
      'Ultra-dense cushioning',
      'Great grip, even when wet',
      'Built to last for years',
      'PVC-free',
    ],
    rating: 4.8,
    count: '1,234',
    price: '$128',
    href: '/reviews/manduka-pro',
  },
  {
    badge: 'Best Yoga Block',
    name: 'Cork Yoga Block',
    image: '/images/brand/pick-cork-blocks.webp',
    description:
      'Natural, supportive and sustainable. Ideal for alignment and flexibility.',
    bullets: [
      '100% natural cork',
      'Firm yet comfortable',
      'Helps deepen stretches',
      'Sustainable & eco-friendly',
    ],
    rating: 4.7,
    count: '856',
    price: '$22',
    href: '#',
  },
  {
    badge: 'Best Strap',
    name: 'Yoga Strap',
    image: '/images/brand/pick-cotton-strap.webp',
    description:
      'A simple tool that helps you go deeper with ease and control.',
    bullets: [
      'Extra long',
      'Strong & durable cotton',
      'Helps with flexibility',
      'Lightweight & portable',
    ],
    rating: 4.6,
    count: '732',
    price: '$14',
    href: '#',
  },
  {
    badge: 'Best Bolster',
    name: 'Yoga Bolster',
    image: '/images/brand/pick-studio-bolster.webp',
    description: 'Restorative support for relaxation, opening and recovery.',
    bullets: [
      'Firm & supportive',
      'Organic cotton cover',
      'Removable & washable',
      'Handmade with care',
    ],
    rating: 4.8,
    count: '612',
    price: '$69',
    href: '#',
  },
] as const

const MORE = [
  {
    title: 'Beginner Roadmap',
    text: 'Start your journey with confidence.',
    action: 'Explore',
    icon: UserRound,
    href: '/start-here',
  },
  {
    title: 'Yoga Mat Guide',
    text: 'Find the right mat for your practice.',
    action: 'Read Guide',
    icon: Waves,
    href: '/reviews/best-yoga-mats',
  },
  {
    title: 'Morning Routines',
    text: 'Simple sequences to start your day.',
    action: 'View Routines',
    icon: Sprout,
    href: '/guides',
  },
  {
    title: 'Breathwork Basics',
    text: 'Learn the power of your breath.',
    action: 'Learn More',
    icon: Leaf,
    href: '/guides',
  },
  {
    title: 'Meditation Guide',
    text: 'Build stillness and inner clarity.',
    action: 'Explore',
    icon: UserRound,
    href: '/guides',
  },
] as const

function SenseiPicksPage() {
  return (
    <>
      <PicksHero />
      <main className="bg-[color:var(--color-bg)] pb-16">
        <Container size="wide">
          <SenseiNote />
          <CategoryGrid />
          <EssentialsGrid />
          <EditorialBand />
          <MoreFromSensei />
          <PicksFooter />
        </Container>
      </main>
    </>
  )
}

function PicksHero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: "url('/images/brand/review-hero-best-mats.webp')",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, rgba(246,241,234,.96) 35%, rgba(246,241,234,.22) 63%, rgba(246,241,234,0) 100%)',
        }}
      />
      <Container size="wide" className="relative">
        <div className="max-w-xl py-14 md:min-h-[430px] md:py-20">
          <Eyebrow tone="accent">Sensei Picks</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-[color:var(--color-ink)] md:text-[64px]">
            The Yoga Sensei
            <br />
            Essentials
          </h1>
          <p className="mt-7 max-w-md text-lg leading-8 text-[color:var(--color-ink-soft)]">
            Handpicked tools that support a mindful practice, on and off the
            mat. Quality over quantity. Purpose over hype.
          </p>
          <div className="mt-9 flex max-w-lg items-start justify-between gap-6">
            <HeroPoint icon={Leaf} title="Carefully Curated" />
            <HeroPoint icon={UserRound} title="Practice Tested" />
            <HeroPoint icon={ShieldCheck} title="Quality You Can Trust" />
            <HeroPoint icon={Heart} title="Selected for Real Life" />
          </div>
        </div>
      </Container>
    </section>
  )
}

function SenseiNote() {
  return (
    <section
      className="-mt-1 grid items-center gap-8 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/74 bg-cover bg-right-bottom p-8 shadow-sm md:grid-cols-[130px_minmax(0,1fr)_260px]"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,253,249,.96), rgba(255,253,249,.88), rgba(255,253,249,.74)), url('/images/brand/newsletter-bonsai.webp')",
      }}
    >
      <img
        src="/images/brand/avatar-yoga-sensei.webp"
        alt="The Yoga Sensei"
        width={112}
        height={112}
        className="h-28 w-28 rounded-full object-cover grayscale"
      />
      <div>
        <h2 className="font-sans text-sm font-medium text-[color:var(--color-ink)]">
          A note from The Yoga Sensei
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--color-ink-soft)]">
          These are the items I personally use and truly recommend. They support
          a steady practice without adding clutter.
        </p>
        <p className="mt-4 font-serif text-2xl italic text-[color:var(--color-ink)]">
          The Yoga Sensei
        </p>
      </div>
      <div
        aria-hidden="true"
        className="hidden justify-self-end opacity-70 md:block"
      >
        <JapaneseAccent phrase="practice" tone="soft" size="lg" />
      </div>
    </section>
  )
}

function CategoryGrid() {
  return (
    <section className="mt-10">
      <SectionHeading title="Shop by category" />
      <div className="mt-6 overflow-x-auto pb-1">
        <div
          className="grid min-w-[920px] gap-4"
          style={{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}
        >
          {CATEGORIES.map((category) => (
            <a
              key={category.label}
              href="#"
              className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/68 text-sm text-[color:var(--color-ink)] transition hover:-translate-y-0.5 hover:bg-[color:var(--color-surface)]"
            >
              <category.icon className="h-8 w-8" strokeWidth={1.35} />
              <span>{category.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function EssentialsGrid() {
  return (
    <section className="mt-12 border-t border-[color:var(--color-border)] pt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <SectionHeading title="Sensei essentials" />
          <p className="mt-3 text-sm text-[color:var(--color-ink-soft)]">
            My must-have picks for a balanced and sustainable practice.
          </p>
        </div>
        <a
          href="/gear"
          className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)] md:inline-flex"
        >
          View all essentials <MoveRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-7 overflow-x-auto pb-1">
        <div
          className="grid min-w-[960px] gap-6"
          style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
        >
          {ESSENTIALS.map((item) => (
            <ProductCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ item }: { item: (typeof ESSENTIALS)[number] }) {
  return (
    <a
      href={item.href}
      className="group overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/74 transition hover:-translate-y-0.5 hover:bg-[color:var(--color-surface)]"
    >
      <div className="p-5 pb-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
          {item.badge}
        </p>
      </div>
      <img
        src={item.image}
        alt=""
        width={380}
        height={260}
        className="mt-3 h-48 w-full object-cover"
      />
      <div className="p-6">
        <h2 className="font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
          {item.name}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[color:var(--color-ink-soft)]">
          {item.description}
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-5 text-[color:var(--color-ink-soft)]">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[color:var(--color-olive)]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-2">
          <Stars rating={item.rating} />
          <span className="text-xs text-[color:var(--color-ink-muted)]">
            {item.rating.toFixed(1)} ({item.count})
          </span>
        </div>
        <p className="mt-4 text-sm font-medium text-[color:var(--color-ink)]">
          {item.price}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-olive)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)]">
          View Review{' '}
          <MoveRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  )
}

function EditorialBand() {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-2">
      <div
        className="rounded-md border border-[color:var(--color-border)] bg-cover bg-right-bottom p-8"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,253,249,.96), rgba(255,253,249,.78)), url('/images/brand/newsletter-bonsai.webp')",
        }}
      >
        <h2 className="font-serif text-3xl text-[color:var(--color-ink)]">
          Why I recommend these
        </h2>
        <p className="mt-5 max-w-sm text-sm leading-7 text-[color:var(--color-ink-soft)]">
          Every item here has earned its place. They are selected for steady
          practice, useful support and long-term value.
        </p>
        <a
          href="/affiliate-disclosure"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)]"
        >
          Our Review Process <MoveRight className="h-4 w-4" />
        </a>
      </div>

      <div
        className="rounded-md bg-[color:var(--color-olive-deep)] bg-cover bg-right-center p-8 text-[color:var(--color-bg)]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(37,45,34,.96), rgba(37,45,34,.82) 56%, rgba(37,45,34,.38)), url('/images/brand/minimal-dark-enso-philosophy-bg.webp')",
        }}
      >
        <h2 className="font-serif text-3xl">
          Mindful choices. Better practice.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-[color:var(--color-bg)]/78">
          Get exclusive recommendations, honest reviews and practical tips,
          straight to your inbox.
        </p>
        <form className="mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
          <label htmlFor="sensei-picks-email" className="sr-only">
            Email address
          </label>
          <input
            id="sensei-picks-email"
            type="email"
            placeholder="Your email address"
            className="h-11 flex-1 rounded-md border border-[color:var(--color-bg)]/10 bg-[color:var(--color-bg)] px-4 text-sm text-[color:var(--color-ink)] outline-none"
          />
          <button
            type="submit"
            className="h-11 rounded-md border border-[color:var(--color-bg)]/50 px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-bg)]"
          >
            Join free
          </button>
        </form>
        <p className="mt-3 text-xs text-[color:var(--color-bg)]/62">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

function MoreFromSensei() {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
        More from The Yoga Sensei
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {MORE.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.title}
              href={item.href}
              className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/68 p-6 transition hover:-translate-y-0.5"
            >
              <Icon
                className="h-9 w-9 text-[color:var(--color-olive)]"
                strokeWidth={1.35}
              />
              <h3 className="mt-5 font-serif text-xl text-[color:var(--color-ink)]">
                {item.title}
              </h3>
              <p className="mt-2 min-h-10 text-sm leading-6 text-[color:var(--color-ink-soft)]">
                {item.text}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)]">
                {item.action} <MoveRight className="h-4 w-4" />
              </p>
            </a>
          )
        })}
      </div>
    </section>
  )
}

function PicksFooter() {
  return (
    <section className="mt-12 border-t border-[color:var(--color-border)] pt-8">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_2fr]">
        <div className="flex items-center gap-4">
          <img
            src="/logo/logo-enso.png"
            alt=""
            width={54}
            height={54}
            className="h-14 w-14 object-contain"
          />
          <div>
            <JapaneseAccent phrase="practice" tone="soft" size="md" />
            <p className="mt-2 font-serif text-xl text-[color:var(--color-ink)]">
              Practice. Learn. Grow.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
          <FooterList
            title="Guides"
            items={[
              'Yoga Mats',
              'Beginner Guides',
              'Poses Library',
              'Routines',
            ]}
          />
          <FooterList
            title="Reviews"
            items={['Gear Reviews', 'Mat Reviews', 'App Reviews', 'Compare']}
          />
          <FooterList
            title="Practice"
            items={['Yoga Styles', 'Breathwork', 'Meditation', 'Philosophy']}
          />
          <FooterList
            title="Company"
            items={['About', 'Our Process', 'Contact', 'Privacy Policy']}
          />
        </div>
      </div>
    </section>
  )
}

function FooterList({ title, items }: { title: string; items: Array<string> }) {
  return (
    <div>
      <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
        {title}
      </h3>
      <ul className="mt-3 space-y-1.5 text-xs text-[color:var(--color-ink-soft)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">
      {title}
    </h2>
  )
}

function HeroPoint({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="text-center">
      <Icon
        className="mx-auto h-8 w-8 text-[color:var(--color-olive)]"
        strokeWidth={1.35}
      />
      <p className="mt-3 text-xs font-medium leading-5 text-[color:var(--color-ink)]">
        {title}
      </p>
    </div>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={[
            'h-3.5 w-3.5',
            index < Math.round(rating)
              ? 'fill-[color:var(--color-ink)] text-[color:var(--color-ink)]'
              : 'text-[color:var(--color-border)]',
          ].join(' ')}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}
