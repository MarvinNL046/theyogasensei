import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const ROOT = process.cwd()
const OUTPUT = join(ROOT, '.output', 'public')

if (!existsSync(OUTPUT)) {
  throw new Error('Missing .output/public. Run the production build first.')
}

function walk(dir: string): Array<string> {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  })
}

function routeFor(file: string): string {
  const rel = relative(OUTPUT, file).split(sep).join('/')
  if (rel === 'index.html') return '/'
  return `/${rel.replace(/\/index\.html$/, '')}`
}

function decodeAttribute(value: string): string {
  return value.replace(/&amp;/g, '&').replace(/&#x27;/g, "'")
}

const htmlFiles = walk(OUTPUT).filter((file) => file.endsWith('index.html'))
const routes = new Set(htmlFiles.map(routeFor))
const issues: Array<string> = []
let internalLinks = 0
let localImages = 0
let schemaBlocks = 0

for (const file of htmlFiles) {
  const route = routeFor(file)
  const html = readFileSync(file, 'utf8')
  const h1Count = (html.match(/<h1\b/g) ?? []).length
  if (h1Count !== 1) issues.push(`${route}: expected one H1, found ${h1Count}`)

  const canonicalMatches = [
    ...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g),
  ]
  const exemptCanonical = ['/confirm', '/unsubscribe'].includes(route)
  if (!exemptCanonical && canonicalMatches.length !== 1) {
    issues.push(
      `${route}: expected one canonical, found ${canonicalMatches.length}`,
    )
  }

  for (const match of html.matchAll(
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    schemaBlocks += 1
    try {
      JSON.parse(match[1])
    } catch {
      issues.push(`${route}: invalid JSON-LD`)
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = decodeAttribute(match[1])
    if (!href.startsWith('/') || href.startsWith('//')) continue
    if (href.startsWith('/go/') || href.startsWith('/assets/')) continue
    internalLinks += 1
    const target = href.split(/[?#]/)[0]?.replace(/\/$/, '') || '/'
    if (!routes.has(target) && !existsSync(join(OUTPUT, target.slice(1)))) {
      issues.push(`${route}: internal link target missing: ${href}`)
    }
  }

  for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const src = decodeAttribute(match[1])
    if (!src.startsWith('/') || src.startsWith('//')) continue
    localImages += 1
    const imagePath = src.split(/[?#]/)[0] ?? src
    if (!existsSync(join(OUTPUT, imagePath.slice(1)))) {
      issues.push(`${route}: local image missing: ${src}`)
    }
  }

  if (route.startsWith('/reviews/') && />\s*[0-5]\.[0-9]\s*</.test(html)) {
    issues.push(`${route}: visible decimal rating remains in a review template`)
  }
}

const uniqueIssues = [...new Set(issues)]
if (uniqueIssues.length > 0) {
  console.error(`[audit-production-output] ${uniqueIssues.length} issue(s)`)
  for (const issue of uniqueIssues) console.error(`- ${issue}`)
  process.exitCode = 1
} else {
  console.log(
    `[audit-production-output] ${htmlFiles.length} pages, ${internalLinks} internal links, ${localImages} local images and ${schemaBlocks} JSON-LD blocks validated`,
  )
}
