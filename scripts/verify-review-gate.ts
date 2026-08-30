import { readFileSync } from 'node:fs'
import matter from 'gray-matter'
import { scanMdxEntries } from './scan-mdx-slugs'

const QUALIFIED_REVIEW_REQUIRED = new Set([
  'guides/chair-yoga-for-seniors.mdx',
  'guides/chair-yoga-for-beginners.mdx',
  'guides/free-chair-yoga-for-seniors.mdx',
  'guides/printable-chair-yoga-for-seniors.mdx',
  'guides/morning-yoga-routine.mdx',
  'guides/yoga-for-beginners.mdx',
  // Added 2026-08-30. These two are partner and group pose instruction living
  // in /guides rather than /poses, which is why the prefix rule above never
  // saw them and they shipped indexable for months. Listing them here means a
  // future edit that flips indexable back fails the build.
  'guides/yoga-poses-for-2.mdx',
  'guides/yoga-poses-for-3.mdx',
])

const failures: Array<string> = []
let gatedCount = 0

for (const entry of scanMdxEntries()) {
  const protectedContent =
    entry.contentPath.startsWith('poses/') ||
    QUALIFIED_REVIEW_REQUIRED.has(entry.contentPath)
  if (!protectedContent) continue
  gatedCount += 1

  const frontmatter = matter(readFileSync(entry.filePath, 'utf8')).data
  if (frontmatter.requiresQualifiedReview !== true) {
    failures.push(`${entry.contentPath}: requiresQualifiedReview must be true`)
  }
  if (frontmatter.indexable !== false) {
    failures.push(`${entry.contentPath}: indexable must remain false`)
  }
}

if (failures.length > 0) {
  console.error('[verify-review-gate] FAILED')
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}

console.log(
  // Counted, not hardcoded: the previous `8 + set.size` silently stayed correct
  // only while /poses/ held exactly eight files.
  `[verify-review-gate] ${gatedCount} instructional pages safely gated`,
)
