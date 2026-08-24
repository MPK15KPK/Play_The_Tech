'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log client/server error for debugging
    console.error('Unhandled runtime error:', error)
  }, [error])

  return (
    <div className="shell notfound-shell">
      <div className="notfound-card">
        <div className="notfound-badge bad">
          <span className="notfound-dot bad" />
          500 · System Exception
        </div>

        <h1 className="notfound-title">Something unexpected went wrong</h1>
        <p className="notfound-lead">
          Our application encountered an unexpected runtime condition while rendering this view.
          No data was lost. You can try refreshing the view or returning to the homepage.
        </p>

        <div className="notfound-actions">
          <button type="button" className="button" onClick={() => reset()}>
            <span>Try Again</span>
          </button>
          <a className="button secondary" href="/">
            <span>Return to Home</span>
          </a>
        </div>
      </div>
    </div>
  )
}
