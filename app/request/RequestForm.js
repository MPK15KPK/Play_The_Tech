'use client'

import { useState } from 'react'

// A client component, and only here: /request is noindex and carries no content
// a crawler needs. Post pages stay server-only. R7.2.
export default function RequestForm() {
  const [state, setState] = useState('idle')
  const [errors, setErrors] = useState([])

  async function onSubmit(e) {
    e.preventDefault()
    setState('sending')
    setErrors([])

    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErrors(json.errors || ['That did not send. Try again shortly.'])
        setState('idle')
        return
      }
      setState('sent')
    } catch {
      setErrors(['That did not send — check your connection and try again.'])
      setState('idle')
    }
  }

  if (state === 'sent') {
    return (
      <div className="notice good" role="status">
        <p>
          Got it. Requests are read weekly and worked into the schedule by how often the
          same pair comes up. If you left an email address, you will hear from us when
          the comparison is published.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {errors.length > 0 && (
        <div className="notice bad" role="alert">
          {errors.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      )}

      <div className="row">
        <div className="field">
          <label htmlFor="tool_1">First tool <span className="req">required</span></label>
          <input id="tool_1" name="tool_1" type="text" required maxLength={120} autoComplete="off" />
        </div>
        <div className="field">
          <label htmlFor="tool_2">Second tool <span className="req">required</span></label>
          <input id="tool_2" name="tool_2" type="text" required maxLength={120} autoComplete="off" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="industry">Industry</label>
        <input id="industry" name="industry" type="text" maxLength={120} autoComplete="off" />
        <span className="hint">Building materials, machinery dealing, wholesale distribution — whatever you would call it.</span>
      </div>

      <div className="field">
        <label htmlFor="note">What does the decision hinge on?</label>
        <textarea id="note" name="note" rows={5} maxLength={2000} />
        <span className="hint">The constraint that rules a tool out. Budget ceiling, offline use, an ERP it has to talk to.</span>
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" maxLength={200} autoComplete="email" />
        <span className="hint">Optional, and only used to tell you when this comparison is published.</span>
      </div>

      {/* Left in the DOM for bots, hidden from people and screen readers. */}
      <div className="vh" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="actions">
        <button type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send request'}
        </button>
      </div>
    </form>
  )
}
