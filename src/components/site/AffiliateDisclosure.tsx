import { Link } from '@tanstack/react-router'

/**
 * Compact, FTC clear-and-conspicuous affiliate disclosure. Rendered by the
 * guide route at the top of the article column (above all affiliate links),
 * only on pages that actually carry affiliate links. Kept to a single subtle
 * line — the full explanation lives at /affiliate-disclosure.
 */
export function AffiliateDisclosure() {
  return (
    <p className="not-prose mb-8 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
      This guide contains affiliate links — recommendations aren&rsquo;t based
      on commission.{' '}
      <Link
        to="/affiliate-disclosure"
        className="underline underline-offset-2 transition hover:text-[color:var(--color-accent-deep)]"
      >
        Read our full disclosure
      </Link>
      .
    </p>
  )
}
