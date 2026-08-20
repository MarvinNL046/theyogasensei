/**
 * Keyword-cannibalisation checker.
 *
 * Goes beyond exact-duplicate primaries: it catches the *silent* collisions that
 * only surface in Search Console months later —
 *   1. exact duplicate primary keywords (keywords.csv + used-keywords.md)
 *   2. a primary keyword that already appears as a SECONDARY on another page
 *   3. comparison collisions, including reversed order ("A vs B" == "B vs A",
 *      "best A or B" == "B vs A")
 *   4. "best X" competing with "X" (same core, different intent label)
 *   5. near-duplicate primaries by token-set overlap
 *      ("best hot yoga mat" ~ "best mat for hot yoga" ~ "best yoga mat for hot yoga")
 *
 * Run:  npx tsx scripts/check-cannibalization.ts        (or: pnpm content:cannibalization)
 * Exit: 1 if any HARD collision (1–4) is found; 0 otherwise. Near-dups (5) are
 *       warnings and never fail the build on their own. Pass --strict to also
 *       fail on near-duplicates.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const STRICT = process.argv.includes('--strict')

// ---------- normalisation ----------

const STOPWORDS = new Set([
  'a', 'an', 'the', 'to', 'of', 'for', 'your', 'you', 'with', 'and', 'in', 'on',
  'at', 'is', 'are', 'do', 'does', 'how', 'what', 'when', 'should', 'can', 'vs',
  'versus', 'or', 'best', 'top', 'guide', 'complete', 'review', 'reviews',
])

/** Naive singulariser — enough for keyword tokens (mats→mat, poses→pose). */
function singular(w: string): string {
  if (w.length <= 3) return w
  if (w.endsWith('ies')) return w.slice(0, -3) + 'y'
  if (/(ses|xes|zes|ches|shes)$/.test(w)) return w.slice(0, -2)
  if (w.endsWith('ss')) return w
  if (w.endsWith('s')) return w.slice(0, -1)
  return w
}

/** Tokens with stopwords removed + singularised, for set comparison. */
function tokenSet(kw: string): Set<string> {
  return new Set(
    kw
      .toLowerCase()
      .replace(/&/g, ' and ')
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .map(singular)
      .filter((t) => !STOPWORDS.has(t)),
  )
}

/** Stable string key for an unordered token set. */
const setKey = (s: Set<string>) => [...s].sort().join(' ')

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0
  let inter = 0
  for (const t of a) if (b.has(t)) inter++
  return inter / (a.size + b.size - inter)
}

// ---------- parsing ----------

/** Parse one CSV line respecting double-quoted fields that contain commas. */
function parseCsvLine(line: string): string[] {
  const out: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++ } else inQuotes = !inQuotes
    } else if (c === ',' && !inQuotes) {
      out.push(cur); cur = ''
    } else cur += c
  }
  out.push(cur)
  return out.map((s) => s.trim())
}

interface Row {
  primary: string
  secondary: string[]
  source: string // where it came from, for the report
}

function loadKeywordsCsv(): Row[] {
  const txt = readFileSync(resolve(ROOT, 'keywords.csv'), 'utf8')
  const lines = txt.split(/\r?\n/).filter((l) => l.trim())
  const header = parseCsvLine(lines[0] ?? '')
  const iPrimary = header.indexOf('primary_keyword')
  const iSecondary = header.indexOf('secondary_keywords')
  const rows: Row[] = []
  for (let i = 1; i < lines.length; i++) {
    const f = parseCsvLine(lines[i] ?? '')
    const primary = f[iPrimary]?.toLowerCase().trim()
    if (!primary) continue
    const secondary = (f[iSecondary] ?? '')
      .split(',')
      .map((s) => s.toLowerCase().trim())
      .filter(Boolean)
    rows.push({ primary, secondary, source: 'keywords.csv' })
  }
  return rows
}

function loadUsedKeywords(): Row[] {
  const txt = readFileSync(resolve(ROOT, 'used-keywords.md'), 'utf8')
  const rows: Row[] = []
  for (const line of txt.split(/\r?\n/)) {
    if (!line.startsWith('|')) continue
    const cells = line.split('|').map((c) => c.trim())
    // | <pad> | Primary | Slug | ... |  -> cells[1] = primary
    const primary = cells[1]?.toLowerCase()
    if (!primary || primary === 'primary keyword' || /^-+$/.test(primary)) continue
    rows.push({ primary, secondary: [], source: 'used-keywords.md' })
  }
  return rows
}

// ---------- comparison detection ----------

/** If kw is a comparison, return the two normalised sides; else null. */
function comparisonPair(kw: string): [Set<string>, Set<string>] | null {
  const k = kw.toLowerCase()
  let m = k.match(/^(.*?)\s+(?:vs\.?|versus)\s+(.*)$/)
  if (!m) m = k.match(/^best\s+(.*?)\s+or\s+(.*)$/)
  if (!m) m = k.match(/^(.*?)\s+or\s+(.*)$/) // generic "A or B"
  if (!m) return null
  const a = tokenSet(m[1] ?? '')
  const b = tokenSet(m[2] ?? '')
  if (!a.size || !b.size) return null
  return [a, b]
}

// ---------- checks ----------

const hard: string[] = []
const warn: string[] = []

const csv = loadKeywordsCsv()
const used = loadUsedKeywords()

// 1. exact duplicate primaries — only WITHIN the same file. A keyword living in
// both keywords.csv (backlog, status=done) and used-keywords.md (published) is
// the normal lifecycle of one page, not a collision.
function dupsWithin(rows: Row[], label: string) {
  const counts = new Map<string, number>()
  for (const r of rows) counts.set(r.primary, (counts.get(r.primary) ?? 0) + 1)
  for (const [primary, c] of counts) {
    if (c > 1) hard.push(`EXACT DUPLICATE primary "${primary}" — ${c}× within ${label} (two pages competing for one keyword)`)
  }
}
dupsWithin(csv, 'keywords.csv')
dupsWithin(used, 'used-keywords.md')

// 2. primary already a secondary elsewhere
const secondaryIndex = new Map<string, string>() // secondary -> owning primary
for (const r of csv) for (const s of r.secondary) if (!secondaryIndex.has(s)) secondaryIndex.set(s, r.primary)
for (const r of csv) {
  const owner = secondaryIndex.get(r.primary)
  if (owner && owner !== r.primary) {
    hard.push(`PRIMARY-AS-SECONDARY "${r.primary}" is already a secondary keyword on "${owner}" — split the ranking signal`)
  }
}

// 3. comparison collisions (incl. reversed)
const compMap = new Map<string, string[]>()
for (const r of csv) {
  const pair = comparisonPair(r.primary)
  if (!pair) continue
  const key = [setKey(pair[0]), setKey(pair[1])].sort().join(' ::vs:: ')
  const arr = compMap.get(key) ?? []
  arr.push(r.primary)
  compMap.set(key, arr)
}
for (const [, prims] of compMap) {
  if (prims.length > 1) {
    hard.push(`COMPARISON COLLISION (same pair, maybe reversed): ${prims.map((p) => `"${p}"`).join(' ⇄ ')}`)
  }
}

// 4. "best X" competing with "X" (same core token set)
const coreMap = new Map<string, { primary: string; hadBest: boolean }[]>()
for (const r of csv) {
  if (comparisonPair(r.primary)) continue // comparisons handled above
  const hadBest = /^(best|top)\b/.test(r.primary)
  const core = setKey(tokenSet(r.primary)) // tokenSet already drops best/top
  const arr = coreMap.get(core) ?? []
  arr.push({ primary: r.primary, hadBest })
  coreMap.set(core, arr)
}
for (const [, items] of coreMap) {
  const uniq = [...new Set(items.map((i) => i.primary))]
  if (uniq.length > 1 && items.some((i) => i.hadBest) && items.some((i) => !i.hadBest)) {
    hard.push(`"BEST X" vs "X" overlap (same core): ${uniq.map((p) => `"${p}"`).join(' ⇄ ')}`)
  }
}

// 5. near-duplicate primaries (token-set Jaccard)
const prims = [...new Set(csv.map((r) => r.primary))]
const sets = prims.map((p) => tokenSet(p))
const NEAR = 0.8
const seenPairs = new Set<string>()
for (let i = 0; i < prims.length; i++) {
  for (let j = i + 1; j < prims.length; j++) {
    const left = sets[i]
    const right = sets[j]
    if (!left || !right) continue
    const sim = jaccard(left, right)
    if (sim >= NEAR && setKey(left) !== setKey(right)) {
      const k = [prims[i], prims[j]].sort().join('|')
      if (seenPairs.has(k)) continue
      seenPairs.add(k)
      warn.push(`NEAR-DUPLICATE (${(sim * 100).toFixed(0)}%): "${prims[i]}" ~ "${prims[j]}"`)
    }
  }
}

// ---------- report ----------

console.log(`Cannibalisation check — ${csv.length} keywords.csv rows, ${used.length} used-keywords rows\n`)

if (hard.length) {
  console.log(`❌ HARD collisions (${hard.length}):`)
  for (const h of hard) console.log('  • ' + h)
  console.log('')
}
if (warn.length) {
  console.log(`⚠️  Near-duplicates to review (${warn.length}):`)
  for (const w of warn) console.log('  • ' + w)
  console.log('')
}
if (!hard.length && !warn.length) console.log('✅ No collisions found.')

const fail = hard.length > 0 || (STRICT && warn.length > 0)
process.exit(fail ? 1 : 0)
