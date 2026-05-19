import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Brain,
  Coffee,
  Package,
  Search,
  Sparkles,
  Wind,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { cn } from '#/lib/utils'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { JapaneseAccent } from '#/components/ui/japanese-accent'
import { Section } from '#/components/ui/section'

export const Route = createFileRoute('/guides/')({
  head: () => ({
    meta: [
      { title: 'The Journal — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Yoga knowledge for real practice. Routines, pose guides, gear reviews, breathwork techniques, and the calm decisions that actually move your practice forward.',
      },
      { property: 'og:title', content: 'The Journal — The Yoga Sensei' },
      { property: 'og:url', content: 'https://theyogasensei.com/guides' },
      { property: 'og:type', content: 'website' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/guides' }],
  }),
  component: GuidesIndex,
})

const CATEGORIES = [
  'All',
  'Routines',
  'Practice',
  'Pose guides',
  'Gear',
  'Breathwork',
  'Restorative',
] as const

interface SidebarCategory {
  name: string
  count: number
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const SIDEBAR_CATEGORIES: Array<SidebarCategory> = [
  { name: 'Practice', count: 28, icon: Activity },
  { name: 'Gear', count: 19, icon: Package },
  { name: 'Meditation', count: 16, icon: Sparkles },
  { name: 'Mindset', count: 14, icon: Brain },
  { name: 'Breathwork', count: 12, icon: Wind },
  { name: 'Lifestyle', count: 18, icon: Coffee },
]

interface BlogPost {
  to: '/guides/$slug' | '/poses/$slug'
  params: { slug: string }
  category: string
  title: string
  blurb: string
  author: string
  date: string
  readingTime: string
  image: string
  alt: string
}

const POSTS: Array<BlogPost> = [
  {
    to: '/guides/$slug',
    params: { slug: 'morning-yoga-routine' },
    category: 'Routines',
    title: 'Morning Yoga Routine — 15 minutes to energise your day',
    blurb:
      'A simple sequence to wake the spine, clear the head, and set the tone before life takes over. No props needed. Works on tired legs.',
    author: 'Marvin',
    date: 'May 12, 2026',
    readingTime: '6 min read',
    image: '/images/aiko-persona/aiko-warrior-ii-yoga-pose.webp',
    alt: 'A practitioner in Warrior II pose on a sage-green yoga mat in a warm Japanese-inspired studio',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'build-meditation-habit' },
    category: 'Practice',
    title: 'How to build a consistent meditation habit',
    blurb:
      'Why a five-minute sit beats a perfect twenty-minute one, and the three cues that keep the habit alive when motivation fades.',
    author: 'Marvin',
    date: 'May 5, 2026',
    readingTime: '8 min read',
    image: '/images/brand/topic-meditation.webp',
    alt: 'A stack of five balanced river stones beside a small bonsai and an incense holder on warm wooden floor',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'best-yoga-mats-for-beginners' },
    category: 'Gear',
    title: '7 best yoga mats for every practice (2026 guide)',
    blurb:
      'Researched mats for sweaty flows, low-impact rest, travel days, and restorative work. The best overall pick, the budget choice, the one for tight knees.',
    author: 'Marvin',
    date: 'April 28, 2026',
    readingTime: '12 min read',
    image: '/images/brand/pick-manduka-pro.webp',
    alt: 'A premium dark sage-green yoga mat partially rolled on a warm wooden studio floor',
  },
  {
    to: '/poses/$slug',
    params: { slug: 'sun-salutation' },
    category: 'Pose guides',
    title: 'Sun Salutation A, step by step',
    blurb:
      'Surya Namaskar A in twelve positions. Cues, breath count, common mistakes, and the modifications that beginners actually need.',
    author: 'Marvin',
    date: 'April 22, 2026',
    readingTime: '9 min read',
    image: '/images/aiko-persona/aiko-upward-facing-dog-yoga-pose.webp',
    alt: 'A practitioner in Upward-Facing Dog pose on a sage-green yoga mat in a warm Japanese-inspired studio',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'breathwork-for-calm' },
    category: 'Breathwork',
    title: 'Breathwork for calm — 4 techniques to lower stress',
    blurb:
      'Box breathing, nadi shodhana, extended exhales, and the one that nobody teaches but everyone needs at 3 PM on a Tuesday.',
    author: 'Marvin',
    date: 'April 14, 2026',
    readingTime: '7 min read',
    image: '/images/brand/topic-breathwork.webp',
    alt: 'Cropped close-up of a practitioner in dark olive top, one hand on sternum and one on lower abdomen, eyes closed',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'yin-yoga-for-sleep' },
    category: 'Restorative',
    title: 'Better sleep through yin yoga — a 20-minute evening sequence',
    blurb:
      'Five long holds that slow the nervous system. No flexibility required. Done in pyjamas on the bedroom floor before lights out.',
    author: 'Marvin',
    date: 'April 8, 2026',
    readingTime: '10 min read',
    image: '/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
    alt: 'A practitioner in child’s pose on a sage-green yoga mat in a Japanese-inspired studio with morning light',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'cork-vs-foam-blocks' },
    category: 'Gear',
    title: 'Cork vs foam blocks — which yoga prop is right for you?',
    blurb:
      'The honest answer depends on your floor, your hands, and whether you sweat. The two situations where foam genuinely wins.',
    author: 'Marvin',
    date: 'April 1, 2026',
    readingTime: '5 min read',
    image: '/images/brand/pick-cork-blocks.webp',
    alt: 'A pair of natural cork yoga blocks stacked on warm wooden studio floor',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'seated-twists-for-mobility' },
    category: 'Routines',
    title: 'Seated twists for spinal mobility — a 10-minute routine',
    blurb:
      'A short floor sequence for desk-tight backs. Build the breath in, twist out. The cue that finally made it click for me.',
    author: 'Marvin',
    date: 'March 25, 2026',
    readingTime: '7 min read',
    image: '/images/aiko-persona/aiko-seated-twist-yoga-pose.webp',
    alt: 'A practitioner in a seated spinal twist on a sage-green yoga mat in a Japanese-inspired studio',
  },
]

function GuidesIndex() {
  return (
    <>
      {/* ============================================================
          HERO — full-width with bg image + dark overlay
          ============================================================ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/brand/journal-hero-bg.webp')" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/25"
        />
        <JapaneseAccent
          phrase="practice"
          vertical
          tone="onDark"
          className="pointer-events-none absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 xl:block"
        />
        <Container size="wide" className="relative z-10">
          <div className="max-w-2xl py-20 md:py-32">
            <Eyebrow tone="onDark">The Journal</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--color-bg)] md:text-[56px]">
              Yoga knowledge.
              <br />
              <span className="italic text-[color:var(--color-accent-soft)]">
                Real practice. Real life.
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-sm leading-relaxed text-[color:var(--color-bg)]/80 md:text-base">
              In-depth articles, honest reviews, and practical advice from the mat. Routines you
              can actually use, gear that actually matters, and the calm decisions that move your
              practice forward.
            </p>
          </div>
        </Container>
      </section>

      {/* ============================================================
          FILTER TABS
          ============================================================ */}
      <section className="border-y border-[color:var(--color-border)]/70 bg-[color:var(--color-bg)]">
        <Container size="wide" className="py-5">
          <ul
            className="flex flex-wrap items-center gap-2 md:gap-3"
            aria-label="Filter articles by category"
          >
            {CATEGORIES.map((cat, i) => (
              <li key={cat}>
                <button
                  type="button"
                  disabled
                  className={cn(
                    'rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] transition',
                    i === 0
                      ? 'bg-[color:var(--color-olive)] text-[color:var(--color-bg)]'
                      : 'border border-[color:var(--color-border)] text-[color:var(--color-ink-muted)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-deep)]',
                  )}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ============================================================
          POST LIST + SIDEBAR — 8/4 split on md+
          Featured post (POSTS[0]) renders above the regular list.
          ============================================================ */}
      <section className="bg-[color:var(--color-bg)]">
        <Container size="wide" className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
            <div className="md:col-span-8">
              {/* Featured post */}
              <article className="mb-14">
                <Link
                  to={POSTS[0].to}
                  params={POSTS[0].params}
                  className="group block"
                >
                  <div className="aspect-[3/2] overflow-hidden rounded-3xl bg-[color:var(--color-surface)] ring-1 ring-[color:var(--color-border)]">
                    <img
                      src={POSTS[0].image}
                      alt={POSTS[0].alt}
                      width={1200}
                      height={800}
                      loading="eager"
                      fetchPriority="high"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-7">
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
                      Featured · {POSTS[0].category}
                    </p>
                    <h2 className="mt-4 font-serif text-3xl leading-[1.15] tracking-tight text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)] md:text-[36px]">
                      {POSTS[0].title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-[15px]">
                      {POSTS[0].blurb}
                    </p>
                    <p className="mt-5 text-xs text-[color:var(--color-ink-muted)]">
                      By {POSTS[0].author}
                      <span className="mx-2 opacity-40">·</span>
                      {POSTS[0].date}
                      <span className="mx-2 opacity-40">·</span>
                      {POSTS[0].readingTime}
                    </p>
                  </div>
                </Link>
              </article>

              {/* Regular post list (everything except featured) */}
              <ul className="flex flex-col divide-y divide-[color:var(--color-border)]/60 border-t border-[color:var(--color-border)]/60">
                {POSTS.slice(1).map((post) => (
                  <li key={post.params.slug}>
                    <Link
                      to={post.to}
                      params={post.params}
                      className="group grid items-start gap-6 py-10 md:grid-cols-12 md:gap-8"
                    >
                  <div className="md:col-span-4">
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[color:var(--color-surface)] ring-1 ring-[color:var(--color-border)]">
                      <img
                        src={post.image}
                        alt={post.alt}
                        width={600}
                        height={450}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
                      {post.category}
                    </p>
                    <h2 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)] md:text-[28px]">
                      {post.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-[15px]">
                      {post.blurb}
                    </p>
                    <p className="mt-5 text-xs text-[color:var(--color-ink-muted)]">
                      By {post.author}
                      <span className="mx-2 opacity-40">·</span>
                      {post.date}
                      <span className="mx-2 opacity-40">·</span>
                      {post.readingTime}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* ============================================================
              PAGINATION — placeholder (single page for now)
              ============================================================ */}
          <nav
            className="mt-12 flex items-center justify-center gap-3"
            aria-label="Article pagination"
          >
            <button
              type="button"
              disabled
              aria-label="Previous page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-ink-muted)] opacity-50"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                disabled
                aria-current={page === 1 ? 'page' : undefined}
                className={cn(
                  'inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm transition',
                  page === 1
                    ? 'bg-[color:var(--color-olive)] text-[color:var(--color-bg)]'
                    : 'border border-[color:var(--color-border)] text-[color:var(--color-ink-muted)]',
                )}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled
              aria-label="Next page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-ink-muted)] opacity-50"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </nav>
            </div>

            {/* ============================================================
                SIDEBAR — search + popular + categories + newsletter + follow
                ============================================================ */}
            <aside className="md:col-span-4 md:pl-2 lg:pl-4">
              {/* Search */}
              <div className="mb-12">
                <label htmlFor="journal-search" className="sr-only">
                  Search the journal
                </label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-ink-muted)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <input
                    id="journal-search"
                    type="search"
                    placeholder="Search the journal..."
                    disabled
                    className="w-full rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] py-3 pl-11 pr-5 text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] focus:border-[color:var(--color-accent)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Popular posts — boxed, numbered, thumbnail + category + title */}
              <div className="mb-12 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8">
                <p className="mb-7 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Popular posts
                </p>
                <ol className="divide-y divide-[color:var(--color-border)]/60">
                  {POSTS.slice(0, 4).map((post, i) => (
                    <li key={`popular-${post.params.slug}`}>
                      <Link
                        to={post.to}
                        params={post.params}
                        className="group flex items-start gap-4 py-10 first:pt-0 last:pb-0"
                      >
                        <span className="font-serif text-base italic leading-none text-[color:var(--color-accent)]/80">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="aspect-square w-14 flex-shrink-0 overflow-hidden rounded-md bg-[color:var(--color-bg)] ring-1 ring-[color:var(--color-border)]">
                          <img
                            src={post.image}
                            alt={post.alt}
                            width={120}
                            height={120}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
                            {post.category}
                          </p>
                          <p className="mt-1 line-clamp-3 font-serif text-[14px] leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                            {post.title}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Newsletter signup — bg image with cream-tinted overlay for subtle texture */}
              <div className="relative mb-12 overflow-hidden rounded-2xl border border-[color:var(--color-border)]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/images/brand/journal-newsletter-bg.webp')" }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[color:var(--color-surface)]/85"
                />
                <div className="relative p-8">
                  <p className="text-[10px] font-medium uppercase leading-relaxed tracking-[0.22em] text-[color:var(--color-ink)]">
                    Mindful insights,
                    <br />
                    straight to your inbox.
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                    Practical tips, new guides and honest recommendations to support your practice.
                  </p>
                  <form action="#" method="post" className="mt-6 flex flex-col gap-3">
                    <label htmlFor="sidebar-newsletter" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="sidebar-newsletter"
                      type="email"
                      name="email"
                      required
                      placeholder="Your email address"
                      className="w-full rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-2.5 text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] focus:border-[color:var(--color-accent)] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-full bg-[color:var(--color-olive)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
                    >
                      Join free
                    </button>
                  </form>
                  <p className="mt-4 text-[11px] text-[color:var(--color-ink-muted)]">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>

              {/* Categories — boxed, zen icons, counts, view all link */}
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Categories
                </p>
                <hr className="mb-2 mt-4 border-[color:var(--color-border)]" />
                <ul className="space-y-0.5">
                  {SIDEBAR_CATEGORIES.map((cat) => (
                    <li key={cat.name}>
                      <button
                        type="button"
                        disabled
                        className="group flex w-full items-center justify-between rounded-lg px-2 py-3 transition hover:bg-[color:var(--color-bg)]"
                      >
                        <span className="flex items-center gap-3 text-sm text-[color:var(--color-ink-soft)] transition group-hover:text-[color:var(--color-accent-deep)]">
                          <cat.icon
                            className="h-4 w-4 flex-shrink-0 text-[color:var(--color-accent)]"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                          {cat.name}
                        </span>
                        <span className="text-xs tabular-nums text-[color:var(--color-ink-muted)]">
                          {cat.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-[color:var(--color-border)] pt-5">
                  <Link
                    to="/guides"
                    className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
                  >
                    View all categories
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ============================================================
          BOTTOM CTA — quiet dark band before the footer, bg image
          ============================================================ */}
      <Section tone="dark" padding="md" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/brand/journal-cta-bg.webp')" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/55"
        />
        <JapaneseAccent
          phrase="stillness"
          vertical
          tone="onDark"
          className="pointer-events-none absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 xl:block"
        />
        <Container size="wide" className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="onDark">From the mat</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-tight md:text-[44px]">
              Better practice.
              <br />
              <span className="italic text-[color:var(--color-accent-soft)]">Better you.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-bg)]/70 md:text-base">
              Real articles, honest gear notes, and a calm path through the practice. Start where
              you are, not where you think you should be.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/start-here"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-accent-deep)]"
              >
                Start here
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </Link>
              <Link
                to="/poses"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-bg)]/30 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-soft)]"
              >
                Browse poses
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
