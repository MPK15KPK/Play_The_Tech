'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { REQUEST_STATUSES } from '../../lib/validate.js'

export default function StatusControl({ id, status }) {
  const router = useRouter()
  const [value, setValue] = useState(status)
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)

  async function save(next) {
    const previous = value
    setValue(next)
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

  return (
    <span className="inline-form">
      <label className="vh" htmlFor={`status-${id}`}>Status for request {id}</label>
      <select
        id={`status-${id}`}
        value={value}
        disabled={busy}
        onChange={(e) => save(e.target.value)}
      >
        {REQUEST_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      {failed ? <span className="np">not saved</span> : null}
    </span>
  )
}
