import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'

const COLUMNS = [
  {
    kicker: 'Latest reviews',
    href: '/reviews',
    link: 'All reviews',
    items: [
      [
        'Manduka PRO',
        'Dense support and the portability trade-off',
        '/reviews/manduka-pro',
      ],
      [
        'Liforme Original',
        'Alignment system, grip and premium price',
        '/reviews/liforme',
      ],
      [
        'Jade Harmony',
        'Rubber traction, care and latex relevance',
        '/reviews/jade',
      ],
    ],
  },
  {
    kicker: 'Useful comparisons',
    href: '/comparisons',
    link: 'All comparisons',
    items: [
      [
        'Cork vs rubber',
        'Grip, care and material differences',
        '/guides/cork-vs-rubber-yoga-mat',
      ],
      [
        'Manduka vs Lululemon',
        'Durability, surface and portability',
        '/guides/manduka-vs-lululemon-yoga-mat',
      ],
      [
        'Yoga mat vs exercise mat',
        'Choose by movement, shoes and support',
        '/guides/yoga-mat-vs-exercise-mat',
      ],
    ],
  },
] as const

export function HomeReviewsComparisons() {
  return (
    <section
      data-analytics-section="reviews-comparisons"
      className="bg-[color:var(--color-bg)] py-16 md:py-24"
    >
      <Container size="wide">
        <div className="grid overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-white lg:grid-cols-2">
          {COLUMNS.map((column) => (
            <div
              key={column.kicker}
              className="border-b border-[color:var(--color-border)] p-7 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 md:p-10"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-serif text-3xl">{column.kicker}</h2>
                <a
                  href={column.href}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--color-olive-deep)]"
                >
                  {column.link} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <ol className="mt-7 divide-y divide-[color:var(--color-border)]">
                {column.items.map(([title, note, href], index) => (
                  <li key={title}>
                    <a href={href} className="group flex gap-5 py-5 first:pt-0">
                      <span className="font-serif text-xl text-[color:var(--color-accent)]">
                        {index + 1}
                      </span>
                      <span>
                        <span className="block font-serif text-xl group-hover:text-[color:var(--color-olive)]">
                          {title}
                        </span>
                        <span className="mt-1 block text-sm text-[color:var(--color-ink-muted)]">
                          {note}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
