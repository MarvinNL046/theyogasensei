export function NewsletterCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-accent-soft)]/40 p-6 shadow-sm">
      <div className="relative z-10 max-w-[220px]">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-olive)]">
          Mindful insights.
        </p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
          Straight to your inbox.
        </p>

        <p className="mt-4 text-sm leading-6 text-[color:var(--color-ink-soft)]">
          Practical tips, new guides and honest recommendations to support your
          practice.
        </p>

        <form action="#" method="post" className="mt-6 space-y-3">
          <label htmlFor="review-newsletter" className="sr-only">
            Email address
          </label>
          <input
            id="review-newsletter"
            type="email"
            name="email"
            required
            placeholder="Your email address"
            className="h-11 w-full rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/90 px-4 text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-muted)] focus:border-[color:var(--color-accent)] focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-[color:var(--color-olive)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
          >
            Join free
          </button>
          <p className="text-xs text-[color:var(--color-ink-muted)]">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>

      <img
        src="/images/brand/newsletter-bonsai.webp"
        alt=""
        width={320}
        height={480}
        loading="lazy"
        className="pointer-events-none absolute bottom-0 right-0 h-44 w-32 object-cover opacity-90"
      />
    </div>
  )
}
