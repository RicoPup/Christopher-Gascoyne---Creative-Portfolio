// Update SITE_URL once the final domain is live (used for canonical + social tags).
export const SITE_URL = 'https://gascoynevoice.com'
export const SITE_NAME = 'Christopher Gascoyne'
export const DEFAULT_DESCRIPTION =
  'Christopher Gascoyne is a voice actor and narrator with a background in classical voice and opera, covering audiobooks, character work, commercials, and corporate narration.'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/photos/VA-headshot-800x800.webp`

interface SeoOptions {
  title: string
  description?: string
  /** Path including leading slash, e.g. "/demos". Defaults to home. */
  path?: string
  image?: string
}

export function seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = DEFAULT_OG_IMAGE,
}: SeoOptions) {
  const url = `${SITE_URL}${path}`

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
