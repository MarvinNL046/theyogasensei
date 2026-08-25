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

  it('dates content entries from their own review date, not the build date', () => {
    const groups = buildSitemapGroups(SITE_URL)
    const today = new Date().toISOString().slice(0, 10)
    const contentDates = [...groups.guides, ...groups.poses, ...groups.gear]
      .map((entry) => entry.lastmod)
      .filter((d): d is string => Boolean(d))

    // The regression this guards: gray-matter returns a Date for an unquoted
    // YAML date, a `typeof === 'string'` check dropped it, and every URL fell
    // back to the build date. One shared date across the whole sitemap is the
    // exact signal Google discounts.
    expect(contentDates.length).toBeGreaterThan(0)
    expect(new Set(contentDates).size).toBeGreaterThan(1)
    expect(contentDates.every((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))).toBe(true)
    expect(contentDates.every((d) => d <= today)).toBe(true)
  })

  it('dates each child sitemap from its newest entry', () => {
    const groups = buildSitemapGroups(SITE_URL)
    const xml = renderSitemapIndex(SITE_URL)

    for (const group of SITEMAP_GROUPS) {
      if (groups[group].length === 0) continue
      const dates = groups[group]
        .map((entry) => entry.lastmod)
        .filter((d): d is string => Boolean(d))
        .sort()
      const block = xml
        .split('<sitemap>')
        .find((part) => part.includes(`/sitemap-${group}.xml`))

      if (dates.length === 0) {
        // No dated entry in the group — omit the element, never emit an empty
        // one. `<lastmod></lastmod>` is invalid against the sitemap schema.
        expect(block).not.toContain('<lastmod>')
      } else {
        expect(block).toContain(`<lastmod>${dates.at(-1)}</lastmod>`)
      }
    }
  })

  it('never emits a lastmod it cannot source from a file', () => {
    const xml = renderSitemapIndex(SITE_URL)
    const groups = buildSitemapGroups(SITE_URL)
    const all = SITEMAP_GROUPS.flatMap((group) => groups[group])

    expect(xml).not.toContain('<lastmod></lastmod>')
    // Hub and legal pages have no per-page date; they must carry no lastmod
    // rather than the build date, which would otherwise pin every group in the
    // index to today and bury the real content dates.
    const hub = all.find(({ url }) => url === `${SITE_URL}/privacy`)
    expect(hub?.lastmod).toBeUndefined()
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
