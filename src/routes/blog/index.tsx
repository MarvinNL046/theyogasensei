import { Link, createFileRoute } from '@tanstack/react-router'
import { listContentSlugs, loadFrontmatter } from '#/lib/mdx/loader'
import { buildImageUrl } from '#/lib/images/variants'
import { SITE_URL } from '#/lib/seo/head'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

interface BlogCard {
  slug: string
  title: string
  dek: string
  image: string
  category: string
  publishedAt: string
  readingTime: number
}

function loadPosts(): Array<BlogCard> {
  const cards: Array<BlogCard> = []
  for (const slug of listContentSlugs('blog')) {
    try {
      const { frontmatter } = loadFrontmatter('blog', slug)
      // Gated posts (instructional content awaiting qualified review, or drafts
      // written by the scheduled task) stay off the index as well as the sitemap.
      if (frontmatter.indexable === false) continue
      cards.push({
        slug,
        title: frontmatter.title,
        dek: frontmatter.metaDescription,
        image: buildImageUrl(frontmatter.heroImage, 'card'),
        category: frontmatter.tags[0] ?? 'Blog',
        publishedAt: frontmatter.publishedAt,
        readingTime: frontmatter.estimatedReadingTime,
      })
    } catch {
      // A malformed post must not take the index down.
    }
  }
  return cards.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export const Route = createFileRoute('/blog/')({
  loader: () => ({ posts: loadPosts() }),
  head: () => ({
    meta: [
      { title: 'Blog — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Honest, hands-on writing about yoga gear and practice: what we actually use, what we would skip, and why.',
      },
      { property: 'og:title', content: 'Blog — The Yoga Sensei' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${SITE_URL}/blog` },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/blog` }],
  }),
  component: BlogIndexPage,
})

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function BlogIndexPage() {
  const { posts } = Route.useLoaderData()

  return (
    <section className="bg-[color:var(--color-bg)] pb-20 pt-8 md:pb-28 md:pt-12">
      <Container size="wide">
        <div className="rounded-[2rem] bg-[color:var(--color-surface-muted)] px-7 py-14 sm:px-12 md:py-20 lg:px-16">
        <Eyebrow>Journal</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] tracking-[-0.04em] md:text-[54px]">Useful notes from the mat.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-ink-soft)] md:text-lg">
          Shorter, hands-on pieces about the gear we use and the things worth knowing
          before you buy. For the long-form buying guides, head to{' '}
          <Link
            to="/guides"
            className="text-[color:var(--color-olive)] underline underline-offset-2"
          >
            the guides
          </Link>
          .
        </p></div>

        {posts.length === 0 ? (
          <p className="mt-14 text-sm text-[color:var(--color-ink-muted)]">
            The first post is on its way.
          </p>
        ) : (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[0_18px_45px_-38px_rgba(24,49,41,.65)] transition hover:-translate-y-1 hover:border-[color:var(--color-accent-soft)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={1067}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                    {post.category}
                  </p>
                  <h2 className="mt-2 font-serif text-xl leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-olive)]">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                    {post.dek}
                  </p>
                  <p className="mt-4 pt-4 text-xs text-[color:var(--color-ink-muted)]">
                    {formatDate(post.publishedAt)}
                    <span className="mx-1.5 opacity-40">·</span>
                    {post.readingTime} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
