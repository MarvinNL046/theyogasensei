import { listContentSlugs, loadFrontmatter } from '#/lib/mdx/loader'
import { resolveAuthor } from '#/lib/content/authors'

export const GUIDE_CATEGORIES = [
  'All',
  'Getting started',
  'Buying guides',
  'Roundups',
  'Comparisons',
  'Accessories',
  'Care',
  'Chair yoga',
] as const

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number]

/** The pillar leads the index — it is the natural starting point. */
export const FEATURED_SLUG = 'how-to-choose-a-yoga-mat'

// Curated slug → category map. Frontmatter can't carry a `category` field (the
// Zod schema is a closed discriminated union) and `tags` overlap across types
// (the pillar also carries `mat-care`), so an explicit map is the honest way to
// label these. New guides fall back to 'Buying guides' until added here.
//
// NOTE: individual product reviews now live under /reviews/* (their own route
// files), not as guide MDX — so there is no 'Reviews' category here. Keep this
// map limited to slugs that actually exist in /content/guides.
const CATEGORY_BY_SLUG: Record<string, GuideCategory> = {
  'how-to-choose-a-yoga-mat': 'Buying guides',
  'how-thick-should-a-yoga-mat-be': 'Buying guides',
  'eco-friendly-yoga-mat': 'Roundups',
  'best-yoga-mat-for-hot-yoga': 'Roundups',
  'best-yoga-mat-for-bad-knees': 'Roundups',
  'best-yoga-mat-for-beginners': 'Roundups',
  'cork-vs-rubber-yoga-mat': 'Comparisons',
  'manduka-vs-lululemon-yoga-mat': 'Comparisons',
  'best-yoga-blocks': 'Accessories',
  'best-yoga-bolster': 'Accessories',
  'best-yoga-mat-bag': 'Accessories',
  'how-to-clean-a-yoga-mat': 'Care',
  'how-to-store-a-yoga-mat': 'Care',
  'chair-yoga-for-seniors': 'Chair yoga',
  'chair-yoga-for-beginners': 'Chair yoga',
  'free-chair-yoga-for-seniors': 'Chair yoga',
  'printable-chair-yoga-for-seniors': 'Chair yoga',
  'yoga-for-beginners': 'Getting started',
}

export interface GuideCard {
  slug: string
  title: string
  description: string
  heroImage: string
  category: GuideCategory
  publishedAt: string
  readingTime: number
  authorName: string
}

export interface GuidesData {
  /** The featured guide (pillar) — shown only in the unfiltered "All" view. */
  featured: GuideCard | null
  /** Every guide, newest first (includes the featured one). */
  guides: Array<GuideCard>
}

/**
 * Build the guides-index data from real MDX frontmatter at build time. Fully
 * serialisable — safe to return from an SSG route loader.
 */
export function listGuides(): GuidesData {
  const cards: Array<GuideCard> = listContentSlugs('guides').map((slug) => {
    const { frontmatter: fm } = loadFrontmatter('guides', slug)
    return {
      slug,
      title: fm.title,
      description: fm.metaDescription,
      heroImage: fm.heroImage,
      category: CATEGORY_BY_SLUG[slug] ?? 'Buying guides',
      publishedAt: fm.publishedAt,
      readingTime: fm.estimatedReadingTime,
      authorName: resolveAuthor(fm.author).name,
    }
  })

  // Newest first by publishedAt (ISO YYYY-MM-DD sorts lexicographically).
  cards.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))

  const featured =
    cards.find((c) => c.slug === FEATURED_SLUG) ?? cards[0] ?? null

  return { featured, guides: cards }
}

/** Count of guides per category, for the filter chips. */
export function countByCategory(
  guides: Array<GuideCard>,
): Record<GuideCategory, number> {
  const counts = Object.fromEntries(
    GUIDE_CATEGORIES.map((c) => [c, 0]),
  ) as Record<GuideCategory, number>
  counts.All = guides.length
  for (const g of guides) counts[g.category] += 1
  return counts
}

/** URL slug for a category, e.g. 'Buying guides' → 'buying-guides'. */
export function categorySlug(c: GuideCategory): string {
  return c.toLowerCase().replace(/\s+/g, '-')
}

/** Resolve a URL slug back to a category label; unknown/empty → 'All'. */
export function categoryFromSlug(slug: string | undefined): GuideCategory {
  if (!slug) return 'All'
  return GUIDE_CATEGORIES.find((c) => categorySlug(c) === slug) ?? 'All'
}

export function formatGuideDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
