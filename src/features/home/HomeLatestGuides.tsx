import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'

const FILTERS = ['All', 'Practice', 'Gear', 'Meditation', 'Care', 'Comparisons'] as const
type GuideFilter = (typeof FILTERS)[number]

const GUIDES: Array<{
  category: Exclude<GuideFilter, 'All'>
  label: string
  title: string
  note: string
  href: string
}> = [
  {
    category: 'Practice',
    label: '15-minute routine',
    title: 'Morning yoga that leaves room for real mornings',
    note: 'A short sequence with easier transitions and practical pacing.',
    href: '/guides/morning-yoga-routine',
  },
  {
    category: 'Gear',
    label: 'Buying guide',
    title: 'Choose a yoga mat by surface, support and weight',
    note: 'The specifications that change how a mat feels and travels.',
    href: '/guides/how-to-choose-a-yoga-mat',
  },
  {
    category: 'Meditation',
    label: 'Setup guide',
    title: 'Build a meditation space without filling it with gear',
    note: 'Start with posture and space before adding accessories.',
    href: '/guides/meditation-room-accessories',
  },
  {
    category: 'Care',
    label: 'Maintenance',
    title: 'Clean a yoga mat without damaging the surface',
    note: 'Match the cleaning method to the exact mat material.',
    href: '/guides/how-to-clean-a-yoga-mat',
  },
  {
    category: 'Comparisons',
    label: 'Material comparison',
    title: 'Cork or rubber: choose by grip, weight and care',
    note: 'A direct decision guide for two very different surfaces.',
    href: '/guides/cork-vs-rubber-yoga-mat',
  },
  {
    category: 'Gear',
    label: 'Updated shortlist',
    title: 'Foldable yoga mats that make sense for travel',
    note: 'Portable options with the cushioning compromise made clear.',
    href: '/guides/best-foldable-yoga-mat',
  },
]

export function HomeLatestGuides() {
  const [active, setActive] = useState<GuideFilter>('All')
  const visible = active === 'All' ? GUIDES : GUIDES.filter((guide) => guide.category === active)

  return (
    <section
      data-analytics-section="latest-guides"
      className="bg-[color:var(--color-bg)] py-16 md:py-24"
    >
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
              Latest guides
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight tracking-[-0.035em] md:text-[42px]">
              Recently added and meaningfully updated.
            </h2>
          </div>
          <a
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-olive-deep)]"
          >
            Browse all guides <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div aria-label="Filter latest guides" className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
              className={
                active === filter
                  ? 'rounded-full bg-[color:var(--color-olive-deep)] px-4 py-2 text-xs font-semibold text-white'
                  : 'rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-xs font-semibold text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-olive-soft)]'
              }
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((guide) => (
            <a
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-[color:var(--color-border)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[color:var(--color-olive-soft)]"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[color:var(--color-accent-deep)]">
                {guide.category} · {guide.label}
              </span>
              <h3 className="mt-3 font-serif text-2xl leading-snug group-hover:text-[color:var(--color-olive)]">
                {guide.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                {guide.note}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
