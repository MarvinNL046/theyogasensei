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
import {
  extractGuideHeadings,
  loadContent,
  loadFrontmatter,
} from '#/lib/mdx/loader'
import { resolveAuthor } from '#/lib/content/authors'
import { resolveRelated } from '#/lib/content/related'
import { buildHead, SITE_URL } from '#/lib/seo/head'
import { buildImageUrl } from '#/lib/images/variants'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { GuideToc } from '#/components/seo/GuideToc'
import { AffiliateDisclosure } from '#/components/site/AffiliateDisclosure'
import { contentMdxComponents } from '#/lib/mdx/components'
import { ArticleNewsletterBand } from '#/components/site/article-newsletter-band'
import { Faq } from '#/components/seo/Faq'
import {
  ResearchStatus,
  UpdateHistory,
} from '#/components/editorial/TrustBlocks'
import { GuideTemplatePanel } from '#/components/editorial/GuideTemplatePanel'
import { RelatedPathways } from '#/components/site/RelatedPathways'

// Sidebar "Popular articles" — hand-curated, EXISTING slugs only.
// When new evergreen guides ship, add them here (or replace with a
// listFrontmatter-driven Popular component once that helper exists).
interface SidebarPost {
  to: '/guides/$slug'
  params: { slug: string }
  category: string
  title: string
}
const POPULAR_POSTS: Array<SidebarPost> = [
  {
    to: '/guides/$slug',
    params: { slug: 'how-to-clean-a-yoga-mat' },
    category: 'Mat care',
    title: 'How to Clean a Yoga Mat (Without Damaging It)',
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
    // Drafts live under content/guides/_drafts/ — never routable, even directly.
    if (params.slug.split('/').includes('_drafts')) throw notFound()
    try {
      const { frontmatter } = loadFrontmatter('guides', params.slug)
      const author = resolveAuthor(frontmatter.author)
      const headings = extractGuideHeadings(params.slug)
      return { frontmatter, author, headings }
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
  const { frontmatter, author, headings } = Route.useLoaderData()
  const { slug } = Route.useParams()
  const { Component } = loadContent('guides', slug)
  const eyebrow = frontmatter.tags[0]
  const heroImageUrl = buildImageUrl(frontmatter.heroImage, 'og')
  const faqItems =
    'faq' in frontmatter && frontmatter.faq ? frontmatter.faq : []

  // Sidebar "Read next": prefer this guide's curated related[] (resolved to live,
  // hop-free URLs); fall back to the hand-picked POPULAR_POSTS when none resolve.
  const related = resolveRelated(frontmatter.related, {
    exclude: slug,
    limit: 5,
  })
  const readNext: Array<{ href: string; title: string; category: string }> =
    related.length > 0
      ? related
      : POPULAR_POSTS.filter((p) => p.params.slug !== slug).map((p) => ({
          href: `/guides/${p.params.slug}`,
          title: p.title,
          category: p.category,
        }))

  return (
    <>
      {/* ============================================================
          ARTICLE HERO — fade-left photo right, title + byline left
          ============================================================ */}
      <section className="relative overflow-hidden bg-[color:var(--color-surface-muted)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-right-top bg-no-repeat opacity-90"
          style={{
            backgroundImage: `url('${heroImageUrl}')`,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--color-bg) 0%, rgba(251,250,246,.98) 36%, rgba(251,250,246,.5) 64%, rgba(251,250,246,0) 100%)',
          }}
        />
        <Container size="wide" className="relative">
          <div className="max-w-2xl py-20 md:py-28">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-3 text-xs text-[color:var(--color-ink-muted)]"
            >
              <Link
                to="/"
                className="transition hover:text-[color:var(--color-ink)]"
              >
                Home
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-[color:var(--color-ink-muted)]">
                Guides
              </span>
              <span aria-hidden="true">›</span>
              <span className="font-medium text-[color:var(--color-ink)]">
                {frontmatter.title}
              </span>
            </nav>
            <Eyebrow tone="default">{eyebrow}</Eyebrow>
            <div className="mt-4">
              <ResearchStatus
                status={
                  frontmatter.clusters.includes('affiliate')
                    ? 'Specifications and sources checked'
                    : 'Educational guide · sources reviewed'
                }
              />
            </div>
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight md:text-[48px]">
              {frontmatter.title}
            </h1>
            {frontmatter.metaDescription ? (
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
                {frontmatter.metaDescription}
              </p>
            ) : null}
            <div className="mt-9 flex items-center gap-4">
              <img
                src="/images/team/marvin.webp"
                alt={`Avatar of ${author.name}`}
                width={96}
                height={96}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
              />
              <div className="text-sm">
                <p className="font-medium text-[color:var(--color-ink)]">
                  By{' '}
                  <Link
                    to="/authors/$slug"
                    params={{ slug: author.slug }}
                    className="underline-offset-2 hover:underline"
                  >
                    {author.name}
                  </Link>
                </p>
                <p className="text-xs text-[color:var(--color-ink-muted)]">
                  Updated {formatDate(frontmatter.lastReviewedAt)}
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
      <section className="bg-[color:var(--color-bg)] pb-16 pt-12 md:pb-24 md:pt-16">
        <Container size="wide">
          <div className="grid min-w-0 gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
            {/* Main column — real MDX body rendered through prose styling */}
            <article className="prose prose-stone prose-lg min-w-0 max-w-full md:col-span-8 prose-headings:scroll-mt-28 prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-[color:var(--color-ink)] prose-p:text-[color:var(--color-ink-soft)] prose-a:text-[color:var(--color-olive)] prose-a:underline-offset-2 hover:prose-a:text-[color:var(--color-olive-deep)] prose-strong:text-[color:var(--color-ink)] prose-blockquote:border-l-[color:var(--color-olive)] prose-blockquote:text-[color:var(--color-ink-soft)] prose-code:text-[color:var(--color-ink)] prose-th:text-[color:var(--color-ink)] prose-td:text-[color:var(--color-ink-soft)]">
              {frontmatter.clusters.includes('affiliate') ? (
                <AffiliateDisclosure />
              ) : null}
              <GuideTemplatePanel slug={slug} />
              <div className="not-prose mb-6">
                <UpdateHistory
                  entries={[
                    {
                      date: formatDate(frontmatter.lastReviewedAt),
                      note: 'Sources, internal links and safety or product context reviewed.',
                    },
                    ...(frontmatter.publishedAt !== frontmatter.lastReviewedAt
                      ? [
                          {
                            date: formatDate(frontmatter.publishedAt),
                            note: 'First published.',
                          },
                        ]
                      : []),
                  ]}
                />
              </div>
              <GuideToc headings={headings} />
              <Component components={contentMdxComponents} />
              {faqItems.length > 0 ? <Faq items={faqItems} /> : null}
            </article>

            {/* Sidebar */}
            <aside className="min-w-0 max-w-full md:col-span-4 md:pl-2 lg:pl-4">
              {/* About the Author */}
              <div className="mb-12 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-[0_18px_45px_-38px_rgba(24,49,41,.65)]">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  About the Author
                </p>
                <hr className="mb-6 mt-4 border-[color:var(--color-border)]" />
                <div className="flex items-start gap-4">
                  <img
                    src="/images/team/marvin.webp"
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
                      certified instructor — every piece on this site is written
                      and edited by Marvin.
                    </p>
                  </div>
                </div>
                <Link
                  to="/authors/$slug"
                  params={{ slug: author.slug }}
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
                >
                  More about me
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>
              </div>

              {/* Popular articles — curated EXISTING slugs only */}
              <div className="mb-12 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-[0_18px_45px_-38px_rgba(24,49,41,.65)]">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Read next
                </p>
                <hr className="mb-2 mt-4 border-[color:var(--color-border)]" />
                <ol className="divide-y divide-[color:var(--color-border)]/60">
                  {readNext.map((post, i) => (
                    <li key={`readnext-${post.href}`}>
                      <a
                        href={post.href}
                        className="group flex items-start gap-4 py-6 first:pt-4 last:pb-0"
                      >
                        <span className="font-serif text-base leading-none text-[color:var(--color-ink-muted)]">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-3 font-serif text-[14px] leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                            {post.title}
                          </p>
                          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                            {post.category}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Categories (display-only until we have real category routing) */}
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-[0_18px_45px_-38px_rgba(24,49,41,.65)]">
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
                    to="/"
                    className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
                  >
                    Back to home
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ============================================================
          CLOSING NEWSLETTER CAPTURE
          ============================================================ */}
      <RelatedPathways
        items={related}
        pageKind={
          frontmatter.clusters.includes('practice') ||
          frontmatter.tags.some((tag) =>
            /practice|pose|routine|chair yoga/i.test(tag),
          )
            ? 'practice'
            : 'gear'
        }
      />
      <ArticleNewsletterBand source={`guide:${slug}`} />
    </>
  )
}
