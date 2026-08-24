'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { REQUEST_STATUSES } from '../../lib/validate.js'

const STATUS_CONFIG = {
  new: { label: 'New', color: 'status-new', icon: '✦' },
  planned: { label: 'Planned', color: 'status-planned', icon: '⏳' },
  done: { label: 'Done', color: 'status-done', icon: '✓' },
  rejected: { label: 'Rejected', color: 'status-rejected', icon: '✕' },
}

export default function StatusControl({ id, status }) {
  const router = useRouter()
  const [value, setValue] = useState(status)
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', onClickOutside)
      document.addEventListener('touchstart', onClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('touchstart', onClickOutside)
    }
  }, [open])

  async function save(next) {
    if (next === value) {
      setOpen(false)
      return
    }
    const previous = value
    setValue(next)
    setOpen(false)
    setBusy(true)
    setFailed(false)

    const res = await fetch('/api/requests', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: next }),
    }).catch(() => null)

    setBusy(false)
    if (!res || !res.ok) {
      setValue(previous)
      setFailed(true)
      return
    }
    router.refresh()
  }

  const current = STATUS_CONFIG[value] || { label: value, color: 'status-new', icon: '✦' }

  return (
    <div className="status-control-wrap" ref={ref}>
      <button
        type="button"
        className={`status-badge-btn ${current.color}${open ? ' is-active' : ''}`}
        onClick={() => setOpen(!open)}
        disabled={busy}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Change status for request ${id}, current is ${current.label}`}
      >
        <span className="status-icon">{current.icon}</span>
        <span className="status-text">{busy ? 'Saving...' : current.label}</span>
        <svg className="status-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="status-dropdown-menu" role="listbox" aria-label="Select request status">
          {REQUEST_STATUSES.map((s) => {
            const conf = STATUS_CONFIG[s] || { label: s, color: '', icon: '•' }
            const isSelected = s === value
            return (
              <button
                key={s}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`status-dropdown-item ${conf.color}${isSelected ? ' is-selected' : ''}`}
                onClick={() => save(s)}
              >
                <span className="status-icon">{conf.icon}</span>
                <span className="status-text">{conf.label}</span>
                {isSelected && (
                  <svg className="status-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}

      {failed && <span className="status-failed-msg">Failed to save</span>}
    </div>
  )
}
