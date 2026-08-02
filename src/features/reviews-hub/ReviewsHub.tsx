import { Link } from '@tanstack/react-router'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { Container } from '#/components/ui/container'
import {
  DEFAULT_REVIEW_FILTERS,
  REVIEW_BRANDS,
  REVIEW_ENTRIES,
  REVIEW_MATERIALS,
  REVIEW_PRICE_BANDS,
  REVIEW_RESEARCH_STATUSES,
  REVIEW_USE_CASES,
} from '#/features/reviews-hub/data'
import type {
  ReviewFiltersState,
  ReviewHubEntry,
} from '#/features/reviews-hub/data'

export function ReviewsHub({
  filters,
  onChange,
}: {
  filters: ReviewFiltersState
  onChange: (filters: ReviewFiltersState) => void
}) {
  const reviews = filterReviews(filters)

  const controls: Array<{
    id: keyof ReviewFiltersState
    label: string
    values: readonly string[]
  }> = [
    { id: 'brand', label: 'Brand', values: REVIEW_BRANDS },
    { id: 'material', label: 'Material', values: REVIEW_MATERIALS },
    { id: 'useCase', label: 'Use case', values: REVIEW_USE_CASES },
    { id: 'priceBand', label: 'Price band', values: REVIEW_PRICE_BANDS },
    {
      id: 'researchStatus',
      label: 'Research status',
      values: REVIEW_RESEARCH_STATUSES,
    },
  ]

  return (
    <>
      <section className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)]">
        <Container size="wide" className="py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">Product reviews</p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.045em] md:text-6xl">Clear verdicts, with the limits shown.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">Every review states whether I used the mat myself or researched it from current documentation and independent evidence. Either way, you see who it suits, who should skip it and which compromise matters most.</p>
        </Container>
      </section>

      <section className="border-b border-[color:var(--color-border)] bg-white">
        <Container size="wide" className="py-7">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {controls.map((control) => (
              <label key={control.id} className="text-xs font-semibold text-[color:var(--color-ink-soft)]">
                <span className="mb-2 block uppercase tracking-[0.15em]">{control.label}</span>
                <select
                  value={filters[control.id]}
                  onChange={(event) => onChange({ ...filters, [control.id]: event.target.value })}
                  className="h-11 w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 text-sm text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-olive)] focus:ring-3 focus:ring-[color:var(--color-ring)]/25"
                >
                  {control.values.map((value) => <option key={value}>{value}</option>)}
                </select>
              </label>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-sm text-[color:var(--color-ink-muted)]" aria-live="polite">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
            <button type="button" onClick={() => onChange({ ...DEFAULT_REVIEW_FILTERS })} className="inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--color-olive-deep)]">
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" /> Reset filters
            </button>
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-bg)] py-14 md:py-20">
        <Container size="wide">
          {reviews.length ? (
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {reviews.map((review: ReviewHubEntry) => (
                <li key={review.slug}>
                  <a href={`/reviews/${review.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-white shadow-[0_20px_55px_-44px_rgba(24,49,41,.7)] transition hover:-translate-y-1 hover:border-[color:var(--color-accent-soft)]">
                    <img src={review.image} alt="" width={900} height={600} className="aspect-[3/2] w-full object-cover" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--color-accent-deep)]">
                        <span>{review.brand}</span><span aria-hidden="true">·</span><span>{review.material}</span>
                      </div>
                      <h2 className="mt-3 font-serif text-2xl leading-tight text-[color:var(--color-ink)]">{review.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">{review.description}</p>
                      <dl className="mt-5 space-y-3 border-t border-[color:var(--color-border)] pt-5 text-sm">
                        <div><dt className="font-semibold text-[color:var(--color-ink)]">Best for</dt><dd className="mt-1 text-[color:var(--color-ink-muted)]">{review.bestFor}</dd></div>
                        <div><dt className="font-semibold text-[color:var(--color-ink)]">Main compromise</dt><dd className="mt-1 text-[color:var(--color-ink-muted)]">{review.compromise}</dd></div>
                      </dl>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                        <span className="rounded-full bg-[color:var(--color-surface-muted)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--color-ink-soft)]">{review.researchStatus}</span>
                        <span className="inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--color-olive-deep)]">Read review <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-white px-6 py-14 text-center">
              <h2 className="font-serif text-2xl">No review matches every filter.</h2>
              <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">Remove one filter or reset the full view.</p>
            </div>
          )}
          <div className="mt-16 rounded-2xl bg-[color:var(--color-olive-deep)] p-7 text-white md:flex md:items-center md:justify-between md:gap-8 md:p-9">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">Need the shortlist?</p><h2 className="mt-2 font-serif text-3xl">Compare the leading mats side by side.</h2></div>
            <Link to="/reviews/best-yoga-mats" className="mt-5 inline-flex shrink-0 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[color:var(--color-olive-deep)] md:mt-0">See the best yoga mats</Link>
          </div>
        </Container>
      </section>
    </>
  )
}

export function filterReviews(filters: ReviewFiltersState) {
  return REVIEW_ENTRIES.filter((review) => {
    if (filters.brand !== 'All brands' && review.brand !== filters.brand)
      return false
    if (
      filters.material !== 'All materials' &&
      review.material !== filters.material
    )
      return false
    if (
      filters.useCase !== 'All use cases' &&
      !review.useCases.includes(filters.useCase)
    )
      return false
    if (
      filters.priceBand !== 'All price bands' &&
      review.priceBand !== filters.priceBand
    )
      return false
    if (
      filters.researchStatus !== 'All research statuses' &&
      review.researchStatus !== filters.researchStatus
    )
      return false
    return true
  })
}
