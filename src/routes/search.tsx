import { useDeferredValue, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Search } from 'lucide-react'
import { track } from '@vercel/analytics'
import { Container } from '#/components/ui/container'
import { cn } from '#/lib/utils'
import { SITE_URL } from '#/lib/seo/head'
import {
  SEARCH_TYPES,
  listSearchEntries,
  searchTypeFromSlug,
  searchTypeSlug,
} from '#/features/search/data'
import type { SearchType } from '#/features/search/data'

interface SearchParams {
  q?: string
  type?: string
}

const TITLE = 'Search The Yoga Sensei'
const DESCRIPTION =
  'Search yoga practice guides, pose instructions, gear advice, reviews and comparisons from The Yoga Sensei.'

const SEARCH_STOP_WORDS = new Set(['a', 'an', 'for', 'the', 'to', 'with'])
const SEARCH_ALIASES: Record<string, Array<string>> = {
  beginner: ['beginner', 'beginners', 'start', 'starting'],
  beginners: ['beginner', 'beginners', 'start', 'starting'],
  knee: ['knee', 'knees', 'joint'],
  knees: ['knee', 'knees', 'joint'],
  sensitive: ['sensitive', 'joint', 'bad'],
  sweaty: ['sweaty', 'sweat', 'hot'],
  travel: ['travel', 'foldable', 'portable', 'lightweight'],
}

function matchesQuery(haystack: string, query: string): boolean {
  const terms = query
    .split(/\s+/)
    .filter((term) => !SEARCH_STOP_WORDS.has(term))
  return terms.every((term) =>
    (SEARCH_ALIASES[term] ?? [term]).some((option) =>
      haystack.includes(option),
    ),
  )
}

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    ...(typeof search.q === 'string' && search.q.trim()
      ? { q: search.q.trim().slice(0, 100) }
      : {}),
    ...(typeof search.type === 'string' &&
    searchTypeFromSlug(search.type) !== 'All'
      ? { type: search.type }
      : {}),
  }),
  loader: () => ({ entries: listSearchEntries() }),
  head: () => ({
    meta: [
      { title: `${TITLE} | The Yoga Sensei` },
      { name: 'description', content: DESCRIPTION },
      { name: 'robots', content: 'noindex, follow' },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:url', content: `${SITE_URL}/search` },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/search` }],
  }),
  component: SearchPage,
})

function SearchPage() {
  const { entries } = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const [hydrated, setHydrated] = useState(false)
  const [query, setQuery] = useState('')
  useEffect(() => {
    setHydrated(true)
    setQuery(search.q ?? '')
  }, [search.q])

  const activeType = hydrated ? searchTypeFromSlug(search.type) : 'All'
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())
  const results = entries.filter((entry) => {
    if (activeType !== 'All' && entry.type !== activeType) return false
    if (!deferredQuery) return true
    const haystack =
      `${entry.title} ${entry.description} ${entry.tags.join(' ')}`.toLowerCase()
    return matchesQuery(haystack, deferredQuery)
  })

  const updateUrl = (nextQuery: string, nextType: SearchType) =>
    navigate({
      search: {
        ...(nextQuery.trim() ? { q: nextQuery.trim() } : {}),
        ...(nextType === 'All' ? {} : { type: searchTypeSlug(nextType) }),
      },
      replace: true,
    })

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    track('Site search', {
      contentType: activeType,
      hasQuery: query.trim().length > 0,
      resultCount: results.length,
    })
    updateUrl(query, activeType)
  }

  return (
    <>
      <section className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)]">
        <Container size="wide" className="py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
            Search the library
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] tracking-[-0.045em] md:text-6xl">
            Find the guidance you need.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-ink-soft)] md:text-lg">
            Search practice guides, poses, gear advice, reviews and direct
            comparisons.
          </p>
          <form
            onSubmit={submit}
            role="search"
            className="mt-8 flex max-w-2xl gap-3"
          >
            <label htmlFor="site-search" className="sr-only">
              Search The Yoga Sensei
            </label>
            <div className="relative min-w-0 flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--color-ink-muted)]"
              />
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try ‘mat for sensitive knees’"
                autoComplete="off"
                className="h-13 w-full rounded-full border border-[color:var(--color-border)] bg-white pl-12 pr-5 text-base text-[color:var(--color-ink)] outline-none transition placeholder:text-[color:var(--color-ink-muted)] focus:border-[color:var(--color-olive)] focus:ring-3 focus:ring-[color:var(--color-ring)]/25"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-[color:var(--color-olive)] px-6 text-sm font-semibold text-white transition hover:bg-[color:var(--color-olive-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent)]"
            >
              Search
            </button>
          </form>
        </Container>
      </section>

      <section className="bg-[color:var(--color-bg)] py-12 md:py-16">
        <Container size="wide">
          <div
            className="flex flex-wrap gap-2"
            aria-label="Filter search results by content type"
          >
            {SEARCH_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={activeType === type}
                onClick={() => updateUrl(query, type)}
                className={cn(
                  'rounded-full border px-4 py-2 text-xs font-semibold transition',
                  activeType === type
                    ? 'border-[color:var(--color-olive)] bg-[color:var(--color-olive)] text-white'
                    : 'border-[color:var(--color-border)] bg-white text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-accent-soft)]',
                )}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="mt-10 flex items-end justify-between gap-4 border-b border-[color:var(--color-border)] pb-4">
            <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
              {deferredQuery
                ? `Results for “${query.trim()}”`
                : 'Browse the library'}
            </h2>
            <p
              className="shrink-0 text-sm text-[color:var(--color-ink-muted)]"
              aria-live="polite"
            >
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
          </div>

          {results.length ? (
            <ul className="grid gap-x-10 md:grid-cols-2">
              {results.map((entry) => (
                <li
                  key={entry.href}
                  className="border-b border-[color:var(--color-border)] py-7"
                >
                  <Link
                    to={entry.href}
                    className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--color-accent)]"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
                      {entry.type}
                    </p>
                    <h3 className="mt-2 font-serif text-xl leading-tight text-[color:var(--color-ink)] group-hover:text-[color:var(--color-olive)]">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                      {entry.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--color-olive-deep)]">
                      Open guide{' '}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-16 text-center">
              <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
                No close match yet.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                Try fewer words, remove the content filter or browse all guides.
              </p>
              <Link
                to="/guides"
                className="mt-6 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[color:var(--color-ink)]"
              >
                Browse all guides
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
