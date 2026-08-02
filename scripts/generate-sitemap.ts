import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  buildSitemapGroups,
  renderSitemapGroup,
  renderSitemapIndex,
  SITEMAP_GROUPS,
  sitemapEntryCount,
} from '../src/lib/seo/sitemap'

function main() {
  const siteUrl = process.env.SITE_URL ?? 'https://www.theyogasensei.com'
  const publicDir = join(process.cwd(), 'public')
  const groups = buildSitemapGroups(siteUrl)

  for (const group of SITEMAP_GROUPS) {
    writeFileSync(
      join(publicDir, `sitemap-${group}.xml`),
      renderSitemapGroup(siteUrl, group),
      'utf8',
    )
  }
  writeFileSync(
    join(publicDir, 'sitemap-index.xml'),
    renderSitemapIndex(siteUrl),
    'utf8',
  )

  const count = sitemapEntryCount()
  const summary = SITEMAP_GROUPS.map(
    (group) => `${group}:${groups[group].length}`,
  ).join(', ')
  console.log(
    `[generate-sitemap] wrote ${count} URL(s) across ${SITEMAP_GROUPS.length} sitemap(s) and sitemap-index.xml (${summary}; site: ${siteUrl})`,
  )
}

main()
