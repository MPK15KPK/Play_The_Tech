'use client'

import { useState } from 'react'

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
      <div className="notice good request-success-card" role="status">
        <div className="notice-icon">✓</div>
        <div>
          <h3>Comparison Request Received</h3>
          <p>
            Requests are reviewed weekly by our editorial team and prioritized by how often the same pair is requested. If you provided an email, we'll notify you as soon as the benchmark is published.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form className="request-form-body" onSubmit={onSubmit} noValidate>
      {errors.length > 0 && (
        <div className="notice bad" role="alert">
          {errors.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      )}

      <div className="form-grid-2">
        <div className="field">
          <label htmlFor="tool_1">
            First Platform / Tool <span className="req-pill">Required</span>
          </label>
          <input
            id="tool_1"
            name="tool_1"
            type="text"
            required
            maxLength={120}
            autoComplete="off"
            placeholder="e.g. Salesforce Agentforce"
          />
        </div>
        <div className="field">
          <label htmlFor="tool_2">
            Second Platform / Tool <span className="req-pill">Required</span>
          </label>
          <input
            id="tool_2"
            name="tool_2"
            type="text"
            required
            maxLength={120}
            autoComplete="off"
            placeholder="e.g. Salezx or MS Copilot"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="industry">Industry / Business Sector</label>
        <input
          id="industry"
          name="industry"
          type="text"
          maxLength={120}
          autoComplete="off"
          placeholder="e.g. Manufacturing, B2B SaaS, Professional Services, Healthcare..."
        />
        <span className="hint">Helps us evaluate against sector-specific ERP, compliance, and quoting requirements.</span>
      </div>

      <div className="field">
        <label htmlFor="note">What does your decision hinge on?</label>
        <textarea
          id="note"
          name="note"
          rows={4}
          maxLength={2000}
          placeholder="e.g. We need native SAP S/4HANA connectivity, multi-tiered price book calculation, or unlimited seat licensing without per-seat add-on fees."
        />
        <span className="hint">Tell us your core constraint: budget ceiling, offline use, live ERP sync, CRM stack, etc.</span>
      </div>

      <div className="field">
        <label htmlFor="email">Work Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          maxLength={200}
          autoComplete="email"
          placeholder="name@company.com"
        />
        <span className="hint">Optional. We will only email you a link when this comparison is published. Zero marketing spam.</span>
      </div>

      {/* Honeypot field for spam bots */}
      <div className="vh" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-actions-wrap">
        <button className="submit-btn" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Submitting Request…' : 'Submit Comparison Request →'}
        </button>
      </div>
    </form>
  )
}
