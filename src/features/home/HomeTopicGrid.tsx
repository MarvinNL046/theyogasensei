import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import {
  categorySlug,
  type GuideCategory,
} from '#/features/guides-index/data'

interface Topic {
  category: GuideCategory
  label: string
  subtitle: string
  image: string
}

// Each tile deep-links to the guides hub, pre-filtered to that category.
const TOPICS: Array<Topic> = [
  {
    category: 'Buying guides',
    label: 'Buying guides',
    subtitle: 'Choose the right mat',
    image: '/images/guides/how-to-choose-a-yoga-mat/materials.webp',
  },
  {
    category: 'Roundups',
    label: 'Roundups',
    subtitle: 'Best-of picks',
    image: '/images/guides/best-yoga-mats-2026/mat-lineup.webp',
  },
  {
    category: 'Comparisons',
    label: 'Comparisons',
    subtitle: 'Material face-offs',
    image: '/images/guides/cork-vs-rubber-yoga-mat/cork-vs-rubber.webp',
  },
  {
    category: 'Reviews',
    label: 'Reviews',
    subtitle: 'Honest mat verdicts',
    image: '/images/guides/lululemon-yoga-mat/hero.webp',
  },
  {
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
            <Eyebrow tone="accent">Browse by topic</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-[color:var(--color-ink)] md:text-[40px]">
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

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {TOPICS.map((topic) => (
            <li key={topic.category}>
              <Link
                to="/guides"
                search={{ category: categorySlug(topic.category) }}
                className="group block"
              >
                <div className="overflow-hidden rounded-2xl bg-[color:var(--color-surface)] ring-1 ring-[color:var(--color-border)]">
                  <img
                    src={topic.image}
                    alt=""
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
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
