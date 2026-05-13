import { Link } from '@tanstack/react-router'

/**
 * Site footer. Pinterest first — that is our primary traffic channel
 * per ADR-001 and CLAUDE.md. The Organization JSON-LD lives on every page
 * via buildRootHead; we do not re-emit it here.
 */
export function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-serif text-lg font-semibold tracking-tight text-stone-900">
              The Yoga Sensei
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-600">
              A curated guide for finding the right gear and starting your practice. We test what
              we recommend. Instructional content is reviewed by certified yoga teachers.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              Affiliate disclosure: this site contains sponsored links to merchants. See the{' '}
              <Link to="/affiliate-disclosure" className="underline hover:text-accent-700">
                full disclosure
              </Link>
              .
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-stone-700">
              <li>
                <Link to="/start-here" className="hover:text-accent-700">
                  Start here
                </Link>
              </li>
              <li>
                <Link to="/poses" className="hover:text-accent-700">
                  Poses
                </Link>
              </li>
              <li>
                <Link to="/styles" className="hover:text-accent-700">
                  Styles
                </Link>
              </li>
              <li>
                <Link to="/gear" className="hover:text-accent-700">
                  Gear
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-accent-700">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Follow
            </p>
            <ul className="space-y-2 text-sm text-stone-700">
              <li>
                <a
                  href="https://pinterest.com/theyogasensei"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-700"
                >
                  Pinterest
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/theyogasensei"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-700"
                >
                  Instagram
                </a>
              </li>
            </ul>
            <p className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
              Legal
            </p>
            <ul className="space-y-2 text-sm text-stone-700">
              <li>
                <Link to="/privacy" className="hover:text-accent-700">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent-700">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/affiliate-disclosure" className="hover:text-accent-700">
                  Affiliate disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-6 text-xs text-stone-500">
          © {new Date().getFullYear()} The Yoga Sensei. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
