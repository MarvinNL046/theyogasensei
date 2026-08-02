/** @vitest-environment jsdom */

import { createElement } from 'react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ConsentBanner } from './consent-banner'

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    to,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) =>
    createElement('a', { href: to, ...props }),
}))

vi.mock('#/components/ui/button', () => ({
  Button: ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) =>
    createElement('button', props, children),
}))

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.getElementById('google-analytics-script')?.remove()
  window.dataLayer = undefined
  window.gtag = undefined
})

describe('ConsentBanner', () => {
  it('does not request GA4 before consent and loads it after acceptance', async () => {
    render(createElement(ConsentBanner))

    const accept = await screen.findByRole('button', { name: 'Accept' })
    expect(document.getElementById('google-analytics-script')).toBeNull()

    fireEvent.click(accept)

    await waitFor(() => {
      const script = document.getElementById('google-analytics-script')
      expect(script).not.toBeNull()
      expect(script?.getAttribute('src')).toContain(
        'googletagmanager.com/gtag/js',
      )
    })
    expect(localStorage.getItem('ga-consent')).toBe('granted')
  })
})
