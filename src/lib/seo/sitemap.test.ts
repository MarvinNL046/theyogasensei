import { describe, expect, it } from 'vitest'
import {
  buildSitemapGroups,
  renderSitemapIndex,
  SITEMAP_GROUPS,
  sitemapEntryCount,
} from './sitemap'

const SITE_URL = 'https://www.theyogasensei.com'

describe('sitemap architecture', () => {
  it('assigns every indexable URL to exactly one content group', () => {
    const groups = buildSitemapGroups(SITE_URL)
    const urls = SITEMAP_GROUPS.flatMap((group) =>
      groups[group].map((entry) => entry.url),
    )

    expect(urls).toHaveLength(sitemapEntryCount())
    expect(new Set(urls).size).toBe(urls.length)
    expect(urls.every((url) => url.startsWith(SITE_URL))).toBe(true)
  })

  it('publishes only non-empty group sitemaps in the index', () => {
    const groups = buildSitemapGroups(SITE_URL)
    const xml = renderSitemapIndex(SITE_URL)

    for (const group of SITEMAP_GROUPS) {
      const location = `${SITE_URL}/sitemap-${group}.xml`
      expect(xml.includes(location)).toBe(groups[group].length > 0)
    }
  })

  it('keeps major editorial routes in their matching sitemap', () => {
    const groups = buildSitemapGroups(SITE_URL)

    expect(groups.guides.some(({ url }) => url === `${SITE_URL}/guides`)).toBe(
      true,
    )
    expect(groups.poses.some(({ url }) => url === `${SITE_URL}/poses`)).toBe(
      true,
    )
    expect(
      groups.gear.some(({ url }) => url === `${SITE_URL}/gear/yoga-mats`),
    ).toBe(true)
  })
})
