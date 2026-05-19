import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
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
          HERO STRIP — editorial intro to the journal
          ============================================================ */}
      <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
        <JapaneseAccent
          phrase="practice"
          vertical
          tone="soft"
          className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 xl:block"
        />
        <Container size="wide">
          <div className="grid items-center gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
            <div className="md:col-span-8">
              <Eyebrow tone="accent">The Journal</Eyebrow>
              <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--color-ink)] md:text-[44px]">
                Yoga knowledge.
                <span className="italic text-[color:var(--color-ink-soft)]"> Real practice. Real life.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
                In-depth articles, honest reviews, and practical advice from the mat. Routines you
                can actually use, gear that actually matters, and the calm decisions that move your
                practice forward.
              </p>
            </div>
            <div className="hidden md:col-span-4 md:block">
              <div className="ml-auto aspect-square max-w-[240px] overflow-hidden rounded-2xl ring-1 ring-[color:var(--color-border)]">
                <img
                  src="/images/brand/topic-yoga-tips.webp"
                  alt="An open leather journal, a ceramic tea cup with steam rising, and a sprig of olive leaves on a wooden surface"
                  width={400}
                  height={400}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
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
                      ? 'bg-[color:var(--color-ink)] text-[color:var(--color-bg)]'
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
                    ? 'bg-[color:var(--color-ink)] text-[color:var(--color-bg)]'
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

              {/* Popular posts — simple text-list with date */}
              <div className="mb-12">
                <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Popular posts
                </p>
                <ul className="space-y-0">
                  {POSTS.slice(0, 5).map((post) => (
                    <li key={`popular-${post.params.slug}`}>
                      <Link
                        to={post.to}
                        params={post.params}
                        className="group block border-b border-[color:var(--color-border)]/60 py-4 last:border-b-0"
                      >
                        <p className="font-serif text-[15px] leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                          {post.title}
                        </p>
                        <p className="mt-1.5 text-xs text-[color:var(--color-ink-muted)]">
                          {post.date}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories — subtle accent dot per category */}
              <div className="mb-12">
                <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Categories
                </p>
                <ul className="space-y-1">
                  {CATEGORIES.slice(1).map((cat) => {
                    const count = POSTS.filter((p) => p.category === cat).length
                    return (
                      <li key={cat}>
                        <button
                          type="button"
                          disabled
                          className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition hover:bg-[color:var(--color-surface)]"
                        >
                          <span className="flex items-center gap-3 text-[color:var(--color-ink-soft)] transition group-hover:text-[color:var(--color-accent-deep)]">
                            <span
                              className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--color-accent)]/60"
                              aria-hidden="true"
                            />
                            {cat}
                          </span>
                          <span className="text-xs tracking-wide text-[color:var(--color-ink-muted)]">
                            {count}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Newsletter mini — plain on page bg, no box, no bg image */}
              <div className="mb-12 border-t border-[color:var(--color-border)]/60 pt-8">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
                  Mindful inbox
                </p>
                <p className="mb-4 font-serif text-xl leading-snug text-[color:var(--color-ink)]">
                  One short email a week
                </p>
                <p className="mb-5 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                  New articles, gear notes, and one thing I am researching right now.
                </p>
                <form action="#" method="post" className="flex flex-col gap-3">
                  <label htmlFor="sidebar-newsletter" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="sidebar-newsletter"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-full border border-[color:var(--color-border)] bg-transparent px-4 py-2.5 text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] focus:border-[color:var(--color-accent)] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[color:var(--color-olive)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Follow */}
              <div>
                <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Follow
                </p>
                <ul className="space-y-3 text-sm text-[color:var(--color-ink-soft)]">
                  <li>
                    <a
                      href="https://pinterest.com/theyogasensei"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-[color:var(--color-accent-deep)]"
                    >
                      Pinterest
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/theyogasensei"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-[color:var(--color-accent-deep)]"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
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
