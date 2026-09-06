import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, Search, X } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { cn } from '#/lib/utils'

const NAV = [
  { to: '/practice', label: 'Practice' },
  { to: '/poses', label: 'Poses' },
  { to: '/gear', label: 'Gear' },
  { to: '/best', label: 'Best gear' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/comparisons', label: 'Comparisons' },
  { to: '/guides', label: 'Guides' },
  { to: '/how-we-research', label: 'How we research' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/95 backdrop-blur-md">
      <Container
        size="wide"
        className="flex min-h-16 items-center justify-between gap-4"
      >
        <Link
          to="/"
          onClick={close}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <img
            src="/logo/logo-enso.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <div className="leading-none">
            <span className="block font-serif text-[17px] font-semibold tracking-[-0.03em] text-[color:var(--color-ink)]">
              The Yoga Sensei
            </span>
            <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent-deep)]">
              Practice with clarity
            </span>
          </div>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 text-[12px] font-semibold text-[color:var(--color-ink-soft)] xl:flex"
        >
          {NAV.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full px-2.5 py-2 transition hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-olive-deep)]"
              activeProps={{
                className: 'text-[color:var(--color-olive-deep)]',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link
            to="/search"
            aria-label="Search The Yoga Sensei"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-ink-soft)] transition hover:border-[color:var(--color-accent-soft)] hover:text-[color:var(--color-olive-deep)]"
          >
            <Search aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            to="/starter-guide"
            className="rounded-full bg-[color:var(--color-olive)] px-4 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--color-olive-deep)]"
          >
            Start here
          </Link>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-1.5 xl:hidden">
          <Link
            to="/starter-guide"
            onClick={close}
            className="inline-flex min-h-11 items-center rounded-full bg-[color:var(--color-olive)] px-3.5 text-xs font-semibold text-white transition hover:bg-[color:var(--color-olive-deep)] lg:hidden"
          >
            Start here
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-xl text-[color:var(--color-ink)] hover:bg-[color:var(--color-surface-muted)]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        className={cn(
          'border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)] xl:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <Container size="wide" className="grid gap-1 py-4 sm:grid-cols-2">
          <Link
            to="/starter-guide"
            onClick={close}
            className="mb-2 rounded-xl bg-[color:var(--color-olive)] px-4 py-3 text-center text-sm font-semibold text-white sm:col-span-2"
          >
            Start here
          </Link>
          {NAV.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={close}
              className="rounded-xl px-3 py-3 text-sm font-medium text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-surface-muted)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/about"
            onClick={close}
            className="rounded-xl px-3 py-3 text-sm font-medium text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-surface-muted)]"
          >
            About
          </Link>
          <Link
            to="/search"
            onClick={close}
            className="rounded-xl px-3 py-3 text-sm font-medium text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-surface-muted)]"
          >
            Search
          </Link>
        </Container>
      </nav>
    </header>
  )
}
