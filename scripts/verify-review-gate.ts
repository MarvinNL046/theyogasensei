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
])

const failures: Array<string> = []

for (const entry of scanMdxEntries()) {
  const protectedContent =
    entry.contentPath.startsWith('poses/') ||
    QUALIFIED_REVIEW_REQUIRED.has(entry.contentPath)
  if (!protectedContent) continue

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
  `[verify-review-gate] ${8 + QUALIFIED_REVIEW_REQUIRED.size} instructional pages safely gated`,
)
