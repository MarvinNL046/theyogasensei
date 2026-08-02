import { Link } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'

const columns = [
  {
    title: 'Practice',
    links: [
      { label: 'Start here', to: '/starter-guide' },
      { label: 'Practice guides', to: '/practice' },
      { label: 'Pose library', to: '/poses' },
      { label: 'All guides', to: '/guides' },
    ],
  },
  {
    title: 'Gear',
    links: [
      { label: 'Best gear', to: '/best' },
      { label: 'Reviews', to: '/reviews' },
      { label: 'Comparisons', to: '/comparisons' },
      { label: 'Yoga mat guide', to: '/guides/how-to-choose-a-yoga-mat' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'How we research', to: '/how-we-research' },
      { label: 'About Marvin', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Corrections', to: '/corrections-policy' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Editorial policy', to: '/editorial-policy' },
      { label: 'AI imagery', to: '/ai-imagery-policy' },
      { label: 'Affiliate disclosure', to: '/affiliate-disclosure' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="bg-[color:var(--color-olive-deep)] text-white">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.45fr_repeat(4,1fr)]">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="The Yoga Sensei — home"
            >
              <img
                src="/logo/logo-enso.png"
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <span className="font-serif text-2xl font-semibold tracking-[-0.04em]">
                The Yoga Sensei
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Clear, research-led guidance for a yoga practice that fits your
              body, home and everyday life.
            </p>
            <p className="mt-5 text-xs leading-relaxed text-white/55">
              Independent guidance. Commercial relationships disclosed. Sources
              and meaningful updates documented.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-soft)]">
                {column.title}
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
                {column.links.map((link) => (
                  <a key={link.to} href={link.to} className="hover:text-white">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} The Yoga Sensei. Operated by Marvin
            Smit, The Netherlands.
          </p>
          <p>
            Found something outdated?{' '}
            <Link to="/contact" className="text-white/70 hover:text-white">
              Tell us.
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}
