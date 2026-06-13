import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState, type FormEvent } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

export const Route = createFileRoute('/contact')({ component: Contact })

const WEB3FORMS_KEY = 'c0516a0c-8cfa-4103-8b02-ef18b7d1c2aa'
const HCAPTCHA_SITE_KEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'

type Status = 'idle' | 'submitting' | 'success' | 'error'

function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!captchaToken) return

    setStatus('submitting')

    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          'h-captcha-response': captchaToken,
          ...data,
        }),
      })

      if (res.ok) {
        setStatus('success')
        captchaRef.current?.resetCaptcha()
        setCaptchaToken(null)
      } else {
        setStatus('error')
        captchaRef.current?.resetCaptcha()
        setCaptchaToken(null)
      }
    } catch {
      setStatus('error')
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
    }
  }

  return (
    <main className="page-wrap px-4 pb-16 pt-12">

      <header className="rise-in mb-10">
        <p className="island-kicker mb-3">Reach Out</p>
        <h1
          className="display-title text-4xl sm:text-5xl"
          style={{ color: 'var(--sea-ink)' }}
        >
          Get in Touch
        </h1>
        <p className="mt-4 max-w-lg text-base leading-7" style={{ color: 'var(--sea-ink-soft)' }}>
          Interested in working together? Send a message below and I'll get back to you as soon as possible.
        </p>
        <p className="mt-3 max-w-lg text-sm leading-7" style={{ color: 'var(--sea-ink-soft)', opacity: 0.75 }}>
          I also build websites for performers and creative professionals. Mention this in your message if you're interested.
        </p>
      </header>

      <div className="rise-in max-w-xl" style={{ animationDelay: '60ms' }}>
        {status === 'success' ? (
          <div className="island-shell rounded-2xl px-8 py-10 text-center">
            <p className="display-title mb-3 text-2xl" style={{ color: 'var(--sea-ink)' }}>
              Message sent!
            </p>
            <p className="text-sm" style={{ color: 'var(--sea-ink-soft)' }}>
              Thanks for reaching out. I'll be in touch soon.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-6 rounded-full border px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
              style={{
                borderColor: 'var(--chip-line)',
                background: 'var(--chip-bg)',
                color: 'var(--sea-ink-soft)',
              }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="island-shell rounded-2xl px-8 py-10 space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'var(--sea-ink-soft)' }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="va-input"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'var(--sea-ink-soft)' }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="va-input"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="subject"
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--sea-ink-soft)' }}
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project inquiry, casting, etc."
                className="va-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--sea-ink-soft)' }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Tell me about your project…"
                className="va-textarea"
              />
            </div>

            <HCaptcha
              ref={captchaRef}
              sitekey={HCAPTCHA_SITE_KEY}
              reCaptchaCompat={false}
              theme="dark"
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
            />

            {status === 'error' && (
              <p className="text-sm" style={{ color: '#e05252' }}>
                Something went wrong — please try again or email me directly.
              </p>
            )}

            <button
              type="submit"
              disabled={!captchaToken || status === 'submitting'}
              className="w-full rounded-full border py-3 text-sm font-bold transition hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{
                borderColor: 'color-mix(in oklab, var(--lagoon) 50%, transparent)',
                background: 'color-mix(in oklab, var(--lagoon) 18%, var(--surface-strong))',
                color: 'var(--sea-ink)',
              }}
            >
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>

    </main>
  )
}
