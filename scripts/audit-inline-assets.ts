import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, relative, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const CONTENT_ROOT = resolve(ROOT, 'content')
const WORDS_PER_ASSET = 600

interface AuditRow {
  file: string
  words: number
  assets: number
  target: number
  missing: number
}

function walk(directory: string): Array<string> {
  return readdirSync(directory).flatMap((name) => {
    const path = resolve(directory, name)
    if (statSync(path).isDirectory()) {
      return name.startsWith('_') ? [] : walk(path)
    }
    return extname(name) === '.mdx' ? [path] : []
  })
}

function bodyFromMdx(raw: string): string {
  const match = raw.match(
    /^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]+([\s\S]*)$/,
  )
  return match?.[1] ?? raw
}

function countWords(body: string): number {
  const withoutCode = body.replace(/```[\s\S]*?```/g, ' ')
  return (
    withoutCode.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0
  )
}

function countAssets(body: string): number {
  const markdownImages = body.match(/!\[[^\]]*\]\([^)]+\)/g)?.length ?? 0
  const markdownTables =
    body.match(/^\|.*\|\r?\n\|\s*:?-{3,}[^\r\n]*\|/gm)?.length ?? 0
  const visualComponents =
    body.match(
      /<(?:Figure|Image|img|DiagramFrame|MatThicknessScale|GripMoistureCurve|CushionStabilitySpectrum)\b/g,
    )?.length ?? 0
  return markdownImages + markdownTables + visualComponents
}

const rows: Array<AuditRow> = walk(CONTENT_ROOT)
  .filter((path) => !path.includes(`${resolve(CONTENT_ROOT, 'authors')}`))
  .map((path) => {
    const body = bodyFromMdx(readFileSync(path, 'utf8'))
    const words = countWords(body)
    const assets = countAssets(body)
    const target = Math.floor(words / WORDS_PER_ASSET)
    return {
      file: relative(CONTENT_ROOT, path).replaceAll('\\', '/'),
      words,
      assets,
      target,
      missing: Math.max(0, target - assets),
    }
  })
  .sort((a, b) => b.missing - a.missing || b.words - a.words)

const short = rows.filter((row) => row.missing > 0)
console.log(
  `Inline asset audit — guideline: about 1 useful asset per ${WORDS_PER_ASSET} words`,
)
console.log(
  `Audited ${rows.length} published content pages; ${short.length} currently below the guideline.\n`,
)
console.log(
  'file'.padEnd(48) +
    'words'.padStart(7) +
    'assets'.padStart(9) +
    'target'.padStart(9) +
    'missing'.padStart(10),
)
console.log('-'.repeat(83))
for (const row of short) {
  console.log(
    row.file.padEnd(48) +
      String(row.words).padStart(7) +
      String(row.assets).padStart(9) +
      String(row.target).padStart(9) +
      String(row.missing).padStart(10),
  )
}

if (short.length === 0)
  console.log('All published pages meet the editorial image-rhythm guideline.')
