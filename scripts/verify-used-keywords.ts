import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { scanMdxEntries } from './scan-mdx-slugs'

const PASS = '✓'
const FAIL = '✗'

function parseLoggedSlugs(usedKeywordsMd: string): Set<string> {
  // The "Log" section is a markdown table with header
  //   | Primary keyword | Slug | Page type | Cluster | Pillar | Published | Last reviewed |
  // We extract column 2 (Slug) from every non-header, non-separator row.
  const slugs = new Set<string>()
  const lines = usedKeywordsMd.split(/\r?\n/)
  let inLog = false

  for (const line of lines) {
    if (line.trim() === '## Log') {
      inLog = true
      continue
    }
    if (line.startsWith('## ') && inLog) break
    if (!inLog) continue
    if (!line.startsWith('|')) continue

    const cells = line
      .split('|')
      .map((c) => c.trim())
      .filter((_, i, arr) => i > 0 && i < arr.length - 1)

    if (cells.length < 2) continue
    if (cells[0] === 'Primary keyword') continue // header
    if (/^-+$/.test(cells[0] ?? '')) continue // separator row
    if ((cells[0] ?? '').startsWith('_(empty')) continue // placeholder

    const slug = cells[1] ?? ''
    if (slug) slugs.add(slug)
  }

  return slugs
}

function main() {
  const entries = scanMdxEntries().filter((e) => e.type !== 'author')

  if (entries.length === 0) {
    console.log('[verify-used-keywords] no content MDX files yet — skipping')
    return
  }

  const usedKeywordsPath = join(process.cwd(), 'used-keywords.md')
  let usedKeywordsContent: string
  try {
    usedKeywordsContent = readFileSync(usedKeywordsPath, 'utf8')
  } catch {
    console.error(
      `[verify-used-keywords] FAIL — used-keywords.md not found at ${usedKeywordsPath}`,
    )
    process.exit(1)
  }

  const loggedSlugs = parseLoggedSlugs(usedKeywordsContent)
  const failures: Array<string> = []

  for (const entry of entries) {
    if (loggedSlugs.has(entry.slug)) {
      console.log(`${PASS} ${entry.slug}  (${entry.contentPath})`)
    } else {
      console.log(`${FAIL} ${entry.slug}  (${entry.contentPath})`)
      failures.push(entry.slug)
    }
  }

  if (failures.length > 0) {
    console.error(
      '\n[verify-used-keywords] Missing rows in used-keywords.md for:\n' +
        failures.map((s) => `  - ${s}`).join('\n') +
        '\n\nAppend a row per page before merging. See used-keywords.md → "Workflow".',
    )
    process.exit(1)
  }

  console.log(
    `\n[verify-used-keywords] ${entries.length} page(s) all logged, 0 missing`,
  )
}

main()
