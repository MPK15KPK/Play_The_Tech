'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Relative paths only — a full URL here would be an open redirect.
  const raw = params.get('next') || '/admin'
  const next = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/admin'

  async function onSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')

    const form = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(json.error || 'Email or password is incorrect.')
        setBusy(false)
        return
      }
      router.replace(next)
      router.refresh()
    } catch {
      setError('Could not reach the server. Try again.')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <div className="notice bad" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" />
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>

      <div className="actions">
        <button type="submit" disabled={busy}>{busy ? 'Checking…' : 'Sign in'}</button>
      </div>
    </form>
  )
}
