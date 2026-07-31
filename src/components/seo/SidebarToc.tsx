import type { TocHeading } from '#/lib/mdx/loader'

interface SidebarTocProps {
  headings: Array<TocHeading>
}

/**
 * Compact vertical table of contents for the blog sidebar.
 *
 * Separate from GuideToc on purpose: that one is a wide two-column card built
 * for the top of a long guide and hides itself below six H2s. A sidebar column
 * is narrow, sits beside the text rather than above it, and earns its place at
 * three sections — so it needs its own shape and its own threshold.
 */
const MIN_HEADINGS = 3

export function SidebarToc({ headings }: SidebarTocProps) {
  if (headings.length < MIN_HEADINGS) return null

  return (
    <nav
      aria-label="Table of contents"
      className="border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
        On this page
      </p>
      <hr className="mb-4 mt-4 border-[color:var(--color-border)]" />
      <ol className="space-y-3">
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
    </nav>
  )
}
