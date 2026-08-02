import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { NewsletterCapture } from '#/components/site/newsletter-capture'
import { FEATURED_SLUG } from '#/features/guides-index/data'

/**
 * Guides-index sidebar — an honest "start here" card plus the real newsletter
 * capture. No dead search box and no fabricated category counts; the working
 * filter chips at the top of the list cover category browsing.
 */
export function GuidesSidebar() {
  return (
    <aside className="md:col-span-4 md:pl-2 lg:pl-4">
      {/* New here? → the pillar buying guide */}
      <div className="mb-12 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-[0_18px_45px_-38px_rgba(24,49,41,.65)]">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
          New here?
        </p>
        <hr className="mb-5 mt-4 border-[color:var(--color-border)]" />
        <p className="font-serif text-lg leading-snug text-[color:var(--color-ink)]">
          Start with the yoga mat buying guide.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
          One honest framework — material, thickness, grip, size and care — so
          every review below is easier to judge.
        </p>
        <Link
          to="/guides/$slug"
          params={{ slug: FEATURED_SLUG }}
          className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
        >
          Read the mat guide
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
        </Link>
      </div>

      {/* Real newsletter capture (Convex-wired, double opt-in) */}
      <NewsletterCapture
        source="guides-index"
        heading="Mindful insights, to your inbox."
        blurb="Practical tips, new guides and honest recommendations to support your practice. One short email a week."
        className="border-[color:var(--color-border)]"
      />
    </aside>
  )
}
