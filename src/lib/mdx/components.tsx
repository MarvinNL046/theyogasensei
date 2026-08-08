import type { AnchorHTMLAttributes, HTMLAttributes, OlHTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react'
import { ExternalLink } from 'lucide-react'
import { track } from '@vercel/analytics'
import { cn } from '#/lib/utils'
import { affiliateClickContext, affiliateHref } from '#/lib/affiliate-tracking'

/**
 * MDX component overrides applied to every rendered content page.
 *
 * The key behaviour: any markdown link whose href points at a local
 * affiliate redirect (`/go/<slug>`) is rendered as a compact CTA button
 * instead of a plain text link — inline in prose AND inside tables — so
 * authors keep writing simple markdown (`[Check price](/go/slug)`) and get
 * an on-brand button for free. All other links fall through to the normal
 * prose-styled anchor.
 *
 * Tables get a contained, scannable treatment: a hairline frame, horizontal
 * scroll on narrow viewports, an uppercase header rule, and a faint zebra.
 * Empty header cells (markdown 2-col key/value "at a glance" tables emit an
 * empty header row) collapse via `empty:hidden` so no blank band shows.
 */

function isGoLink(href: string | undefined): href is string {
  return typeof href === 'string' && href.startsWith('/go/')
}

function MdxAnchor({
  href,
  children,
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (isGoLink(href)) {
    const slug = href.slice('/go/'.length)
    return (
      <a
        href={href}
        rel="nofollow sponsored noopener"
        target="_blank"
        data-affiliate-slug={slug}
        data-affiliate-placement="inline-link"
        onClick={(event) => {
          const context = affiliateClickContext('inline-link')
          event.currentTarget.href = affiliateHref(slug, 'inline-link', context.sourcePage)
          track('Affiliate click', { product: slug, ...context })
        }}
        className={cn(
          // not-prose stops Tailwind Typography from re-styling the button
          'not-prose inline-flex items-center gap-1.5 whitespace-nowrap rounded-full',
          'bg-[color:var(--color-accent)] px-3.5 py-1.5 text-xs font-medium text-[color:var(--color-surface)] no-underline align-middle',
          'shadow-sm transition-colors duration-200 hover:bg-[color:var(--color-accent-deep)]',
          'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color:var(--color-ring)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)]',
        )}
      >
        <span>{children}</span>
        <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
      </a>
    )
  }

  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  )
}

function MdxTable(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="not-prose my-7 overflow-x-auto rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      <table className="w-full border-collapse text-left text-[15px] leading-relaxed" {...props} />
    </div>
  )
}

function MdxTh({ className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'border-b border-[color:var(--color-border)] px-4 py-3 text-left align-bottom',
        'text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-ink)]',
        'empty:hidden',
        className,
      )}
      {...rest}
    />
  )
}

function MdxTr({ className, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('even:bg-[color:var(--color-surface-muted)]/40', className)} {...rest} />
}

function MdxTd({ className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        'border-t border-[color:var(--color-border)] px-4 py-3 align-top text-[color:var(--color-ink-soft)]',
        '[&>strong]:font-medium [&>strong]:text-[color:var(--color-ink)]',
        className,
      )}
      {...rest}
    />
  )
}

// Numbered lists read as step sequences (pose "how to do", routines). The markers
// get the serif clay treatment in place — no reorder, and `ol`-only so bullet
// (`ul`) lists are untouched.
function MdxOl(props: OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className="marker:font-serif marker:font-semibold marker:text-[color:var(--color-accent-deep)]"
      {...props}
    />
  )
}

export const contentMdxComponents = {
  a: MdxAnchor,
  ol: MdxOl,
  table: MdxTable,
  th: MdxTh,
  tr: MdxTr,
  td: MdxTd,
}
