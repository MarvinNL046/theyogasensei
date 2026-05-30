import { useState, type FormEvent } from 'react'
import { useConvex } from 'convex/react'
import type { FunctionReference } from 'convex/server'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { isConvexConfigured } from '#/lib/convex/client'
import { cn } from '#/lib/utils'

// Phase 1: typed reference to the Convex insert mutation. Once `pnpm convex
// dev` has run, this can be replaced with `api.subscribers.insert` from
// convex/_generated/api — same runtime behaviour, sharper compile-time types.
const insertMutation = 'subscribers:insert' as unknown as FunctionReference<
  'mutation',
  'public',
  { email: string; source: string; leadMagnet?: string },
  { ok: boolean; status: string }
>

export interface NewsletterCaptureProps {
  leadMagnet?: string
  source?: string
  heading?: string
  blurb?: string
  /** 'light' = bordered white card (default). 'onDark' = bare, for dark bands. */
  tone?: 'light' | 'onDark'
  /** Render the internal heading + blurb. Set false when a parent band owns them. */
  showHeader?: boolean
  className?: string
}

/**
 * Newsletter capture form. Phase 1 stub — the form posts to a no-op handler
 * and shows a "submitted" state. Cluster C wires the actual Convex mutation
 * (insertSubscriber) that triggers a Resend double-opt-in email.
 *
 * The submission logic is shared; only the presentation forks on `tone`.
 */
export function NewsletterCapture({
  leadMagnet,
  source = 'unknown',
  heading = 'Get the weekly practice email',
  blurb = 'One short email a week. New articles, gear notes, and one thing I am testing right now. Unsubscribe in one click.',
  tone = 'light',
  showHeader = true,
  className,
}: NewsletterCaptureProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'submitting' | 'sent' | 'error'>(
    'idle',
  )
  // Hooks must be unconditional. Read from React context — if no
  // <ConvexProvider> wraps the tree (Phase 1 before convex dev) this
  // returns a default that we treat as "not configured" via the flag below.
  const convex = useConvex()
  const onDark = tone === 'onDark'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || state === 'submitting') return
    setState('submitting')

    if (!isConvexConfigured) {
      // Pre-`pnpm convex dev` fallback: simulate the submission so the UI
      // still demos. The form goes "sent" without actually persisting.
      // Cluster C completes once VITE_CONVEX_URL is populated.
      await new Promise((resolve) => setTimeout(resolve, 400))
      setState('sent')
      return
    }

    try {
      await convex.mutation(insertMutation, { email, source, leadMagnet })
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <section
      className={cn(
        'not-prose',
        onDark
          ? ''
          : 'rounded-2xl border border-stone-200 bg-white p-6 sm:p-8',
        className,
      )}
    >
      {showHeader ? (
        <>
          <h2
            className={cn(
              'text-xl font-semibold tracking-tight sm:text-2xl',
              onDark ? 'text-[color:var(--color-bg)]' : 'text-stone-900',
            )}
          >
            {heading}
          </h2>
          <p
            className={cn(
              'mt-2 max-w-prose text-sm sm:text-base',
              onDark
                ? 'text-[color:var(--color-bg)]/75'
                : 'text-stone-600',
            )}
          >
            {blurb}
          </p>
        </>
      ) : null}

      {state === 'sent' ? (
        <p
          className={cn(
            'rounded-md px-4 py-3 text-sm',
            showHeader && 'mt-4',
            onDark
              ? 'bg-[color:var(--color-bg)]/10 text-[color:var(--color-accent-soft)]'
              : 'bg-accent/10 text-accent',
          )}
        >
          Check your inbox. The confirmation email lands in under a minute. Look in spam if it does
          not.
        </p>
      ) : onDark ? (
        <form
          onSubmit={handleSubmit}
          className={cn('flex flex-col gap-3 sm:flex-row', showHeader && 'mt-5')}
          aria-describedby="newsletter-helper"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === 'submitting'}
            className="flex-1 rounded-full border border-[color:var(--color-bg)]/30 bg-[color:var(--color-bg)]/10 px-5 py-3 text-sm text-[color:var(--color-bg)] placeholder:text-[color:var(--color-bg)]/50 focus:border-[color:var(--color-accent)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={state === 'submitting' || !email}
            className="rounded-full bg-[color:var(--color-accent)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-accent-deep)] disabled:opacity-60 sm:w-auto"
          >
            {state === 'submitting' ? 'Sending…' : 'Subscribe'}
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={cn('flex flex-col gap-2 sm:flex-row', showHeader && 'mt-4')}
          aria-describedby="newsletter-helper"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === 'submitting'}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={state === 'submitting' || !email}
            className="sm:w-auto"
          >
            {state === 'submitting' ? 'Sending…' : 'Subscribe'}
          </Button>
        </form>
      )}

      {state === 'error' && (
        <p
          className={cn(
            'mt-2 text-sm',
            onDark ? 'text-red-300' : 'text-red-700',
          )}
        >
          Something went wrong. Try again, or send your email to info@theyogasensei.com.
        </p>
      )}

      <p
        id="newsletter-helper"
        className={cn(
          'mt-3 text-xs',
          onDark ? 'text-[color:var(--color-bg)]/55' : 'text-stone-500',
        )}
      >
        Double opt-in. One unsubscribe link per email. No third-party sharing.
      </p>
    </section>
  )
}
