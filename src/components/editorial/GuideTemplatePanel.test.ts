import { describe, expect, it } from 'vitest'
import { COMPARISONS, PRACTICES } from './GuideTemplatePanel'

describe('comparison decision panels', () => {
  it('gives every comparison a useful, non-duplicated factor matrix', () => {
    const comparisons = Object.entries(COMPARISONS)

    expect(comparisons).toHaveLength(9)
    for (const [slug, comparison] of comparisons) {
      expect(comparison, slug).toBeDefined()
      expect(comparison?.factors.length, slug).toBeGreaterThanOrEqual(6)
      expect(
        new Set(comparison?.factors.map((factor) => factor.label)).size,
      ).toBe(comparison?.factors.length)
      for (const factor of comparison?.factors ?? []) {
        expect(factor.left, `${slug}: ${factor.label} left`).toBeTruthy()
        expect(factor.right, `${slug}: ${factor.label} right`).toBeTruthy()
      }
    }
  })
})

describe('practice information panels', () => {
  it('keeps every supported practice profile decision-complete', () => {
    expect(Object.keys(PRACTICES)).toHaveLength(7)

    for (const [slug, practice] of Object.entries(PRACTICES)) {
      expect(practice?.audience, `${slug}: audience`).toBeTruthy()
      expect(practice?.duration, `${slug}: duration`).toBeTruthy()
      expect(practice?.level, `${slug}: experience`).toBeTruthy()
      expect(practice?.equipment, `${slug}: equipment`).toBeTruthy()
      expect(practice?.safety, `${slug}: safety`).toBeTruthy()
    }
  })
})
