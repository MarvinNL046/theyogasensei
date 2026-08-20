import { listContentSlugs, loadFrontmatter } from '#/lib/mdx/loader'

export const SEARCH_TYPES = [
  'All',
  'Practice',
  'Poses',
  'Gear guides',
  'Reviews',
  'Comparisons',
] as const

export type SearchType = (typeof SEARCH_TYPES)[number]

export interface SearchEntry {
  title: string
  description: string
  href: string
  type: Exclude<SearchType, 'All'>
  tags: Array<string>
}

const REVIEW_ROWS: Array<[title: string, description: string, href: string]> = [
  [
    'Manduka PRO review',
    'Dense cushioning, long-term durability evidence and the portability trade-off.',
    '/reviews/manduka-pro',
  ],
  [
    'Liforme Original review',
    'Alignment marks, immediate grip and the premium price trade-off.',
    '/reviews/liforme',
  ],
  [
    'Jade Harmony review',
    'Natural-rubber traction, care requirements and latex relevance.',
    '/reviews/jade',
  ],
  [
    'Lululemon The Mat review',
    'Reversible grip, cushioning and practical care considerations.',
    '/reviews/lululemon',
  ],
  [
    'Manduka GRP Adapt review',
    'A sweat-focused surface with specific cleaning and maintenance needs.',
    '/reviews/manduka-grp-adapt',
  ],
  [
    'Alo Warrior Mat review',
    'A premium polyurethane-topped mat with clear strengths and limitations.',
    '/reviews/alo',
  ],
  [
    'Gaiam yoga mat review',
    'Budget-friendly context, material choices and realistic limitations.',
    '/reviews/gaiam',
  ],
  [
    'Retrospec Solana review',
    'Extra cushioning balanced against stability in standing poses.',
    '/reviews/retrospec',
  ],
  [
    'Best yoga mats',
    'A research-led shortlist compared by grip, cushion, material and portability.',
    '/reviews/best-yoga-mats',
  ],
]

const REVIEW_ENTRIES: Array<SearchEntry> = REVIEW_ROWS.map(
  ([title, description, href]) => ({
    title,
    description,
    href,
    type: 'Reviews',
    tags: ['yoga mat', 'product review'],
  }),
)

const COMPARISON_SLUGS = new Set([
  'alo-vs-lululemon-yoga-mat',
  'cork-vs-rubber-yoga-mat',
  'hatha-vs-vinyasa',
  'manduka-pro-vs-liforme',
  'manduka-vs-lululemon-yoga-mat',
  'open-cell-vs-closed-cell-yoga-mat',
  'tpe-vs-nbr-yoga-mat',
  'yoga-mat-vs-exercise-mat',
  'yoga-rug-vs-mat',
])

const PRACTICE_SLUGS = new Set([
  'chair-yoga-for-beginners',
  'chair-yoga-for-seniors',
  'free-28-day-chair-yoga-for-seniors',
  'free-chair-yoga-for-seniors',
  'morning-yoga-routine',
  'printable-chair-yoga-for-seniors',
  'yoga-for-beginners',
])

function guideType(slug: string): SearchEntry['type'] {
  if (COMPARISON_SLUGS.has(slug)) return 'Comparisons'
  if (PRACTICE_SLUGS.has(slug)) return 'Practice'
  return 'Gear guides'
}

export function listSearchEntries(): Array<SearchEntry> {
  const folders = ['guides', 'poses', 'styles', 'blog', 'gear'] as const
  const entries = folders.flatMap((folder) =>
    listContentSlugs(folder).map((slug) => {
      const { frontmatter } = loadFrontmatter(folder, slug)
      const type: SearchEntry['type'] =
        folder === 'poses'
          ? 'Poses'
          : folder === 'styles' || folder === 'blog'
            ? 'Practice'
            : folder === 'guides'
              ? guideType(slug)
              : 'Gear guides'
      const href = folder === 'gear' ? `/gear/${slug}` : `/${folder}/${slug}`

      return {
        title: frontmatter.title,
        description: frontmatter.metaDescription,
        href,
        type,
        tags: frontmatter.tags,
      }
    }),
  )

  return [...entries, ...REVIEW_ENTRIES].sort((a, b) =>
    a.title.localeCompare(b.title),
  )
}

export function searchTypeFromSlug(value?: string): SearchType {
  if (!value) return 'All'
  return (
    SEARCH_TYPES.find(
      (type) => type !== 'All' && searchTypeSlug(type) === value,
    ) ?? 'All'
  )
}

export function searchTypeSlug(type: SearchType): string {
  return type.toLowerCase().replace(/\s+/g, '-')
}
