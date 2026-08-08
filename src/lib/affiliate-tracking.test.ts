import { describe, expect, it } from 'vitest'
import { affiliateClickContext, affiliateHref, pageTypeFromPath } from './affiliate-tracking'

describe('affiliate tracking context', () => {
  it.each([
    ['/reviews/manduka-pro', 'review'],
    ['/reviews/best-yoga-mats', 'roundup'],
    ['/guides/manduka-vs-lululemon-yoga-mat', 'comparison'],
    ['/guides/best-yoga-mat-for-beginners', 'roundup'],
    ['/guides/how-to-choose-a-yoga-mat', 'buying-guide'],
    ['/blog/18-months-on-one-yoga-mat', 'blog'],
    ['/guides/yoga-strap', 'guide'],
  ] as const)('classifies %s as %s', (path, expected) => {
    expect(pageTypeFromPath(path)).toBe(expected)
  })

  it('adds all attribution dimensions to the internal redirect URL', () => {
    const href = affiliateHref('manduka-pro-6mm', 'product-card', '/guides/best-yoga-mat-for-beginners')
    const url = new URL(href, 'https://www.theyogasensei.com')
    expect(url.pathname).toBe('/go/manduka-pro-6mm')
    expect(Object.fromEntries(url.searchParams)).toEqual({
      source: '/guides/best-yoga-mat-for-beginners',
      product: 'manduka-pro-6mm',
      placement: 'product-card',
      pageType: 'roundup',
    })
  })

  it('does not accept protocol-relative source paths', () => {
    expect(affiliateClickContext('sidebar', '//example.com').sourcePage).toBe('/unknown')
  })
})
