import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { listContentSlugs, loadFrontmatter } from '#/lib/mdx/loader'
import { buildImageUrl } from '#/lib/images/variants'
import { SITE_URL } from '#/lib/seo/head'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

interface PoseCard {
  slug: string
  title: string
  sanskrit: string
  description: string
  heroImage: string
  readingTime: number
}

export const Route = createFileRoute('/poses/')({
  loader: () => {
    const cards: Array<PoseCard> = listContentSlugs('poses').map((slug) => {
      const { frontmatter: fm } = loadFrontmatter('poses', slug)
      // The Sanskrit name lives in the title after a colon/em-dash where present.
      return {
        slug,
        title: fm.title.split(/[:—]/)[0]?.trim() ?? fm.title,
        sanskrit: fm.tags?.[1]?.replace(/-/g, ' ') ?? '',
        description: fm.metaDescription,
        heroImage: fm.heroImage,
        readingTime: fm.estimatedReadingTime,
      }
    })
    return { cards }
  },
  head: () => ({
    meta: [
      { title: 'Yoga Poses — Calm, Clear, Step-by-Step | The Yoga Sensei' },
      {
        name: 'description',
        content:
          'A growing library of yoga poses, explained calmly: step-by-step beginner cues, the common mistakes, modifications and props, and who should take it easy.',
      },
      { property: 'og:title', content: 'Yoga Poses — The Yoga Sensei' },
      { property: 'og:url', content: `${SITE_URL}/poses` },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/poses` }],
  }),
  component: PosesIndex,
})

function PosesIndex() {
  const { cards } = Route.useLoaderData()

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
        <Container size="wide" className="relative">
          <div className="max-w-2xl py-20 md:py-28">
            <Eyebrow tone="default">Pose library</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight md:text-[56px]">
              Find. Learn.{' '}
              <span className="italic text-[color:var(--color-ink-soft)]">
                Practice.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
              A growing library of yoga poses, explained calmly — step-by-step
              beginner cues, the common mistakes, modifications and props, and
              who should take it easy. No hype, no fake instructors.
            </p>
          </div>
        </Container>
      </section>

      {/* POSE GRID */}
      <section className="bg-[color:var(--color-bg)] pb-20 pt-4 md:pb-28">
        <Container size="wide">
          <Eyebrow tone="default">The poses</Eyebrow>
          <h2 className="mt-4 mb-10 font-serif text-2xl leading-tight tracking-tight md:text-[32px]">
            Foundational poses, one clear page at a time
          </h2>

          {cards.length === 0 ? (
            <p className="text-[color:var(--color-ink-muted)]">
              The first poses are landing shortly.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((pose) => (
                <li key={pose.slug}>
                  <Link
                    to="/poses/$slug"
                    params={{ slug: pose.slug }}
                    className="group block overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] transition hover:border-[color:var(--color-accent-soft)] hover:shadow-sm"
                  >
                    <div
                      className="aspect-[16/10] bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${buildImageUrl(pose.heroImage, 'og')}')`,
                      }}
                      aria-hidden="true"
                    />
                    <div className="p-6">
                      {pose.sanskrit ? (
                        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                          {pose.sanskrit}
                        </p>
                      ) : null}
                      <h3 className="mt-2 font-serif text-xl leading-snug transition group-hover:[--color-heading:var(--color-accent-deep)]">
                        {pose.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                        {pose.description}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)]">
                        Read the guide
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  )
}
