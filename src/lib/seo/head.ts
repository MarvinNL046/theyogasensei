import type { Frontmatter } from '#/lib/mdx/frontmatter'
import type { Author, BreadcrumbCrumb, SchemaContext } from '#/lib/seo/schema'
import { buildAbsoluteImageUrl, buildImageUrl } from '#/lib/images/variants'
import {
  ORG_SAME_AS,
  buildArticleSchema,
  buildBreadcrumbListSchema,
  buildFAQPageSchema,
  buildHowToSchema,
  buildItemListSchema,
  buildPersonSchema,
  buildReviewSchema,
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
  as?: string
  fetchPriority?: 'high' | 'low' | 'auto'
}

export interface HeadScript {
  type?: string
  children?: string
  src?: string
  async?: boolean
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

// Pin variant (1000×1500) is kept available for Pinterest workflows.
// heroImage uses og variant (1200×630) for Article schema and social cards.
function pinImage(id: string): string {
  return buildAbsoluteImageUrl(id, 'pin', SITE_URL)
}

function ogImage(id: string): string {
  return buildAbsoluteImageUrl(id, 'og', SITE_URL)
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
  // Use the article-specific 1200x630 hero for social previews and schema.
  // Keep the vertical pin available as an alternate image asset for Pinterest
  // workflows without making it the default OG/Twitter card.
  const ogImageUrl = ogImage(fm.heroImage)
  const twitterImageUrl = ogImage(fm.heroImage)
  const pinImageUrl = pinImage(fm.pin.primaryImage)

  const meta: Array<HeadMeta> = [
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { title: fm.title },
    { name: 'description', content: fm.metaDescription },
    { name: 'author', content: ctx.author.name },
    { name: 'keywords', content: fm.tags.join(', ') },
    // Test for `false` explicitly, not truthiness. The Zod schema defaults
    // `indexable` to true, but loadFrontmatter() casts raw YAML straight to
    // FrontmatterSummary without parsing it (deliberately — parsing here would
    // ship the Zod runtime to the browser), so no default is ever applied. The
    // type claims boolean while runtime hands us undefined for any file that
    // omits the line. A truthiness check therefore noindexed 84 pages that were
    // meant to be indexed, including the whole gear catalogue and both blog
    // posts. Only an explicit `indexable: false` may suppress indexing.
    ...(fm.indexable === false ? [{ name: 'robots', content: 'noindex, follow' }] : []),

    // OpenGraph — Pinterest also reads these
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: fm.title },
    { property: 'og:description', content: fm.metaDescription },
    { property: 'og:url', content: canonical },
    { property: 'og:site_name', content: 'The Yoga Sensei' },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
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
    { name: 'twitter:image', content: twitterImageUrl },
  ]

  // Preload the LCP hero image. The guide route paints it as a CSS
  // background-image (discovered late, after CSSOM), which is the main LCP
  // cost on mobile. This href must match the background-image URL exactly
  // (root-relative local path, same 'og' variant) so the fetch dedupes.
  const heroPreloadUrl = buildImageUrl(fm.heroImage, 'og')

  const links: Array<HeadLink> = [
    {
      rel: 'preload',
      href: heroPreloadUrl,
      as: 'image',
      fetchPriority: 'high',
    },
    { rel: 'canonical', href: canonical },
    { rel: 'alternate', href: pinImageUrl },
  ]

  const schemaCtx: SchemaContext = {
    siteUrl: ctx.siteUrl,
    routePath: ctx.routePath,
    author: ctx.author,
    breadcrumbs: ctx.breadcrumbs,
  }

  const scripts: Array<HeadScript> = [
    ldJsonScript(buildPrimarySchema(fm, schemaCtx)),
    ...(fm.schemaType === 'Article'
      ? []
      : [ldJsonScript(buildArticleSchema(fm, schemaCtx))]),
    ...(fm.schemaType === 'ItemList' || !fm.itemList
      ? []
      : [ldJsonScript(buildItemListSchema(fm, schemaCtx))]),
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
      // Pinterest domain verification (claim → Rich Pins + analytics).
      { name: 'p:domain_verify', content: 'd73b2c07bb45df578b26e07b1669870a' },
      { property: 'og:site_name', content: 'The Yoga Sensei' },
      { property: 'og:locale', content: 'en_US' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg' },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
    scripts: [
      ldJsonScript({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteUrl.replace(/\/$/, '')}/#organization`,
        name: 'The Yoga Sensei',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl.replace(/\/$/, '')}/logo192.png`,
        },
        sameAs: ORG_SAME_AS,
      }),
    ],
  }
}

export const SITE_URL =
  (typeof process !== 'undefined' && process.env.SITE_URL) ||
  'https://www.theyogasensei.com'
