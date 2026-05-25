import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Archive,
  Backpack,
  Bookmark,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Cuboid,
  Flower2,
  Leaf,
  MoveRight,
  Package,
  Scale,
  Shirt,
  Sparkles,
  Star,
  TabletSmartphone,
  Tag,
} from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

export const Route = createFileRoute('/gear/')({
  head: () => ({
    meta: [
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
      { title: 'Yoga Gear & Reviews — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Explore yoga mats, blocks, straps, bolsters and practice gear with calm guides, honest reviews and practical recommendations.',
      },
      { property: 'og:type', content: 'website' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/gear' }],
  }),
  component: GearIndex,
})

const TOPICS = [
  {
    title: 'Best Yoga Mats',
    description: 'Find the perfect mat for your practice style.',
    count: '12 articles',
    image: '/images/brand/pick-manduka-pro.webp',
  },
  {
    title: 'Yoga Blocks',
    description: 'Support, stability and better alignment.',
    count: '8 articles',
    image: '/images/brand/pick-cork-blocks.webp',
  },
  {
    title: 'Yoga Straps',
    description: 'Improve flexibility and deepen stretches.',
    count: '6 articles',
    image: '/images/brand/pick-cotton-strap.webp',
  },
  {
    title: 'Yoga Bolsters',
    description: 'Restorative support for deep relaxation.',
    count: '7 articles',
    image: '/images/brand/pick-studio-bolster.webp',
  },
  {
    title: 'Yoga Bags',
    description: 'Carry your gear with ease and style.',
    count: '5 articles',
    image: '/images/brand/topic-yoga-tips.webp',
  },
] as const

const GUIDES = [
  {
    title: '7 Best Yoga Mats for Every Practice (2024 Guide)',
    description:
      'A researched guide to mats with strong grip, reliable comfort and daily-practice durability.',
    date: 'May 5, 2024',
    readTime: '10 min read',
    image: '/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
    href: '/reviews/best-yoga-mats',
  },
  {
    title: 'Cork vs. Foam Yoga Blocks: Which Is Better?',
    description: 'A clear comparison to help you choose the block that fits your body and practice.',
    date: 'Apr 18, 2024',
    readTime: '7 min read',
    image: '/images/brand/pick-cork-blocks.webp',
    href: '#',
  },
  {
    title: "Beginner's Guide to Yoga Props",
    description: 'Learn how props can support your practice, improve alignment and help you progress safely.',
    date: 'Mar 22, 2024',
    readTime: '9 min read',
    image: '/images/brand/pick-cotton-strap.webp',
    href: '#',
  },
  {
    title: 'Sustainable Yoga Wear: Brands That Care',
    description:
      'Eco-friendly yoga clothing brands that combine comfort, performance and ethical practices.',
    date: 'Mar 10, 2024',
    readTime: '6 min read',
    image: '/images/brand/pick-studio-bolster.webp',
    href: '#',
  },
] as const

const POPULAR = [
  { title: '7 Best Yoga Mats for Every Practice (2024)', label: 'Yoga mats', image: '/images/brand/pick-manduka-pro.webp' },
  { title: 'Cork vs Foam Blocks: Which Should You Choose?', label: 'Blocks', image: '/images/brand/pick-cork-blocks.webp' },
  { title: 'How to Use a Yoga Strap: 10 Stretches to Try', label: 'Straps', image: '/images/brand/pick-cotton-strap.webp' },
  { title: 'Best Yoga Bags for Commuters & Travelers', label: 'Bags', image: '/images/brand/topic-yoga-tips.webp' },
  { title: 'Yoga Bolsters 101: Benefits & Best Picks', label: 'Bolsters', image: '/images/brand/pick-studio-bolster.webp' },
] as const

const PICKS = [
  { badge: 'Best Overall', name: 'Manduka PRO Yoga Mat', image: '/images/brand/pick-manduka-pro.webp', rating: 4.8, price: '$128', href: '/reviews/manduka-pro' },
  { badge: 'Best Value', name: 'Liforme Yoga Mat', image: '/images/brand/topic-yoga-mats.webp', rating: 4.7, price: '$135', href: '#' },
  { badge: 'Best Blocks', name: 'Cork Yoga Block', image: '/images/brand/pick-cork-blocks.webp', rating: 4.7, price: '$22', href: '#' },
  { badge: 'Best Strap', name: 'Yoga Strap', image: '/images/brand/pick-cotton-strap.webp', rating: 4.6, price: '$14', href: '#' },
  { badge: 'Best Bolster', name: 'Yoga Bolster', image: '/images/brand/pick-studio-bolster.webp', rating: 4.8, price: '$69', href: '#' },
] as const

function GearIndex() {
  return (
    <>
      <CategoryHero />
      <CategoryTabs />
      <CategoryBody />
      <BottomCta />
    </>
  )
}

function CategoryHero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: "url('/images/brand/review-hero-best-mats.webp')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, rgba(246,241,234,.96) 34%, rgba(246,241,234,.36) 60%, rgba(246,241,234,0) 100%)',
        }}
      />
      <Container size="wide" className="relative">
        <div className="max-w-xl py-12 md:min-h-[430px] md:py-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center text-xs text-[color:var(--color-ink-muted)]">
              <li>
                <Link to="/" className="transition hover:text-[color:var(--color-accent-deep)]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="mx-2 opacity-50">›</li>
              <li>Categories</li>
              <li aria-hidden="true" className="mx-2 opacity-50">›</li>
              <li aria-current="page" className="text-[color:var(--color-ink)]">Yoga Gear</li>
            </ol>
          </nav>

          <Eyebrow tone="accent">Category</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-[color:var(--color-ink)] md:text-[64px]">
            Yoga Gear
          </h1>
          <p className="mt-3 font-serif text-3xl leading-tight text-[color:var(--color-ink)] md:text-[34px]">
            Tools that support your practice.
          </p>
          <p className="mt-7 max-w-md text-base leading-8 text-[color:var(--color-ink-soft)]">
            From mats to blocks and everything in between. Explore guides, reviews and resources to help you choose high-quality gear that lasts and supports your journey.
          </p>

          <div className="mt-9 grid max-w-md grid-cols-3 gap-6">
            <TrustPoint icon={Leaf} title="Independent reviews" text="Honest. Unbiased." />
            <TrustPoint icon={Scale} title="Practice focused" text="Built for real use." />
            <TrustPoint icon={Sparkles} title="Quality over hype" text="We recommend what we trust." />
          </div>
        </div>
      </Container>
    </section>
  )
}

function CategoryTabs() {
  const tabs = [
    { label: 'All Gear', icon: Boxes },
    { label: 'Yoga Mats', icon: Flower2 },
    { label: 'Blocks', icon: Cuboid },
    { label: 'Straps', icon: Package },
    { label: 'Bolsters', icon: Archive },
    { label: 'Clothing', icon: Shirt },
    { label: 'Props', icon: Tag },
    { label: 'Bags', icon: Backpack },
    { label: 'Apps & Tech', icon: TabletSmartphone },
  ]

  return (
    <div className="sticky top-20 z-30 border-y border-[color:var(--color-border)] bg-[color:var(--color-bg)]/92 backdrop-blur">
      <Container size="wide" className="overflow-x-auto">
        <nav aria-label="Gear categories" className="flex min-w-max items-center gap-9">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            return (
              <a
                key={tab.label}
                href="#"
                className={[
                  'relative inline-flex items-center gap-2 py-5 text-[11px] font-semibold uppercase tracking-[0.18em] transition',
                  index === 0
                    ? 'text-[color:var(--color-ink)]'
                    : 'text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)]',
                ].join(' ')}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                {tab.label}
                {index === 0 ? (
                  <span aria-hidden="true" className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[color:var(--color-ink)]" />
                ) : null}
              </a>
            )
          })}
        </nav>
      </Container>
    </div>
  )
}

function CategoryBody() {
  return (
    <main className="bg-[color:var(--color-bg)] py-12 md:py-16">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-12">
            <TopicSection />
            <PopularGuides />
            <SenseiPicks />
          </div>
          <CategorySidebar />
        </div>
      </Container>
    </main>
  )
}

function TopicSection() {
  return (
    <section>
      <SectionBar title="Explore by topic" action="View all topics" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {TOPICS.map((topic) => (
          <a
            href="#"
            key={topic.title}
            className="group overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/70 transition hover:-translate-y-0.5 hover:bg-[color:var(--color-surface)]"
          >
            <img src={topic.image} alt="" width={260} height={180} className="h-36 w-full object-cover" />
            <div className="p-4">
              <h2 className="font-serif text-xl leading-tight text-[color:var(--color-ink)]">{topic.title}</h2>
              <p className="mt-2 min-h-10 text-sm leading-6 text-[color:var(--color-ink-soft)]">{topic.description}</p>
              <p className="mt-3 text-xs text-[color:var(--color-ink-muted)]">{topic.count}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function PopularGuides() {
  return (
    <section>
      <SectionBar title="Popular guides" />
      <div className="mt-6 divide-y divide-[color:var(--color-border)]">
        {GUIDES.map((guide) => (
          <a key={guide.title} href={guide.href} className="grid gap-5 py-4 transition hover:bg-[color:var(--color-surface)]/45 sm:grid-cols-[250px_minmax(0,1fr)_24px]">
            <img src={guide.image} alt="" width={320} height={160} className="h-28 w-full rounded-md object-cover" />
            <div>
              <h2 className="font-serif text-2xl leading-tight text-[color:var(--color-ink)]">{guide.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-ink-soft)]">{guide.description}</p>
              <p className="mt-3 text-xs text-[color:var(--color-ink-muted)]">{guide.date} · {guide.readTime}</p>
            </div>
            <Bookmark className="mt-2 hidden h-5 w-5 text-[color:var(--color-ink-muted)] sm:block" strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </section>
  )
}

function SenseiPicks() {
  return (
    <section>
      <SectionBar title="Sensei picks" action="View all picks" />
      <div className="relative mt-6">
        <button aria-label="Previous picks" className="absolute -left-11 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-ink)] lg:inline-flex">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PICKS.map((pick) => (
            <a key={pick.name} href={pick.href} className="overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/75 transition hover:-translate-y-0.5">
              <div className="bg-[color:var(--color-surface-muted)] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-soft)]">
                {pick.badge}
              </div>
              <img src={pick.image} alt="" width={220} height={150} className="h-28 w-full object-cover" />
              <div className="p-4">
                <h2 className="min-h-10 font-sans text-sm font-semibold leading-5 text-[color:var(--color-ink)]">{pick.name}</h2>
                <Stars rating={pick.rating} className="mt-3" />
                <p className="mt-3 text-sm text-[color:var(--color-ink)]">{pick.price}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-ink)]">
                  View review <MoveRight className="h-3 w-3" />
                </p>
              </div>
            </a>
          ))}
        </div>
        <button aria-label="Next picks" className="absolute -right-11 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-ink)] lg:inline-flex">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}

function CategorySidebar() {
  return (
    <aside className="space-y-8 lg:sticky lg:top-40 lg:self-start">
      <section
        className="rounded-md border border-[color:var(--color-border)] bg-cover bg-right-bottom p-7"
        style={{ backgroundImage: "linear-gradient(90deg, rgba(255,253,249,.95), rgba(255,253,249,.76)), url('/images/brand/newsletter-bonsai.webp')" }}
      >
        <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">About this category</h2>
        <p className="mt-5 max-w-[17rem] text-sm leading-7 text-[color:var(--color-ink-soft)]">
          Yoga gear is not about having more. It is about having what supports your practice and lasts over time.
        </p>
        <a href="/affiliate-disclosure" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)]">
          Our Review Process <MoveRight className="h-4 w-4" />
        </a>
      </section>

      <NewsletterCard />

      <section className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 p-7">
        <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">Popular in yoga gear</h2>
        <div className="mt-6 space-y-5">
          {POPULAR.map((item, index) => (
            <a key={item.title} href="#" className="grid grid-cols-[20px_74px_minmax(0,1fr)] gap-4">
              <span className="pt-6 text-xs text-[color:var(--color-ink-muted)]">{index + 1}</span>
              <img src={item.image} alt="" width={90} height={70} className="h-16 w-full rounded-md object-cover" />
              <span>
                <span className="block text-sm font-semibold leading-5 text-[color:var(--color-ink)]">{item.title}</span>
                <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">{item.label}</span>
              </span>
            </a>
          ))}
        </div>
        <a href="#" className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
          View all articles <MoveRight className="h-4 w-4" />
        </a>
      </section>
    </aside>
  )
}

function NewsletterCard() {
  return (
    <section
      className="overflow-hidden rounded-md bg-[color:var(--color-olive)] bg-cover bg-center p-8 text-[color:var(--color-bg)]"
      style={{ backgroundImage: "linear-gradient(90deg, rgba(63,74,53,.94), rgba(63,74,53,.76)), url('/images/brand/zen-enso-dark-texture-bg.webp')" }}
    >
      <h2 className="font-serif text-3xl leading-tight">
        Mindful insights.
        <br />
        Straight to your inbox.
      </h2>
      <p className="mt-5 text-sm leading-6 text-[color:var(--color-bg)]/78">
        Practical tips, gear recommendations and honest reviews.
      </p>
      <form className="mt-6 space-y-3">
        <label htmlFor="gear-email" className="sr-only">Email address</label>
        <input id="gear-email" type="email" placeholder="Your email address" className="h-12 w-full rounded-md border border-[color:var(--color-bg)]/10 bg-[color:var(--color-bg)] px-4 text-sm text-[color:var(--color-ink)] outline-none" />
        <button type="submit" className="h-11 rounded-md bg-[color:var(--color-olive-deep)] px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-bg)]">
          Join free
        </button>
      </form>
      <p className="mt-4 text-xs text-[color:var(--color-bg)]/66">No spam. Unsubscribe anytime.</p>
    </section>
  )
}

function BottomCta() {
  return (
    <section
      className="bg-[color:var(--color-olive-deep)] bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(90deg, rgba(37,45,34,.96), rgba(37,45,34,.72) 42%, rgba(37,45,34,.28)), url('/images/brand/minimal-dark-enso-philosophy-bg.webp')" }}
    >
      <Container size="wide">
        <div className="min-h-[210px] max-w-xl py-10 text-[color:var(--color-bg)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-bg)]/64">
            The right tools. Deeper practice.
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">Quality gear. Mindful choices. Lasting impact.</h2>
          <a href="/reviews/best-yoga-mats" className="mt-7 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-bg)]/12 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)] ring-1 ring-[color:var(--color-bg)]/20">
            Explore our reviews <MoveRight className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </section>
  )
}

function SectionBar({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">{title}</h2>
      {action ? (
        <a href="#" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
          {action} <MoveRight className="h-4 w-4" />
        </a>
      ) : null}
    </div>
  )
}

function TrustPoint({ icon: Icon, title, text }: { icon: typeof Leaf; title: string; text: string }) {
  return (
    <div>
      <Icon className="h-8 w-8 text-[color:var(--color-olive)]" strokeWidth={1.4} />
      <h2 className="mt-4 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink)]">{title}</h2>
      <p className="mt-2 text-xs leading-5 text-[color:var(--color-ink-soft)]">{text}</p>
    </div>
  )
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={['inline-flex items-center gap-0.5', className].filter(Boolean).join(' ')}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={[
            'h-3 w-3',
            index < Math.round(rating)
              ? 'fill-[color:var(--color-ink)] text-[color:var(--color-ink)]'
              : 'text-[color:var(--color-border)]',
          ].join(' ')}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
      <span className="ml-1 text-xs tabular-nums text-[color:var(--color-ink)]">{rating.toFixed(1)}</span>
    </span>
  )
}
