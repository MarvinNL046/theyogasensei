import { Link } from '@tanstack/react-router'

/**
 * Default 404 component, wired into the router via defaultNotFoundComponent
 * in src/router.tsx. Renders for any URL that doesn't match a route — both
 * static (e.g. /typo) and dynamic (e.g. /poses/non-existent-slug).
 *
 * Voice-spec compliant: no "Oops", no exclamation marks, no
 * "Let's get you back on track". Direct, useful, points at three real
 * starting points instead of a single "back to home" button.
 */
export function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent-700">
        404
      </p>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        That page is not here
      </h1>
      <p className="mt-6 max-w-prose text-base leading-relaxed text-stone-700 sm:text-lg">
        Either the URL is mistyped or a link somewhere on this site is out of
        date. The three starting points below cover most of what people
        come here for.
      </p>

      <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
        <Link
          to="/guides/$slug"
          params={{ slug: 'yoga-for-beginners' }}
          className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-accent-300 hover:shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">
            Pillar
          </p>
          <p className="mt-2 font-serif text-base font-semibold text-stone-900">
            Yoga for Beginners
          </p>
          <p className="mt-2 text-sm text-stone-600">
            The complete starter guide.
          </p>
        </Link>
        <Link
          to="/poses/$slug"
          params={{ slug: 'sun-salutation' }}
          className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-accent-300 hover:shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">
            Pose guide
          </p>
          <p className="mt-2 font-serif text-base font-semibold text-stone-900">
            Sun Salutation
          </p>
          <p className="mt-2 text-sm text-stone-600">Step by step, twelve poses.</p>
        </Link>
        <Link
          to="/guides/$slug"
          params={{ slug: 'best-yoga-mats-for-beginners' }}
          className="rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-accent-300 hover:shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">
            Gear roundup
          </p>
          <p className="mt-2 font-serif text-base font-semibold text-stone-900">
            Best yoga mats for beginners
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Three tested picks under eighty dollars.
          </p>
        </Link>
      </div>

      <p className="mt-10 text-sm text-stone-500">
        Or head back to{' '}
        <Link to="/" className="underline hover:text-accent-700">
          the home page
        </Link>
        .
      </p>
    </main>
  )
}
