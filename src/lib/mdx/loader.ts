import type { ComponentType } from 'react'
import {
  validateFrontmatter,
  type Frontmatter,
} from '#/lib/mdx/frontmatter'

interface MdxModule {
  default: ComponentType
  frontmatter: unknown
}

// @mdx-js/rollup + remark-mdx-frontmatter compile each .mdx file to an ES
// module with `default` (the JSX body) and `frontmatter` (parsed YAML)
// named exports. Eager-bundled so loader + component access is synchronous
// and the Component never crosses a Seroval-serialised loader boundary
// (a React function component is not serialisable).
const moduleByFolder: Record<string, Record<string, MdxModule>> = {
  poses: import.meta.glob('/content/poses/**/*.mdx', { eager: true }) as Record<
    string,
    MdxModule
  >,
  guides: import.meta.glob('/content/guides/**/*.mdx', { eager: true }) as Record<
    string,
    MdxModule
  >,
  styles: import.meta.glob('/content/styles/**/*.mdx', { eager: true }) as Record<
    string,
    MdxModule
  >,
  gear: import.meta.glob('/content/gear/**/*.mdx', { eager: true }) as Record<
    string,
    MdxModule
  >,
  blog: import.meta.glob('/content/blog/**/*.mdx', { eager: true }) as Record<
    string,
    MdxModule
  >,
  reviews: import.meta.glob('/content/reviews/**/*.mdx', { eager: true }) as Record<
    string,
    MdxModule
  >,
}

export interface TocHeading {
  text: string
  id: string
}

// Per-guide H2 outline, extracted from raw MDX at build time and inlined here
// via vite `define` (see vite.config.ts). The compiled MDX module exposes no
// headings export and the MDX plugin intercepts `?raw` imports, so a build-time
// scan is the reliable way to get this — and `define` bakes it into the bundle
// so the route loader can read it both at prerender time and on client-side
// navigation. Ids are slugged with the same slugger rehype-slug uses, so the
// TOC jump-links match the anchors on the rendered <h2> elements.
declare const __GUIDE_HEADINGS__: Record<string, Array<TocHeading>>

export interface LoadedFrontmatter {
  frontmatter: Frontmatter
}

export interface LoadedContent {
  frontmatter: Frontmatter
  Component: ComponentType
}

/**
 * Load and validate just the frontmatter for an MDX page. Use this in
 * route loaders — the result is fully JSON-serialisable for SSR hydration.
 */
export function loadFrontmatter(
  folder: keyof typeof moduleByFolder,
  slugPath: string,
): LoadedFrontmatter {
  const fullPath = `/content/${folder}/${slugPath}.mdx`
  const mod = moduleByFolder[folder]?.[fullPath]
  if (!mod) throw new Error(`MDX not found: ${fullPath}`)
  const frontmatter = validateFrontmatter(mod.frontmatter, fullPath)
  return { frontmatter }
}

/**
 * Load the MDX page including its rendered React component. Use this in
 * route components (NOT in loaders — the Component cannot be serialised).
 */
export function loadContent(
  folder: keyof typeof moduleByFolder,
  slugPath: string,
): LoadedContent {
  const fullPath = `/content/${folder}/${slugPath}.mdx`
  const mod = moduleByFolder[folder]?.[fullPath]
  if (!mod) throw new Error(`MDX not found: ${fullPath}`)
  const frontmatter = validateFrontmatter(mod.frontmatter, fullPath)
  return { frontmatter, Component: mod.default }
}

/**
 * Return the H2 outline for a guide (build-time scanned, inlined via `define`).
 * The TOC is non-essential chrome, so this must NEVER throw — the route loader
 * treats any throw as notFound(), which would 404 the whole guide. On any
 * unexpected shape, degrade to "no TOC".
 */
export function extractGuideHeadings(slugPath: string): Array<TocHeading> {
  try {
    return __GUIDE_HEADINGS__[slugPath] ?? []
  } catch {
    return []
  }
}

export function listContentSlugs(
  folder: keyof typeof moduleByFolder,
): Array<string> {
  const prefix = `/content/${folder}/`
  return Object.keys(moduleByFolder[folder] ?? {})
    .map((p) => p.slice(prefix.length).replace(/\.mdx$/, ''))
    // Skip drafts — mirror scanMdxEntries: any `_drafts/` segment is
    // intentionally out of the live route + index + sitemap surface.
    .filter((slugPath) => !slugPath.split('/').includes('_drafts'))
    .sort()
}
