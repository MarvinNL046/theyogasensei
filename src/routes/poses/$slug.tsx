import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowRight, Activity, Package, Sparkles } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { loadContent, loadFrontmatter } from '#/lib/mdx/loader'
import { resolveAuthor } from '#/lib/content/authors'
import { buildHead, SITE_URL } from '#/lib/seo/head'
import { buildImageUrl } from '#/lib/images/variants'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { contentMdxComponents } from '#/lib/mdx/components'
import { ArticleNewsletterBand } from '#/components/site/article-newsletter-band'
import { Faq } from '#/components/seo/Faq'

// Related reading shown in the pose sidebar. Curated EXISTING slugs only.
// Poses cross-link to the gear guides that matter most for practising them
// (grip, cushion) until the poses cluster has more pages to link across.
interface RelatedGuide {
  slug: string
  category: string
  title: string
}
const RELATED_GUIDES: Array<RelatedGuide> = [
  {
    slug: 'how-to-choose-a-yoga-mat',
    category: 'Gear',
    title: 'How to Choose a Yoga Mat, Without the Hype',
  },
  {
    slug: 'best-yoga-mat-for-hot-yoga',
    category: 'Gear',
    title: 'Best Yoga Mat for Hot Yoga',
  },
]

interface SidebarCategory {
  name: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}
const SIDEBAR_CATEGORIES: Array<SidebarCategory> = [
  { name: 'Practice', icon: Activity },
  { name: 'Gear', icon: Package },
  { name: 'Mindset', icon: Sparkles },
]

export const Route = createFileRoute('/poses/$slug')({
  loader: ({ params }) => {
    // Drafts live under content/poses/_drafts/ — never routable, even directly.
    if (params.slug.split('/').includes('_drafts')) throw notFound()
    try {
      const { frontmatter } = loadFrontmatter('poses', params.slug)
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
      routePath: `/poses/${params.slug}`,
      author: loaderData.author,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Poses', url: '/poses' },
        { name: loaderData.frontmatter.title },
      ],
    })
  },
  component: PosePage,
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

function PosePage() {
  const { frontmatter, author } = Route.useLoaderData()
  const { slug } = Route.useParams()
  const { Component } = loadContent('poses', slug)
  const eyebrow = frontmatter.tags?.[0] ?? 'Pose'
  const heroImageUrl = buildImageUrl(frontmatter.heroImage, 'og')
  const faqItems = 'faq' in frontmatter && frontmatter.faq ? frontmatter.faq : []

  return (
    <>
      {/* ARTICLE HERO — fade-left illustration right, title + byline left */}
      <section className="bg-[color:var(--color-bg)]">
        <Container size="wide">
          <div className="grid items-center gap-10 py-12 md:grid-cols-12 md:gap-12 md:py-16 lg:gap-16">
            {/* Left — breadcrumb, title, byline */}
            <div className="md:col-span-6 lg:col-span-5">
              <nav
                aria-label="Breadcrumb"
                className="mb-8 flex flex-wrap items-center gap-3 text-xs text-[color:var(--color-ink-muted)]"
              >
                <Link to="/" className="transition hover:text-[color:var(--color-ink)]">
                  Home
                </Link>
                <span aria-hidden="true">›</span>
                <Link
                  to="/poses"
                  className="transition hover:text-[color:var(--color-ink)]"
                >
                  Poses
                </Link>
                <span aria-hidden="true">›</span>
                <span className="font-medium text-[color:var(--color-ink)]">
                  {frontmatter.title}
                </span>
              </nav>
              <Eyebrow tone="default">{eyebrow}</Eyebrow>
              <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight md:text-[44px]">
                {frontmatter.title}
              </h1>
              {frontmatter.metaDescription ? (
                <p className="mt-6 text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
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
                    {formatDate(frontmatter.publishedAt)}
                    <span className="mx-1.5 opacity-40">·</span>
                    {frontmatter.estimatedReadingTime} min read
                  </p>
                </div>
              </div>
            </div>
            {/* Right — clean full pose image panel */}
            <div className="md:col-span-6 lg:col-span-7">
              <div className="overflow-hidden rounded-sm ring-1 ring-[color:var(--color-border)] shadow-sm">
                <img
                  src={heroImageUrl}
                  alt={`${frontmatter.title}, demonstrated in a calm studio`}
                  className="aspect-[16/10] w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* BODY + SIDEBAR */}
      <section className="bg-[color:var(--color-bg)] pb-16 pt-12 md:pb-24 md:pt-16">
        <Container size="wide">
          <div className="grid min-w-0 gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
            <article className="prose prose-stone prose-lg min-w-0 max-w-full md:col-span-8 prose-headings:scroll-mt-28 prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-[color:var(--color-ink)] prose-p:text-[color:var(--color-ink-soft)] prose-a:text-[color:var(--color-olive)] prose-a:underline-offset-2 hover:prose-a:text-[color:var(--color-olive-deep)] prose-strong:text-[color:var(--color-ink)] prose-blockquote:border-l-[color:var(--color-olive)] prose-blockquote:text-[color:var(--color-ink-soft)] prose-th:text-[color:var(--color-ink)] prose-td:text-[color:var(--color-ink-soft)]">
              <Component components={contentMdxComponents} />
              {faqItems.length > 0 ? <Faq items={faqItems} /> : null}
            </article>

            <aside className="min-w-0 max-w-full md:col-span-4 md:pl-2 lg:pl-4">
              {/* About the Author */}
              <div className="mb-12 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8">
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

              {/* Related guides */}
              <div className="mb-12 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Practise it better
                </p>
                <hr className="mb-2 mt-4 border-[color:var(--color-border)]" />
                <ol className="divide-y divide-[color:var(--color-border)]/60">
                  {RELATED_GUIDES.map((post, i) => (
                    <li key={`related-${post.slug}`}>
                      <Link
                        to="/guides/$slug"
                        params={{ slug: post.slug }}
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
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Categories (display-only) */}
              <div className="rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  Explore
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

      {/* CLOSING NEWSLETTER CAPTURE */}
      <ArticleNewsletterBand source={`pose:${slug}`} />
    </>
  )
}
