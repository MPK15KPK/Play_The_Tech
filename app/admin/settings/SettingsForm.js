'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SettingsForm({ currentEmailValue }) {
  const router = useRouter()
  const [email, setEmail] = useState(currentEmailValue)
  const [current, setCurrent] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState([])
  const [done, setDone] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setErrors([])
    setDone('')

    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, current, password, confirm }),
    }).catch(() => null)

    setBusy(false)
    if (!res) {
      setErrors(['Could not reach the server. Nothing was changed.'])
      return
    }

    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      setErrors(json.errors || ['That did not save.'])
      return
    }

    setCurrent('')
    setPassword('')
    setConfirm('')
    setDone(
      json.passwordChanged
        ? 'Saved. Use the new password next time you sign in.'
        : 'Saved. The email address is updated.',
    )
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {errors.length > 0 && (
        <div className="notice bad" role="alert">
          {errors.map((m) => <p key={m}>{m}</p>)}
        </div>
      )}
      {done && (
        <div className="notice good" role="status">
          <p>{done}</p>
        </div>
      )}

      <div className="field">
        <label htmlFor="s-email">
          Sign-in Email <span className="req-pill">Required</span>
        </label>
        <input
          id="s-email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} autoComplete="username"
          placeholder="editor@playthetech.com"
        />
      </div>

      <div className="field">
        <label htmlFor="s-current">
          Current Password <span className="req-pill">Required</span>
        </label>
        <input
          id="s-current" type="password" value={current}
          onChange={(e) => setCurrent(e.target.value)} autoComplete="current-password"
          placeholder="••••••••••••"
        />
        <span className="hint">Proves identity to protect against unauthorized password changes.</span>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="s-new">New Password</label>
          <input
            id="s-new" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"
            placeholder="Minimum 12 characters"
          />
          <span className="hint">Leave blank to keep existing password and only change email.</span>
        </div>
        <div className="field">
          <label htmlFor="s-confirm">Confirm New Password</label>
          <input
            id="s-confirm" type="password" value={confirm}
            onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password"
            placeholder="Repeat new password"
          />
        </div>
      </div>

      <div className="actions">
        <button type="submit" className="button" disabled={busy}>
          {busy ? 'Saving…' : 'Save Credentials →'}
        </button>
        <a className="button secondary" href="/admin">Cancel</a>
      </div>
    </form>
  )
}
