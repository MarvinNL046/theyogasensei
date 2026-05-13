import type { Frontmatter } from '#/lib/mdx/frontmatter'
import {
  buildArticleSchema,
  buildBreadcrumbListSchema,
  buildFAQPageSchema,
  buildHowToSchema,
  buildItemListSchema,
  buildPersonSchema,
  buildReviewSchema,
  type Author,
  type BreadcrumbCrumb,
  type SchemaContext,
} from '#/lib/seo/schema'

export interface HeadMeta {
  title?: string
  charSet?: string
  name?: string
  property?: string
  content?: string
}

export interface HeadLink {
  rel: string
  href: string
}

export interface HeadScript {
  type: string
  children: string
}

export interface HeadConfig {
  meta: Array<HeadMeta>
  links: Array<HeadLink>
  scripts: Array<HeadScript>
}

export interface BuildHeadContext {
  siteUrl: string
  routePath: string
  author: Author
  breadcrumbs: Array<BreadcrumbCrumb>
}

function ldJsonScript(data: object): HeadScript {
  return { type: 'application/ld+json', children: JSON.stringify(data) }
}

function cfImage(siteUrl: string, id: string): string {
  // Placeholder — matches schema.ts. Final URL shape comes from Cloudflare
  // Images in Step 7.
  const base = siteUrl.replace(/\/$/, '')
  return `${base}/images/${id}`
}

function buildPrimarySchema(fm: Frontmatter, ctx: SchemaContext) {
  switch (fm.schemaType) {
    case 'Article':
      return buildArticleSchema(fm, ctx)
    case 'HowTo':
      return buildHowToSchema(fm, ctx)
    case 'ItemList':
      return buildItemListSchema(fm, ctx)
    case 'Review':
      return buildReviewSchema(fm, ctx)
  }
}

/**
 * Build the route-level head config for a content page.
 *
 * Wire this into a route via:
 *   head: ({ loaderData, params }) => buildHead(loaderData.frontmatter, {
 *     siteUrl: SITE_URL,
 *     routePath: `/guides/${params.slug}`,
 *     author: loaderData.author,
 *     breadcrumbs: [...],
 *   })
 */
export function buildHead(fm: Frontmatter, ctx: BuildHeadContext): HeadConfig {
  const canonical = `${ctx.siteUrl.replace(/\/$/, '')}${ctx.routePath}`
  const ogImage = cfImage(ctx.siteUrl, fm.pin.primaryImage)
  const heroImage = cfImage(ctx.siteUrl, fm.heroImage)

  const meta: Array<HeadMeta> = [
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { title: fm.title },
    { name: 'description', content: fm.metaDescription },
    { name: 'author', content: ctx.author.name },
    { name: 'keywords', content: fm.tags.join(', ') },

    // OpenGraph — Pinterest also reads these
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: fm.title },
    { property: 'og:description', content: fm.metaDescription },
    { property: 'og:url', content: canonical },
    { property: 'og:site_name', content: 'The Yoga Sensei' },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1000' },
    { property: 'og:image:height', content: '1500' },
    { property: 'article:published_time', content: fm.publishedAt },
    { property: 'article:modified_time', content: fm.lastReviewedAt },
    { property: 'article:author', content: ctx.author.name },
    ...fm.tags.map((tag) => ({
      property: 'article:tag',
      content: tag,
    })),

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fm.title },
    { name: 'twitter:description', content: fm.metaDescription },
    { name: 'twitter:image', content: heroImage },
  ]

  const links: Array<HeadLink> = [
    { rel: 'canonical', href: canonical },
  ]

  const schemaCtx: SchemaContext = {
    siteUrl: ctx.siteUrl,
    routePath: ctx.routePath,
    author: ctx.author,
    breadcrumbs: ctx.breadcrumbs,
  }

  const scripts: Array<HeadScript> = [
    ldJsonScript(buildPrimarySchema(fm, schemaCtx)),
    ldJsonScript(buildBreadcrumbListSchema(schemaCtx)),
    ldJsonScript(buildPersonSchema(ctx.author, ctx.siteUrl)),
  ]

  if (fm.faq && fm.faq.length > 0) {
    scripts.push(ldJsonScript(buildFAQPageSchema(fm.faq)))
  }

  return { meta, links, scripts }
}

/**
 * Site-wide head fragment for the root route. Emits Organization schema
 * + viewport + favicon + base OG tags that get overridden per content route.
 */
export function buildRootHead(siteUrl: string): HeadConfig {
  return {
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#c45a3e' },
      { property: 'og:site_name', content: 'The Yoga Sensei' },
      { property: 'og:locale', content: 'en_US' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/logo192.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
    scripts: [
      ldJsonScript({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'The Yoga Sensei',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl.replace(/\/$/, '')}/logo.png`,
        },
        sameAs: [
          'https://pinterest.com/theyogasensei',
          'https://instagram.com/theyogasensei',
        ],
      }),
    ],
  }
}

export const SITE_URL =
  (typeof process !== 'undefined' && process.env.SITE_URL) ||
  'https://theyogasensei.com'
