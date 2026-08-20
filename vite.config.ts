import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import { scanContentFrontmatter, scanMdxSlugs } from './scripts/scan-mdx-slugs'
import { buildGuideHeadingsMap } from './scripts/extract-guide-headings'
import { affiliateRedirectHeaders } from './src/lib/affiliate-redirect-headers'

// Routes the MDX scanner discovers via /content/**/*.mdx frontmatter.
// Empty during Phase 1 init — populates as sample pages land in Step 9.
const contentPages = scanMdxSlugs()
const contentPagePaths = new Set(contentPages.map((page) => page.path))
const contentFrontmatter = scanContentFrontmatter()

// Per-guide H2 outline, scanned from raw MDX at config load. Inlined into the
// bundle via `define` below so the guide route can build its in-page TOC at
// both prerender time and on client navigation. See src/lib/mdx/loader.ts.
const guideHeadings = buildGuideHeadingsMap()

function shouldPrerenderPath(path: string): boolean {
  // /go/$slug is the affiliate redirect — must never be prerendered or indexed.
  if (path.startsWith('/go/')) return false

  // Forward links inside launch drafts may point at scheduled-but-not-yet-written
  // guide URLs. Keep those hrefs in the HTML for editorial link planning, but
  // don't let crawlLinks treat missing dynamic MDX routes as prerender failures.
  if (path.startsWith('/guides/') && !contentPagePaths.has(path)) return false

  return true
}

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  define: {
    __GUIDE_HEADINGS__: JSON.stringify(guideHeadings),
    __CONTENT_FRONTMATTER__: JSON.stringify(contentFrontmatter),
  },
  plugins: [
    // MDX must run before viteReact so .mdx files become JSX before React's transform.
    // No providerImportSource — we don't use MDXProvider context; pages just render
    // the MDX as plain JSX with HTML elements (tweakable later via @mdx-js/react if needed).
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        // Exports YAML frontmatter as a named `frontmatter` ES export so
        // routes can do: import Comp, { frontmatter } from '.../page.mdx'
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
        remarkGfm,
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    }),
    devtools(),
    nitro({
      rollupConfig: { external: [/^@sentry\//] },
      routeRules: {
        '/go/**': { headers: affiliateRedirectHeaders },
      },
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        filter: ({ path }) => shouldPrerenderPath(path),
      },
      // Explicit content routes from MDX scan. crawlLinks picks up the rest
      // (home, about, /poses/, /styles/, /gear/, etc. — they're linked from the home page).
      // /starter-guide is a deliberately unlinked lead-magnet landing page (reached
      // from Pinterest, not internal nav), so crawlLinks can't find it — list it here.
      pages: [...contentPages, { path: '/starter-guide' }],
    }),
    viteReact(),
  ],
})

export default config
