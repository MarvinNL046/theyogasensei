import { scanMdxEntries } from '../../../scripts/scan-mdx-slugs'

interface SitemapEntry {
  url: string
  lastmod?: string
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority?: number
}

const STATIC_PAGES: Array<Omit<SitemapEntry, 'url'> & { path: string }> = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  // /guides is the editorial hub (route, not MDX) — list it with the identity
  // pages, above the individual content entries.
  { path: '/guides', changefreq: 'weekly', priority: 0.8 },
  // /blog is the second editorial hub (route, not MDX). Individual posts are
  // picked up automatically by the MDX scanner via TYPE_TO_URL_PREFIX.
  { path: '/blog', changefreq: 'weekly', priority: 0.8 },
  { path: '/practice', changefreq: 'weekly', priority: 0.8 },
  { path: '/gear', changefreq: 'weekly', priority: 0.8 },
  { path: '/best', changefreq: 'weekly', priority: 0.8 },
  { path: '/reviews', changefreq: 'weekly', priority: 0.8 },
  { path: '/comparisons', changefreq: 'weekly', priority: 0.8 },
  { path: '/reviews/best-yoga-mats', changefreq: 'monthly', priority: 0.9 },
  { path: '/reviews/manduka-pro', changefreq: 'monthly', priority: 0.7 },
  { path: '/reviews/jade', changefreq: 'monthly', priority: 0.7 },
  { path: '/reviews/gaiam', changefreq: 'monthly', priority: 0.7 },
  { path: '/reviews/lululemon', changefreq: 'monthly', priority: 0.7 },
  { path: '/reviews/retrospec', changefreq: 'monthly', priority: 0.7 },
  { path: '/reviews/liforme', changefreq: 'monthly', priority: 0.7 },
  { path: '/reviews/manduka-grp-adapt', changefreq: 'monthly', priority: 0.7 },
  { path: '/reviews/alo', changefreq: 'monthly', priority: 0.7 },
  { path: '/poses', changefreq: 'weekly', priority: 0.8 },
  { path: '/about', changefreq: 'monthly', priority: 0.7 },
  { path: '/how-we-research', changefreq: 'monthly', priority: 0.7 },
  { path: '/review-methodology', changefreq: 'yearly', priority: 0.5 },
  { path: '/medical-review-policy', changefreq: 'yearly', priority: 0.5 },
  { path: '/editorial-policy', changefreq: 'yearly', priority: 0.4 },
  { path: '/corrections-policy', changefreq: 'yearly', priority: 0.4 },
  { path: '/ai-imagery-policy', changefreq: 'yearly', priority: 0.4 },
  { path: '/affiliate-disclosure', changefreq: 'yearly', priority: 0.3 },
  { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { path: '/terms', changefreq: 'yearly', priority: 0.3 },
  { path: '/contact', changefreq: 'monthly', priority: 0.4 },
]

function buildEntries(siteUrl: string): Array<SitemapEntry> {
  const base = siteUrl.replace(/\/$/, '')
  const mdxEntries = scanMdxEntries().filter((entry) => entry.indexable)
  const today = new Date().toISOString().slice(0, 10)

  const staticEntries: Array<SitemapEntry> = STATIC_PAGES.map((p) => ({
    url: `${base}${p.path}`,
    lastmod: today,
    changefreq: p.changefreq,
    priority: p.priority,
  }))

  const contentEntries: Array<SitemapEntry> = mdxEntries.map((e) => ({
    url: `${base}${e.routePath}`,
    lastmod: e.lastReviewedAt ?? today,
    changefreq: e.type === 'pillar' ? 'monthly' : 'monthly',
    priority: e.type === 'pillar' ? 0.9 : 0.6,
  }))

  // Pre-launch sitemap order mirrors the launch audit brief:
  // identity pages (home, guides hub, about), live editorial content, then
  // legal/contact pages.
  return [
    ...staticEntries.slice(0, 3),
    ...contentEntries,
    ...staticEntries.slice(3),
  ]
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function entryToXml(e: SitemapEntry): string {
  const parts = [`    <loc>${escapeXml(e.url)}</loc>`]
  if (e.lastmod) parts.push(`    <lastmod>${e.lastmod}</lastmod>`)
  if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`)
  if (e.priority !== undefined)
    parts.push(`    <priority>${e.priority.toFixed(1)}</priority>`)
  return `  <url>\n${parts.join('\n')}\n  </url>`
}

/**
 * Render the full sitemap.xml as a string. Emit as a single sitemap until
 * we cross 100 URLs — then split into a sitemap index per type (TODO once
 * the cluster grows past that).
 */
export function renderSitemap(siteUrl: string): string {
  const entries = buildEntries(siteUrl)
  const urls = entries.map(entryToXml).join('\n')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
}

export function sitemapEntryCount(): number {
  return (
    scanMdxEntries().filter((entry) => entry.indexable).length +
    STATIC_PAGES.length
  )
}
