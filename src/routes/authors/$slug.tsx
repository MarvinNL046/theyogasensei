import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { resolveAuthor } from '#/lib/content/authors'
import { buildAbsoluteImageUrl } from '#/lib/images/variants'
import { buildPersonSchema } from '#/lib/seo/schema'
import { SITE_URL } from '#/lib/seo/head'
import { Container } from '#/components/ui/container'

export const Route = createFileRoute('/authors/$slug')({
  loader: ({ params }) => {
    try {
      const author = resolveAuthor(params.slug)
      return { author }
    } catch {
      throw notFound()
    }
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {}
    const a = loaderData.author
    const canonical = `${SITE_URL.replace(/\/$/, '')}/authors/${params.slug}`
    const image = a.image
      ? buildAbsoluteImageUrl(a.image, 'og', SITE_URL)
      : 'https://www.theyogasensei.com/images/brand/avatar-yoga-sensei.webp'
    // Concise, SERP-length description (the full bio renders on the page itself).
    const description = `${a.name} of The Yoga Sensei — a long-time practitioner, not a certified instructor, who writes and edits every honest yoga gear guide on the site.`
    return {
      meta: [
        { title: `${a.name} — The Yoga Sensei` },
        { name: 'description', content: description },
        { property: 'og:title', content: `${a.name} — The Yoga Sensei` },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonical },
        { property: 'og:type', content: 'profile' },
        { property: 'og:image', content: image },
        { property: 'og:site_name', content: 'The Yoga Sensei' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${a.name} — The Yoga Sensei` },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
      ],
      links: [{ rel: 'canonical', href: canonical }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(buildPersonSchema(a, SITE_URL)),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': `${canonical}#profile`,
            url: canonical,
            name: `${a.name} — The Yoga Sensei`,
            description,
            mainEntity: { '@id': `${canonical}#person` },
            isPartOf: { '@id': `${SITE_URL}/#website` },
          }),
        },
      ],
    }
  },
  component: AuthorPage,
})

function AuthorPage() {
  const { author } = Route.useLoaderData()
  return (
    <>
      <section className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)]">
        <Container size="wide" className="py-14 md:py-20">
          <nav className="text-xs text-[color:var(--color-ink-muted)]" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[color:var(--color-ink)]">Home</Link>
            <span className="mx-2" aria-hidden="true">›</span>
            <span>Authors</span>
          </nav>
          <div className="mt-9 grid items-center gap-10 md:grid-cols-[180px_1fr]">
            {author.image ? (
              <img
                src={author.image}
                alt={`Portrait of ${author.name}`}
                width={360}
                height={360}
                className="aspect-square w-40 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
              />
            ) : null}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
                Author and editor
              </p>
              <h1 className="mt-4 font-serif text-5xl leading-tight tracking-[-0.04em] md:text-6xl">
                {author.name}
              </h1>
              {author.jobTitle ? (
                <p className="mt-4 text-lg text-[color:var(--color-ink-soft)]">
                  {author.jobTitle}
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[color:var(--color-bg)] py-14 md:py-20">
        <Container size="narrow">
          {author.bio ? (
            <p className="text-lg leading-8 text-[color:var(--color-ink-soft)]">
              {author.bio}
            </p>
          ) : null}
          {author.knowsAbout ? (
            <div className="mt-10 border-t border-[color:var(--color-border)] pt-8">
              <h2 className="font-serif text-3xl">Editorial topics</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {author.knowsAbout.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm text-[color:var(--color-ink-soft)]"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="mt-12 rounded-2xl bg-[color:var(--color-olive-deep)] p-7 text-white [--color-heading:white] md:p-9">
            <h2 className="font-serif text-3xl">How the work is checked</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
              Read the sourcing rules, review labels and correction process used across the site.
            </p>
            <Link
              to="/how-we-research"
              className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--color-olive-deep)]"
            >
              How we research
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
