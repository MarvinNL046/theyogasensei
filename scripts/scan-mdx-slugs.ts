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

const TYPE_TO_URL_PREFIX: Record<string, string> = {
  guides: '/guides',
  poses: '/poses',
  styles: '/styles',
  gear: '/gear',
  blog: '/blog',
  authors: '/authors',
}

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

    const [folder, ...rest] = rel.split('/')
    const fileNameNoExt = rest.join('/').replace(/\.mdx$/, '')

    const urlPrefix = TYPE_TO_URL_PREFIX[folder ?? '']
    if (!urlPrefix) continue // unknown top-level content folder — skip

    const routePath = `${urlPrefix}/${fileNameNoExt}`
    const slug = fileNameNoExt.split('/').pop() ?? ''
    const type =
      folder === 'authors'
        ? 'author'
        : (fm.type as 'pillar' | 'subpillar' | 'cluster' | undefined) ??
          'cluster'

    entries.push({
      filePath,
      contentPath: rel,
      routePath,
      slug,
      type,
      lastReviewedAt:
        typeof fm.lastReviewedAt === 'string' ? fm.lastReviewedAt : undefined,
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
