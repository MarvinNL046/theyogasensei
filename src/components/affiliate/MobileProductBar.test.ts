/** @vitest-environment jsdom */
import { createElement } from 'react'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MobileProductBar } from './MobileProductBar'

vi.mock('./AffiliateButton', () => ({
  AffiliateButton: ({ slug, placement }: { slug: string; placement: string }) =>
    createElement(
      'a',
      { href: `/go/${slug}`, 'data-placement': placement },
      'Check price on Amazon',
    ),
}))
afterEach(() => {
  cleanup()
  document.body.replaceChildren()
  vi.restoreAllMocks()
})

describe('MobileProductBar', () => {
  it('appears after scrolling, carries distinct attribution and stays dismissed', async () => {
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0)
    render(
      createElement(MobileProductBar, {
        slug: 'manduka-pro-6mm',
        productName: 'Manduka PRO',
      }),
    )
    expect(screen.queryByRole('complementary')).toBeNull()
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(600)
    fireEvent.scroll(window)
    const button = await screen.findByRole('link', {
      name: 'Check price on Amazon',
    })
    expect(button.getAttribute('data-placement')).toBe('mobile-sticky')
    fireEvent.click(
      screen.getByRole('button', { name: 'Hide product recommendation' }),
    )
    fireEvent.scroll(window)
    await waitFor(() => expect(screen.queryByRole('complementary')).toBeNull())
  })

  it('yields to dialogs and the footer', async () => {
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(600)
    const dialog = document.createElement('div')
    dialog.setAttribute('role', 'dialog')
    document.body.append(dialog)
    render(
      createElement(MobileProductBar, {
        slug: 'manduka-pro-6mm',
        productName: 'Manduka PRO',
      }),
    )
    expect(screen.queryByRole('complementary')).toBeNull()
    dialog.remove()
    await screen.findByRole('complementary')
    const footer = document.createElement('footer')
    document.body.append(footer)
    await waitFor(() => expect(screen.queryByRole('complementary')).toBeNull())
  })
})
