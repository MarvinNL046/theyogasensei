import { scanMdxEntries } from '../../../scripts/scan-mdx-slugs'

interface SitemapEntry {
  url: string
  lastmod?: string
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority?: number
}

export type SitemapGroup =
  | 'pages'
  | 'guides'
  | 'poses'
  | 'styles'
  | 'gear'
  | 'blog'
  | 'authors'

export const SITEMAP_GROUPS: ReadonlyArray<SitemapGroup> = [
  'pages',
  'guides',
  'poses',
  'styles',
  'gear',
  'blog',
  'authors',
]

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
  { path: '/gear/yoga-mats', changefreq: 'weekly', priority: 0.7 },
  { path: '/gear/props', changefreq: 'weekly', priority: 0.7 },
  { path: '/gear/meditation', changefreq: 'weekly', priority: 0.7 },
  { path: '/gear/travel', changefreq: 'weekly', priority: 0.7 },
  { path: '/best', changefreq: 'weekly', priority: 0.8 },
  { path: '/reviews', changefreq: 'weekly', priority: 0.8 },
  { path: '/comparisons', changefreq: 'weekly', priority: 0.8 },
  { path: '/materials', changefreq: 'weekly', priority: 0.8 },
  { path: '/brands', changefreq: 'weekly', priority: 0.8 },
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

  // Hubs and legal pages carry no lastmod. There is no per-page date to read
  // for them, and stamping the build date would be a claim we cannot support —
  // it also drowns the real content dates, because one build-dated hub sits in
  // every group and would pin that group's index lastmod to today forever.
  // lastmod is optional in the sitemaps protocol; omitting beats inventing.
  const staticEntries: Array<SitemapEntry> = STATIC_PAGES.map((p) => ({
    url: `${base}${p.path}`,
    changefreq: p.changefreq,
    priority: p.priority,
  }))

  const contentEntries: Array<SitemapEntry> = mdxEntries.map((e) => ({
    url: `${base}${e.routePath}`,
    // Same rule as the static pages: report the file's own review date, or
    // report nothing. A file missing lastReviewedAt gets no lastmod.
    lastmod: e.lastReviewedAt,
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

function contentGroup(routePath: string): SitemapGroup {
  const segment = routePath.split('/')[1]
  return SITEMAP_GROUPS.includes(segment as SitemapGroup)
    ? (segment as SitemapGroup)
    : 'pages'
}

export function buildSitemapGroups(
  siteUrl: string,
): Record<SitemapGroup, Array<SitemapEntry>> {
  const groups = SITEMAP_GROUPS.reduce(
    (result, group) => ({ ...result, [group]: [] }),
    {} as Record<SitemapGroup, Array<SitemapEntry>>,
  )

  for (const entry of buildEntries(siteUrl)) {
    const path = new URL(entry.url).pathname
    const group = contentGroup(path)
    groups[group].push(entry)
  }

  return groups
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

/** Render the legacy single-file sitemap for callers that still need it. */
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

export function renderSitemapGroup(
  siteUrl: string,
  group: SitemapGroup,
): string {
  const urls = buildSitemapGroups(siteUrl)[group].map(entryToXml).join('\n')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n')
}

/**
 * Newest lastmod inside a group — what that group's sitemap actually claims.
 * Undefined when no entry in the group carries a date, so the index omits the
 * element rather than emitting an empty one.
 */
function groupLastmod(entries: Array<SitemapEntry>): string | undefined {
  const dates = entries
    .map((entry) => entry.lastmod)
    .filter((date): date is string => Boolean(date))
  return dates.length ? dates.reduce((a, b) => (a > b ? a : b)) : undefined
}

export function renderSitemapIndex(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '')
  const groups = buildSitemapGroups(siteUrl)
  // Each child sitemap reports its own newest entry rather than today's build
  // date. Stamping all six with the build date told Google every group changed
  // on every deploy, so it had no way to tell which one actually did.
  const sitemaps = SITEMAP_GROUPS.filter((group) => groups[group].length > 0)
    .map((group) => {
      const lastmod = groupLastmod(groups[group])
      const parts = [
        `    <loc>${escapeXml(`${base}/sitemap-${group}.xml`)}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      ]
      return `  <sitemap>\n${parts.join('\n')}\n  </sitemap>`
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemaps,
    '</sitemapindex>',
    '',
  ].join('\n')
}

export function sitemapEntryCount(): number {
  return (
    scanMdxEntries().filter((entry) => entry.indexable).length +
    STATIC_PAGES.length
  )
}
