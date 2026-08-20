import { useEffect, useState } from 'react'
import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { ConvexProvider, useConvex } from 'convex/react'
import type { FunctionReference } from 'convex/server'
import { convex, isConvexConfigured } from '#/lib/convex/client'

// Phase 1: typed reference to the Convex confirm mutation. Once
// `pnpm convex dev` has run, this can be replaced with
// `api.subscribers.confirm` from convex/_generated/api.
const confirmMutation = 'subscribers:confirm' as unknown as FunctionReference<
  'mutation',
  'public',
  { token: string },
  | { ok: true; status: 'confirmed' | 'already-confirmed' }
  | { ok: false; reason: 'invalid-token' }
>

interface TokenSearch {
  token?: string
}

function validateTokenSearch(search: Record<string, unknown>): TokenSearch {
  return typeof search.token === 'string' ? { token: search.token } : {}
}

export const Route = createFileRoute('/confirm')({
  validateSearch: validateTokenSearch,
  head: () => ({
    meta: [
      { title: 'Confirm your subscription — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Confirming your subscription to The Yoga Sensei weekly practice email.',
      },
      // Do not index the confirmation flow.
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: ConfirmRoute,
})

// Convex lives only here, not in the app root — so content pages never bundle
// the Convex client. /confirm is the one route that talks to Convex at runtime,
// so it provides its own <ConvexProvider> (and code-splits the client into this
// route's chunk).
function ConfirmRoute() {
  return (
    <ConvexProvider client={convex}>
      <ConfirmPage />
    </ConvexProvider>
  )
}

type ConfirmState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'confirmed' }
  | { status: 'already-confirmed' }
  | { status: 'invalid-token' }
  | { status: 'error'; message: string }
  | { status: 'missing-token' }

function ConfirmPage() {
  const { token } = useSearch({ from: '/confirm' })
  const convexClient = useConvex()
  const [state, setState] = useState<ConfirmState>({ status: 'idle' })

  useEffect(() => {
    if (!token) {
      setState({ status: 'missing-token' })
      return
    }

    let cancelled = false
    setState({ status: 'pending' })

    async function run() {
      if (!isConvexConfigured) {
        // Pre-`pnpm convex dev` fallback — surface a clear error rather than
        // silently pretending the confirmation succeeded.
        if (!cancelled) {
          setState({
            status: 'error',
            message:
              'Confirmation service is not configured yet. Email hello@theyogasensei.com to confirm manually.',
          })
        }
        return
      }

      try {
        const result = await convexClient.mutation(confirmMutation, {
          token: token!,
        })
        if (cancelled) return
        if (result.ok) {
          setState({ status: result.status })
        } else {
          setState({ status: 'invalid-token' })
        }
      } catch (err) {
        if (cancelled) return
        setState({
          status: 'error',
          message:
            err instanceof Error ? err.message : 'Unexpected error confirming.',
        })
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [token, convexClient])

  return (
    <section className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <div className="rounded-sm border border-[color:var(--color-border)]/70 bg-[color:var(--color-surface)]/80 p-8 shadow-sm backdrop-blur-sm sm:p-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
          Subscription
        </p>
        <ConfirmBody state={state} />
      </div>
    </section>
  )
}

function ConfirmBody({ state }: { state: ConfirmState }) {
  switch (state.status) {
    case 'idle':
    case 'pending':
      return (
        <>
          <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Confirming your subscription…
          </h1>
          <p className="mt-4 text-base leading-7 text-[color:var(--color-ink-soft)]">
            One moment. We are validating your confirmation link.
          </p>
        </>
      )
    case 'confirmed':
      return (
        <>
          <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Welcome to the practice.
          </h1>
          <p className="mt-4 text-base leading-7 text-[color:var(--color-ink-soft)]">
            Your subscription is confirmed. Your first email — including any
            lead magnet you requested — is on its way. Check your inbox in the
            next minute or two; look in spam if it does not appear.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/guides/$slug"
              params={{ slug: 'how-to-clean-a-yoga-mat' }}
              className="inline-flex items-center rounded-sm bg-[color:var(--color-olive)] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
            >
              Read the guides
            </Link>
            <Link
              to="/"
              className="inline-flex items-center rounded-sm border border-[color:var(--color-border)] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)]"
            >
              Start here
            </Link>
          </div>
        </>
      )
    case 'already-confirmed':
      return (
        <>
          <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Already confirmed.
          </h1>
          <p className="mt-4 text-base leading-7 text-[color:var(--color-ink-soft)]">
            This subscription was already confirmed earlier. Nothing more to do
            on your end.
          </p>
          <div className="mt-8">
            <Link
              to="/guides/$slug"
              params={{ slug: 'how-to-clean-a-yoga-mat' }}
              className="inline-flex items-center rounded-sm bg-[color:var(--color-olive)] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
            >
              Read the guides
            </Link>
          </div>
        </>
      )
    case 'invalid-token':
      return (
        <>
          <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            That link is no longer valid.
          </h1>
          <p className="mt-4 text-base leading-7 text-[color:var(--color-ink-soft)]">
            The confirmation token does not match an active subscription. It may
            have expired, already been used, or been malformed. Sign up again
            and we will send a fresh confirmation email.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center rounded-sm bg-[color:var(--color-olive)] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
            >
              Sign up again
            </Link>
          </div>
        </>
      )
    case 'missing-token':
      return (
        <>
          <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            No confirmation token.
          </h1>
          <p className="mt-4 text-base leading-7 text-[color:var(--color-ink-soft)]">
            This page expects a <code>?token=…</code> parameter from the
            confirmation email. If you arrived here by mistake, head back to the
            homepage.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center rounded-sm border border-[color:var(--color-border)] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)]"
            >
              Go home
            </Link>
          </div>
        </>
      )
    case 'error':
      return (
        <>
          <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Something went wrong.
          </h1>
          <p className="mt-4 text-base leading-7 text-[color:var(--color-ink-soft)]">
            {state.message} Try the link again in a minute. If it still fails,
            email <strong>hello@theyogasensei.com</strong> and we will confirm
            you manually.
          </p>
        </>
      )
  }
}
