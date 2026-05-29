import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import GithubSlugger from 'github-slugger'

export interface TocHeading {
  text: string
  id: string
}

const GUIDES_DIR = join(process.cwd(), 'content', 'guides')

/** Strip inline markdown so the TOC label matches the rendered heading text. */
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1') // italic
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → label
    .trim()
}

/**
 * Extract the H2 outline from raw MDX source. Headings are slugged through a
 * single GithubSlugger pass over ALL heading levels (h2–h6) in document order,
 * exactly mirroring rehype-slug, so the returned `id`s match the anchors
 * rendered on the page. Returns level-2 headings only.
 */
export function extractHeadingsFromSource(raw: string): Array<TocHeading> {
  const body = raw
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '') // drop frontmatter
    .replace(/```[\s\S]*?```/g, '') // drop fenced code blocks

  const slugger = new GithubSlugger()
  const headings: Array<TocHeading> = []
  const headingPattern = /^(#{2,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/gm
  for (const match of body.matchAll(headingPattern)) {
    const level = match[1].length
    const text = stripInlineMarkdown(match[2])
    const id = slugger.slug(text) // advance slugger state for every heading
    if (level === 2 && text) headings.push({ text, id })
  }
  return headings
}

/**
 * Build-time only. Reads every guide MDX and returns a slug → H2-outline map.
 * Inlined into the bundle via vite `define` so the route loader can read it at
 * both prerender time and during client-side navigation (the compiled MDX
 * module exposes no headings export, and the MDX plugin intercepts `?raw`
 * imports — so a build-time scan is the reliable path).
 */
export function buildGuideHeadingsMap(): Record<string, Array<TocHeading>> {
  const map: Record<string, Array<TocHeading>> = {}
  let files: Array<string>
  try {
    files = readdirSync(GUIDES_DIR)
  } catch {
    return map
  }
  for (const file of files) {
    if (!file.endsWith('.mdx')) continue
    const slug = file.replace(/\.mdx$/, '')
    try {
      const raw = readFileSync(join(GUIDES_DIR, file), 'utf8')
      map[slug] = extractHeadingsFromSource(raw)
    } catch {
      // skip unreadable file — guide just renders without a TOC
    }
  }
  return map
}
