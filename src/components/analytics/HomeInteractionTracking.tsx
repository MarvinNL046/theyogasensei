import { useEffect } from 'react'
import { track } from '@vercel/analytics'

export function HomeInteractionTracking() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest<HTMLAnchorElement>('a[href]')
      const section = target.closest<HTMLElement>('[data-analytics-section]')
      if (!link || !section) return

      track('Homepage click', {
        section: section.dataset.analyticsSection ?? 'unknown',
        destination: link.getAttribute('href') ?? 'unknown',
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
