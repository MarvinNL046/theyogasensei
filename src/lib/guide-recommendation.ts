import { AFFILIATE_ASINS } from './affiliate-asins'

export interface GuideRecommendation {
  slug: string
  productName: string
  image?: string
  points: string[]
  blurb?: string
}

/** Use the editor's explicit sidebar choice, then the first listed Amazon pick. */
export function guideRecommendation(frontmatter: {
  indexable?: boolean
  sidebarProduct?: GuideRecommendation
  itemList?: { name: string; url: string }[]
}): GuideRecommendation | null {
  if (frontmatter.indexable === false) return null
  if (frontmatter.sidebarProduct) return frontmatter.sidebarProduct
  const first = frontmatter.itemList?.[0]
  const slug = first?.url.match(/^\/go\/([a-z0-9-]+)\/?$/)?.[1]
  if (!first || !slug || !AFFILIATE_ASINS[slug]) return null
  return {
    slug,
    productName: first.name,
    points: [],
    blurb: 'Compare the fit and trade-offs in this guide before buying.',
  }
}
