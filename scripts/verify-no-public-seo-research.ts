import fs from 'node:fs'
import path from 'node:path'

const contentDir = path.resolve('content')
const forbidden = [
  { label: 'DataForSEO/DFS provider name', pattern: /\b(?:DataForSEO|DFS)\b/i },
  { label: 'keyword difficulty/KD metric', pattern: /keyword difficulty|\bKD\s*\d/i },
  { label: 'search-volume metric', pattern: /monthly (?:US )?search(?:es)?|searches (?:per month|monthly)|search volume/i },
  { label: 'SERP research log', pattern: /(?:live|organic) (?:Google )?SERP|live (?:organic |commercial )?results/i },
  { label: 'search-intent research log', pattern: /(?:US )?search (?:intent|demand).{0,30}(?:checked|reviewed)|(?:checked|reviewed).{0,30}(?:US )?search intent/i },
]

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return entry.name === '_drafts' ? [] : walk(fullPath)
    return entry.name.endsWith('.mdx') ? [fullPath] : []
  })
}

const failures: string[] = []

for (const filePath of walk(contentDir)) {
  const source = fs.readFileSync(filePath, 'utf8')
  const frontmatterEnd = source.indexOf('\n---', 4)
  const body = frontmatterEnd === -1 ? source : source.slice(frontmatterEnd + 4)

  for (const rule of forbidden) {
    const match = body.match(rule.pattern)
    if (match) {
      const line = body.slice(0, match.index).split(/\r?\n/).length
      failures.push(`${path.relative(process.cwd(), filePath)}:${line} — ${rule.label}`)
    }
  }
}

if (failures.length > 0) {
  console.error('Public content contains internal SEO research language:')
  for (const failure of failures) console.error(`- ${failure}`)
  console.error('Keep provider names, volumes, difficulty metrics and SERP notes in internal research files only.')
  process.exit(1)
}

console.log('Public SEO research-language check passed.')
