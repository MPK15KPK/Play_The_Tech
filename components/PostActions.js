'use client'

import { useEffect, useState } from 'react'
import {
  LinkedInIcon, XIcon, WhatsAppIcon, RedditIcon, EmailIcon, LinkIcon, CheckIcon,
} from './ShareIcons.js'

/**
 * Views, votes and sharing. A client island deliberately kept OUTSIDE the
 * article: post content stays server-rendered so crawlers that do not run
 * JavaScript still get the whole comparison (GUARDRAILS R7.1, R7.2).
 *
 * Counts are server-rendered too, so they exist without JS; this only updates
 * them after an interaction.
 *
 * `variant="share"` renders the compact bar that sits above the article.
 */
export default function PostActions({ slug, title, url, initial, variant = 'full' }) {
  const [stats, setStats] = useState(initial || { views: 0, upvotes: 0, downvotes: 0 })
  const [vote, setVote] = useState(0)
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)

  const voteKey = `ptt.vote.${slug}`
  const dayKey = `ptt.seen.${slug}`
  const sessionKey = `ptt.viewed.${slug}`

  useEffect(() => {
    if (variant !== 'full') return

    try {
      setVote(Number(localStorage.getItem(voteKey)) || 0)
    } catch { /* private mode — voting works, it just is not remembered */ }

    let already = null
    try { already = sessionStorage.getItem(sessionKey) } catch { /* ignore */ }
    if (already) return

    // "Unique" means: first time THIS browser has opened THIS post TODAY.
    // Kept entirely client-side — the server stores a count, never an id.
    const today = new Date().toISOString().slice(0, 10)
    let firstToday = true
    try {
      firstToday = localStorage.getItem(dayKey) !== today
      localStorage.setItem(dayKey, today)
    } catch { /* ignore */ }

    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, action: 'view', unique: firstToday }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.ok) setStats({ views: d.views, upvotes: d.upvotes, downvotes: d.downvotes })
        try { sessionStorage.setItem(sessionKey, '1') } catch { /* ignore */ }
      })
      .catch(() => {})
  }, [slug, voteKey, dayKey, sessionKey, variant])

  async function cast(next) {
    if (busy) return
    const to = vote === next ? 0 : next
    const from = vote
    setBusy(true)
    setVote(to)

    try {
      const res = await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, action: 'vote', vote: to, from }),
      })
      const d = await res.json().catch(() => null)
      if (res.ok && d?.ok) {
        setStats({ views: d.views, upvotes: d.upvotes, downvotes: d.downvotes })
        try {
          if (to === 0) localStorage.removeItem(voteKey)
          else localStorage.setItem(voteKey, String(to))
        } catch { /* ignore */ }
      } else setVote(from)
    } catch {
      setVote(from)
    }
    setBusy(false)
  }

  async function copy() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch { /* cancelled — fall through */ }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  const enc = encodeURIComponent
  const links = [
    { key: 'li', label: 'LinkedIn', Icon: LinkedInIcon, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { key: 'x', label: 'X', Icon: XIcon, href: `https://x.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
    { key: 'wa', label: 'WhatsApp', Icon: WhatsAppIcon, href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { key: 'rd', label: 'Reddit', Icon: RedditIcon, href: `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(title)}` },
    { key: 'em', label: 'Email', Icon: EmailIcon, href: `mailto:?subject=${enc(title)}&body=${enc(url)}` },
  ]

  const shareButtons = (
    <div className="actions-share">
      <button
        type="button"
        className={`share-btn${copied ? ' copied' : ''}`}
        onClick={copy}
        title="Copy link"
      >
        {copied ? <CheckIcon /> : <LinkIcon />}
        <span>{copied ? 'Copied' : 'Copy link'}</span>
      </button>
      {links.map(({ key, label, Icon, href }) => (
        <a
          key={key}
          className={`share-btn icon-only ${key}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          title={`Share on ${label}`}
        >
          <Icon />
          <span className="vh">Share on {label}</span>
        </a>
      ))}
    </div>
  )

  if (variant === 'share') {
    return (
      <section className="actions-bar top" aria-label="Share this comparison">
        <span className="actions-question">Share</span>
        {shareButtons}
      </section>
    )
  }

  const fmt = (n) => new Intl.NumberFormat('en-GB').format(Number(n) || 0)

  return (
    <section className="actions-bar" aria-label="Page feedback and sharing">
      <div className="actions-stat">
        <span className="actions-n">{fmt(stats.views)}</span>
        <span className="actions-label">{Number(stats.views) === 1 ? 'view' : 'views'}</span>
      </div>

      <div className="actions-vote" role="group" aria-label="Was this comparison useful?">
        <span className="actions-question">Was this useful?</span>
        <button
          type="button"
          className={`vote-btn ${vote === 1 ? 'on up' : ''}`}
          onClick={() => cast(1)}
          disabled={busy}
          aria-pressed={vote === 1}
        >
          <span aria-hidden="true">▲</span> Yes <span className="vote-n">{fmt(stats.upvotes)}</span>
        </button>
        <button
          type="button"
          className={`vote-btn ${vote === -1 ? 'on down' : ''}`}
          onClick={() => cast(-1)}
          disabled={busy}
          aria-pressed={vote === -1}
        >
          <span aria-hidden="true">▼</span> No <span className="vote-n">{fmt(stats.downvotes)}</span>
        </button>
      </div>

      {shareButtons}
    </section>
  )
}
