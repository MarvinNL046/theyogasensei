import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import {
  Activity,
  ArrowRight,
  Brain,
  Check,
  Coffee,
  Package,
  Sliders,
  Sparkles,
  Sun,
  Timer,
  TrendingUp,
  Wind,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { loadFrontmatter } from '#/lib/mdx/loader'
import { resolveAuthor } from '#/lib/content/authors'
import { buildHead, SITE_URL } from '#/lib/seo/head'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

interface ArticleStat {
  num: number
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const ARTICLE_STATS: Array<ArticleStat> = [
  { num: 1, label: 'Why it works', icon: Sun },
  { num: 2, label: '15-minute routine', icon: Timer },
  { num: 3, label: 'Modify it', icon: Sliders },
  { num: 4, label: 'Stay consistent', icon: TrendingUp },
]

interface SidebarPost {
  to: '/guides/$slug' | '/poses/$slug'
  params: { slug: string }
  category: string
  title: string
  image: string
}

const POPULAR_POSTS: Array<SidebarPost> = [
  {
    to: '/guides/$slug',
    params: { slug: 'best-yoga-mats-for-beginners' },
    category: 'Gear',
    title: '7 Best Yoga Mats for Every Practice (2024 Guide)',
    image: '/images/brand/pick-manduka-pro.webp',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'build-meditation-habit' },
    category: 'Meditation',
    title: 'How to Build a Consistent Meditation Habit',
    image: '/images/brand/topic-meditation.webp',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'seated-twists-for-mobility' },
    category: 'Flexibility',
    title: '10 Stretches to Improve Your Flexibility Safely',
    image: '/images/aiko-persona/aiko-seated-twist-yoga-pose.webp',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'yoga-philosophy-lessons' },
    category: 'Lifestyle',
    title: 'Yoga Philosophy: 8 Lessons for a More Meaningful Life',
    image: '/images/brand/topic-yoga-styles.webp',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'breathwork-for-calm' },
    category: 'Breathwork',
    title: 'Breathwork for Calm: 5 Techniques to Reduce Stress',
    image: '/images/brand/topic-breathwork.webp',
  },
]

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

export const Route = createFileRoute('/guides/$slug')({
  loader: ({ params }) => {
    try {
      const { frontmatter } = loadFrontmatter('guides', params.slug)
      const author = resolveAuthor(frontmatter.author)
      return { frontmatter, author }
    } catch {
      throw notFound()
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    return buildHead(loaderData.frontmatter, {
      siteUrl: SITE_URL,
      routePath: `/guides/${params.slug}`,
      author: loaderData.author,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: loaderData.frontmatter.title },
      ],
    })
  },
  component: GuidePage,
})

function GuidePage() {
  // Placeholder design data for template 3 visual demo.
  // Will be wired to frontmatter + MDX body once content matches the design.
  return (
    <>
      {/* ============================================================
          ARTICLE HERO — fade-left photo right, title + byline left
          ============================================================ */}
      <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-right-top bg-no-repeat"
          style={{ backgroundImage: "url('/images/brand/article-hero-morning-yoga.webp')" }}
        />
        <Container size="wide" className="relative">
          <div className="max-w-xl py-20 md:py-28">
            <Eyebrow tone="accent">Practice</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--color-ink)] md:text-[48px]">
              Morning Yoga Routine: 15 Minutes to Energize Your Day
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
              A simple morning sequence to wake up your body, clear your mind and set the tone for a
              better day.
            </p>
            <div className="mt-9 flex items-center gap-4">
              <img
                src="/images/brand/avatar-yoga-sensei.webp"
                alt="The Yoga Sensei"
                width={96}
                height={96}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
              />
              <div className="text-sm">
                <p className="font-medium text-[color:var(--color-ink)]">By The Yoga Sensei</p>
                <p className="text-xs text-[color:var(--color-ink-muted)]">
                  May 12, 2024
                  <span className="mx-1.5 opacity-40">·</span>
                  6 min read
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          STATS / TOC strip — horizontal nav summary below hero
          ============================================================ */}
      <section className="border-y border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
        <Container size="wide">
          <ul className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-[color:var(--color-border)]/70">
            {ARTICLE_STATS.map((stat) => (
              <li
                key={stat.num}
                className="flex items-center gap-4 px-2 py-6 md:px-8"
              >
                <stat.icon
                  className="h-5 w-5 flex-shrink-0 text-[color:var(--color-olive-soft)]"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-serif text-base italic leading-none text-[color:var(--color-accent)]/80">
                    {String(stat.num).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
                    {stat.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ============================================================
          BLOG POST IMAGE — large landscape article image
          ============================================================ */}
      <section className="bg-[color:var(--color-bg)] py-12 md:py-16">
        <Container size="wide">
          <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-[color:var(--color-surface)] ring-1 ring-[color:var(--color-border)]">
            <img
              src="/images/aiko-persona/aiko-cobra-pose-warm-yoga-studio.webp"
              alt="The Yoga Sensei demonstrating cobra pose on a sage-green mat in a warm Japanese-inspired studio"
              width={1536}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* ============================================================
          BODY + SIDEBAR — 2-col layout: main content (8) + sidebar (4)
          ============================================================ */}
      <section className="bg-[color:var(--color-bg)] pb-16 md:pb-24">
        <Container size="wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
            {/* Main column */}
            <div className="md:col-span-8">
              <p className="text-base leading-relaxed text-[color:var(--color-ink-soft)] md:text-[17px]">
                Mornings set the tone for everything that follows. A few intentional minutes on your
                mat can wake up your body, calm your mind and help you move through the day with
                more clarity and energy.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[color:var(--color-ink-soft)] md:text-[17px]">
                This 15-minute routine is designed to do exactly that.
              </p>

              <hr className="my-12 border-[color:var(--color-border)]/60" />

              <h2 className="font-serif text-3xl leading-tight tracking-tight text-[color:var(--color-ink)] md:text-[34px]">
                1. Why Morning Yoga Works
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[color:var(--color-ink-soft)] md:text-[17px]">
                After a night of rest, your body can feel stiff and your mind foggy. Gentle movement
                increases circulation, improves mobility and boosts focus — without overstimulating
                your system.
              </p>
              <ul className="mt-6 space-y-3 text-[color:var(--color-ink-soft)]">
                {[
                  'Increases energy naturally',
                  'Improves mood and mental clarity',
                  'Supports better posture and flexibility',
                  'Creates a mindful start to your day',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-olive)]/15">
                      <Check
                        className="h-3 w-3 text-[color:var(--color-olive-deep)]"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-base leading-relaxed md:text-[17px]">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-14 font-serif text-3xl leading-tight tracking-tight text-[color:var(--color-ink)] md:text-[34px]">
                2. The 15-Minute Morning Routine
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[color:var(--color-ink-soft)] md:text-[17px]">
                Move through the following sequence with your breath. Spend 3–5 breaths in each
                pose.
              </p>

              {/* Pose card */}
              <article className="mt-8 overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                <div className="grid items-center md:grid-cols-12">
                  <div className="aspect-square md:col-span-4 md:aspect-auto md:h-full">
                    <img
                      src="/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp"
                      alt="The Yoga Sensei in Cat-Cow pose on a sage-green mat"
                      width={600}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:col-span-8 md:p-8">
                    <h3 className="font-serif text-xl leading-snug text-[color:var(--color-ink)] md:text-[22px]">
                      1. Cat-Cow (Marjaryasana-Bitilasana)
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
                      Warm up your spine and connect with your breath.
                    </p>
                    <span className="mt-5 inline-flex items-center rounded-full bg-[color:var(--color-bg)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)] ring-1 ring-[color:var(--color-border)]">
                      1 minute
                    </span>
                  </div>
                </div>
              </article>
            </div>

            {/* ============================================================
                SIDEBAR — About Author + Popular + Newsletter + Categories
                ============================================================ */}
            <aside className="md:col-span-4 md:pl-2 lg:pl-4">
              {/* About the Author */}
              <div className="mb-12 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  About the Author
                </p>
                <hr className="mb-6 mt-4 border-[color:var(--color-border)]" />
                <div className="flex items-start gap-4">
                  <img
                    src="/images/brand/avatar-yoga-sensei.webp"
                    alt="The Yoga Sensei avatar"
                    width={96}
                    height={96}
                    loading="lazy"
                    className="h-14 w-14 flex-shrink-0 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
                  />
                  <div>
                    <p className="font-serif text-base leading-snug text-[color:var(--color-ink)]">
                      The Yoga Sensei
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                      Yoga teacher, student and lifelong learner. Sharing honest insights to help
                      you build a consistent practice that transforms.
                    </p>
                  </div>
                </div>
                <Link
                  to="/about"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
                >
                  More about me
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>
              </div>

              {/* Popular articles */}
              <div className="mb-12 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Popular articles
                </p>
                <hr className="mb-2 mt-4 border-[color:var(--color-border)]" />
                <ol className="divide-y divide-[color:var(--color-border)]/60">
                  {POPULAR_POSTS.map((post, i) => (
                    <li key={`popular-${post.params.slug}`}>
                      <Link
                        to={post.to}
                        params={post.params}
                        className="group flex items-start gap-4 py-6 first:pt-4 last:pb-0"
                      >
                        <span className="font-serif text-base leading-none text-[color:var(--color-ink-muted)]">
                          {i + 1}
                        </span>
                        <div className="aspect-square w-14 flex-shrink-0 overflow-hidden rounded-md bg-[color:var(--color-bg)] ring-1 ring-[color:var(--color-border)]">
                          <img
                            src={post.image}
                            alt=""
                            width={120}
                            height={120}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-3 font-serif text-[14px] leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                            {post.title}
                          </p>
                          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
                            {post.category}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Newsletter signup — bg image with cream-tinted overlay */}
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
                  <p className="font-serif text-xl leading-snug text-[color:var(--color-ink)]">
                    Mindful insights.
                    <br />
                    Straight to your inbox.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                    Get practical tips, new guides and honest recommendations to support your
                    practice.
                  </p>
                  <form action="#" method="post" className="mt-6 flex flex-col gap-3">
                    <label htmlFor="article-sidebar-newsletter" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="article-sidebar-newsletter"
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

              {/* Categories — boxed, zen icons, counts, view all */}
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
          BOTTOM CTA — cream band, 2-col: text left + photo right
          ============================================================ */}
      <section className="bg-[color:var(--color-surface)]">
        <Container size="wide">
          <div className="grid items-center gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
            <div className="md:col-span-6">
              <Eyebrow tone="accent">Start your journey</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-tight text-[color:var(--color-ink)] md:text-[44px]">
                Better practice.
                <br />
                <span className="italic text-[color:var(--color-ink-soft)]">Better you.</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
                Explore our guides, reviews and resources and take your yoga practice to the next
                level.
              </p>
              <Link
                to="/guides"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-olive)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
              >
                Explore guides
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </Link>
            </div>
            <div className="md:col-span-6">
              <div className="aspect-[5/3] overflow-hidden rounded-2xl bg-[color:var(--color-bg)] ring-1 ring-[color:var(--color-border)]">
                <img
                  src="/images/brand/topic-yoga-mats.webp"
                  alt="A sage-green yoga mat half-rolled on warm wooden studio floor with olive branch in ceramic vase"
                  width={1200}
                  height={720}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
