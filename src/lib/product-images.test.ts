import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { productSlugForReview } from './review-product-slugs'
import { AFFILIATE_ASINS } from './affiliate-asins'

describe('product image wiring', () => {
  it('allows the Amazon image CDN in the production image policy', () => {
    const config = JSON.parse(readFileSync('vercel.json', 'utf8'))
    const headers = config.headers.flatMap(
      (entry: { headers: unknown[] }) => entry.headers,
    )
    const policy = headers.find(
      (header: { key: string }) => header.key === 'Content-Security-Policy',
    ).value as string
    const images = policy
      .split(';')
      .find((directive) => directive.trim().startsWith('img-src '))
    expect(images?.split(/\s+/)).toContain('https://m.media-amazon.com')
  })

  it('maps review cards to registered products and leaves direct brands alone', () => {
    for (const review of [
      'manduka-pro',
      'manduka-grp-adapt',
      'jade',
      'gaiam',
      'liforme',
      'retrospec',
    ]) {
      const slug = productSlugForReview(`/reviews/${review}`)
      expect(slug && AFFILIATE_ASINS[slug]).toMatch(/^[A-Z0-9]{10}$/)
    }
    expect(productSlugForReview('/reviews/jade#verdict')).toBe('jade-harmony')
    expect(productSlugForReview('/reviews/lululemon')).toBeNull()
    expect(productSlugForReview('/reviews/alo')).toBeNull()
    expect(productSlugForReview('')).toBeNull()
  })
})
