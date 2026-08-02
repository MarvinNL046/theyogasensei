import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { cn } from '#/lib/utils'

const LEADING = [
  { to: '/', label: 'Home' },
  { to: '/reviews/best-yoga-mats', label: 'Best mats' },
  { to: '/blog', label: 'Journal' },
] as const

const GUIDES_ITEMS = [
  { slug: 'yoga-for-beginners', label: 'Yoga for beginners' },
  { slug: 'morning-yoga-routine', label: 'Morning yoga routine' },
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
  const linkClass =
    'rounded-full px-3 py-2 transition hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-olive-deep)]'

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/95 backdrop-blur-md">
      <div className="bg-[color:var(--color-olive-deep)] py-2 text-center text-[11px] font-medium tracking-wide text-white/85">
        Independent yoga guidance · Sources shown · No paid rankings
      </div>
      <Container size="wide" className="flex items-center justify-between py-3.5">
        <Link to="/" onClick={close} aria-label="The Yoga Sensei — home" className="group flex items-center gap-2.5">
          <img src="/logo/logo-enso.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[17px] font-semibold tracking-[-0.03em] text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-olive)]">
              The Yoga Sensei
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
              Practice with clarity
            </span>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 text-[13px] font-medium text-[color:var(--color-ink-soft)] lg:flex">
          {LEADING.map((link) => (
            <Link key={link.label} to={link.to} className={linkClass} activeProps={{ className: 'text-[color:var(--color-olive-deep)]' }}>
              {link.label}
            </Link>
          ))}
          <div className="group relative">
            <Link to="/guides" className={cn(linkClass, 'inline-flex items-center gap-1.5')} activeProps={{ className: 'text-[color:var(--color-olive-deep)]' }}>
              Guides <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" aria-hidden="true" />
            </Link>
            <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="min-w-[250px] rounded-2xl border border-[color:var(--color-border)] bg-white p-2 shadow-[0_20px_50px_-20px_rgba(24,49,41,.35)]">
                {GUIDES_ITEMS.map((item) => (
                  <Link key={item.slug} to="/guides/$slug" params={{ slug: item.slug }} className="block rounded-xl px-3 py-2.5 text-[13px] text-[color:var(--color-ink-soft)] transition hover:bg-[color:var(--color-surface-muted)] hover:text-[color:var(--color-olive-deep)]">
                    {item.label}
                  </Link>
                ))}
                <Link to="/guides" className="mt-1 block border-t border-[color:var(--color-border)] px-3 pb-1 pt-3 text-xs font-semibold text-[color:var(--color-accent-deep)]">
                  Explore all guides →
                </Link>
              </div>
            </div>
          </div>
          {TRAILING.map((link) => (
            <Link key={link.label} to={link.to} className={linkClass} activeProps={{ className: 'text-[color:var(--color-olive-deep)]' }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/guides/$slug" params={{ slug: 'yoga-for-beginners' }} className="hidden rounded-full bg-[color:var(--color-olive)] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[color:var(--color-olive-deep)] lg:inline-flex">
          Start your practice
        </Link>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-xl text-[color:var(--color-ink)] hover:bg-[color:var(--color-surface-muted)] lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <nav id="mobile-nav" aria-label="Primary mobile" className={cn('border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)] lg:hidden', open ? 'block' : 'hidden')}>
        <Container size="wide" className="flex flex-col gap-1 py-4">
          <Link to="/guides/$slug" params={{ slug: 'yoga-for-beginners' }} onClick={close} className="mb-3 rounded-xl bg-[color:var(--color-olive)] px-4 py-3 text-center text-sm font-semibold text-white">
            Start your practice
          </Link>
          {[...LEADING, { to: '/guides' as const, label: 'Guides' }, ...TRAILING].map((link) => (
            <Link key={link.label} to={link.to} onClick={close} className="rounded-xl px-3 py-3 text-sm font-medium text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-surface-muted)]">
              {link.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  )
}
