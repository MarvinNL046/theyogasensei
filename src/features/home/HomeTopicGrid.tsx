import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import {
  categorySlug,
  type GuideCategory,
} from '#/features/guides-index/data'

// A tile either filters the guides hub by category, or deep-links to another
// hub (e.g. the pose library) via an explicit route.
type Topic =
  | {
      kind: 'guide'
      category: GuideCategory
      label: string
      subtitle: string
      image: string
    }
  | {
      kind: 'route'
      to: '/poses' | '/reviews/best-yoga-mats'
      label: string
      subtitle: string
      image: string
    }

const TOPICS: Array<Topic> = [
  {
    kind: 'route',
    to: '/poses',
    label: 'Poses',
    subtitle: 'Step-by-step guides',
    image: '/images/poses/_library/tile.webp',
  },
  {
    kind: 'guide',
    category: 'Chair yoga',
    label: 'Chair yoga',
    subtitle: 'Gentle seated practice',
    image: '/images/guides/chair-yoga-for-seniors/hero.webp?v=2',
  },
  {
    kind: 'guide',
    category: 'Buying guides',
    label: 'Buying guides',
    subtitle: 'Choose the right mat',
    image: '/images/guides/how-to-choose-a-yoga-mat/materials.webp',
  },
  {
    kind: 'guide',
    category: 'Roundups',
    label: 'Roundups',
    subtitle: 'Best-of picks',
    image: '/images/guides/best-yoga-mats-2026/mat-lineup.webp',
  },
  {
    kind: 'guide',
    category: 'Comparisons',
    label: 'Comparisons',
    subtitle: 'Material face-offs',
    image: '/images/guides/cork-vs-rubber-yoga-mat/cork-vs-rubber.webp',
  },
  {
    kind: 'route',
    to: '/reviews/best-yoga-mats',
    label: 'Reviews',
    subtitle: 'Honest mat verdicts',
    image: '/images/guides/lululemon-yoga-mat/hero.webp',
  },
  {
    kind: 'guide',
    category: 'Care',
    label: 'Care',
    subtitle: 'Clean & store',
    image: '/images/guides/how-to-clean-a-yoga-mat/cleaning-kit.webp',
  },
]

/**
 * Browse-by-topic grid. Each tile deep-links to the guides hub filtered to its
 * category (?category=…). Sits under the trust bar, above the featured band.
 */
export function HomeTopicGrid() {
  return (
    <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow tone="default">Browse by topic</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
              Find the guide you need.
            </h2>
          </div>
          <Link
            to="/guides"
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
          >
            View all guides
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-7">
          {TOPICS.map((topic) => {
            const inner = (
              <>
                <div className="overflow-hidden rounded-sm bg-[color:var(--color-surface)] ring-1 ring-[color:var(--color-border)]">
                  <img
                    src={topic.image}
                    alt={`${topic.label}: ${topic.subtitle}`}
                    width={1280}
                    height={854}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-sm font-medium text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                  {topic.label}
                </p>
                <p className="mt-1 text-xs text-[color:var(--color-ink-muted)]">
                  {topic.subtitle}
                </p>
              </>
            )
            return (
              <li key={topic.label}>
                {topic.kind === 'route' ? (
                  <Link to={topic.to} className="group block">
                    {inner}
                  </Link>
                ) : (
                  <Link
                    to="/guides"
                    search={{ category: categorySlug(topic.category) }}
                    className="group block"
                  >
                    {inner}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
