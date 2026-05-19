import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Globe2,
  Leaf,
  PersonStanding,
  Star,
} from 'lucide-react'
import { cn } from '#/lib/utils'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { JapaneseAccent } from '#/components/ui/japanese-accent'
import { Section } from '#/components/ui/section'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'The Yoga Sensei — calm guidance for a real practice' },
      {
        name: 'description',
        content:
          'A curated guide for finding the right gear and starting your practice. Honest reviews, beginner paths that work, and pose guides reviewed by certified teachers.',
      },
      { property: 'og:title', content: 'The Yoga Sensei' },
      {
        property: 'og:description',
        content:
          'A curated guide for finding the right gear and starting your practice. Honest reviews, beginner paths that work, and pose guides reviewed by certified teachers.',
      },
      { property: 'og:url', content: 'https://theyogasensei.com/' },
      { property: 'og:type', content: 'website' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/' }],
  }),
  component: HomePage,
})

const TRUST_PILLARS = [
  {
    icon: Leaf,
    title: 'Honest & Independent',
    text: 'No sponsors. No BS. Only products we truly recommend.',
  },
  {
    icon: BookOpen,
    title: 'In-Depth Guides',
    text: 'Step-by-step advice for all levels, from beginner to advanced.',
  },
  {
    icon: PersonStanding,
    title: 'Practice First',
    text: 'Because yoga is experience, not just information.',
  },
  {
    icon: Globe2,
    title: 'Mindful Living',
    text: 'Yoga, meditation, breathwork and a balanced lifestyle.',
  },
] as const

interface TopicTile {
  label: string
  blurb: string
  to: '/poses' | '/styles' | '/guides' | '/gear' | '/start-here'
  image: string
}

const TOPICS: Array<TopicTile> = [
  {
    label: 'Yoga Mats',
    blurb: 'Base of practice',
    to: '/gear',
    image: '/images/brand/topic-yoga-mats.png',
  },
  {
    label: 'Yoga Tips',
    blurb: 'Small ideas that stick',
    to: '/guides',
    image: '/images/brand/topic-yoga-tips.png',
  },
  {
    label: 'Beginner Yoga',
    blurb: 'A path you can follow',
    to: '/start-here',
    image: '/images/brand/topic-beginner-yoga.png',
  },
  {
    label: 'Meditation',
    blurb: 'Sit, breathe, stay',
    to: '/styles',
    image: '/images/brand/topic-meditation.png',
  },
  {
    label: 'Breathwork',
    blurb: 'The first lesson',
    to: '/poses',
    image: '/images/brand/topic-breathwork.png',
  },
  {
    label: 'Yoga Styles',
    blurb: 'Pick one for your week',
    to: '/styles',
    image: '/images/brand/topic-yoga-styles.png',
  },
]

interface ProductPick {
  badge: string
  brand: string
  name: string
  image: string
}

const SENSEI_PICKS: Array<ProductPick> = [
  {
    badge: 'Best overall',
    brand: 'Manduka',
    name: 'PRO Yoga Mat',
    image: '/images/brand/pick-manduka-pro.png',
  },
  {
    badge: 'Best budget',
    brand: 'Hugger Mugger',
    name: 'Cork Block Set',
    image: '/images/brand/pick-cork-blocks.png',
  },
  {
    badge: 'Essential',
    brand: 'Lululemon',
    name: 'Cotton Yoga Strap',
    image: '/images/brand/pick-cotton-strap.png',
  },
  {
    badge: 'Restorative',
    brand: 'Halfmoon',
    name: 'Studio Bolster',
    image: '/images/brand/pick-studio-bolster.png',
  },
  {
    badge: 'Flexibility',
    brand: 'Liforme',
    name: 'Yoga Wheel',
    image: '/images/brand/pick-yoga-wheel.png',
  },
]

interface JournalCard {
  to: '/guides/$slug' | '/poses/$slug'
  params: { slug: string }
  category: string
  title: string
  blurb: string
  date: string
  readingTime: string
  image: string
}

const LATEST_ARTICLES: Array<JournalCard> = [
  {
    to: '/guides/$slug',
    params: { slug: 'yoga-for-beginners' },
    category: 'Routine',
    title: 'Morning Yoga Routine — 15 minutes to energise your day',
    blurb:
      'A simple morning sequence to wake your body, clear your mind, and set the tone for a better day.',
    date: 'May 12, 2026',
    readingTime: '6 min read',
    image: '/images/aiko-persona/aiko-yoga-pose-collage-japanese-studio.png',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'yoga-for-beginners' },
    category: 'Practice',
    title: 'How to build a consistent meditation habit',
    blurb:
      'Why a five-minute sit beats a perfect twenty-minute one, and the three cues that keep the habit alive.',
    date: 'May 5, 2026',
    readingTime: '8 min read',
    image: '/images/aiko-persona/aiko-meditation-back-view-sage-yoga-mat.png',
  },
  {
    to: '/poses/$slug',
    params: { slug: 'sun-salutation' },
    category: 'Pose guide',
    title: 'Sun Salutation, step by step',
    blurb:
      'Surya Namaskar A in twelve positions. Cues, breath count, common mistakes, and modifications.',
    date: 'April 28, 2026',
    readingTime: '9 min read',
    image: '/images/aiko-persona/aiko-upward-facing-dog-yoga-pose.png',
  },
]

function EmptyStars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="Rating not yet available">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 text-[color:var(--color-border)]"
          strokeWidth={1.5}
          fill="none"
        />
      ))}
    </div>
  )
}

function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO — asymmetric split per template 1
          Text left in Container (~42%). Image bleeds to right viewport edge
          and fills hero height (~58% wide on lg+). Photo's natural light
          handles the left-edge fade into cream — no mask-image needed.
          ============================================================ */}
      <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
        {/* Far-left vertical edge text — page-boundary brand whisper */}
        <JapaneseAccent
          phrase="presence"
          vertical
          tone="soft"
          className="pointer-events-none absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 xl:block"
        />

        <Container size="wide" className="relative">
          <div className="grid lg:grid-cols-12 lg:gap-12">
            {/* Text column */}
            <div className="py-16 lg:col-span-5 lg:py-28">
              <JapaneseAccent phrase="practice" className="mb-7 block" />

              <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[color:var(--color-ink)] md:text-6xl lg:text-[60px]">
                <span className="block">Yoga is not</span>
                <span className="block">about touching</span>
                <span className="block">your toes.</span>
                <span className="mt-4 block font-serif text-3xl italic leading-[1.15] text-[color:var(--color-ink-soft)] md:text-[34px] lg:text-[38px]">
                  It&rsquo;s about what you
                  <br />
                  learn on the way down.
                </span>
              </h1>

              <p className="mt-9 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
                Honest reviews, in-depth guides, and practical advice to help you build a yoga
                practice that actually fits your busy real life.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/guides"
                  className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-olive)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
                >
                  Explore journal
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>
                <Link
                  to="/start-here"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-ink-soft)]/30 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-deep)]"
                >
                  Start here
                </Link>
              </div>
            </div>

            {/* Spacer on desktop grid — actual image is positioned absolutely outside Container */}
            <div className="hidden lg:col-span-7 lg:block" />
          </div>
        </Container>

        {/* Image — in-flow on mobile (below text), absolute right-bleed on lg+.
            Width capped on ultra-wide viewports so text column doesn't overlap.
            object-right keeps the baked 継続は力なり on the shoji visible. */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-[color:var(--color-surface-muted)] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[58%] lg:max-w-[920px] 2xl:max-w-[1100px]">
          <img
            src="/images/hero/aiko-meditation-mountain-shoji.png"
            alt="A practitioner sits in lotus pose on a warm wooden floor; a forest view fills the open window on the left, a shoji screen and bonsai sit on the right with the Japanese phrase for 'consistency is strength' brushed vertically on the panel"
            width={1536}
            height={1024}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover object-right"
          />
        </div>
      </section>

      {/* ============================================================
          TRUST BAR — calm editorial strip directly below hero.
          No cards, no shadows. Vertical dividers between columns on lg+.
          ============================================================ */}
      <section
        aria-label="Why The Yoga Sensei"
        className="border-y border-[color:var(--color-border)]/70 bg-[color:var(--color-bg)]"
      >
        <Container size="default" className="py-10">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_PILLARS.map((pillar, i) => (
              <li
                key={pillar.title}
                className={cn(
                  'flex gap-5 py-6 sm:px-8 lg:py-2',
                  i !== 0 && 'lg:border-l lg:border-[color:var(--color-border)]/70',
                )}
              >
                <pillar.icon
                  className="mt-1 h-9 w-9 shrink-0 text-[color:var(--color-olive-soft)]"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
                    {pillar.title}
                  </p>
                  <p className="max-w-[220px] text-[13px] leading-6 text-[color:var(--color-ink-muted)]">
                    {pillar.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ============================================================
          TOPIC GRID
          ============================================================ */}
      <Section tone="muted" padding="md">
        <Container size="wide">
          <div className="mb-14 max-w-2xl">
            <Eyebrow tone="accent">Outline by topic</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-[color:var(--color-ink)] md:text-[40px]">
              Everything you need
              <br />
              for your yoga journey.
            </h2>
            <Link
              to="/guides"
              className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
            >
              View all topics
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-3 lg:grid-cols-6">
            {TOPICS.map((topic) => (
              <li key={topic.label}>
                <Link to={topic.to} className="group block">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-[color:var(--color-surface)] ring-1 ring-[color:var(--color-border)] transition group-hover:ring-[color:var(--color-accent)]/60">
                    <img
                      src={topic.image}
                      alt=""
                      width={300}
                      height={300}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 font-serif text-[15px] text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                    {topic.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[color:var(--color-ink-muted)]">
                    {topic.blurb}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ============================================================
          FEATURED REVIEW (dark stone band)
          Brand bg: enso brush + baked 集中 (focus) kanji on the left.
          Full-opacity image, no tinted overlay — pure dark contrast
          per template 1. Mat-foto stays right.
          ============================================================ */}
      <Section tone="dark" padding="md" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{ backgroundImage: "url('/images/brand/japanese-zen-editorial-background.png')" }}
        />
        {/* Dark left-side fade for text legibility — pure black, no olive tint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 from-0% via-black/30 via-30% to-transparent to-55%"
        />

        <Container size="wide" className="relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-5">
              <Eyebrow tone="onDark">Featured guide</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl leading-[1.15] tracking-tight md:text-[40px]">
                <span className="block">7 Best Yoga Mats</span>
                <span className="block">For Every Practice</span>
                <span className="block italic text-[color:var(--color-accent-soft)]">
                  (2026 Guide)
                </span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-bg)]/70 md:text-base">
                Researched mats for every kind of student — sweaty, low-impact, travel, restorative.
                The best overall pick, the best budget, and the one for tight knees.
              </p>
              <Link
                to="/guides/$slug"
                params={{ slug: 'best-yoga-mats-for-beginners' }}
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-accent-deep)]"
              >
                Read the guide
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </Link>
            </div>
            <div className="md:col-span-7">
              <div className="aspect-[5/3] overflow-hidden rounded-[28px] ring-1 ring-black/40">
                <img
                  src="/images/aiko-persona/aiko-rolling-out-sage-yoga-mat.png"
                  alt="Hands rolling out a sage-green yoga mat on a warm wooden studio floor"
                  width={1400}
                  height={840}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================
          SENSEI PICKS — product row
          ============================================================ */}
      <Section padding="md">
        <Container size="wide">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Eyebrow tone="accent">Top picks</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-[color:var(--color-ink)] md:text-[40px]">
                Our top recommendations,
                <br />
                tested and approved.
              </h2>
            </div>
            <div className="flex items-center gap-3" aria-label="Carousel controls (placeholder)">
              <button
                type="button"
                aria-label="Previous picks"
                disabled
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-ink-muted)] opacity-50"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Next picks"
                disabled
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-ink-muted)] opacity-50"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {SENSEI_PICKS.map((pick) => (
              <li
                key={pick.name}
                className="overflow-hidden rounded-2xl bg-[color:var(--color-surface)] ring-1 ring-[color:var(--color-border)]"
              >
                <div className="aspect-square overflow-hidden bg-[color:var(--color-surface-muted)]">
                  <img
                    src={pick.image}
                    alt=""
                    width={400}
                    height={400}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
                    {pick.badge}
                  </p>
                  <p className="mt-2 font-serif text-base leading-snug text-[color:var(--color-ink)]">
                    {pick.name}
                  </p>
                  <p className="text-xs text-[color:var(--color-ink-muted)]">{pick.brand}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <EmptyStars />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
                      Coming soon
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ============================================================
          LATEST ARTICLES & INSIGHTS
          ============================================================ */}
      <Section tone="muted" padding="md">
        <Container size="wide">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow tone="accent">From the journal</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-[color:var(--color-ink)] md:text-[40px]">
                Latest articles &amp; insights
              </h2>
            </div>
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
            >
              View all articles
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          <ul className="grid gap-10 md:grid-cols-3">
            {LATEST_ARTICLES.map((card) => (
              <li key={`${card.params.slug}-${card.title}`}>
                <Link to={card.to} params={card.params} className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[color:var(--color-surface)]">
                    <img
                      src={card.image}
                      alt=""
                      width={800}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
                      {card.category}
                    </p>
                    <h3 className="mt-3 font-serif text-xl leading-snug text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent-deep)]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                      {card.blurb}
                    </p>
                    <p className="mt-5 text-xs text-[color:var(--color-ink-muted)]">
                      {card.date} <span className="mx-1.5 opacity-40">·</span> {card.readingTime}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ============================================================
          NEWSLETTER BAND — dark olive, full width
          ============================================================ */}
      <Section tone="dark" padding="md" className="relative overflow-hidden">
        <Container size="wide">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <Eyebrow tone="onDark">Mindful inbox</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
                Mindful insights.
                <br />
                Straight to your inbox.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[color:var(--color-bg)]/70 md:text-base">
                One short email a week. New articles, gear notes, and one thing I am researching
                right now. No filler, unsubscribe in one click.
              </p>

              <form
                action="#"
                method="post"
                className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                aria-label="Newsletter subscription"
              >
                <label htmlFor="hero-newsletter" className="sr-only">
                  Email address
                </label>
                <input
                  id="hero-newsletter"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="flex-1 rounded-full border border-[color:var(--color-bg)]/25 bg-transparent px-5 py-3 text-sm text-[color:var(--color-bg)] placeholder:text-[color:var(--color-bg)]/40 focus:border-[color:var(--color-accent)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-accent-deep)]"
                >
                  Join
                </button>
              </form>
              <p className="mt-3 text-[11px] text-[color:var(--color-bg)]/50">
                No spam. Unsubscribe anytime.
              </p>
            </div>

            <div className="hidden md:col-span-5 md:block">
              <div className="ml-auto flex aspect-[4/3] max-w-md items-center justify-center rounded-[28px] bg-[color:var(--color-olive-deep)] p-12">
                <JapaneseAccent phrase="habits" vertical size="lg" tone="onDark" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
