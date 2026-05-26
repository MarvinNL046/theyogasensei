import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, Search, X } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { cn } from '#/lib/utils'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  {
    to: '/guides/$slug',
    params: { slug: 'how-to-choose-a-yoga-mat' },
    label: 'Mat guide',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'best-yoga-mat-for-hot-yoga' },
    label: 'Hot yoga mats',
  },
  { to: '/about', label: 'About' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)]/60 bg-[color:var(--color-bg)]/85 backdrop-blur-md">
      <Container size="wide" className="flex items-center justify-between py-5">
        {/* Logo block — enso + wordmark + small kanji */}
        <Link
          to="/"
          onClick={close}
          aria-label="The Yoga Sensei — home"
          className="group flex items-center gap-3"
        >
          <img
            src="/logo/logo-enso.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[15px] uppercase tracking-[0.22em] text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
              The Yoga Sensei
            </span>
            <span
              lang="ja"
              aria-hidden="true"
              className="mt-1.5 text-[10px] tracking-[0.45em] text-[color:var(--color-ink-muted)]"
            >
              練習
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)] lg:flex"
        >
          {NAV_LINKS.map((link) =>
            'params' in link ? (
              <Link
                key={link.label}
                to={link.to}
                params={link.params}
                className="transition hover:text-[color:var(--color-accent-deep)]"
                activeProps={{ className: 'text-[color:var(--color-accent-deep)]' }}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className="transition hover:text-[color:var(--color-accent-deep)]"
                activeProps={{ className: 'text-[color:var(--color-accent-deep)]' }}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Search icon — disabled placeholder until search index ships */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Search — coming soon"
            disabled
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--color-ink-muted)] opacity-60"
          >
            <Search className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)] lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        className={cn(
          'border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)] lg:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <Container size="wide" className="flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) =>
            'params' in link ? (
              <Link
                key={link.label}
                to={link.to}
                params={link.params}
                onClick={close}
                className="rounded-md px-2 py-3 text-sm uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-accent-deep)]"
                activeProps={{ className: 'text-[color:var(--color-accent-deep)]' }}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                onClick={close}
                className="rounded-md px-2 py-3 text-sm uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-accent-deep)]"
                activeProps={{ className: 'text-[color:var(--color-accent-deep)]' }}
              >
                {link.label}
              </Link>
            ),
          )}
        </Container>
      </nav>
    </header>
  )
}
