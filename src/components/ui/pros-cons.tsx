import { Check, Minus } from 'lucide-react'
import { cn } from '#/lib/utils'

/**
 * Two-column pros and cons box for blog posts.
 *
 * Mirrors the pro/con grammar already used in the reviews (Check + olive for
 * the upside, Minus + accent-deep for the downside) so an MDX post and a TSX
 * review read as the same publication.
 *
 * House rule from CLAUDE.md: a post that lists no real downsides is not honest.
 * Both arrays are required for that reason — there is no pros-only mode.
 */
export interface ProsConsProps {
  pros: string[]
  cons: string[]
  prosTitle?: string
  consTitle?: string
  className?: string
}

function Column({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: 'pro' | 'con'
}) {
  const Icon = tone === 'pro' ? Check : Minus
  return (
    <div className="min-w-0 flex-1 p-5 sm:p-6">
      <p
        className={cn(
          'text-[11px] font-semibold uppercase tracking-[0.16em]',
          tone === 'pro'
            ? 'text-[color:var(--color-olive)]'
            : 'text-[color:var(--color-accent-deep)]',
        )}
      >
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              'flex gap-2 text-sm leading-snug',
              tone === 'pro'
                ? 'text-[color:var(--color-ink-soft)]'
                : 'text-[color:var(--color-ink-muted)]',
            )}
          >
            <Icon
              aria-hidden="true"
              className={cn(
                'mt-0.5 h-4 w-4 flex-shrink-0',
                tone === 'pro'
                  ? 'text-[color:var(--color-olive)]'
                  : 'text-[color:var(--color-accent-deep)]',
              )}
              strokeWidth={2}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProsCons({
  pros,
  cons,
  prosTitle = 'What works',
  consTitle = 'What does not',
  className,
}: ProsConsProps) {
  return (
    <div
      className={cn(
        'not-prose my-8 flex flex-col border border-[color:var(--color-border)] bg-[color:var(--color-surface)] sm:flex-row',
        className,
      )}
    >
      <Column title={prosTitle} items={pros} tone="pro" />
      <div
        aria-hidden="true"
        className="border-t border-[color:var(--color-border)] sm:border-t-0 sm:border-l"
      />
      <Column title={consTitle} items={cons} tone="con" />
    </div>
  )
}

export { ProsCons }
