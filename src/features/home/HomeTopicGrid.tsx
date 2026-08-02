import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'

const TOPICS = [
  ['Yoga mats', 'Grip, cushion and size', '/gear/yoga-mats'],
  ['Mat materials', 'Cork, rubber, TPE and more', '/materials'],
  ['Beginners', 'Start with a manageable plan', '/starter-guide'],
  ['Chair yoga', 'Supported routines and guides', '/guides/chair-yoga-for-beginners'],
  ['Meditation', 'Cushions, benches and setup', '/gear/meditation'],
  ['Props', 'Blocks, straps and bolsters', '/gear/props'],
  ['Clothing', 'Fit and fabric decisions', '/guides/yoga-clothes-for-men'],
  ['Care', 'Clean, dry and store your gear', '/guides/how-to-clean-a-yoga-mat'],
  ['Brands', 'Independent product reviews', '/brands'],
] as const

export function HomeTopicGrid() {
  return (
    <section
      data-analytics-section="topics"
      className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)] py-16 md:py-24"
    >
      <Container size="wide">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
          Browse by topic
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
          <h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-[-0.035em] md:text-[42px]">
            Go straight to the part of your practice that needs attention.
          </h2>
          <a
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-olive-deep)]"
          >
            Search the library <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map(([title, note, href], index) => (
            <a
              key={title}
              href={href}
              className="group flex min-h-32 items-start gap-5 bg-white p-6 transition hover:bg-[color:var(--color-surface-muted)]"
            >
              <span className="font-serif text-xl text-[color:var(--color-accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="block font-serif text-xl group-hover:text-[color:var(--color-olive)]">
                  {title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                  {note}
                </span>
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
