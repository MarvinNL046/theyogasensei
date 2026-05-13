import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link to="/" className="font-serif text-lg font-semibold tracking-tight text-stone-900">
          The Yoga Sensei
        </Link>
        <nav aria-label="Primary" className="hidden gap-6 text-sm text-stone-700 md:flex">
          <Link to="/start-here" className="hover:text-accent-700">
            Start here
          </Link>
          <Link to="/poses" className="hover:text-accent-700">
            Poses
          </Link>
          <Link to="/styles" className="hover:text-accent-700">
            Styles
          </Link>
          <Link to="/gear" className="hover:text-accent-700">
            Gear
          </Link>
          <Link to="/guides" className="hover:text-accent-700">
            Guides
          </Link>
          <Link to="/about" className="hover:text-accent-700">
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
