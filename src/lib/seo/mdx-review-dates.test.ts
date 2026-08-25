import { describe, expect, it } from 'vitest'
import { scanMdxEntries, toIsoDate } from '../../../scripts/scan-mdx-slugs'

describe('toIsoDate', () => {
  it('accepts the Date that gray-matter returns for an unquoted YAML date', () => {
    // js-yaml types `lastReviewedAt: 2026-07-26` as a YAML 1.1 timestamp, so
    // the frontmatter value arrives as a Date. This is the case the old
    // `typeof === 'string'` guard silently dropped.
    expect(toIsoDate(new Date('2026-07-26T00:00:00.000Z'))).toBe('2026-07-26')
  })

  it('keeps the day stable regardless of the builder timezone', () => {
    // Local getters would roll this back to the 25th anywhere west of UTC.
    expect(toIsoDate(new Date('2026-07-26T00:00:00.000Z'))).toBe('2026-07-26')
    expect(toIsoDate(new Date('2026-07-26T23:59:59.000Z'))).toBe('2026-07-26')
  })

  it('accepts an already-quoted ISO day', () => {
    expect(toIsoDate('2026-07-26')).toBe('2026-07-26')
  })

  it('rejects anything it cannot vouch for', () => {
    for (const bad of [
      undefined,
      null,
      '',
      'yesterday',
      '26-07-2026',
      '2026-7-6',
      42,
      new Date('not a date'),
    ]) {
      expect(toIsoDate(bad)).toBeUndefined()
    }
  })
})

describe('scanMdxEntries', () => {
  it('reads a real review date for effectively every content file', () => {
    const entries = scanMdxEntries()
    const withDate = entries.filter((entry) => entry.lastReviewedAt)

    expect(entries.length).toBeGreaterThan(50)
    // Only content/authors/marvin.mdx omits the field today. Allow that one,
    // fail if the parse silently starts dropping dates again.
    expect(entries.length - withDate.length).toBeLessThanOrEqual(1)
  })
})
