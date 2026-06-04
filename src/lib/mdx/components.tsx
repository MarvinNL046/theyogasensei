import type { AnchorHTMLAttributes } from 'react'
import { ExternalLink } from 'lucide-react'
import { cn } from '#/lib/utils'

/**
 * MDX component overrides applied to every rendered content page.
 *
 * The key behaviour: any markdown link whose href points at a local
 * affiliate redirect (`/go/<slug>`) is rendered as a compact CTA button
 * instead of a plain text link — inline in prose AND inside tables — so
 * authors keep writing simple markdown (`[Check price](/go/slug)`) and get
 * an on-brand button for free. All other links fall through to the normal
 * prose-styled anchor.
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

export const contentMdxComponents = {
  a: MdxAnchor,
}
