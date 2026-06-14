import { ChevronDown } from 'lucide-react'
import type { TocHeading } from '#/lib/mdx/loader'

interface GuideTocProps {
  headings: Array<TocHeading>
}

// Anti-footprint rule: the TOC only appears on substantial guides. Short
// concept/versus pages with a handful of sections don't get one — it would
// read as filler. Six H2s is the threshold.
const MIN_HEADINGS = 6

function TocLinks({ headings }: GuideTocProps) {
  return (
    <ol className="grid min-w-0 gap-x-10 gap-y-3 sm:grid-cols-2">
      {headings.map((heading, i) => (
        <li key={heading.id} className="min-w-0">
          <a
            href={`#${heading.id}`}
            className="group flex min-w-0 items-baseline gap-3 text-sm leading-snug text-[color:var(--color-ink-soft)] transition hover:text-[color:var(--color-accent-deep)]"
          >
            <span className="font-serif text-[13px] leading-none text-[color:var(--color-ink-muted)] transition group-hover:text-[color:var(--color-accent)]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0">{heading.text}</span>
          </a>
        </li>
      ))}
    </ol>
  )
}

/**
 * In-page table of contents for long guides. Auto-built from the rendered H2
 * outline; jump-links target the rehype-slug anchors already on the page.
 * Renders nothing below MIN_HEADINGS. Server-rendered (in the SSG HTML, no
 * layout shift): an always-open card on desktop, a collapsible panel on mobile.
 */
export function GuideToc({ headings }: GuideTocProps) {
  if (headings.length < MIN_HEADINGS) return null

  return (
    <>
      {/* Desktop — always expanded */}
      <nav
        aria-label="On this page"
        className="not-prose mb-12 hidden min-w-0 max-w-full rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-7 py-6 md:block"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
          In this guide
        </p>
        <hr className="mb-5 mt-4 border-[color:var(--color-border)]" />
        <TocLinks headings={headings} />
      </nav>

      {/* Mobile — collapsible, collapsed by default to stay compact */}
      <details className="not-prose group mb-10 min-w-0 max-w-full rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-6 py-4 md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)] [&::-webkit-details-marker]:hidden">
          In this guide
          <ChevronDown
            className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </summary>
        <hr className="mb-5 mt-4 border-[color:var(--color-border)]" />
        <TocLinks headings={headings} />
      </details>
    </>
  )
}
