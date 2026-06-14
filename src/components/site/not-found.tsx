import { Link } from '@tanstack/react-router'

/**
 * Default 404 component, wired into the router via defaultNotFoundComponent
 * in src/router.tsx. Renders for any URL that doesn't match a route — both
 * static (e.g. /typo) and dynamic (e.g. /poses/non-existent-slug).
 *
 * Voice-spec compliant: no "Oops", no exclamation marks, no
 * "Let's get you back on track". Direct, useful, points at the real
 * starting points that exist today.
 */
export function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
        404
      </p>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        That page is not here
      </h1>
      <p className="mt-3 text-base text-stone-600">
        The URL may have moved, or it never existed. Try one of these.
      </p>

      <div className="mx-auto mt-10 grid max-w-xl gap-3 text-left">
        <Link
          to="/guides/$slug"
          params={{ slug: 'how-to-clean-a-yoga-mat' }}
          className="rounded-sm border border-stone-200 bg-white p-5 transition hover:border-accent hover:shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Guide · Mat care
          </p>
          <p className="mt-2 font-serif text-base font-semibold text-stone-900">
            How to Clean a Yoga Mat
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Daily wipe-downs, deep cleans, per-material care.
          </p>
        </Link>
      </div>

      <p className="mt-10 text-sm text-stone-500">
        Or head back to{' '}
        <Link to="/" className="underline hover:text-accent">
          the home page
        </Link>
        .
      </p>
    </main>
  )
}
