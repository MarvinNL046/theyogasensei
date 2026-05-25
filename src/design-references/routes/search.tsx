import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === 'string' ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: 'Search - The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Search The Yoga Sensei for yoga guides, routines, product reviews, pose explainers and mindful practice resources.',
      },
      { property: 'og:title', content: 'Search - The Yoga Sensei' },
      { property: 'og:type', content: 'website' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/search' }],
  }),
  component: SearchPage,
})

type ContentType = 'Journal Articles' | 'Guides' | 'Product Reviews' | 'Yoga Routines'
type Difficulty = 'Beginner' | 'All Levels' | 'Intermediate'
type ReadBucket = '0-5 min' | '5-10 min' | '10+ min'
type SortMode = 'relevance' | 'newest' | 'shortest'

interface SearchItem {
  id: string
  title: string
  excerpt: string
  href: string
  image: string
  type: ContentType
  label: string
  category: string
  difficulty: Difficulty
  minutes: number
  date: string
  tags: Array<string>
}

const SEARCH_ITEMS: Array<SearchItem> = [
  {
    id: 'morning-yoga-routine',
    title: '10 Minute Morning Yoga Routine to Start Your Day',
    excerpt: 'A gentle full-body flow to wake up your body, clear your mind and set a positive tone.',
    href: '/guides/morning-yoga-routine',
    image: '/images/aiko-persona/aiko-upward-facing-dog-yoga-pose.webp',
    type: 'Yoga Routines',
    label: 'Yoga Routine',
    category: 'Yoga Routines',
    difficulty: 'Beginner',
    minutes: 8,
    date: '2026-05-12',
    tags: ['morning', 'routine', 'beginner', 'flow', 'energy', 'start your day'],
  },
  {
    id: 'morning-benefits',
    title: 'Morning Yoga Benefits: 7 Reasons to Practice in the AM',
    excerpt: 'Discover how a morning practice can support your energy, focus and overall well-being.',
    href: '/guides/morning-yoga-routine',
    image: '/images/brand/journal-hero-bg.webp',
    type: 'Guides',
    label: 'Guide',
    category: 'Yoga Philosophy',
    difficulty: 'All Levels',
    minutes: 6,
    date: '2026-05-08',
    tags: ['morning', 'benefits', 'habit', 'energy', 'focus'],
  },
  {
    id: 'energizing-flow',
    title: '20 Minute Energizing Morning Flow (Full Body)',
    excerpt: 'Build strength, improve flexibility and boost energy with this complete morning sequence.',
    href: '/guides/morning-yoga-routine',
    image: '/images/aiko-persona/aiko-warrior-ii-yoga-pose.webp',
    type: 'Yoga Routines',
    label: 'Yoga Routine',
    category: 'Yoga Routines',
    difficulty: 'Intermediate',
    minutes: 20,
    date: '2026-05-02',
    tags: ['morning', 'energizing', 'full body', 'strength', 'flexibility'],
  },
  {
    id: 'mindful-morning',
    title: 'The Power of a Mindful Morning (And How Yoga Helps)',
    excerpt: 'How a slower, more intentional morning can transform your day from the inside out.',
    href: '/mindful-journal',
    image: '/images/brand/newsletter-bonsai.webp',
    type: 'Journal Articles',
    label: 'Journal',
    category: 'Yoga Philosophy',
    difficulty: 'All Levels',
    minutes: 7,
    date: '2026-04-29',
    tags: ['morning', 'mindful', 'journal', 'philosophy', 'ritual'],
  },
  {
    id: 'morning-mats',
    title: 'Best Yoga Mats for Morning Practice: Our Top Picks',
    excerpt: 'Grip, comfort and support to help you feel grounded in every morning flow.',
    href: '/reviews/best-yoga-mats',
    image: '/images/brand/review-hero-best-mats.webp',
    type: 'Product Reviews',
    label: 'Product Review',
    category: 'Yoga Gear',
    difficulty: 'All Levels',
    minutes: 9,
    date: '2026-04-22',
    tags: ['morning', 'mat', 'gear', 'reviews', 'yoga mats'],
  },
  {
    id: 'yoga-for-beginners',
    title: 'Yoga for Beginners: A Complete Guide to Starting Your Practice',
    excerpt: 'Pick a style, learn foundational poses and build a simple practice without overwhelm.',
    href: '/guides/yoga-for-beginners',
    image: '/images/brand/topic-beginner-yoga.webp',
    type: 'Guides',
    label: 'Guide',
    category: 'Beginner Yoga',
    difficulty: 'Beginner',
    minutes: 18,
    date: '2026-05-13',
    tags: ['beginner', 'start here', 'foundation', 'practice', 'yoga basics'],
  },
  {
    id: 'best-yoga-mats-beginners',
    title: 'Best Yoga Mats for Beginners',
    excerpt: 'A practical buying guide for choosing your first mat without overspending.',
    href: '/guides/best-yoga-mats-for-beginners',
    image: '/images/brand/pick-manduka-pro.webp',
    type: 'Product Reviews',
    label: 'Product Review',
    category: 'Yoga Gear',
    difficulty: 'Beginner',
    minutes: 14,
    date: '2026-05-13',
    tags: ['beginner', 'yoga mats', 'gear', 'buying guide', 'reviews'],
  },
  {
    id: 'manduka-pro-review',
    title: 'Manduka PRO Yoga Mat Review',
    excerpt: 'A focused review of grip, cushioning, durability and who this premium mat suits best.',
    href: '/reviews/manduka-pro',
    image: '/images/brand/pick-manduka-pro.webp',
    type: 'Product Reviews',
    label: 'Product Review',
    category: 'Yoga Gear',
    difficulty: 'All Levels',
    minutes: 8,
    date: '2026-05-10',
    tags: ['manduka', 'manduka pro', 'mat review', 'gear', 'durability', 'grip'],
  },
  {
    id: 'sun-salutation',
    title: 'Sun Salutation A, Step by Step',
    excerpt: 'A beginner-friendly breakdown of breath, alignment and transitions for Surya Namaskar A.',
    href: '/poses/sun-salutation',
    image: '/images/aiko-persona/aiko-upward-facing-dog-yoga-pose.webp',
    type: 'Guides',
    label: 'Pose Guide',
    category: 'Beginner Yoga',
    difficulty: 'Beginner',
    minutes: 9,
    date: '2026-04-22',
    tags: ['sun salutation', 'beginner', 'pose', 'sequence', 'vinyasa'],
  },
  {
    id: 'breathwork-calm',
    title: 'Breathwork for Calm: 4 Techniques to Try',
    excerpt: 'Simple breathing techniques for steady attention, calmer transitions and better practice.',
    href: '/guides/breathwork-for-calm',
    image: '/images/brand/topic-breathwork.webp',
    type: 'Guides',
    label: 'Guide',
    category: 'Meditation',
    difficulty: 'Beginner',
    minutes: 7,
    date: '2026-04-14',
    tags: ['breathwork', 'calm', 'stress', 'meditation', 'pranayama'],
  },
  {
    id: 'yin-yoga-sleep',
    title: 'Better Sleep Through Yin Yoga',
    excerpt: 'A quiet evening sequence with longer holds, simple props and a slower pace.',
    href: '/guides/yin-yoga-for-sleep',
    image: '/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
    type: 'Yoga Routines',
    label: 'Yoga Routine',
    category: 'Yoga Routines',
    difficulty: 'Beginner',
    minutes: 10,
    date: '2026-04-08',
    tags: ['evening yoga', 'sleep', 'yin', 'bedtime yoga', 'routine'],
  },
  {
    id: 'cork-vs-foam',
    title: 'Cork vs Foam Yoga Blocks: Which Is Better?',
    excerpt: 'A calm comparison to help you choose the right block for alignment, support and travel.',
    href: '/gear',
    image: '/images/brand/pick-cork-blocks.webp',
    type: 'Product Reviews',
    label: 'Product Review',
    category: 'Yoga Gear',
    difficulty: 'All Levels',
    minutes: 7,
    date: '2026-04-01',
    tags: ['blocks', 'cork block', 'foam block', 'props', 'gear'],
  },
  {
    id: 'meditation-habit',
    title: 'How to Build a Consistent Meditation Habit',
    excerpt: 'Why five minutes done often beats a perfect twenty-minute sit done once.',
    href: '/guides/build-meditation-habit',
    image: '/images/brand/topic-meditation.webp',
    type: 'Journal Articles',
    label: 'Journal',
    category: 'Meditation',
    difficulty: 'Beginner',
    minutes: 8,
    date: '2026-05-05',
    tags: ['meditation', 'habit', 'consistency', 'mindfulness', 'beginner'],
  },
  {
    id: 'seated-twists',
    title: 'Seated Twists for Spinal Mobility',
    excerpt: 'A short floor sequence for desk-tight backs and calmer movement.',
    href: '/guides/seated-twists-for-mobility',
    image: '/images/aiko-persona/aiko-seated-twist-yoga-pose.webp',
    type: 'Yoga Routines',
    label: 'Yoga Routine',
    category: 'Yoga Routines',
    difficulty: 'All Levels',
    minutes: 10,
    date: '2026-03-25',
    tags: ['mobility', 'twists', 'routine', 'flexibility', 'hips'],
  },
  {
    id: 'beginner-roadmap',
    title: 'Your Beginner Yoga Roadmap',
    excerpt: 'A simple step-by-step path for building confidence, consistency and connection.',
    href: '/start-here',
    image: '/images/brand/review-hero-best-mats.webp',
    type: 'Guides',
    label: 'Start Here',
    category: 'Beginner Yoga',
    difficulty: 'Beginner',
    minutes: 6,
    date: '2026-05-16',
    tags: ['beginner', 'roadmap', 'start here', 'practice plan'],
  },
  {
    id: 'sensei-picks',
    title: 'The Yoga Sensei Essentials',
    excerpt: 'Handpicked tools that support a mindful practice, on and off the mat.',
    href: '/sensei-picks',
    image: '/images/brand/review-hero-best-mats.webp',
    type: 'Product Reviews',
    label: 'Sensei Picks',
    category: 'Yoga Gear',
    difficulty: 'All Levels',
    minutes: 5,
    date: '2026-05-15',
    tags: ['gear', 'essentials', 'blocks', 'straps', 'bolsters', 'mats'],
  },
  {
    id: 'yoga-gear',
    title: 'Yoga Gear: Tools That Support Your Practice',
    excerpt: 'Explore mats, blocks, straps, bolsters and practical tools for long-term practice.',
    href: '/gear',
    image: '/images/brand/review-hero-best-mats.webp',
    type: 'Guides',
    label: 'Category',
    category: 'Yoga Gear',
    difficulty: 'All Levels',
    minutes: 5,
    date: '2026-05-14',
    tags: ['gear', 'yoga mats', 'blocks', 'props', 'bags', 'straps'],
  },
  {
    id: 'mindful-journal',
    title: 'The Mindful Journal',
    excerpt: 'Weekly insights, practice notes and grounded reflections for a more mindful life.',
    href: '/mindful-journal',
    image: '/images/brand/journal-hero-bg.webp',
    type: 'Journal Articles',
    label: 'Journal',
    category: 'Yoga Philosophy',
    difficulty: 'All Levels',
    minutes: 5,
    date: '2026-05-17',
    tags: ['journal', 'mindfulness', 'newsletter', 'philosophy', 'habits'],
  },
  {
    id: 'about',
    title: 'Practice Over Perfection',
    excerpt: 'The story, philosophy and values behind The Yoga Sensei.',
    href: '/about',
    image: '/images/brand/review-hero-best-mats.webp',
    type: 'Journal Articles',
    label: 'About',
    category: 'Yoga Philosophy',
    difficulty: 'All Levels',
    minutes: 4,
    date: '2026-05-18',
    tags: ['about', 'philosophy', 'practice over perfection', 'values'],
  },
]

const CONTENT_TYPES: Array<ContentType> = [
  'Journal Articles',
  'Guides',
  'Product Reviews',
  'Yoga Routines',
]
const CATEGORIES = ['Yoga Routines', 'Beginner Yoga', 'Meditation', 'Yoga Philosophy', 'Yoga Gear']
const DIFFICULTIES: Array<Difficulty> = ['Beginner', 'All Levels', 'Intermediate']
const READ_BUCKETS: Array<ReadBucket> = ['0-5 min', '5-10 min', '10+ min']
const POPULAR_SEARCHES = [
  'morning yoga routine',
  '10 minute yoga',
  'yoga for beginners',
  'yoga for flexibility',
  'yoga for back pain',
  'yoga before work',
  'yoga for stress relief',
  'evening yoga',
  'bedtime yoga',
  'yoga for hips',
]
const PAGE_SIZE = 5

function SearchPage() {
  const urlSearch = Route.useSearch()
  const initialQuery = urlSearch.q ?? 'morning yoga'
  const [draftQuery, setDraftQuery] = useState(initialQuery)
  const [query, setQuery] = useState(initialQuery)
  const [contentType, setContentType] = useState<'All Results' | ContentType>('All Results')
  const [categories, setCategories] = useState<Array<string>>([])
  const [difficulties, setDifficulties] = useState<Array<Difficulty>>([])
  const [readBuckets, setReadBuckets] = useState<Array<ReadBucket>>([])
  const [sortMode, setSortMode] = useState<SortMode>('relevance')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const nextQuery = urlSearch.q ?? 'morning yoga'
    setDraftQuery(nextQuery)
    setQuery(nextQuery)
  }, [urlSearch.q])

  const scoredResults = useMemo(() => searchItems(query), [query])
  const filteredResults = useMemo(() => {
    const filtered = scoredResults.filter(({ item }) => {
      if (contentType !== 'All Results' && item.type !== contentType) return false
      if (categories.length > 0 && !categories.includes(item.category)) return false
      if (difficulties.length > 0 && !difficulties.includes(item.difficulty)) return false
      if (readBuckets.length > 0 && !readBuckets.some((bucket) => inReadBucket(item.minutes, bucket))) {
        return false
      }
      return true
    })

    return [...filtered].sort((a, b) => {
      if (sortMode === 'newest') {
        return new Date(b.item.date).getTime() - new Date(a.item.date).getTime()
      }
      if (sortMode === 'shortest') {
        return a.item.minutes - b.item.minutes
      }
      return b.score - a.score
    })
  }, [categories, contentType, difficulties, readBuckets, scoredResults, sortMode])

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / PAGE_SIZE))
  const visibleResults = filteredResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const queryLabel = query.trim() ? ` for “${query.trim()}”` : ''
  const counts = useMemo(() => makeCounts(scoredResults.map((result) => result.item)), [scoredResults])

  useEffect(() => {
    setPage(1)
  }, [categories, contentType, difficulties, query, readBuckets, sortMode])

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextQuery = draftQuery.trim()
    setQuery(nextQuery)
    const params = new URLSearchParams(window.location.search)
    if (nextQuery) params.set('q', nextQuery)
    else params.delete('q')
    const nextUrl = params.toString() ? `/search?${params.toString()}` : '/search'
    window.history.replaceState(null, '', nextUrl)
  }

  function choosePopularSearch(nextQuery: string) {
    setDraftQuery(nextQuery)
    setQuery(nextQuery)
    window.history.replaceState(null, '', `/search?q=${encodeURIComponent(nextQuery)}`)
  }

  return (
    <>
      <style>{`
        .search-results-layout {
          display: grid;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .search-results-layout {
            grid-template-columns: 200px minmax(0, 1fr) 240px;
            align-items: start;
          }
        }

        .search-result-card {
          display: grid;
        }

        @media (min-width: 768px) {
          .search-result-card {
            grid-template-columns: 200px minmax(0, 1fr);
          }
        }
      `}</style>
      <SearchHero
        draftQuery={draftQuery}
        onDraftChange={setDraftQuery}
        onSubmit={submitSearch}
        onClear={() => {
          setDraftQuery('')
          setQuery('')
          window.history.replaceState(null, '', '/search')
        }}
      />
      <section className="bg-[color:var(--color-bg)] pb-16 pt-8">
        <Container size="wide">
          <div className="border-t border-[color:var(--color-border)] pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>Search results</SectionLabel>
                <h2 className="mt-3 font-serif text-3xl text-[color:var(--color-ink)]">
                  {filteredResults.length} results{queryLabel}
                </h2>
              </div>
              <label className="flex items-center gap-3 text-sm text-[color:var(--color-ink-soft)]">
                <span>Sort by:</span>
                <select
                  value={sortMode}
                  onChange={(event) => setSortMode(event.target.value as SortMode)}
                  className="rounded-md border border-transparent bg-transparent px-2 py-2 text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-border)]"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="shortest">Shortest read</option>
                </select>
                <ChevronDown className="h-4 w-4" />
              </label>
            </div>

            <div className="search-results-layout mt-7">
              <FiltersSidebar
                activeType={contentType}
                counts={counts}
                categories={categories}
                difficulties={difficulties}
                readBuckets={readBuckets}
                onTypeChange={setContentType}
                onCategoryToggle={(value) => toggleValue(value, categories, setCategories)}
                onDifficultyToggle={(value) => toggleValue(value, difficulties, setDifficulties)}
                onReadBucketToggle={(value) => toggleValue(value, readBuckets, setReadBuckets)}
              />

              <div>
                <div className="space-y-4">
                  {visibleResults.map(({ item }) => (
                    <SearchResultCard key={item.id} item={item} />
                  ))}
                </div>
                {filteredResults.length === 0 ? <NoResults onReset={() => choosePopularSearch('yoga for beginners')} /> : null}
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>

              <SearchAside onPopularSearch={choosePopularSearch} />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function SearchHero({
  draftQuery,
  onDraftChange,
  onSubmit,
  onClear,
}: {
  draftQuery: string
  onDraftChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onClear: () => void
}) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-right-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/brand/review-hero-best-mats.webp')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, rgba(246,241,234,.98) 34%, rgba(246,241,234,.48) 58%, rgba(246,241,234,0) 100%)',
        }}
      />
      <Container size="wide" className="relative">
        <div className="grid min-h-[390px] items-center pb-16 pt-14 md:grid-cols-[minmax(0,420px)_1fr] md:pb-12">
          <div>
            <Eyebrow tone="accent">Search</Eyebrow>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-[color:var(--color-ink)] md:text-[60px]">
              Find what you
              <br />
              need. Deepen your
              <br />
              practice.
            </h1>
            <p className="mt-7 max-w-sm text-base leading-8 text-[color:var(--color-ink-soft)]">
              Explore our guides, reviews, practices and philosophy to support your journey.
            </p>
          </div>
        </div>
        <div className="relative z-10" style={{ paddingBottom: '2rem' }}>
          <form
            onSubmit={onSubmit}
            className="mx-auto -mt-10 flex max-w-4xl rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm"
            style={{ width: 'min(100%, 760px)' }}
          >
            <Search className="ml-6 mt-5 h-6 w-6 shrink-0 text-[color:var(--color-ink-soft)]" strokeWidth={1.5} />
            <label htmlFor="site-search" className="sr-only">
              Search the site
            </label>
            <input
              id="site-search"
              type="search"
              value={draftQuery}
              onChange={(event) => onDraftChange(event.target.value)}
              placeholder="Search guides, reviews, routines..."
              className="h-16 min-w-0 flex-1 bg-transparent px-5 text-lg text-[color:var(--color-ink)] outline-none placeholder:text-[color:var(--color-ink-muted)]"
            />
            {draftQuery ? (
              <button
                type="button"
                onClick={onClear}
                aria-label="Clear search"
                className="flex h-16 w-12 items-center justify-center text-[color:var(--color-ink)]"
              >
                <X className="h-5 w-5" />
              </button>
            ) : null}
            <button
              type="submit"
              className="m-1.5 min-w-32 shrink-0 rounded-md bg-[color:var(--color-olive)] px-9 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
              style={{ minWidth: '7.75rem' }}
            >
              Search
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}

function FiltersSidebar({
  activeType,
  counts,
  categories,
  difficulties,
  readBuckets,
  onTypeChange,
  onCategoryToggle,
  onDifficultyToggle,
  onReadBucketToggle,
}: {
  activeType: 'All Results' | ContentType
  counts: ReturnType<typeof makeCounts>
  categories: Array<string>
  difficulties: Array<Difficulty>
  readBuckets: Array<ReadBucket>
  onTypeChange: (value: 'All Results' | ContentType) => void
  onCategoryToggle: (value: string) => void
  onDifficultyToggle: (value: Difficulty) => void
  onReadBucketToggle: (value: ReadBucket) => void
}) {
  return (
    <aside className="space-y-8">
      <FilterGroup title="Content type">
        {(['All Results', ...CONTENT_TYPES] as Array<'All Results' | ContentType>).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onTypeChange(type)}
            className={[
              'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition',
              activeType === type
                ? 'bg-[color:var(--color-surface-muted)] text-[color:var(--color-ink)]'
                : 'text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-surface)]',
            ].join(' ')}
          >
            <span>{type}</span>
            <span>{type === 'All Results' ? counts.total : counts.types[type]}</span>
          </button>
        ))}
      </FilterGroup>

      <FilterGroup title="Categories">
        {CATEGORIES.map((category) => (
          <CheckboxRow
            key={category}
            label={category}
            count={counts.categories[category] ?? 0}
            checked={categories.includes(category)}
            onToggle={() => onCategoryToggle(category)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Difficulty">
        {DIFFICULTIES.map((difficulty) => (
          <CheckboxRow
            key={difficulty}
            label={difficulty}
            count={counts.difficulties[difficulty]}
            checked={difficulties.includes(difficulty)}
            onToggle={() => onDifficultyToggle(difficulty)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Reading time">
        {READ_BUCKETS.map((bucket) => (
          <CheckboxRow
            key={bucket}
            label={bucket}
            count={counts.readBuckets[bucket]}
            checked={readBuckets.includes(bucket)}
            onToggle={() => onReadBucketToggle(bucket)}
          />
        ))}
      </FilterGroup>
    </aside>
  )
}

function SearchResultCard({ item }: { item: SearchItem }) {
  return (
    <a
      href={item.href}
      className="search-result-card group overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/64 shadow-sm transition hover:-translate-y-0.5 hover:bg-[color:var(--color-surface)]"
    >
      <img src={item.image} alt="" width={360} height={250} className="h-48 w-full object-cover md:h-full" />
      <div className="relative p-6 md:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
          {item.label}
        </p>
        <h3 className="mt-3 max-w-xl font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
          {item.title}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[color:var(--color-ink-soft)]">{item.excerpt}</p>
        <p className="mt-5 text-xs text-[color:var(--color-ink-muted)]">
          {item.minutes} min read <span aria-hidden="true">•</span> {item.difficulty}
        </p>
        <Bookmark
          className="absolute right-5 top-5 h-5 w-5 text-[color:var(--color-ink-soft)] transition group-hover:text-[color:var(--color-olive)]"
          strokeWidth={1.4}
          aria-hidden="true"
        />
      </div>
    </a>
  )
}

function SearchAside({ onPopularSearch }: { onPopularSearch: (query: string) => void }) {
  return (
    <aside className="space-y-6">
      <div className="rounded-md bg-[color:var(--color-surface)]/70 p-6">
        <SectionLabel>Popular searches</SectionLabel>
        <div className="mt-5 space-y-3">
          {POPULAR_SEARCHES.map((query) => (
            <button
              key={query}
              type="button"
              onClick={() => onPopularSearch(query)}
              className="flex w-full items-center gap-3 text-left text-sm text-[color:var(--color-ink-soft)] transition hover:text-[color:var(--color-ink)]"
            >
              <Search className="h-4 w-4" strokeWidth={1.5} />
              <span>{query}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-md bg-[color:var(--color-surface)]/70 p-6">
        <SectionLabel>Can't find what you're looking for?</SectionLabel>
        <p className="mt-4 text-sm leading-6 text-[color:var(--color-ink-soft)]">
          Use different keywords or explore our categories.
        </p>
        <a
          href="/guides"
          className="mt-5 inline-flex rounded-md bg-[color:var(--color-olive)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-bg)]"
        >
          Browse all guides
        </a>
      </div>

      <div
        className="rounded-md bg-[color:var(--color-olive-deep)] bg-cover bg-right-bottom p-6 text-[color:var(--color-bg)]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(37,45,34,.82), rgba(37,45,34,.94)), url('/images/brand/newsletter-bonsai.webp')",
        }}
      >
        <h3 className="font-serif text-3xl leading-tight">New insights. Every week.</h3>
        <p className="mt-4 text-sm leading-6 text-[color:var(--color-bg)]/76">
          Join The Mindful Journal for weekly tips, routines and honest reviews.
        </p>
        <form className="mt-5 space-y-3">
          <label htmlFor="search-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="search-newsletter-email"
            type="email"
            placeholder="Your email address"
            className="h-11 w-full rounded-md border border-[color:var(--color-bg)]/15 bg-[color:var(--color-bg)] px-4 text-sm text-[color:var(--color-ink)] outline-none"
          />
          <button
            type="submit"
            className="h-11 w-full rounded-md border border-[color:var(--color-bg)]/42 text-[11px] font-semibold uppercase tracking-[0.16em]"
          >
            Join free
          </button>
        </form>
        <p className="mt-3 text-xs text-[color:var(--color-bg)]/64">No spam. Unsubscribe anytime.</p>
      </div>
    </aside>
  )
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  return (
    <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Search result pages">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-md text-[color:var(--color-ink)] disabled:opacity-30"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1
        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={[
              'flex h-9 w-9 items-center justify-center rounded-md text-sm',
              page === pageNumber
                ? 'bg-[color:var(--color-olive)] text-[color:var(--color-bg)]'
                : 'text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]',
            ].join(' ')}
          >
            {pageNumber}
          </button>
        )
      })}
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        className="flex h-9 w-9 items-center justify-center rounded-md text-[color:var(--color-ink)] disabled:opacity-30"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  )
}

function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 text-center">
      <h3 className="font-serif text-3xl text-[color:var(--color-ink)]">No results found</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[color:var(--color-ink-soft)]">
        Try a broader search term, clear one of the filters or start with beginner yoga.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-md bg-[color:var(--color-olive)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)]"
      >
        Search beginner yoga
      </button>
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[color:var(--color-border)] pb-7 last:border-b-0">
      <SectionLabel>{title}</SectionLabel>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  )
}

function CheckboxRow({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string
  count: number
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 py-1.5 text-left text-sm text-[color:var(--color-ink-soft)] transition hover:text-[color:var(--color-ink)]"
    >
      <span className="flex items-center gap-3">
        <span
          className={[
            'flex h-4 w-4 items-center justify-center rounded-sm border',
            checked
              ? 'border-[color:var(--color-olive)] bg-[color:var(--color-olive)] text-[color:var(--color-bg)]'
              : 'border-[color:var(--color-border)] bg-transparent',
          ].join(' ')}
          aria-hidden="true"
        >
          {checked ? <Check className="h-3 w-3" strokeWidth={2} /> : null}
        </span>
        {label}
      </span>
      <span>{count}</span>
    </button>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
      {children}
    </p>
  )
}

function searchItems(query: string) {
  const terms = normalize(query).split(' ').filter(Boolean)
  const phrase = normalize(query)
  if (terms.length === 0) {
    return SEARCH_ITEMS.map((item) => ({ item, score: 1 }))
  }

  return SEARCH_ITEMS.map((item) => {
    const title = normalize(item.title)
    const excerpt = normalize(item.excerpt)
    const tags = normalize(item.tags.join(' '))
    const category = normalize(item.category)
    const type = normalize(item.type)

    const score = terms.reduce((total, term) => {
      let nextScore = total
      if (title.includes(term)) nextScore += 10
      if (tags.includes(term)) nextScore += 7
      if (category.includes(term)) nextScore += 4
      if (type.includes(term)) nextScore += 3
      if (excerpt.includes(term)) nextScore += 2
      return nextScore
    }, title.includes(phrase) ? 25 : 0)

    return { item, score }
  }).filter((result) => result.score > 0)
}

function makeCounts(items: Array<SearchItem>) {
  return {
    total: items.length,
    types: Object.fromEntries(CONTENT_TYPES.map((type) => [type, items.filter((item) => item.type === type).length])) as Record<
      ContentType,
      number
    >,
    categories: Object.fromEntries(CATEGORIES.map((category) => [category, items.filter((item) => item.category === category).length])) as Record<
      string,
      number
    >,
    difficulties: Object.fromEntries(DIFFICULTIES.map((difficulty) => [difficulty, items.filter((item) => item.difficulty === difficulty).length])) as Record<
      Difficulty,
      number
    >,
    readBuckets: Object.fromEntries(READ_BUCKETS.map((bucket) => [bucket, items.filter((item) => inReadBucket(item.minutes, bucket)).length])) as Record<
      ReadBucket,
      number
    >,
  }
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function inReadBucket(minutes: number, bucket: ReadBucket) {
  if (bucket === '0-5 min') return minutes <= 5
  if (bucket === '5-10 min') return minutes > 5 && minutes <= 10
  return minutes > 10
}

function toggleValue<T>(value: T, current: Array<T>, setCurrent: (next: Array<T>) => void) {
  if (current.includes(value)) {
    setCurrent(current.filter((item) => item !== value))
    return
  }
  setCurrent([...current, value])
}
