import { Link } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'

const practice = [
  { label: 'Yoga for beginners', slug: 'yoga-for-beginners' },
  { label: 'Morning yoga', slug: 'morning-yoga-routine' },
  { label: 'Chair yoga', slug: 'chair-yoga-for-seniors' },
]

export function Footer() {
  return (
    <footer className="bg-[color:var(--color-olive-deep)] text-white">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3" aria-label="The Yoga Sensei — home">
              <img src="/logo/logo-enso.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
              <span className="font-serif text-2xl font-semibold tracking-[-0.04em]">The Yoga Sensei</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">Clear, research-led guidance for building a yoga practice that fits your body, home and everyday life.</p>
            <p className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white/75">Independent · Transparent · Human-written</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-soft)]">Practice</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              {practice.map((item) => <Link key={item.slug} to="/guides/$slug" params={{ slug: item.slug }} className="hover:text-white">{item.label}</Link>)}
              <Link to="/poses" className="hover:text-white">Yoga poses</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-soft)]">Gear</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              <Link to="/reviews/best-yoga-mats" className="hover:text-white">Best yoga mats</Link>
              <Link to="/guides/$slug" params={{ slug: 'how-to-choose-a-yoga-mat' }} className="hover:text-white">Mat buying guide</Link>
              <Link to="/guides/$slug" params={{ slug: 'best-yoga-blocks' }} className="hover:text-white">Yoga blocks</Link>
              <Link to="/guides" className="hover:text-white">All guides</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-soft)]">The site</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              <Link to="/about" className="hover:text-white">About</Link>
              <Link to="/contact" className="hover:text-white">Contact</Link>
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/affiliate-disclosure" className="hover:text-white">Affiliate disclosure</Link>
            </div>
          </div>
        </div>
        <p className="pt-6 text-xs text-white/45">© {new Date().getFullYear()} The Yoga Sensei. Operated by Marvin Smit, The Netherlands.</p>
      </Container>
    </footer>
  )
}
