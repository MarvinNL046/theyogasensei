import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { scanMdxEntries } from './scan-mdx-slugs'

interface KeywordRow {
  primary_keyword: string
  page_type: 'pillar' | 'subpillar' | 'cluster' | string
  cluster: string
  pillar_slug: string
  volume: number
  kd: number
  intent: string
  secondary_keywords: string
  status: 'todo' | 'briefed' | 'done' | string
  brief_maker: string
  notes: string
  content_format: string
}

interface PublishedRow {
  primary_keyword: string
  slug: string
  page_type: string
  cluster: string
  pillar: string
  published: string
  last_reviewed: string
}

const STALE_DAYS: Record<string, number> = {
  pillar: 90,
  subpillar: 45,
  cluster: 365,
}

const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
}

function parseCsvLine(line: string): Array<string> {
  const out: Array<string> = []
  let cur = ''
  let inQuotes = false
  for (const ch of line) {
    if (ch === '"') {
      inQuotes = !inQuotes
      continue
    }
    if (ch === ',' && !inQuotes) {
      out.push(cur)
      cur = ''
      continue
    }
    cur += ch
  }
  out.push(cur)
  return out
}

function serializeCsvCell(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function readKeywordsCsv(path: string): {
  header: Array<string>
  rows: Array<KeywordRow>
} {
  const raw = readFileSync(path, 'utf8')
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length === 0) throw new Error('keywords.csv is empty')

  const header = parseCsvLine(lines[0]!)
  const rows: Array<KeywordRow> = []
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCsvLine(lines[i]!)
    const obj: Record<string, string> = {}
    header.forEach((h, idx) => {
      obj[h] = cells[idx] ?? ''
    })
    rows.push({
      primary_keyword: obj.primary_keyword ?? '',
      page_type: obj.page_type ?? '',
      cluster: obj.cluster ?? '',
      pillar_slug: obj.pillar_slug ?? '',
      volume: Number(obj.volume ?? 0),
      kd: Number(obj.kd ?? 0),
      intent: obj.intent ?? '',
      secondary_keywords: obj.secondary_keywords ?? '',
      // Row.status is deliberately widened to string: the CSV also carries
      // 'merged' for keywords folded into another page.
      status: obj.status ?? 'todo',
      brief_maker: obj.brief_maker ?? '',
      notes: obj.notes ?? '',
      content_format: obj.content_format ?? '',
    })
  }
  return { header, rows }
}

function writeKeywordsCsv(
  path: string,
  header: Array<string>,
  rows: Array<KeywordRow>,
): void {
  const lines = [header.join(',')]
  for (const r of rows) {
    const cells = header.map((h) => {
      const v = (r as unknown as Record<string, unknown>)[h]
      return serializeCsvCell(String(v ?? ''))
    })
    lines.push(cells.join(','))
  }
  writeFileSync(path, lines.join('\n') + '\n', 'utf8')
}

function parseUsedKeywordsMd(path: string): Array<PublishedRow> {
  const raw = readFileSync(path, 'utf8')
  const lines = raw.split(/\r?\n/)
  const rows: Array<PublishedRow> = []
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
    if (cells.length < 7) continue
    if (cells[0] === 'Primary keyword') continue
    if (/^-+$/.test(cells[0] ?? '')) continue
    if ((cells[0] ?? '').startsWith('_(empty')) continue
    rows.push({
      primary_keyword: cells[0]!,
      slug: cells[1]!,
      page_type: cells[2]!,
      cluster: cells[3]!,
      pillar: cells[4]!,
      published: cells[5]!,
      last_reviewed: cells[6]!,
    })
  }
  return rows
}

function daysSince(isoDate: string): number {
  if (!isoDate) return -1
  const then = new Date(isoDate).getTime()
  const now = Date.now()
  if (isNaN(then)) return -1
  return Math.floor((now - then) / (1000 * 60 * 60 * 24))
}

function slugFromKeyword(kw: string): string {
  return kw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function pad(s: string, n: number): string {
  if (s.length >= n) return s.slice(0, n)
  return s + ' '.repeat(n - s.length)
}

function main() {
  const root = process.cwd()
  const keywordsPath = join(root, 'keywords.csv')
  const usedPath = join(root, 'used-keywords.md')

  const { header, rows: kwRows } = readKeywordsCsv(keywordsPath)
  const publishedRows = parseUsedKeywordsMd(usedPath)
  const publishedSlugs = new Set(publishedRows.map((p) => p.slug))
  const publishedByKeyword = new Map(
    publishedRows.map((p) => [p.primary_keyword.toLowerCase(), p]),
  )

  // Auto-sync published pages from used-keywords.md without erasing brief-stage work.
  let syncedCount = 0
  for (const r of kwRows) {
    const derivedSlug = slugFromKeyword(r.primary_keyword)
    const matchedBySlug = publishedSlugs.has(derivedSlug)
    const matchedByKeyword = publishedByKeyword.has(
      r.primary_keyword.toLowerCase(),
    )
    const isPublished = matchedBySlug || matchedByKeyword
    const desired = isPublished ? 'done' : r.status === 'done' ? 'todo' : r.status
    if (r.status !== desired) {
      r.status = desired
      syncedCount++
    }
  }
  if (syncedCount > 0) {
    writeKeywordsCsv(keywordsPath, header, kwRows)
  }

  // Group by pillar
  const byPillar = new Map<
    string,
    { pillar?: KeywordRow; subpillars: Array<KeywordRow>; clusters: Array<KeywordRow> }
  >()
  for (const r of kwRows) {
    const key = r.pillar_slug
    if (!byPillar.has(key)) {
      byPillar.set(key, { pillar: undefined, subpillars: [], clusters: [] })
    }
    const bucket = byPillar.get(key)!
    if (r.page_type === 'pillar') bucket.pillar = r
    else if (r.page_type === 'subpillar') bucket.subpillars.push(r)
    else bucket.clusters.push(r)
  }

  // Scan filesystem entries — used below for stale-page detection.
  const fsEntries = scanMdxEntries().filter((e) => e.type !== 'author')

  // TODO(content-ops): Stale-page detection — orphan/missing-MDX diff
  // Diff fsEntries against rows (clusters.csv) to also surface:
  //   - MDX files NOT registered in clusters.csv (orphan content)
  //   - CSV entries with NO matching MDX file (planned-but-not-written)
  // Wire into pnpm content:status report.
  // const fsBySlug = new Map(fsEntries.map((e) => [e.slug, e]))

  // ── Header ─────────────────────────────────────
  console.log('')
  console.log(
    `${COLORS.bold}${COLORS.cyan}📊 Cluster health${COLORS.reset}  ${COLORS.dim}(${new Date().toISOString().slice(0, 10)})${COLORS.reset}`,
  )
  console.log(COLORS.dim + '━'.repeat(72) + COLORS.reset)

  for (const [pillarSlug, bucket] of byPillar) {
    const all = [
      ...(bucket.pillar ? [bucket.pillar] : []),
      ...bucket.subpillars,
      ...bucket.clusters,
    ]
    const done = all.filter((r) => r.status === 'done').length
    const total = all.length
    const subDone = bucket.subpillars.filter((r) => r.status === 'done').length
    const clDone = bucket.clusters.filter((r) => r.status === 'done').length
    const pillarDone = bucket.pillar?.status === 'done' ? 1 : 0

    console.log('')
    console.log(
      `${COLORS.bold}PILLAR:${COLORS.reset} ${pillarSlug}  ${COLORS.dim}[${pillarDone}/1 pillar · ${subDone}/${bucket.subpillars.length} subpillar · ${clDone}/${bucket.clusters.length} cluster · ${done}/${total} total]${COLORS.reset}`,
    )
    for (const r of all) {
      const mark =
        r.status === 'done'
          ? `${COLORS.green}✓${COLORS.reset}`
          : r.status === 'briefed'
            ? `${COLORS.yellow}◐${COLORS.reset}`
            : `${COLORS.dim}─${COLORS.reset}`
      const typeColor =
        r.page_type === 'pillar' ? COLORS.cyan : r.page_type === 'subpillar' ? COLORS.yellow : ''
      const score = r.kd > 0 ? Math.round(r.volume / r.kd) : 0
      const tail =
        r.status === 'done'
          ? `${COLORS.dim}published${COLORS.reset}`
          : r.status === 'briefed'
            ? `${COLORS.dim}briefed · kd:${r.kd} vol:${r.volume.toLocaleString()} · score:${score}${COLORS.reset}`
            : `${COLORS.dim}TODO · kd:${r.kd} vol:${r.volume.toLocaleString()} · score:${score}${COLORS.reset}`
      console.log(
        `  ${mark} ${pad(r.primary_keyword, 36)} ${typeColor}${pad(r.page_type, 10)}${COLORS.reset} ${tail}`,
      )
    }
  }

  // ── Stale pages ─────────────────────────────────
  console.log('')
  console.log(COLORS.dim + '━'.repeat(72) + COLORS.reset)
  console.log(`${COLORS.bold}📅 Stale pages${COLORS.reset}`)
  const stale: Array<{ slug: string; type: string; daysOld: number; max: number }> = []
  for (const e of fsEntries) {
    const max = STALE_DAYS[e.type] ?? 365
    const days = e.lastReviewedAt ? daysSince(e.lastReviewedAt) : -1
    if (days > max) stale.push({ slug: e.slug, type: e.type, daysOld: days, max })
  }
  if (stale.length === 0) {
    console.log(`  ${COLORS.green}none — all pages within freshness window${COLORS.reset}`)
  } else {
    for (const s of stale) {
      console.log(
        `  ${COLORS.red}!${COLORS.reset} ${pad(s.slug, 36)} ${pad(s.type, 10)} ${COLORS.red}${s.daysOld}d old (max ${s.max}d)${COLORS.reset}`,
      )
    }
  }

  // ── Cluster discipline ──────────────────────────
  console.log('')
  console.log(COLORS.dim + '━'.repeat(72) + COLORS.reset)
  console.log(`${COLORS.bold}🎯 Cluster discipline${COLORS.reset}`)
  const pillarsOpened = [...byPillar.values()].filter((b) => b.pillar?.status === 'done').length
  const pillarsPlanned = byPillar.size
  console.log(`  Pillars opened:  ${pillarsOpened}/${pillarsPlanned}`)
  for (const [pillarSlug, bucket] of byPillar) {
    if (!bucket.pillar || bucket.pillar.status !== 'done') continue
    const clustersPublished = bucket.clusters.filter((r) => r.status === 'done').length
    const targetRatio = 10
    const indicator =
      clustersPublished >= targetRatio
        ? `${COLORS.green}OK${COLORS.reset}`
        : `${COLORS.yellow}need ${targetRatio - clustersPublished} more before opening next pillar${COLORS.reset}`
    console.log(`  ${pillarSlug}: ${clustersPublished} clusters published — ${indicator}`)
  }

  // ── Next to write ───────────────────────────────
  console.log('')
  console.log(COLORS.dim + '━'.repeat(72) + COLORS.reset)
  console.log(`${COLORS.bold}🚀 Next 3 to write${COLORS.reset}  ${COLORS.dim}(highest score = volume/kd, easy wins)${COLORS.reset}`)
  const todoSorted = kwRows
    .filter((r) => r.status === 'todo')
    .map((r) => ({ ...r, score: r.kd > 0 ? r.volume / r.kd : 0 }))
    .sort((a, b) => b.score - a.score)
  if (todoSorted.length === 0) {
    console.log(`  ${COLORS.green}all caught up — add more rows to keywords.csv${COLORS.reset}`)
  } else {
    for (let i = 0; i < Math.min(3, todoSorted.length); i++) {
      const r = todoSorted[i]!
      console.log(
        `  ${i + 1}. ${pad(r.primary_keyword, 36)} ${pad(r.page_type, 10)} ${COLORS.dim}score:${Math.round(r.score)} kd:${r.kd} vol:${r.volume.toLocaleString()}${COLORS.reset}`,
      )
    }
  }

  // ── Sync footer ─────────────────────────────────
  console.log('')
  console.log(COLORS.dim + '━'.repeat(72) + COLORS.reset)
  if (syncedCount > 0) {
    console.log(
      `${COLORS.green}✓${COLORS.reset} synced ${syncedCount} keywords.csv row(s) from used-keywords.md`,
    )
  } else {
    console.log(`${COLORS.dim}keywords.csv already in sync with used-keywords.md${COLORS.reset}`)
  }
  console.log('')
}

main()
