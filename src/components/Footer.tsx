import { Link } from '@tanstack/react-router'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-[var(--line)] px-4 pb-12 pt-10">
      <div className="page-wrap flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div>
          <p
            className="m-0 text-base font-semibold"
            style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--sea-ink)' }}
          >
            Voice Actor
          </p>
        <p className="mt-1 m-0 text-sm" style={{ color: 'var(--sea-ink-soft)' }}>
          &copy; {year} &mdash; All rights reserved.
        </p>
        <p className="mt-1 m-0 text-xs" style={{ color: 'var(--sea-ink-soft)', opacity: 0.6 }}>
          Portfolio site built by Christopher Gascoyne.{' '}
          <a href="/contact" className="underline underline-offset-2 hover:opacity-100" style={{ color: 'inherit' }}>
            Need one? Get in touch.
          </a>
        </p>
        </div>

        <nav className="flex items-center gap-5 text-sm font-semibold">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/demos" className="nav-link">Demos</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}
