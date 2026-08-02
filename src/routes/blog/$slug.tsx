import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
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
import { SidebarToc } from '#/components/seo/SidebarToc'
import { SidebarProduct } from '#/components/affiliate/SidebarProduct'
import { AffiliateDisclosure } from '#/components/site/AffiliateDisclosure'
import { contentMdxComponents } from '#/lib/mdx/components'
import { ArticleNewsletterBand } from '#/components/site/article-newsletter-band'
import { Faq } from '#/components/seo/Faq'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    if (params.slug.split('/').includes('_drafts')) throw notFound()
    try {
      const { frontmatter } = loadFrontmatter('blog', params.slug)
      const author = resolveAuthor(frontmatter.author)
      // Blog headings are namespaced in the build-time map (see
      // scripts/extract-guide-headings.ts) so they cannot collide with guides.
      const headings = extractGuideHeadings(`blog/${params.slug}`)
      return { frontmatter, author, headings }
    } catch {
      throw notFound()
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    return buildHead(loaderData.frontmatter, {
      siteUrl: SITE_URL,
      routePath: `/blog/${params.slug}`,
      author: loaderData.author,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: loaderData.frontmatter.title },
      ],
    })
  },
  component: BlogPostPage,
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

function BlogPostPage() {
  const { frontmatter, author, headings } = Route.useLoaderData()
  const { slug } = Route.useParams()
  const { Component } = loadContent('blog', slug)
  const eyebrow = frontmatter.tags?.[0] ?? 'Blog'
  const heroImageUrl = buildImageUrl(frontmatter.heroImage, 'og')
  const faqItems = 'faq' in frontmatter && frontmatter.faq ? frontmatter.faq : []
  const readNext = resolveRelated(frontmatter.related, { exclude: slug, limit: 3 })

  return (
    <>
      {/* ============================================================
          HEADER — breadcrumb, title, dek, byline, hero.
          ============================================================ */}
      <section className="bg-[color:var(--color-surface-muted)] pb-10 pt-10 md:pb-14 md:pt-14">
        <Container size="wide">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]"
          >
            <Link to="/" className="transition hover:text-[color:var(--color-ink)]">
              Home
            </Link>
            <span className="mx-2 opacity-40">›</span>
            <Link to="/blog" className="transition hover:text-[color:var(--color-ink)]">
              Blog
            </Link>
            <span className="mx-2 opacity-40">›</span>
            <span className="text-[color:var(--color-ink-soft)]">{eyebrow}</span>
          </nav>

          <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.12] tracking-tight md:text-5xl">
            {frontmatter.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            {frontmatter.metaDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--color-border)] pt-6">
            <div className="flex items-center gap-3">
              <img
                src="/images/team/marvin.webp"
                alt={`Avatar of ${author.name}`}
                width={96}
                height={96}
                loading="eager"
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
              />
              <p className="text-sm text-[color:var(--color-ink-soft)]">
                By{' '}
                <Link
                  to="/authors/$slug"
                  params={{ slug: author.slug }}
                  className="font-medium text-[color:var(--color-ink)] underline-offset-2 hover:underline"
                >
                  {author.name}
                </Link>
              </p>
            </div>
            <p className="text-xs text-[color:var(--color-ink-muted)]">
              {formatDate(frontmatter.publishedAt)}
              <span className="mx-1.5 opacity-40">·</span>
              {frontmatter.estimatedReadingTime} min read
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white shadow-[0_24px_55px_-42px_rgba(24,49,41,.65)]">
            <img
              src={heroImageUrl}
              alt={frontmatter.title}
              width={1200}
              height={630}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* ============================================================
          BODY + STICKY SIDEBAR — disclosure above the first affiliate link
          ============================================================ */}
      <section className="bg-[color:var(--color-bg)] pb-16 pt-10 md:pb-24">
        <Container size="wide">
          <div className="grid min-w-0 gap-12 md:grid-cols-12 lg:gap-16">
            <article className="prose prose-stone prose-lg min-w-0 max-w-full md:col-span-8 prose-headings:scroll-mt-28 prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-[color:var(--color-ink)] prose-p:text-[color:var(--color-ink-soft)] prose-a:text-[color:var(--color-olive)] prose-a:underline-offset-2 hover:prose-a:text-[color:var(--color-olive-deep)] prose-strong:text-[color:var(--color-ink)] prose-blockquote:border-l-[color:var(--color-olive)] prose-blockquote:text-[color:var(--color-ink-soft)] prose-th:text-[color:var(--color-ink)] prose-td:text-[color:var(--color-ink-soft)]">
              {frontmatter.clusters?.includes('affiliate') ? <AffiliateDisclosure /> : null}
              {/* Wide inline TOC on mobile only — the sidebar carries it from md up. */}
              <div className="md:hidden">
                <GuideToc headings={headings} />
              </div>
              <Component components={contentMdxComponents} />
              {faqItems.length > 0 ? <Faq items={faqItems} /> : null}
            </article>

            {/* Sticky sidebar: contents to navigate with, one product to buy.
                Stacks under the article on mobile, which puts the promo after
                the argument rather than in front of it. */}
            <aside className="min-w-0 md:col-span-4">
              <div className="md:sticky md:top-24 md:space-y-8">
                <div className="hidden md:block">
                  <SidebarToc headings={headings} />
                </div>
                {frontmatter.sidebarProduct ? (
                  <SidebarProduct {...frontmatter.sidebarProduct} />
                ) : null}
              </div>
            </aside>
          </div>

          {/* About the author */}
          <div className="mt-14 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-[0_18px_45px_-38px_rgba(24,49,41,.65)] sm:p-8">
            <div className="flex items-start gap-4">
              <img
                src="/images/team/marvin.webp"
                alt={`Avatar of ${author.name}`}
                width={96}
                height={96}
                loading="lazy"
                className="h-14 w-14 flex-shrink-0 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
              />
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
                  About the author
                </p>
                <p className="mt-3 font-serif text-base leading-snug text-[color:var(--color-ink)]">
                  {author.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                  Founder of The Yoga Sensei. Long-time practitioner, not a certified
                  instructor — every piece on this site is written and edited by Marvin.
                </p>
                <Link
                  to="/authors/$slug"
                  params={{ slug: author.slug }}
                  className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
                >
                  More about me
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </div>

          {/* Read next — image cards */}
          {readNext.length > 0 ? (
            <div className="mt-14">
              <Eyebrow>Read next</Eyebrow>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {readNext.map((post) => (
                  <a
                    key={post.href}
                    href={post.href}
                    className="group block border border-[color:var(--color-border)] bg-[color:var(--color-surface)] transition hover:border-[color:var(--color-accent-soft)]"
                  >
                    <div className="p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                        {post.category}
                      </p>
                      <p className="mt-2 font-serif text-base leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-olive)]">
                        {post.title}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <ArticleNewsletterBand source={`blog:${slug}`} />
    </>
  )
}
