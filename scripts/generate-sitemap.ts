import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { renderSitemap, sitemapEntryCount } from '../src/lib/seo/sitemap'

function main() {
  const siteUrl = process.env.SITE_URL ?? 'https://www.theyogasensei.com'
  const xml = renderSitemap(siteUrl)
  const target = join(process.cwd(), 'public', 'sitemap.xml')

  writeFileSync(target, xml, 'utf8')

  const count = sitemapEntryCount()
  console.log(
    `[generate-sitemap] wrote ${count} URL(s) to public/sitemap.xml (site: ${siteUrl})`,
  )
}

main()
