import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Analytics } from '@vercel/analytics/react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { DEFAULT_DESCRIPTION, PROFILE_IMAGE, SITE_NAME, SITE_URL } from '../utils/seo'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark')?stored:'dark';var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(mode);root.setAttribute('data-theme',mode);root.style.colorScheme=mode;}catch(e){}})();`

const PERSON_JSONLD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'Voice Actor',
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  image: PROFILE_IMAGE,
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Royal Northern College of Music',
  },
  knowsAbout: [
    'Voice Acting',
    'Audiobook Narration',
    'Commercial Voiceover',
    'Classical Voice',
    'Opera',
  ],
})

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'theme-color',
        content: '#090a0f',
      },
      {
        title: `${SITE_NAME} — Voice Actor`,
      },
      {
        name: 'description',
        content: DEFAULT_DESCRIPTION,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: 'any',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/logos/goldendog-logo-192x192.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/logos/goldendog-logo-192x192.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: PERSON_JSONLD }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Analytics />
        <Scripts />
      </body>
    </html>
  )
}
