import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap relative flex items-center justify-between py-3 sm:py-4">

        {/* Left: nav links */}
        <div className="flex items-center gap-x-5 text-sm font-semibold">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/demos"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Demos
          </Link>
          <Link
            to="/contact"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Contact
          </Link>
        </div>

        {/* Center: logo — absolutely centered so it's always in the middle */}
        <Link
          to="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-label="Home"
        >
          <img
            src="/logos/goldendog-logo-192x192.png"
            alt="Logo"
            className="h-9 w-9 sm:h-11 sm:w-11 transition-opacity hover:opacity-80"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(201,168,76,0.35))' }}
          />
        </Link>

        {/* Right: theme toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>

      </nav>
    </header>
  )
}
