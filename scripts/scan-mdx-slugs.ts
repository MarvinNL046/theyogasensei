import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import matter from 'gray-matter'

export interface MdxEntry {
  filePath: string // absolute path to the .mdx file
  contentPath: string // path under /content, e.g. 'poses/sun-salutation.mdx'
  routePath: string // resolved URL path, e.g. '/poses/sun-salutation'
  slug: string // the leaf slug, e.g. 'sun-salutation'
  type: 'pillar' | 'subpillar' | 'cluster' | 'author'
  lastReviewedAt?: string
  indexable: boolean
}

const CONTENT_DIR = join(process.cwd(), 'content')

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/

/**
 * Normalise a frontmatter date to `YYYY-MM-DD`.
 *
 * YAML 1.1 types an unquoted `2026-07-26` as a timestamp, so gray-matter hands
 * back a Date, not a string. A `typeof === 'string'` guard therefore dropped
 * the review date of all 117 content files and let the sitemap fall back to the
 * build date — which made every URL claim the same lastmod, the one pattern
 * Google discounts. Accept both shapes; reject anything else rather than
 * emitting a lastmod we cannot vouch for.
 *
 * Dates are read in UTC (js-yaml parses timestamps as UTC and toISOString
 * keeps them there). Using local getters instead would shift the day by one
 * for anyone building west of Greenwich.
 */
export function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date)
    return Number.isNaN(value.getTime())
      ? undefined
      : value.toISOString().slice(0, 10)
  if (typeof value === 'string' && ISO_DAY.test(value)) return value
  return undefined
}

const TYPE_TO_URL_PREFIX: Record<string, string> = {
  guides: '/guides',
  poses: '/poses',
  styles: '/styles',
  gear: '/gear',
  blog: '/blog',
  authors: '/authors',
}

const CONTENT_FOLDERS = new Set([
  'poses',
  'guides',
  'styles',
  'gear',
  'blog',
  'reviews',
])

function walkDir(dir: string): Array<string> {
  let results: Array<string> = []
  let entries: Array<string>
  try {
    entries = readdirSync(dir)
  } catch {
    return []
  }
  for (const entry of entries) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      results = results.concat(walkDir(full))
    } else if (entry.endsWith('.mdx')) {
      results.push(full)
    }
  }
  return results
}

/**
 * Walk /content/**\/*.mdx, parse frontmatter, return an entry per file.
 * Used by both scan-mdx-slugs (for prerender pages) and the sitemap generator.
 */
export function scanMdxEntries(): Array<MdxEntry> {
  const files = walkDir(CONTENT_DIR)
  const entries: Array<MdxEntry> = []

  for (const filePath of files) {
    const raw = readFileSync(filePath, 'utf8')
    const parsed = matter(raw)
    const fm = parsed.data as Record<string, unknown>

    const rel = relative(CONTENT_DIR, filePath).split(sep).join('/')
    // Skip draft files — any path containing a `_drafts/` segment is
    // intentionally out of the live route + sitemap surface.
    if (rel.split('/').includes('_drafts')) continue

    const [folder = '', ...rest] = rel.split('/')
    const fileNameNoExt = rest.join('/').replace(/\.mdx$/, '')

    const urlPrefix = TYPE_TO_URL_PREFIX[folder]
    if (!urlPrefix) continue // unknown top-level content folder — skip

    const routePath = `${urlPrefix}/${fileNameNoExt}`
    const slug = fileNameNoExt.split('/').pop() ?? ''
    const type =
      folder === 'authors'
        ? 'author'
        : ((fm.type as 'pillar' | 'subpillar' | 'cluster' | undefined) ??
          'cluster')

    entries.push({
      filePath,
      contentPath: rel,
      routePath,
      slug,
      type,
      lastReviewedAt: toIsoDate(fm.lastReviewedAt),
      indexable: fm.indexable !== false,
    })
  }

  return entries
}

/**
 * Return the list of route paths that the TanStack Start prerender config
 * should bake into HTML. Skips author pages (handled by the regular
 * authors/$slug route + crawlLinks).
 */
export function scanMdxSlugs(): Array<{ path: string }> {
  const entries = scanMdxEntries()
  return entries.map((e) => ({ path: e.routePath }))
}

/**
 * Build the compact frontmatter registry embedded into the client bundle.
 *
 * Importing `frontmatter` eagerly from every MDX module makes Rollup statically
 * import every article body as well. That turns a homepage visit into 100+
 * article-chunk requests. Parsing YAML here keeps route metadata synchronous
 * while the MDX body remains a true on-demand import.
 */
export function scanContentFrontmatter(): Record<
  string,
  Record<string, unknown>
> {
  const manifest: Record<string, Record<string, unknown>> = {}

  for (const filePath of walkDir(CONTENT_DIR)) {
    const rel = relative(CONTENT_DIR, filePath).split(sep).join('/')
    const [folder] = rel.split('/')
    if (
      !folder ||
      !CONTENT_FOLDERS.has(folder) ||
      rel.split('/').includes('_drafts')
    ) {
      continue
    }

    const parsed = matter(readFileSync(filePath, 'utf8'))
    const fm = parsed.data
    manifest[`/content/${rel}`] = {
      type: fm.type,
      title: fm.title,
      slug: fm.slug,
      metaDescription: fm.metaDescription,
      pillar: fm.pillar,
      clusters: fm.clusters,
      tags: fm.tags,
      related: fm.related,
      author: fm.author,
      reviewedBy: fm.reviewedBy,
      indexable: fm.indexable ?? true,
      requiresQualifiedReview: fm.requiresQualifiedReview ?? false,
      publishedAt: fm.publishedAt,
      lastReviewedAt: fm.lastReviewedAt,
      estimatedReadingTime: fm.estimatedReadingTime,
      heroImage: fm.heroImage,
      schemaType: fm.schemaType,
    }
  }

  return manifest
}
