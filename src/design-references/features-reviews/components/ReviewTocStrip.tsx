import { Container } from '#/components/ui/container'
import { cn } from '#/lib/utils'

const SECTIONS = [
  'Overview',
  'Grip & Performance',
  'Comfort & Support',
  'Durability',
  'Specs',
  "Who It's For",
  'Alternatives',
  'Verdict',
  'FAQs',
] as const

const WRAPPED_LABELS: Partial<
  Record<(typeof SECTIONS)[number], Array<string>>
> = {
  'Grip & Performance': ['Grip &', 'Performance'],
  'Comfort & Support': ['Comfort &', 'Support'],
  "Who It's For": ["Who It's", 'For'],
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/'/g, '')
    .replace(/\s+/g, '-')
}

interface ReviewTocStripProps {
  /** Index of the section rendered in the active state. */
  activeIndex?: number
}

/**
 * Sticky table-of-contents strip — sits directly under the hero and pins
 * below the site header on scroll. Styled after the site header (sticky,
 * hairline, translucent cream, backdrop blur). Horizontal-scrolls on narrow
 * viewports with soft edge fades.
 */
export function ReviewTocStrip({ activeIndex = 0 }: ReviewTocStripProps) {
  return (
    <div className="sticky top-20 z-30 border-y border-[color:var(--color-border)] bg-[color:var(--color-bg)]/90 backdrop-blur">
      <Container
        size="wide"
        className="overflow-x-auto lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_360px]"
      >
        <nav
          aria-label="On this page"
          className="flex min-w-max items-center gap-8 lg:gap-3 xl:gap-4"
        >
          {SECTIONS.map((section, index) => (
            <a
              key={section}
              href={`#${slugify(section)}`}
              className={cn(
                'relative whitespace-nowrap py-5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200 lg:text-[8.5px] lg:tracking-[0.12em] xl:text-[9.5px]',
                index === activeIndex
                  ? 'text-[color:var(--color-ink)]'
                  : 'text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)]',
              )}
            >
              <span className="lg:hidden">{section}</span>
              <span className="hidden leading-[1.25] lg:inline-block">
                {(WRAPPED_LABELS[section] ?? [section]).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
              {index === activeIndex ? (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[color:var(--color-ink)]"
                />
              ) : null}
            </a>
          ))}
        </nav>
        <div aria-hidden="true" className="hidden lg:block" />
      </Container>

      {/* Soft edge fades — the premium horizontal-scroll look */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[color:var(--color-bg)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[color:var(--color-bg)] to-transparent"
      />
    </div>
  )
}
