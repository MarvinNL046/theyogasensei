import { lazy } from 'react'
import type { ComponentType } from 'react'
import { validateFrontmatter } from '#/lib/mdx/frontmatter'
import type { Frontmatter } from '#/lib/mdx/frontmatter'

// Compiled MDX bodies accept an optional `components` prop to override how
// intrinsic elements (e.g. `a`) render. `mdx/types` isn't installed, so the
// prop is typed loosely here; the concrete map is `contentMdxComponents`.
export type MdxContentComponent = ComponentType<{ components?: unknown }>

type ContentFolder = 'poses' | 'guides' | 'styles' | 'gear' | 'blog' | 'reviews'
type ContentImporter = () => Promise<{ default: MdxContentComponent }>

// Keep the small frontmatter exports synchronous for route loaders and head
// generation, but split every MDX body into its own lazy chunk. Previously the
// eager module map shipped all article bodies in one multi-megabyte client
// loader even when a visitor opened only one page.
const frontmatterByFolder: Record<ContentFolder, Record<string, unknown>> = {
  poses: import.meta.glob('/content/poses/**/*.mdx', {
    eager: true,
    import: 'frontmatter',
  }),
  guides: import.meta.glob('/content/guides/**/*.mdx', {
    eager: true,
    import: 'frontmatter',
  }),
  styles: import.meta.glob('/content/styles/**/*.mdx', {
    eager: true,
    import: 'frontmatter',
  }),
  gear: import.meta.glob('/content/gear/**/*.mdx', {
    eager: true,
    import: 'frontmatter',
  }),
  blog: import.meta.glob('/content/blog/**/*.mdx', {
    eager: true,
    import: 'frontmatter',
  }),
  reviews: import.meta.glob('/content/reviews/**/*.mdx', {
    eager: true,
    import: 'frontmatter',
  }),
}

const contentImporterByFolder: Record<
  ContentFolder,
  Partial<Record<string, ContentImporter>>
> = {
  poses: import.meta.glob('/content/poses/**/*.mdx') as Record<
    string,
    ContentImporter
  >,
  guides: import.meta.glob('/content/guides/**/*.mdx') as Record<
    string,
    ContentImporter
  >,
  styles: import.meta.glob('/content/styles/**/*.mdx') as Record<
    string,
    ContentImporter
  >,
  gear: import.meta.glob('/content/gear/**/*.mdx') as Record<
    string,
    ContentImporter
  >,
  blog: import.meta.glob('/content/blog/**/*.mdx') as Record<
    string,
    ContentImporter
  >,
  reviews: import.meta.glob('/content/reviews/**/*.mdx') as Record<
    string,
    ContentImporter
  >,
}

const lazyContentByPath = new Map<string, MdxContentComponent>()

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
  Component: MdxContentComponent
}

/**
 * Load and validate just the frontmatter for an MDX page. Use this in
 * route loaders — the result is fully JSON-serialisable for SSR hydration.
 */
export function loadFrontmatter(
  folder: ContentFolder,
  slugPath: string,
): LoadedFrontmatter {
  const fullPath = `/content/${folder}/${slugPath}.mdx`
  const rawFrontmatter = frontmatterByFolder[folder][fullPath]
  if (rawFrontmatter === undefined)
    throw new Error(`MDX not found: ${fullPath}`)
  const frontmatter = validateFrontmatter(rawFrontmatter, fullPath)
  return { frontmatter }
}

/**
 * Load the MDX page including its rendered React component. Use this in
 * route components (NOT in loaders — the Component cannot be serialised).
 */
export function loadContent(
  folder: ContentFolder,
  slugPath: string,
): LoadedContent {
  const fullPath = `/content/${folder}/${slugPath}.mdx`
  const rawFrontmatter = frontmatterByFolder[folder][fullPath]
  const importer = contentImporterByFolder[folder][fullPath]
  if (rawFrontmatter === undefined || importer === undefined)
    throw new Error(`MDX not found: ${fullPath}`)
  const frontmatter = validateFrontmatter(rawFrontmatter, fullPath)
  let Component = lazyContentByPath.get(fullPath)
  if (!Component) {
    Component = lazy(importer)
    lazyContentByPath.set(fullPath, Component)
  }
  return { frontmatter, Component }
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

export function listContentSlugs(folder: ContentFolder): Array<string> {
  const prefix = `/content/${folder}/`
  return (
    Object.keys(frontmatterByFolder[folder])
      .map((p) => p.slice(prefix.length).replace(/\.mdx$/, ''))
      // Skip drafts — mirror scanMdxEntries: any `_drafts/` segment is
      // intentionally out of the live route + index + sitemap surface.
      .filter((slugPath) => !slugPath.split('/').includes('_drafts'))
      .sort()
  )
}
