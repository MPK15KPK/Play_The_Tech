'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/** Publish toggle and delete, inline in the admin posts list. */
export default function PostControls({ id, slug, title, published }) {
  const router = useRouter()
  const [live, setLive] = useState(published)
  const [busy, setBusy] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState('')

  async function toggle() {
    const next = !live
    setBusy(true)
    setError('')
    setLive(next)

    const res = await fetch('/api/posts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, published: next }),
    }).catch(() => null)

    setBusy(false)
    if (!res || !res.ok) {
      setLive(!next)
      setError('Not saved')
      return
    }
    router.refresh()
  }

  async function remove() {
    setBusy(true)
    setError('')
    // Slug is sent back as confirmation so the server can refuse a mismatch.
    const res = await fetch(`/api/posts?id=${id}&slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    }).catch(() => null)

    setBusy(false)
    if (!res || !res.ok) {
      setError('Not deleted')
      setConfirming(false)
      return
    }
    router.refresh()
  }

  if (confirming) {
    return (
      <span className="inline-form">
        <span className="np">Delete &ldquo;{title.slice(0, 28)}…&rdquo; permanently?</span>
        <button type="button" onClick={remove} disabled={busy} className="danger">
          {busy ? 'Deleting…' : 'Delete'}
        </button>
        <button type="button" className="secondary" onClick={() => setConfirming(false)} disabled={busy}>
          Cancel
        </button>
      </span>
    )
  }

  return (
    <span className="manage">
      <button type="button" className="secondary" onClick={toggle} disabled={busy}>
        {live ? 'Unpublish' : 'Publish'}
      </button>
      <a className="button secondary" href={`/admin/new?id=${id}`}>Edit</a>
      <button type="button" className="secondary danger-text" onClick={() => setConfirming(true)} disabled={busy}>
        Delete
      </button>
      {error ? <span className="np">{error}</span> : null}
    </span>
  )
}
