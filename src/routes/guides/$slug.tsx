import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import {
  ArrowRight,
  Brain,
  Coffee,
  Package,
  Sparkles,
  Wind,
  Activity,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { loadContent, loadFrontmatter } from '#/lib/mdx/loader'
import { resolveAuthor } from '#/lib/content/authors'
import { buildHead, SITE_URL } from '#/lib/seo/head'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

// Sidebar "Popular articles" — hand-curated, EXISTING slugs only.
// When new evergreen guides ship, add them here (or replace with a
// listFrontmatter-driven Popular component once that helper exists).
interface SidebarPost {
  to: '/guides/$slug' | '/poses/$slug'
  params: { slug: string }
  category: string
  title: string
}
const POPULAR_POSTS: Array<SidebarPost> = [
  {
    to: '/guides/$slug',
    params: { slug: 'yoga-for-beginners' },
    category: 'Guide',
    title: 'Yoga for Beginners: A Complete Guide',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'how-to-clean-a-yoga-mat' },
    category: 'Mat care',
    title: 'How to Clean a Yoga Mat (Without Damaging It)',
  },
  {
    to: '/poses/$slug',
    params: { slug: 'sun-salutation' },
    category: 'Pose',
    title: 'Sun Salutation: A Step-by-Step Beginner Guide',
  },
]

interface SidebarCategory {
  name: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}
const SIDEBAR_CATEGORIES: Array<SidebarCategory> = [
  { name: 'Practice', icon: Activity },
  { name: 'Gear', icon: Package },
  { name: 'Meditation', icon: Sparkles },
  { name: 'Mindset', icon: Brain },
  { name: 'Breathwork', icon: Wind },
  { name: 'Lifestyle', icon: Coffee },
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

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function GuidePage() {
  const { frontmatter, author } = Route.useLoaderData()
  const { slug } = Route.useParams()
  const { Component } = loadContent('guides', slug)
  const eyebrow = frontmatter.tags?.[0] ?? 'Guide'

  return (
    <>
      {/* ============================================================
          ARTICLE HERO — fade-left photo right, title + byline left
          ============================================================ */}
      <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-right-top bg-no-repeat opacity-90"
          style={{
            backgroundImage:
              "url('/images/brand/article-hero-morning-yoga.webp')",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--color-bg) 0%, rgba(246,241,234,.98) 36%, rgba(246,241,234,.42) 64%, rgba(246,241,234,0) 100%)',
          }}
        />
        <Container size="wide" className="relative">
          <div className="max-w-2xl py-20 md:py-28">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-3 text-xs text-[color:var(--color-ink-muted)]"
            >
              <Link to="/" className="transition hover:text-[color:var(--color-ink)]">
                Home
              </Link>
              <span aria-hidden="true">›</span>
              <Link to="/guides" className="transition hover:text-[color:var(--color-ink)]">
                Guides
              </Link>
              <span aria-hidden="true">›</span>
              <span className="font-medium text-[color:var(--color-ink)]">
                {frontmatter.title}
              </span>
            </nav>
            <Eyebrow tone="accent">{eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--color-ink)] md:text-[48px]">
              {frontmatter.title}
            </h1>
            {frontmatter.metaDescription ? (
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
                {frontmatter.metaDescription}
              </p>
            ) : null}
            <div className="mt-9 flex items-center gap-4">
              <img
                src="/images/brand/avatar-yoga-sensei.webp"
                alt={`Avatar of ${author.name}`}
                width={96}
                height={96}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
              />
              <div className="text-sm">
                <p className="font-medium text-[color:var(--color-ink)]">
                  By{' '}
                  <Link
                    to="/about"
                    className="underline-offset-2 hover:underline"
                  >
                    {author.name}
                  </Link>
                </p>
                <p className="text-xs text-[color:var(--color-ink-muted)]">
                  {formatDate(frontmatter.publishedAt)}
                  <span className="mx-1.5 opacity-40">·</span>
                  {frontmatter.estimatedReadingTime} min read
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          BODY + SIDEBAR — main MDX content + curated sidebar
          ============================================================ */}
      <section className="bg-[color:var(--color-bg)] pb-16 md:pb-24">
        <Container size="wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
            {/* Main column — real MDX body rendered through prose styling */}
            <article className="prose prose-stone prose-lg max-w-none md:col-span-8 prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-[color:var(--color-ink)] prose-p:text-[color:var(--color-ink-soft)] prose-a:text-[color:var(--color-olive)] prose-a:underline-offset-2 hover:prose-a:text-[color:var(--color-olive-deep)] prose-strong:text-[color:var(--color-ink)] prose-blockquote:border-l-[color:var(--color-olive)] prose-blockquote:text-[color:var(--color-ink-soft)] prose-code:text-[color:var(--color-ink)] prose-th:text-[color:var(--color-ink)] prose-td:text-[color:var(--color-ink-soft)]">
              <Component />
            </article>

            {/* Sidebar */}
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
                    alt={`Avatar of ${author.name}`}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="h-14 w-14 flex-shrink-0 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
                  />
                  <div>
                    <p className="font-serif text-base leading-snug text-[color:var(--color-ink)]">
                      {author.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                      Founder of The Yoga Sensei. Long-time practitioner, not a
                      certified instructor — every piece on this site is
                      written and edited by Marvin.
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

              {/* Popular articles — curated EXISTING slugs only */}
              <div className="mb-12 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Read next
                </p>
                <hr className="mb-2 mt-4 border-[color:var(--color-border)]" />
                <ol className="divide-y divide-[color:var(--color-border)]/60">
                  {POPULAR_POSTS.filter((p) => p.params.slug !== slug).map(
                    (post, i) => (
                      <li key={`popular-${post.params.slug}`}>
                        <Link
                          to={post.to}
                          params={post.params}
                          className="group flex items-start gap-4 py-6 first:pt-4 last:pb-0"
                        >
                          <span className="font-serif text-base leading-none text-[color:var(--color-ink-muted)]">
                            {i + 1}
                          </span>
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
                    ),
                  )}
                </ol>
              </div>

              {/* Newsletter signup */}
              <div className="relative mb-12 overflow-hidden rounded-2xl border border-[color:var(--color-border)]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url('/images/brand/journal-newsletter-bg.webp')",
                  }}
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
                    Get practical tips, new guides and honest recommendations
                    to support your practice.
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

              {/* Categories (display-only until we have real category routing) */}
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Categories
                </p>
                <hr className="mb-2 mt-4 border-[color:var(--color-border)]" />
                <ul className="space-y-0.5">
                  {SIDEBAR_CATEGORIES.map((cat) => (
                    <li key={cat.name}>
                      <span className="group flex w-full items-center gap-3 rounded-lg px-2 py-3 text-sm text-[color:var(--color-ink-soft)]">
                        <cat.icon
                          className="h-4 w-4 flex-shrink-0 text-[color:var(--color-accent)]"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        {cat.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-[color:var(--color-border)] pt-5">
                  <Link
                    to="/guides"
                    className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
                  >
                    View all guides
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ============================================================
          BOTTOM CTA
          ============================================================ */}
      <section className="bg-[color:var(--color-surface)]">
        <Container size="wide">
          <div className="grid items-center gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
            <div className="md:col-span-7">
              <Eyebrow tone="accent">Start your journey</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-tight text-[color:var(--color-ink)] md:text-[44px]">
                Better practice.
                <br />
                <span className="italic text-[color:var(--color-ink-soft)]">
                  Better you.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
                Explore our guides, reviews and resources and take your yoga
                practice to the next level.
              </p>
              <Link
                to="/guides"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-olive)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
              >
                Browse all guides
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
