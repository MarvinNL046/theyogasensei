import { readFileSync } from 'node:fs'
import matter from 'gray-matter'
import { validateFrontmatter } from '../src/lib/mdx/frontmatter'
import { scanMdxEntries } from './scan-mdx-slugs'

const PASS = '✓'
const FAIL = '✗'

function main() {
  const entries = scanMdxEntries()

  if (entries.length === 0) {
    console.log('[verify-frontmatter] no MDX files yet — skipping')
    return
  }

  const failures: Array<{ file: string; message: string }> = []

  for (const entry of entries) {
    if (entry.type === 'author') {
      // Authors have their own Person-style frontmatter, validated separately.
      continue
    }
    const raw = readFileSync(entry.filePath, 'utf8')
    const parsed = matter(raw)
    try {
      validateFrontmatter(parsed.data, entry.contentPath)
      console.log(`${PASS} ${entry.contentPath}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      failures.push({ file: entry.contentPath, message })
      console.log(`${FAIL} ${entry.contentPath}`)
    }
  }

  if (failures.length > 0) {
    console.error('\nFrontmatter validation FAILED for:')
    for (const f of failures) {
      console.error(`\n${f.file}:\n${f.message}`)
    }
    process.exit(1)
  }

  console.log(
    `\n[verify-frontmatter] ${entries.length} file(s) validated, 0 failures`,
  )
}

main()
