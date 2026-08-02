import { lazy } from 'react'
import type { ComponentType } from 'react'
import type { Frontmatter } from '#/lib/mdx/frontmatter'

// Compiled MDX bodies accept an optional `components` prop to override how
// intrinsic elements (e.g. `a`) render. `mdx/types` isn't installed, so the
// prop is typed loosely here; the concrete map is `contentMdxComponents`.
export type MdxContentComponent = ComponentType<{ components?: unknown }>

type ContentFolder = 'poses' | 'guides' | 'styles' | 'gear' | 'blog' | 'reviews'
interface ContentModule {
  default: MdxContentComponent
  frontmatter: unknown
}

type ContentImporter = () => Promise<ContentModule>

// Generated from YAML by vite.config.ts. Keeping metadata separate from the
// compiled MDX modules prevents every article body from becoming a static
// dependency of every route that needs titles, tags or schema data.
declare const __CONTENT_FRONTMATTER__: Record<string, unknown>

const frontmatterByPath = __CONTENT_FRONTMATTER__

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
  frontmatter: FrontmatterSummary
}

export type FrontmatterSummary = Pick<
  Frontmatter,
  | 'type'
  | 'title'
  | 'slug'
  | 'metaDescription'
  | 'pillar'
  | 'clusters'
  | 'tags'
  | 'related'
  | 'author'
  | 'reviewedBy'
  | 'indexable'
  | 'requiresQualifiedReview'
  | 'publishedAt'
  | 'lastReviewedAt'
  | 'estimatedReadingTime'
  | 'heroImage'
  | 'schemaType'
>

export interface LoadedContent {
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
  const rawFrontmatter = frontmatterByPath[fullPath]
  if (rawFrontmatter === undefined)
    throw new Error(`MDX not found: ${fullPath}`)
  const frontmatter = rawFrontmatter as FrontmatterSummary
  return { frontmatter }
}

/**
 * Load complete metadata only for the requested article route. The mandatory
 * build verifier validates every MDX file before Vite emits any route, so the
 * browser does not need to ship the complete Zod runtime a second time.
 */
export async function loadFullFrontmatter(
  folder: ContentFolder,
  slugPath: string,
): Promise<{ frontmatter: Frontmatter }> {
  const fullPath = `/content/${folder}/${slugPath}.mdx`
  const importer = contentImporterByFolder[folder][fullPath]
  if (!importer) throw new Error(`MDX not found: ${fullPath}`)
  const module = await importer()
  return { frontmatter: module.frontmatter as Frontmatter }
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
  const importer = contentImporterByFolder[folder][fullPath]
  if (importer === undefined)
    throw new Error(`MDX not found: ${fullPath}`)
  let Component = lazyContentByPath.get(fullPath)
  if (!Component) {
    Component = lazy(importer)
    lazyContentByPath.set(fullPath, Component)
  }
  return { Component }
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
    Object.keys(frontmatterByPath)
      .filter((path) => path.startsWith(prefix) && path.endsWith('.mdx'))
      .map((p) => p.slice(prefix.length).replace(/\.mdx$/, ''))
      // Skip drafts — mirror scanMdxEntries: any `_drafts/` segment is
      // intentionally out of the live route + index + sitemap surface.
      .filter((slugPath) => !slugPath.split('/').includes('_drafts'))
      .sort()
  )
}
