import { Link, createFileRoute } from '@tanstack/react-router'
import { seo } from '../utils/seo'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: 'Christopher Gascoyne — Voice Actor & Narrator',
      description:
        'Voice actor and narrator with a background in classical voice and opera. Audiobooks, character work, commercials, and corporate narration recorded to professional studio quality.',
    }),
  component: Home,
})

const GENRES = [
  'Audiobooks',
  'Commercials',
  'Narration',
  'Video Games',
  'Animation',
  'E-Learning',
  'Trailers',
  'ADR / Dubbing',
]

function Home() {
  return (
    <main className="page-wrap px-4 pb-16 pt-12">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="rise-in island-shell relative overflow-hidden rounded-[2rem] px-8 py-14 sm:px-14 sm:py-20 text-center">
        {/* Decorative glow spots */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.18), transparent 68%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(180,100,40,0.12), transparent 68%)' }}
        />

        {/* ── Headshot ── Drop your photo at public/headshot.jpg */}
        <div className="mb-8 flex justify-center">
          <div
            className="relative h-40 w-40 rounded-full sm:h-48 sm:w-48"
            style={{
              padding: '3px',
              background: 'linear-gradient(145deg, var(--lagoon), color-mix(in oklab, var(--lagoon-deep) 60%, transparent))',
              boxShadow: '0 0 32px color-mix(in oklab, var(--lagoon) 30%, transparent), 0 8px 24px rgba(0,0,0,0.25)',
            }}
          >
            <div className="h-full w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-strong)' }}>
              <img
                src="/photos/VA-headshot-800x800.webp"
                alt="Christopher Gascoyne, voice actor"
                className="h-full w-full object-cover"
                width={800}
                height={800}
              />
            </div>
          </div>
        </div>

        <p className="island-kicker mb-4">Voice Actor</p>

        <h1
          className="display-title mb-6 text-balance text-4xl sm:text-7xl"
          style={{ color: 'var(--sea-ink)' }}
        >
          Christopher Gascoyne
        </h1>

        <p className="mb-10 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--sea-ink-soft)' }}>
          An expressive voice for character-driven stories, immersive narration, and polished commercial reads.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/demos"
            className="no-underline rounded-full border px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5"
            style={{
              borderColor: 'color-mix(in oklab, var(--lagoon) 50%, transparent)',
              background: 'color-mix(in oklab, var(--lagoon) 18%, var(--surface-strong))',
              color: 'var(--sea-ink)',
            }}
          >
            Hear My Work
          </Link>
          <Link
            to="/contact"
            className="no-underline rounded-full border px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5"
            style={{
              borderColor: 'var(--line)',
              background: 'var(--surface)',
              color: 'var(--sea-ink-soft)',
            }}
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <section
        className="rise-in mt-10 island-shell rounded-2xl px-8 py-10 sm:px-12"
        style={{ animationDelay: '80ms' }}
      >
        <p className="island-kicker mb-3">About Me</p>
        <h2
          className="display-title mb-5 text-3xl sm:text-4xl"
          style={{ color: 'var(--sea-ink)' }}
        >
          A bit about me
        </h2>
        <div
          className="max-w-3xl space-y-5 text-base leading-8"
          style={{ color: 'var(--sea-ink-soft)' }}
        >
          <p>
            I'm a voice actor and narrator with a background in{' '}
            <strong style={{ color: 'var(--sea-ink)', fontWeight: 600 }}>classical voice, opera, and stage performance</strong>.
          </p>
          <p>
            I trained at the{' '}
            <em>Royal Northern College of Music</em> in the UK, where I completed a{' '}
            <em>Master of Music</em> degree with a focus on classical vocal performance.
            My training covered far more than singing alone: operatic performance involves
            acting, text interpretation, character work, movement, stagecraft, diction, and
            the ability to communicate clearly with an audience.
          </p>
          <p>
            Over around ten years of performing and teaching, I developed the{' '}
            <strong style={{ color: 'var(--sea-ink)', fontWeight: 600 }}>vocal control, stamina, and expressive range</strong>{' '}
            that now shape my work as a voice actor. My background gives me a strong
            foundation in breath control, clarity, emotional phrasing, and long-form
            performance — whether I'm narrating an audiobook, voicing a character, or
            delivering a polished commercial or corporate read.
          </p>
          <p>
            I record from my home setup using an{' '}
            <strong style={{ color: 'var(--sea-ink)', fontWeight: 600 }}>Electro-Voice RE20</strong> microphone,{' '}
            <strong style={{ color: 'var(--sea-ink)', fontWeight: 600 }}>Focusrite Scarlett</strong> interface,
            and Audacity, allowing me to produce clean, professional-quality audio remotely.
          </p>
        </div>
      </section>

      {/* ── What I Do ────────────────────────────────────────────────── */}
      <section className="mt-10">
        <p className="island-kicker mb-4">What I Do</p>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g, i) => (
            <span
              key={g}
              className="rise-in rounded-full border px-4 py-1.5 text-sm font-semibold"
              style={{
                animationDelay: `${i * 40 + 60}ms`,
                borderColor: 'var(--chip-line)',
                background: 'var(--chip-bg)',
                color: 'var(--sea-ink-soft)',
              }}
            >
              {g}
            </span>
          ))}
        </div>
      </section>

    </main>
  )
}
