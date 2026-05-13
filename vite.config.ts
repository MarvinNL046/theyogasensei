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

import { scanMdxSlugs } from './scripts/scan-mdx-slugs'

// Routes the MDX scanner discovers via /content/**/*.mdx frontmatter.
// Empty during Phase 1 init — populates as sample pages land in Step 9.
const contentPages = scanMdxSlugs()

const config = defineConfig({
  resolve: { tsconfigPaths: true },
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
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    }),
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // /go/$slug is the affiliate redirect — must never be prerendered or indexed.
        filter: ({ path }) => !path.startsWith('/go/'),
      },
      // Explicit content routes from MDX scan. crawlLinks picks up the rest
      // (home, about, /poses/, /styles/, /gear/, etc. — they're linked from the home page).
      pages: contentPages,
    }),
    viteReact(),
  ],
})

export default config
