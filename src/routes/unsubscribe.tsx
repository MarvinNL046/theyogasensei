import { useEffect, useState } from 'react'
import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { ConvexProvider, useConvex } from 'convex/react'
import type { FunctionReference } from 'convex/server'
import { z } from 'zod'
import { convex, isConvexConfigured } from '#/lib/convex/client'

// Typed reference to the Convex unsubscribe mutation.
const unsubscribeMutation = 'subscribers:unsubscribe' as unknown as FunctionReference<
  'mutation',
  'public',
  { token: string },
  | { ok: true; status: 'unsubscribed' | 'already-unsubscribed' }
  | { ok: false; status: 'invalid-token' }
>

const searchSchema = z.object({
  token: z.string().optional(),
})

export const Route = createFileRoute('/unsubscribe')({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: 'Unsubscribe — The Yoga Sensei' },
      {
        name: 'description',
        content: 'Unsubscribe from The Yoga Sensei weekly practice email.',
      },
      // Never index the unsubscribe flow.
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: UnsubscribeRoute,
})

// Convex lives only on this route (and /confirm), not in the app root, so
// content pages never bundle the Convex client. We provide our own
// <ConvexProvider> and code-split the client into this route's chunk.
function UnsubscribeRoute() {
  return (
    <ConvexProvider client={convex}>
      <UnsubscribePage />
    </ConvexProvider>
  )
}

type UnsubState =
  | 'idle'
  | 'submitting'
  | 'unsubscribed'
  | 'already-unsubscribed'
  | 'invalid-token'
  | 'error'

function UnsubscribePage() {
  const { token } = useSearch({ from: '/unsubscribe' })
  const convex = useConvex()
  const [state, setState] = useState<UnsubState>('idle')
  // The page is prerendered without search params, so the token only exists on
  // the client. Gate the token-dependent render until after hydration so the
  // first client render matches the server's (avoids React #418).
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  // A button click (not page load) triggers the mutation. This keeps email
  // link-scanners and prefetchers from unsubscribing anyone by accident.
  async function handleUnsubscribe() {
    if (!token) return
    if (!isConvexConfigured) {
      setState('error')
      return
    }
    setState('submitting')
    try {
      const result = await convex.mutation(unsubscribeMutation, { token })
      setState(result.ok ? result.status : 'invalid-token')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-20 md:py-28">
      <div className="rounded-sm border border-[color:var(--color-border)]/70 bg-[color:var(--color-surface)]/80 p-8 shadow-sm backdrop-blur-sm sm:p-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
          Newsletter
        </p>
        {hydrated ? (
          <UnsubscribeBody
            state={state}
            hasToken={Boolean(token)}
            onUnsubscribe={handleUnsubscribe}
          />
        ) : (
          <>
            <h1 className={headingClass}>Unsubscribe</h1>
            <p className={bodyClass}>One moment…</p>
          </>
        )}
      </div>
    </section>
  )
}

const headingClass =
  'mt-3 font-serif text-3xl leading-tight tracking-tight text-[color:var(--color-ink)] sm:text-4xl'
const bodyClass = 'mt-4 text-base leading-7 text-[color:var(--color-ink-soft)]'

function UnsubscribeBody({
  state,
  hasToken,
  onUnsubscribe,
}: {
  state: UnsubState
  hasToken: boolean
  onUnsubscribe: () => void
}) {
  if (!hasToken) {
    return (
      <>
        <h1 className={headingClass}>No unsubscribe token.</h1>
        <p className={bodyClass}>
          This page expects a <code>?token=…</code> parameter from the link in
          your email. If you want out, use the unsubscribe link at the bottom of
          any email we sent you.
        </p>
        <div className="mt-8">
          <HomeLink />
        </div>
      </>
    )
  }

  switch (state) {
    case 'idle':
    case 'submitting':
      return (
        <>
          <h1 className={headingClass}>Unsubscribe from the weekly email?</h1>
          <p className={bodyClass}>
            One click and you are off the list — no confirmation step, no email
            back. You can always sign up again later.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={onUnsubscribe}
              disabled={state === 'submitting'}
              className="inline-flex items-center rounded-sm bg-[color:var(--color-olive)] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)] disabled:opacity-60"
            >
              {state === 'submitting' ? 'Unsubscribing…' : 'Unsubscribe'}
            </button>
          </div>
        </>
      )
    case 'unsubscribed':
      return (
        <>
          <h1 className={headingClass}>You are unsubscribed.</h1>
          <p className={bodyClass}>
            You will not get any more emails from The Yoga Sensei. No hard
            feelings — the guides stay free and open whenever you want them.
          </p>
          <div className="mt-8">
            <HomeLink />
          </div>
        </>
      )
    case 'already-unsubscribed':
      return (
        <>
          <h1 className={headingClass}>Already unsubscribed.</h1>
          <p className={bodyClass}>
            This address was already off the list. Nothing more to do.
          </p>
          <div className="mt-8">
            <HomeLink />
          </div>
        </>
      )
    case 'invalid-token':
      return (
        <>
          <h1 className={headingClass}>That link is not valid.</h1>
          <p className={bodyClass}>
            The token does not match a subscription. It may have already been
            used. If you still get emails, use the unsubscribe link in the most
            recent one, or email hello@theyogasensei.com.
          </p>
          <div className="mt-8">
            <HomeLink />
          </div>
        </>
      )
    case 'error':
      return (
        <>
          <h1 className={headingClass}>Something went wrong.</h1>
          <p className={bodyClass}>
            We could not process that just now. Try again in a minute, or email{' '}
            <strong>hello@theyogasensei.com</strong> and we will remove you
            manually.
          </p>
        </>
      )
  }
}

function HomeLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center rounded-sm border border-[color:var(--color-border)] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)]"
    >
      Back to home
    </Link>
  )
}
