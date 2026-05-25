import { Link } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'
import { JapaneseAccent } from '#/components/ui/japanese-accent'

/**
 * Site footer. Dark olive surface per design template. Organization JSON-LD
 * lives on every page via buildRootHead; we do not re-emit it here.
 *
 * Phase B (minimal launch): collapsed from 4-column to 1-column. Practice/
 * Reviews/Mindful-inbox columns + legal row removed because every target
 * route is archived (start-here, poses index, styles, guides index, gear,
 * privacy, terms, affiliate-disclosure). Newsletter subscribe removed
 * because no live signup backend exists yet (Convex flow pending).
 */
export function Footer() {
  return (
    <footer className="bg-[color:var(--color-olive)] text-[color:var(--color-bg)]">
      <Container size="wide" className="py-16 md:py-20">
        <div className="md:max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-3" aria-label="The Yoga Sensei — home">
            <img
              src="/logo/logo-enso.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <span className="font-serif text-xl tracking-tight">The Yoga Sensei</span>
          </Link>
          <JapaneseAccent
            phrase="persistence"
            size="md"
            tone="onDark"
            className="mt-6 block"
          />
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-bg)]/70">
            A curated guide for finding the right gear and starting your practice.
            We research what we recommend. Written and edited by Marvin Smit, a
            long-time practitioner.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[color:var(--color-bg)]/85">
            <Link to="/about" className="transition hover:text-[color:var(--color-bg)]">
              About
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[color:var(--color-bg)]/15 pt-6 text-xs text-[color:var(--color-bg)]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Yoga Sensei. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
