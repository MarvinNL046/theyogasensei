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
}

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

export function listContentSlugs(
  folder: keyof typeof moduleByFolder,
): Array<string> {
  const prefix = `/content/${folder}/`
  return Object.keys(moduleByFolder[folder] ?? {})
    .map((p) => p.slice(prefix.length).replace(/\.mdx$/, ''))
    .sort()
}
