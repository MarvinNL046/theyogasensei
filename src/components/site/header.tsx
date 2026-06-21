import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { cn } from '#/lib/utils'

// Lean top bar: a few clear hubs only. Specific guides + clusters live inside
// the Guides dropdown, not on the bar — keep this list short (~5 items).
const LEADING = [
  { to: '/', label: 'Home' },
  { to: '/reviews/best-yoga-mats', label: 'Best mats' },
] as const

// Items inside the "Guides" dropdown. The parent "Guides" link goes to the full
// index (/guides); these are the high-intent shortcuts + the chair-yoga cluster.
const GUIDES_ITEMS = [
  { slug: 'yoga-for-beginners', label: 'Yoga for beginners' },
  { slug: 'how-to-choose-a-yoga-mat', label: 'How to choose a mat' },
  { slug: 'eco-friendly-yoga-mat', label: 'Eco-friendly mats' },
  { slug: 'best-yoga-mat-for-hot-yoga', label: 'Hot yoga mats' },
  { slug: 'best-yoga-mat-for-bad-knees', label: 'Mats for bad knees' },
  { slug: 'chair-yoga-for-seniors', label: 'Chair yoga' },
] as const

const TRAILING = [
  { to: '/poses', label: 'Poses' },
  { to: '/about', label: 'About' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const topLinkClass =
    'transition hover:text-[color:var(--color-accent-deep)]'

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
          className="hidden items-center gap-9 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)] lg:flex"
        >
          {LEADING.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={topLinkClass}
              activeProps={{ className: 'text-[color:var(--color-accent-deep)]' }}
            >
              {link.label}
            </Link>
          ))}

          {/* Guides dropdown — opens on hover and on keyboard focus-within */}
          <div className="group relative">
            <Link
              to="/guides"
              className={cn(topLinkClass, 'inline-flex items-center gap-1.5')}
              activeProps={{ className: 'text-[color:var(--color-accent-deep)]' }}
            >
              Guides
              <ChevronDown
                className="h-3 w-3 transition group-hover:rotate-180"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
            <div className="invisible absolute left-0 top-full z-50 pt-4 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="min-w-[230px] rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-2 shadow-[0_16px_44px_-16px_rgba(35,38,28,0.30)]">
                {GUIDES_ITEMS.map((item) => (
                  <Link
                    key={item.slug}
                    to="/guides/$slug"
                    params={{ slug: item.slug }}
                    className="block rounded-sm px-3 py-2 text-[13px] normal-case tracking-normal text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-accent-deep)]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/guides"
                  className="mt-1 block rounded-sm border-t border-[color:var(--color-border)]/60 px-3 pb-1 pt-2.5 text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-accent-deep)] transition hover:bg-[color:var(--color-surface-muted)]"
                >
                  All guides
                </Link>
              </div>
            </div>
          </div>

          {TRAILING.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={topLinkClass}
              activeProps={{ className: 'text-[color:var(--color-accent-deep)]' }}
            >
              {link.label}
            </Link>
          ))}
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
          {LEADING.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={close}
              className="rounded-md px-2 py-3 text-sm uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-accent-deep)]"
              activeProps={{ className: 'text-[color:var(--color-accent-deep)]' }}
            >
              {link.label}
            </Link>
          ))}

          {/* Guides group — parent link + indented shortcuts */}
          <Link
            to="/guides"
            onClick={close}
            className="rounded-md px-2 py-3 text-sm uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-accent-deep)]"
            activeProps={{ className: 'text-[color:var(--color-accent-deep)]' }}
          >
            Guides
          </Link>
          <div className="ml-3 flex flex-col border-l border-[color:var(--color-border)] pl-3">
            {GUIDES_ITEMS.map((item) => (
              <Link
                key={item.slug}
                to="/guides/$slug"
                params={{ slug: item.slug }}
                onClick={close}
                className="rounded-md px-2 py-2.5 text-[13px] text-[color:var(--color-ink-muted)] transition hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-accent-deep)]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {TRAILING.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={close}
              className="rounded-md px-2 py-3 text-sm uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-accent-deep)]"
              activeProps={{ className: 'text-[color:var(--color-accent-deep)]' }}
            >
              {link.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  )
}
