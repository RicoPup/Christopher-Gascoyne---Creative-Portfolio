import { createFileRoute, stripSearchParams } from '@tanstack/react-router'
import React from 'react'
import { seo } from '../utils/seo'

const TABS = [
  { genre: 'Audiobook',         label: 'Audiobook',         slug: 'audiobook' },
  { genre: 'Vocal Performance', label: 'Vocal Performance', slug: 'vocal-performance' },
  { genre: 'Commercial',        label: 'Commercial',        slug: 'commercial' },
] as const

type TabSlug = (typeof TABS)[number]['slug']

const DEFAULT_TAB: TabSlug = 'audiobook'

export const Route = createFileRoute('/demos')({
  validateSearch: (search: Record<string, unknown>): { tab?: TabSlug } => {
    const isValid = TABS.some((t) => t.slug === search.tab)
    return isValid ? { tab: search.tab as TabSlug } : {}
  },
  search: {
    middlewares: [stripSearchParams({ tab: DEFAULT_TAB })],
  },
  head: () =>
    seo({
      title: 'Demos — Christopher Gascoyne',
      description:
        'Listen to voice acting and narration demos from Christopher Gascoyne, including audiobook performances and vocal work across a range of characters and genres.',
      path: '/demos',
    }),
  component: Demos,
})

interface Character {
  name: string
  description: string
}

interface Demo {
  title: string
  description: React.ReactNode
  /** Path relative to /demos/ — use forward slashes for subfolders */
  file: string
  genre: string
  source?: string
  disclaimer?: string
  characters?: Character[]
}

const DEMOS: Demo[] = [
  {
    title: 'Love in a Bottle — Vocal Excerpt',
    description: <>A short vocal excerpt from <em>Love in a Bottle</em> from <em>Hazbin Hotel</em>, showcasing a darker musical-theatre style with characterful delivery, low baritone colour, and dramatic vocal expression.</>,
    file: 'vocal performance/love in a bottle intro - hazbin hotel.mp3',
    genre: 'Vocal Performance',
    source: 'Hazbin Hotel — Sam Haft / Andrew Underberg',
  },
  {
    title: 'The Blade Itself — Glokta & Frost',
    description: <>An excerpt from <em>The Blade Itself</em> by Joe Abercrombie. A scene featuring two of <em>the First Law</em>'s most distinct voices — a crippled inquisitor whose inner self-image is in constant dark conflict with his broken body, and his silent, stoic partner.</>,
    file: 'audiobooks/Glokta [2] - The First Law excerpt - Joe Abercrombie.mp3',
    genre: 'Audiobook',
    source: 'The Blade Itself — Joe Abercrombie',
    characters: [
      {
        name: 'Sand dan Glokta',
        description: 'Once a celebrated swordsman, now a crippled inquisitor. Most of his teeth are gone, leaving him unable to eat solid food; his body is a map of old torture. His spoken voice carries a pronounced lisp and is marked by flashes of pain — yet his inner monologue is sharp, sardonic, and deeply self-aware.',
      },
      {
        name: 'Frost',
        description: 'The embodiment of stoicism — he rarely displays emotion. A chronic swollen tongue leaves his speech heavily impaired, though it doesn\'t stop him from the occasional dry, cutting remark.',
      },
    ],
  },
  {
    title: 'Shadows Upon Time — Hadrian & Selene',
    description: <>An excerpt from Chapter 30 of <em>Shadows Upon Time</em> by Christopher Ruocchio. A dramatic scene between two central characters.</>,
    file: 'audiobooks/Shadows Upon Time [2] - C30 Excerpt - Hadrian and Selene.mp3',
    genre: 'Audiobook',
    source: 'Shadows Upon Time — Christopher Ruocchio',
    characters: [
      {
        name: 'Hadrian Marlowe',
        description: 'Noble blood; a seasoned, world-worn man in a young body — also the narration voice.',
      },
      {
        name: 'Selene Avent',
        description: 'Royal Princess; poised and sharp, in her early twenties.',
      },
    ],
  },
  {
    title: 'The Butcher\'s Masquerade — Princess Donut',
    description: <>A monologue from <em>The Butcher's Masquerade</em> (<em>Dungeon Crawler Carl</em>, Book 5) by Matt Dinniman. A rare moment of raw honesty from a character who is usually over the top and theatrical — Donut finally confronts the truth about the owner she has spent so long mourning.</>,
    file: 'audiobooks/Princess Donut Monologue [2] - DCC book 5 excerpt.mp3',
    genre: 'Audiobook',
    source: 'The Butcher\'s Masquerade (Dungeon Crawler Carl, Book 5) — Matt Dinniman',
    characters: [
      {
        name: 'Princess Donut',
        description: 'Grand Champion, Breed Winner, National Winner — Princess Donut the Queen Anne Chonk. A tortoiseshell Persian cat and party leader of the Royal Court of Princess Donut. Deuteragonist of Dungeon Crawler Carl; usually theatrical and larger than life, but here stripped down to something genuinely vulnerable.',
      },
      {
        name: 'Odette',
        description: 'A Syndicate citizen and the famous host of a highly rated talk show.',
      },
      {
        name: 'Carl (narration)',
        description: 'A 27-year-old U.S. Coast Guard veteran from Seattle. The narrator and protagonist of Dungeon Crawler Carl.',
      },
    ],
  },
  {
    title: 'Come Away, Death — Quilter',
    description: <>Roger Quilter's lyrical setting of Shakespeare's "Come Away, Death" from <em>Twelfth Night</em>, the opening song of his <em>Three Shakespeare Songs</em>, Op. 6.</>,
    file: 'vocal performance/Come Away Death - Quilter -3 Shakespeare Songs.mp3',
    genre: 'Vocal Performance',
    source: 'Three Shakespeare Songs, Op. 6 — Roger Quilter / text: Shakespeare',
    disclaimer: 'This is an older, unmastered recording. Cleaner studio recordings are coming soon.',
  },
  {
    title: 'Solarport — Renewable Energy',
    description: <>A spec commercial read for <em>Solarport</em>, a renewable-energy brand. A calm, deep, and smooth delivery — warm and reassuring, with an unhurried pace suited to sustainability, technology, and lifestyle advertising.</>,
    file: 'commercial/solarport.mp3',
    genre: 'Commercial',
    source: 'Spec commercial — renewable energy',
  },
]

function pauseOtherPlayers(event: React.SyntheticEvent<HTMLAudioElement>) {
  const current = event.currentTarget
  document.querySelectorAll('audio').forEach((player) => {
    if (player !== current) player.pause()
  })
}

function DemoCard({ demo, index }: { demo: Demo; index: number }) {
  const src = '/demos/' + demo.file.split('/').map(encodeURIComponent).join('/')

  return (
    <article
      className="rise-in island-shell feature-card rounded-2xl p-6 sm:p-8"
      style={{ animationDelay: `${index * 80 + 60}ms` }}
    >
      <div className="mb-4">
        <span className="island-kicker mb-2 block">{demo.genre}</span>
        <h2
          className="display-title m-0 text-xl sm:text-2xl"
          style={{ color: 'var(--sea-ink)' }}
        >
          {demo.title}
        </h2>
        {demo.source && (
          <p className="mt-1 text-sm italic" style={{ color: 'var(--sea-ink-soft)' }}>
            {demo.source}
          </p>
        )}
      </div>

      <p className="mb-5 text-sm leading-7" style={{ color: 'var(--sea-ink-soft)' }}>
        {demo.description}
      </p>

      {demo.disclaimer && (
        <p
          className="mb-5 flex items-start gap-2 rounded-lg border px-4 py-3 text-xs leading-6 italic"
          style={{
            borderColor: 'color-mix(in oklab, var(--lagoon) 22%, transparent)',
            background: 'color-mix(in oklab, var(--lagoon) 8%, transparent)',
            color: 'var(--sea-ink-soft)',
          }}
        >
          <span style={{ color: 'var(--lagoon)', flexShrink: 0 }}>ⓘ</span>
          {demo.disclaimer}
        </p>
      )}

      {demo.characters && demo.characters.length > 0 && (
        <div className="mb-6">
          <p
            className="mb-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: 'var(--sea-ink-soft)', opacity: 0.7 }}
          >
            Characters
          </p>
          <ul className="space-y-1.5">
            {demo.characters.map((c) => (
              <li key={c.name} className="text-sm leading-6">
                <strong style={{ color: 'var(--sea-ink)', fontWeight: 600 }}>{c.name}</strong>
                <span style={{ color: 'var(--sea-ink-soft)' }}> — {c.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="audio-player-wrap">
        <audio controls preload="metadata" onPlay={pauseOtherPlayers} className="w-full">
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </article>
  )
}

function Demos() {
  const navigate = Route.useNavigate()
  const { tab } = Route.useSearch()
  const activeGenre = TABS.find((t) => t.slug === tab)?.genre ?? TABS[0].genre

  const visibleDemos = DEMOS.filter((d) => d.genre === activeGenre)

  return (
    <main className="page-wrap px-4 pb-16 pt-12">

      <header className="rise-in mb-8">
        <p className="island-kicker mb-3">Listen</p>
        <h1
          className="display-title text-4xl sm:text-5xl"
          style={{ color: 'var(--sea-ink)' }}
        >
          Demo Recordings
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7" style={{ color: 'var(--sea-ink-soft)' }}>
          A selection of work across different genres. More demos will be added as they become available.
        </p>
      </header>

      {/* ── Tabs ─────────────────────────────────────────────────────── */}
      <div
        className="rise-in mb-8 flex gap-1 rounded-xl border p-1 w-full sm:w-fit"
        style={{
          borderColor: 'var(--line)',
          background: 'var(--surface)',
          animationDelay: '60ms',
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.genre}
            type="button"
            onClick={() => navigate({ search: { tab: t.slug }, resetScroll: false })}
            className="flex-1 sm:flex-none whitespace-nowrap rounded-lg px-2 py-2 text-xs sm:px-5 sm:text-sm font-semibold transition text-center"
            style={
              activeGenre === t.genre
                ? {
                    background: 'color-mix(in oklab, var(--lagoon) 18%, var(--surface-strong))',
                    border: '1px solid color-mix(in oklab, var(--lagoon) 40%, transparent)',
                    color: 'var(--sea-ink)',
                  }
                : {
                    background: 'transparent',
                    border: '1px solid transparent',
                    color: 'var(--sea-ink-soft)',
                  }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ──────────────────────────────────────────────── */}
      {visibleDemos.length > 0 ? (
        <div className="space-y-5">
          {visibleDemos.map((demo, i) => (
            <DemoCard key={demo.file} demo={demo} index={i} />
          ))}
        </div>
      ) : (
        <div className="rise-in island-shell rounded-2xl px-8 py-16 text-center">
          <p className="display-title mb-3 text-2xl" style={{ color: 'var(--sea-ink)' }}>
            Coming soon
          </p>
          <p className="text-sm" style={{ color: 'var(--sea-ink-soft)' }}>
            {activeGenre} demos will be added here shortly.
          </p>
        </div>
      )}

    </main>
  )
}
