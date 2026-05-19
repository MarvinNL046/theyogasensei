import { Link } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'
import { JapaneseAccent } from '#/components/ui/japanese-accent'

/**
 * Site footer. Dark olive surface per design template. Pinterest first —
 * primary traffic channel per ADR-001. Organization JSON-LD lives on every
 * page via buildRootHead; we do not re-emit it here.
 */
export function Footer() {
  return (
    <footer className="mt-20 bg-[color:var(--color-olive)] text-[color:var(--color-bg)]">
      <Container size="wide" className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="The Yoga Sensei — home">
              <img
                src="/logo/logo-mark.png"
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
              A curated guide for finding the right gear and starting your practice. We research what
              we recommend. Instructional content is reviewed by certified yoga teachers.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-accent-soft)]">
              Practice
            </p>
            <ul className="space-y-3 text-sm text-[color:var(--color-bg)]/85">
              <li>
                <Link to="/start-here" className="transition hover:text-[color:var(--color-bg)]">
                  Start here
                </Link>
              </li>
              <li>
                <Link to="/poses" className="transition hover:text-[color:var(--color-bg)]">
                  Poses
                </Link>
              </li>
              <li>
                <Link to="/styles" className="transition hover:text-[color:var(--color-bg)]">
                  Styles
                </Link>
              </li>
              <li>
                <Link to="/guides" className="transition hover:text-[color:var(--color-bg)]">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-accent-soft)]">
              Reviews
            </p>
            <ul className="space-y-3 text-sm text-[color:var(--color-bg)]/85">
              <li>
                <Link to="/gear" className="transition hover:text-[color:var(--color-bg)]">
                  Gear
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-[color:var(--color-bg)]">
                  About
                </Link>
              </li>
            </ul>

            <p className="mt-8 mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-accent-soft)]">
              Follow
            </p>
            <ul className="space-y-3 text-sm text-[color:var(--color-bg)]/85">
              <li>
                <a
                  href="https://pinterest.com/theyogasensei"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-[color:var(--color-bg)]"
                >
                  Pinterest
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/theyogasensei"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-[color:var(--color-bg)]"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-accent-soft)]">
              Mindful inbox
            </p>
            <p className="mb-4 text-sm leading-relaxed text-[color:var(--color-bg)]/70">
              One quiet email a week. New articles, practice notes, no filler.
            </p>
            <Link
              to="/start-here"
              className="inline-flex items-center rounded-full border border-[color:var(--color-accent-soft)]/60 px-5 py-2.5 text-sm font-medium text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-accent)]/20 hover:border-[color:var(--color-accent-soft)]"
            >
              Subscribe
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[color:var(--color-bg)]/15 pt-6 text-xs text-[color:var(--color-bg)]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Yoga Sensei. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link to="/privacy" className="transition hover:text-[color:var(--color-bg)]">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition hover:text-[color:var(--color-bg)]">
                Terms
              </Link>
            </li>
            <li>
              <Link
                to="/affiliate-disclosure"
                className="transition hover:text-[color:var(--color-bg)]"
              >
                Affiliate disclosure
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
