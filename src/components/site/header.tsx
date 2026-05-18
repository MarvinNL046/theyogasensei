import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { cn } from '#/lib/utils'

const NAV_LINKS = [
  { to: '/start-here', label: 'Start here' },
  { to: '/poses', label: 'Poses' },
  { to: '/styles', label: 'Styles' },
  { to: '/gear', label: 'Gear' },
  { to: '/guides', label: 'Guides' },
  { to: '/about', label: 'About' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          onClick={close}
          className="font-serif text-lg font-semibold tracking-tight text-stone-900"
        >
          The Yoga Sensei
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden gap-6 text-sm text-stone-700 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-accent-700">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-stone-700 hover:bg-stone-100 hover:text-accent-700 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        className={cn(
          'border-t border-stone-200 bg-white md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <ul className="mx-auto flex max-w-5xl flex-col px-2 py-2">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={close}
                className="block rounded-md px-3 py-3 text-base text-stone-700 hover:bg-stone-50 hover:text-accent-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
