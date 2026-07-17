import type { Frontmatter } from '#/lib/mdx/frontmatter'
import { buildAbsoluteImageUrl } from '#/lib/images/variants'

export interface Author {
  slug: string
  name: string
  jobTitle?: string
  bio?: string
  knowsAbout?: Array<string>
  alumniOf?: string
  url?: string
  image?: string
  sameAs?: Array<string>
}

export interface BreadcrumbCrumb {
  name: string
  url?: string
}

export interface SchemaContext {
  siteUrl: string
  routePath: string
  author: Author
  breadcrumbs: Array<BreadcrumbCrumb>
}

const ORG_NAME = 'The Yoga Sensei'
const ORG_LOGO_PATH = '/logo192.png'

// Entity disambiguation: official off-site profiles for The Yoga Sensei.
// "yoga sensei" is dominated by an unrelated entity (Tim Senesi / "Yoga With
// Tim"), so sameAs explicitly tells Google which profiles are ours. Append
// new Tier-1 profiles (Crunchbase, Medium, LinkedIn, …) as they go live —
// use the exact profile URL, and keep name/bio identical across profiles.
export const ORG_SAME_AS = [
  'https://www.pinterest.com/theyogasensei/',
]

function absUrl(siteUrl: string, path: string): string {
  if (path.startsWith('http')) return path
  const base = siteUrl.replace(/\/$/, '')
  const tail = path.startsWith('/') ? path : `/${path}`
  return `${base}${tail}`
}

// Schema.org image fields want absolute URLs. Use the og variant (1200x630)
// for primary image/hero refs in Article, HowTo, Review schemas — that's
// what Google's rich-result preview thumbnails render at.
function cfImage(_siteUrl: string, id: string): string {
  return buildAbsoluteImageUrl(id, 'og', _siteUrl)
}

export function buildOrganizationSchema(ctx: Pick<SchemaContext, 'siteUrl'>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${ctx.siteUrl.replace(/\/$/, '')}/#organization`,
    name: ORG_NAME,
    url: ctx.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: absUrl(ctx.siteUrl, ORG_LOGO_PATH),
    },
    sameAs: ORG_SAME_AS,
  }
}

export function buildPersonSchema(author: Author, siteUrl: string) {
  const personUrl = author.url ?? absUrl(siteUrl, `/authors/${author.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${personUrl}#person`,
    name: author.name,
    url: personUrl,
    ...(author.jobTitle && { jobTitle: author.jobTitle }),
    ...(author.knowsAbout && { knowsAbout: author.knowsAbout }),
    ...(author.alumniOf && { alumniOf: author.alumniOf }),
    ...(author.bio && { description: author.bio }),
    // Author image — emitted only when it is a real, resolvable local asset
    // (root-relative path), so we never fall back to the generic brand hero and
    // expose a misleading author photo. Absolute URL for valid JSON-LD.
    ...(author.image?.startsWith('/') && {
      image: buildAbsoluteImageUrl(author.image, 'og', siteUrl),
    }),
    ...(author.sameAs && { sameAs: author.sameAs }),
  }
}

export function buildBreadcrumbListSchema(ctx: SchemaContext) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: ctx.breadcrumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      ...(crumb.url && { item: absUrl(ctx.siteUrl, crumb.url) }),
    })),
  }
}

export function buildFAQPageSchema(faq: NonNullable<Frontmatter['faq']>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.a,
      },
    })),
  }
}

export function buildArticleSchema(fm: Frontmatter, ctx: SchemaContext) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fm.title,
    description: fm.metaDescription,
    image: cfImage(ctx.siteUrl, fm.heroImage),
    datePublished: fm.publishedAt,
    dateModified: fm.lastReviewedAt,
    author: { '@id': absUrl(ctx.siteUrl, `/authors/${ctx.author.slug}#person`) },
    publisher: { '@id': `${ctx.siteUrl.replace(/\/$/, '')}/#organization` },
    mainEntityOfPage: absUrl(ctx.siteUrl, ctx.routePath),
    keywords: fm.tags.join(', '),
    ...(fm.citations.length > 0 && {
      citation: fm.citations.map((c) => ({
        '@type': 'ScholarlyArticle',
        name: c.title,
        author: c.authors,
        datePublished: String(c.year),
        url: c.url,
      })),
    }),
  }
}

export function buildHowToSchema(fm: Frontmatter, ctx: SchemaContext) {
  if (fm.type !== 'cluster' || !fm.howTo) {
    throw new Error('buildHowToSchema requires cluster frontmatter with howTo')
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: fm.title,
    description: fm.metaDescription,
    image: cfImage(ctx.siteUrl, fm.heroImage),
    author: { '@id': absUrl(ctx.siteUrl, `/authors/${ctx.author.slug}#person`) },
    publisher: { '@id': `${ctx.siteUrl.replace(/\/$/, '')}/#organization` },
    datePublished: fm.publishedAt,
    dateModified: fm.lastReviewedAt,
    mainEntityOfPage: absUrl(ctx.siteUrl, ctx.routePath),
    totalTime: fm.howTo.totalTime,
    step: fm.howTo.step.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.image && { image: cfImage(ctx.siteUrl, s.image) }),
    })),
  }
}

export function buildItemListSchema(fm: Frontmatter, ctx: SchemaContext) {
  const items =
    fm.itemList ??
    (fm.type === 'subpillar'
      ? fm.products?.map((p) => ({ name: p.name, url: p.url }))
      : undefined)

  if (!items || items.length === 0) {
    throw new Error('buildItemListSchema requires itemList[] or subpillar products[]')
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: fm.title,
    description: fm.metaDescription,
    itemListElement: items.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Thing',
        name: p.name,
        url: absUrl(ctx.siteUrl, p.url),
      },
    })),
  }
}

export function buildReviewSchema(fm: Frontmatter, ctx: SchemaContext) {
  if (fm.type !== 'cluster' || fm.schemaType !== 'Review') {
    throw new Error('buildReviewSchema requires cluster frontmatter with schemaType=Review')
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: fm.title,
    itemReviewed: {
      '@type': 'Product',
      name: fm.title,
      image: cfImage(ctx.siteUrl, fm.heroImage),
    },
    ...(fm.reviewRating != null && {
      reviewRating: {
        '@type': 'Rating',
        ratingValue: fm.reviewRating,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    reviewBody: fm.metaDescription,
    author: {
      '@type': 'Person',
      name: ctx.author.name,
      url: absUrl(ctx.siteUrl, `/authors/${ctx.author.slug}`),
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: ctx.siteUrl,
    },
    datePublished: fm.publishedAt,
  }
}
