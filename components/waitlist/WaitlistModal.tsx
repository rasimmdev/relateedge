'use client'

import { useEffect, useId, useRef, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

const HEAR_PLACEHOLDER = ''
const HEAR_OPTIONS = [
  { value: HEAR_PLACEHOLDER, label: 'Select…' },
  { value: 'search', label: 'Google / search' },
  { value: 'social', label: 'Social media' },
  { value: 'friend', label: 'Friend or colleague' },
  { value: 'upwork', label: 'Upwork / freelance community' },
  { value: 'other', label: 'Other' },
]

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const SUCCESS_MESSAGE = "You're on the list. We'll be in touch."
const GENERIC_ERROR = 'Error. Please try again later.'

export default function WaitlistModal({ open, onClose }: Props) {
  const titleId = useId()
  const emailRef = useRef<HTMLInputElement>(null)
  const [show, setShow] = useState(false)
  const [entered, setEntered] = useState(false)

  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [howHeard, setHowHeard] = useState(HEAR_PLACEHOLDER)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [touched, setTouched] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; howHeard?: string }>({})

  useEffect(() => {
    if (open) {
      setShow(true)
      const id = requestAnimationFrame(() => setEntered(true))
      return () => cancelAnimationFrame(id)
    }
    setEntered(false)
    const t = window.setTimeout(() => setShow(false), 320)
    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open || !show) return
    setStatus('idle')
    setMessage('')
    setTouched(false)
    setFieldErrors({})
    const t = requestAnimationFrame(() => emailRef.current?.focus())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, show, onClose])

  function validate() {
    const next: { email?: string; howHeard?: string } = {}
    const em = email.trim()
    if (!em) next.email = 'Email is required.'
    else if (!emailOk(em)) next.email = 'Enter a valid email address.'
    if (!howHeard || howHeard === HEAR_PLACEHOLDER) next.howHeard = 'Please tell us how you found us.'
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!validate()) return

    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          firstname: firstname.trim(),
          howHeard,
        }),
      })
      await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setMessage(GENERIC_ERROR)
        return
      }
      setStatus('success')
      setMessage(SUCCESS_MESSAGE)
      setEmail('')
      setFirstname('')
      setHowHeard(HEAR_PLACEHOLDER)
      setFieldErrors({})
    } catch {
      setStatus('error')
      setMessage(GENERIC_ERROR)
    }
  }

  const inputBase =
    'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-4'
  const inputOk = 'border-black/10 focus:border-indigo-300 focus:ring-indigo-500/15'
  const inputErr = 'border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-500/20'

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-[opacity,visibility] duration-300 ease-out ${
        entered ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby={titleId}
        className={`relative z-10 w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-2xl transition-[opacity,transform] duration-300 ease-out will-change-transform sm:p-8 ${
          entered ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.98] opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h2 id={titleId} className="pr-10 text-xl font-extrabold tracking-tight text-slate-900">
          Join to whitelist
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Leave your email — we&apos;ll notify you when RelateEdge opens.
        </p>

        {status === 'success' ? (
          <div className="mt-6 space-y-4">
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
              {message}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="wl-firstname" className="mb-1.5 block text-xs font-semibold text-slate-600">
                Name <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                id="wl-firstname"
                type="text"
                autoComplete="given-name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className={`${inputBase} ${inputOk}`}
                placeholder="Alex"
              />
            </div>
            <div>
              <label htmlFor="wl-email" className="mb-1.5 block text-xs font-semibold text-slate-600">
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                ref={emailRef}
                id="wl-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setFieldErrors((f) => ({ ...f, email: undefined }))
                }}
                aria-invalid={Boolean(fieldErrors.email)}
                className={`${inputBase} ${fieldErrors.email ? inputErr : inputOk}`}
                placeholder="you@example.com"
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs font-medium text-rose-600">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="wl-heard" className="mb-1.5 block text-xs font-semibold text-slate-600">
                How did you hear about us? <span className="text-rose-500">*</span>
              </label>
              <select
                id="wl-heard"
                value={howHeard}
                onChange={(e) => {
                  setHowHeard(e.target.value)
                  setFieldErrors((f) => ({ ...f, howHeard: undefined }))
                }}
                aria-invalid={Boolean(fieldErrors.howHeard)}
                className={`${inputBase} ${fieldErrors.howHeard ? inputErr : inputOk} cursor-pointer`}
              >
                {HEAR_OPTIONS.map((o) => (
                  <option key={o.value || 'empty'} value={o.value} disabled={o.value === HEAR_PLACEHOLDER}>
                    {o.label}
                  </option>
                ))}
              </select>
              {fieldErrors.howHeard && (
                <p className="mt-1.5 text-xs font-medium text-rose-600">{fieldErrors.howHeard}</p>
              )}
            </div>

            {status === 'error' && (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full cursor-pointer rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : 'Request access'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
