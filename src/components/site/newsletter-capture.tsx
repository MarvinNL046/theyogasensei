import { useState, type FormEvent } from 'react'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { cn } from '#/lib/utils'

export interface NewsletterCaptureProps {
  leadMagnet?: string
  source?: string
  heading?: string
  blurb?: string
  className?: string
}

/**
 * Newsletter capture form. Phase 1 stub — the form posts to a no-op handler
 * and shows a "submitted" state. Cluster C wires the actual Convex mutation
 * (insertSubscriber) that triggers a Resend double-opt-in email.
 */
export function NewsletterCapture({
  leadMagnet,
  source = 'unknown',
  heading = 'Get the weekly practice email',
  blurb = 'One short email a week. New articles, gear notes, and one thing I am testing right now. Unsubscribe in one click.',
  className,
}: NewsletterCaptureProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'submitting' | 'sent' | 'error'>(
    'idle',
  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || state === 'submitting') return
    setState('submitting')
    try {
      // Phase 1 stub. Cluster C replaces this with a Convex mutation call.
      // Intentional no-op delay so the UI flow can be tested end-to-end.
      await new Promise((resolve) => setTimeout(resolve, 400))
      // Reference values to avoid unused-var lints in Phase 1.
      void leadMagnet
      void source
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <section
      className={cn(
        'not-prose rounded-2xl border border-stone-200 bg-white p-6 sm:p-8',
        className,
      )}
    >
      <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
        {heading}
      </h2>
      <p className="mt-2 max-w-prose text-sm text-stone-600 sm:text-base">{blurb}</p>

      {state === 'sent' ? (
        <p className="mt-4 rounded-md bg-accent-50 px-4 py-3 text-sm text-accent-800">
          Check your inbox. The confirmation email lands in under a minute. Look in spam if it does
          not.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-2 sm:flex-row"
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
        <p className="mt-2 text-sm text-red-700">
          Something went wrong. Try again, or send your email to info@theyogasensei.com.
        </p>
      )}

      <p id="newsletter-helper" className="mt-3 text-xs text-stone-500">
        Double opt-in. One unsubscribe link per email. No third-party sharing.
      </p>
    </section>
  )
}
