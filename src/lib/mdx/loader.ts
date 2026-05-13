import matter from 'gray-matter'
import type { ComponentType } from 'react'
import {
  validateFrontmatter,
  type Frontmatter,
} from '#/lib/mdx/frontmatter'

type RawLoader = () => Promise<string>
type ModuleLoader = () => Promise<{ default: ComponentType }>

// Vite's import.meta.glob expands at build time. Each MDX file under
// /content/<folder>/ is reachable two ways: as raw source (for frontmatter
// extraction via gray-matter) and as a compiled module (the JSX body).
const rawByFolder: Record<string, Record<string, RawLoader>> = {
  poses: import.meta.glob('/content/poses/**/*.mdx', {
    query: '?raw',
    import: 'default',
  }) as Record<string, RawLoader>,
  guides: import.meta.glob('/content/guides/**/*.mdx', {
    query: '?raw',
    import: 'default',
  }) as Record<string, RawLoader>,
  styles: import.meta.glob('/content/styles/**/*.mdx', {
    query: '?raw',
    import: 'default',
  }) as Record<string, RawLoader>,
  gear: import.meta.glob('/content/gear/**/*.mdx', {
    query: '?raw',
    import: 'default',
  }) as Record<string, RawLoader>,
  blog: import.meta.glob('/content/blog/**/*.mdx', {
    query: '?raw',
    import: 'default',
  }) as Record<string, RawLoader>,
}

const moduleByFolder: Record<string, Record<string, ModuleLoader>> = {
  poses: import.meta.glob('/content/poses/**/*.mdx') as Record<
    string,
    ModuleLoader
  >,
  guides: import.meta.glob('/content/guides/**/*.mdx') as Record<
    string,
    ModuleLoader
  >,
  styles: import.meta.glob('/content/styles/**/*.mdx') as Record<
    string,
    ModuleLoader
  >,
  gear: import.meta.glob('/content/gear/**/*.mdx') as Record<
    string,
    ModuleLoader
  >,
  blog: import.meta.glob('/content/blog/**/*.mdx') as Record<
    string,
    ModuleLoader
  >,
}

export interface LoadedContent {
  frontmatter: Frontmatter
  Component: ComponentType
}

/**
 * Load and validate an MDX content page by folder + path-within-folder.
 *
 * Example: loadContent('poses', 'sun-salutation') reads
 *   /content/poses/sun-salutation.mdx
 *
 * Example: loadContent('gear', 'mats/manduka-prolite') reads
 *   /content/gear/mats/manduka-prolite.mdx
 */
export async function loadContent(
  folder: keyof typeof rawByFolder,
  slugPath: string,
): Promise<LoadedContent> {
  const fullPath = `/content/${folder}/${slugPath}.mdx`
  const rawLoader = rawByFolder[folder]?.[fullPath]
  const moduleLoader = moduleByFolder[folder]?.[fullPath]

  if (!rawLoader || !moduleLoader) {
    throw new Error(`MDX not found: ${fullPath}`)
  }

  const raw = await rawLoader()
  const parsed = matter(raw)
  const frontmatter = validateFrontmatter(parsed.data, fullPath)
  const mod = await moduleLoader()

  return { frontmatter, Component: mod.default }
}

export function listContentSlugs(
  folder: keyof typeof rawByFolder,
): Array<string> {
  const prefix = `/content/${folder}/`
  return Object.keys(rawByFolder[folder] ?? {})
    .map((p) => p.slice(prefix.length).replace(/\.mdx$/, ''))
    .sort()
}
