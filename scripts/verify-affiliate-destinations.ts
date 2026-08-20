import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { affiliateLinks } from '../src/lib/affiliate-links'

const AMAZON_ASIN_PATH = /^\/dp\/([A-Z0-9]{10})\/?$/
const failures: string[] = []
const seenAsins = new Map<string, string>()

for (const [slug, rawUrl] of Object.entries(affiliateLinks)) {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    failures.push(`${slug}: invalid URL`)
    continue
  }

  if (!isAmazonHost(url.hostname)) continue

  const match = url.pathname.match(AMAZON_ASIN_PATH)
  if (!match) {
    failures.push(`${slug}: Amazon target must use the exact /dp/ASIN format, found ${url.pathname}`)
    continue
  }
  if (url.search || url.hash) {
    failures.push(`${slug}: registry targets must not freeze tags, search parameters or fragments`)
  }

  const asin = match[1] ?? ''
  const duplicate = seenAsins.get(asin)
  if (duplicate && duplicate !== slug) {
    failures.push(`${slug}: ASIN ${asin} is already registered as ${duplicate}`)
  }
  seenAsins.set(asin, slug)
}

const filesToScan = [resolve('content')]

for (const root of filesToScan) {
  const output = readFileTree(root)
  for (const { path, source } of output) {
    for (const match of source.matchAll(/\/go\/([a-z0-9-]+)/g)) {
      const referenced = match[1] ?? ''
      if (!affiliateLinks[referenced])
        failures.push(`${path}: unknown /go/ slug ${referenced}`)
    }
  }
}

if (failures.length) {
  console.error(`Affiliate destination verification failed:\n- ${[...new Set(failures)].join('\n- ')}`)
  process.exit(1)
}

console.log(
  `[verify-affiliate-destinations] ${Object.keys(affiliateLinks).length} registered destinations use stable, unique direct product links`,
)

function isAmazonHost(hostname: string): boolean {
  const host = hostname.toLowerCase()
  return host === 'amazon.com' || host.startsWith('amazon.') || host.includes('.amazon.')
}

function readFileTree(root: string): Array<{ path: string; source: string }> {
  const result: Array<{ path: string; source: string }> = []
  for (const entry of readdirSync(root)) {
    const path = resolve(root, entry)
    const stat = statSync(path)
    if (stat.isDirectory()) {
      if (entry === '_drafts' || entry === 'design-references') continue
      result.push(...readFileTree(path))
    } else if (/\.(?:ts|tsx|mdx)$/.test(entry)) {
      result.push({ path, source: readFileSync(path, 'utf8') })
    }
  }
  return result
}
