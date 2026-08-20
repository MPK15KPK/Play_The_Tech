'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify, countWords } from '../../../lib/format.js'
import ImageInsert from '../../../components/ImageInsert.js'

const BLANK = {
  title: '', slug: '', type: 'comparison',
  tool_1: '', tool_2: '', website_1: '', website_2: '',
  link_1: '', link_2: '', summary: '', content: '', author: '',
  published: false,
}

const STARTER = `| Criterion | Tool one | Tool two |
|---|---|---|
| Entry price | ▸ $29 per user/mo[^1] | $49 per user/mo[^2] |
| Free tier | Not published | 14-day trial[^2] |
| § Offline quoting | Yes, syncs on reconnect[^1] | No[^2] |

Write the difference that actually decides it here — the one a buyer in this
trade would ask about and that would be false for any other pair of tools.

## Which should you choose?

## Frequently asked questions

### Question a buyer actually types
`

export default function PostForm({ post }) {
  const router = useRouter()
  const [form, setForm] = useState(() => ({ ...BLANK, ...(post || {}) }))
  const [errors, setErrors] = useState([])
  const [state, setState] = useState('idle')
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug))
  const contentRef = useRef(null)

  const words = countWords(form.summary)
  const summaryOk = words >= 20 && words <= 80

  function set(name, value) {
    setForm((f) => ({ ...f, [name]: value }))
  }

  function onTitle(value) {
    set('title', value)
    // Auto-fills until you edit it yourself, then leaves it alone.
    if (!slugTouched) set('slug', slugify(value))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setState('saving')
    setErrors([])

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: post?.id }),
    }).catch(() => null)

    if (!res) {
      setErrors(['Could not reach the server. Nothing was saved.'])
      setState('idle')
      return
    }

    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      setErrors(json.errors || ['That did not save.'])
      setState('idle')
      return
    }

    setState('saved')
    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {errors.length > 0 && (
        <div className="notice bad" role="alert">
          {errors.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      )}

      <div className="field">
        <label htmlFor="title">Title <span className="req">required</span></label>
        <input
          id="title" name="title" type="text" value={form.title}
          onChange={(e) => onTitle(e.target.value)} maxLength={200}
        />
        <span className="hint">Write the question a buyer types, not a label.</span>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="slug">Slug <span className="req">required</span></label>
          <input
            id="slug" name="slug" type="text" value={form.slug}
            onChange={(e) => { setSlugTouched(true); set('slug', e.target.value) }}
            maxLength={120}
          />
          <span className="hint">/compare/{form.slug || '…'} — lowercase, hyphens, unique.</span>
        </div>
        <div className="field">
          <label htmlFor="type">Type <span className="req">required</span></label>
          <select id="type" name="type" value={form.type} onChange={(e) => set('type', e.target.value)}>
            <option value="comparison">comparison</option>
            <option value="roundup">roundup</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="tool_1">Tool 1 <span className="req">required</span></label>
          <input id="tool_1" type="text" value={form.tool_1} onChange={(e) => set('tool_1', e.target.value)} maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="tool_2">Tool 2 <span className="req">required</span></label>
          <input id="tool_2" type="text" value={form.tool_2} onChange={(e) => set('tool_2', e.target.value)} maxLength={120} />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="website_1">Website 1</label>
          <input id="website_1" type="text" value={form.website_1 || ''} onChange={(e) => set('website_1', e.target.value)} maxLength={200} />
          <span className="hint">Domain only, e.g. notion.so</span>
        </div>
        <div className="field">
          <label htmlFor="website_2">Website 2</label>
          <input id="website_2" type="text" value={form.website_2 || ''} onChange={(e) => set('website_2', e.target.value)} maxLength={200} />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="link_1">Link 1 <span className="req">required</span></label>
          <input id="link_1" type="url" value={form.link_1 || ''} onChange={(e) => set('link_1', e.target.value)} maxLength={500} />
          <span className="hint">The vendor page the tool 1 facts came from. Becomes source [^1].</span>
        </div>
        <div className="field">
          <label htmlFor="link_2">Link 2 <span className="req">required</span></label>
          <input id="link_2" type="url" value={form.link_2 || ''} onChange={(e) => set('link_2', e.target.value)} maxLength={500} />
          <span className="hint">Source [^2]. Never another comparison site.</span>
        </div>
      </div>

      <div className="field">
        <label htmlFor="summary">
          Summary <span className="req">required</span>
          {' — '}
          <span style={{ color: summaryOk ? 'var(--mark)' : 'var(--flag)' }}>
            {words} words
          </span>
        </label>
        <textarea id="summary" rows={4} value={form.summary || ''} onChange={(e) => set('summary', e.target.value)} maxLength={1200} />
        <span className="hint">
          40–60 words, enforced at 20–80. Answer the question outright in the first
          sentence — this is the passage most likely to be lifted into an AI answer.
        </span>
      </div>

      <div className="field">
        <label htmlFor="content">Content <span className="req">required</span></label>
        <textarea
          id="content" className="code" rows={26}
          ref={contentRef}
          value={form.content || ''}
          onChange={(e) => set('content', e.target.value)}
          placeholder={STARTER}
        />
        <ImageInsert
          textareaRef={contentRef}
          onInsert={(full, append) => set('content', full ?? `${form.content || ''}${append}`)}
        />
        <span className="hint">
          Markdown. <strong>Start with the comparison table</strong> — the page prints
          the &ldquo;How do X and Y compare?&rdquo; heading directly above whatever comes
          first here.
        </span>
        <span className="hint">
          In a table cell: <code>▸</code> at the start marks the winning cell,{' '}
          <code>§</code> at the start of the first cell begins a new row group, and{' '}
          <code>Not published</code> is how a missing figure is written — never blank,
          never an em-dash. <code>[^1]</code> and <code>[^2]</code> anywhere become
          superscript source marks pointing at Link 1 and Link 2.
        </span>
        <span className="hint">
          Optional front matter at the very top feeds the verification stamp under the
          table: <code>---</code> / <code>verified: 2026-08-12</code> /{' '}
          <code>method: documentation</code> / <code>criteria: ops-v1</code> /{' '}
          <code>---</code>. Leave <code>method</code> out unless the tool was actually
          used.
        </span>
      </div>

      <div className="field">
        <label htmlFor="author">Author <span className="req">required</span></label>
        <input id="author" type="text" value={form.author || ''} onChange={(e) => set('author', e.target.value)} maxLength={120} />
        <span className="hint">A real person&rsquo;s name. Not &ldquo;Editorial team&rdquo;.</span>
      </div>

      <div className="field checkbox">
        <input
          id="published" type="checkbox" checked={Boolean(form.published)}
          onChange={(e) => set('published', e.target.checked)}
        />
        <label htmlFor="published">
          Published — a human has read this and it names a genuine difference
        </label>
      </div>

      <div className="actions">
        <button type="submit" disabled={state === 'saving'}>
          {state === 'saving' ? 'Saving…' : post ? 'Save changes' : 'Create post'}
        </button>
        <a className="button secondary" href="/admin">Cancel</a>
      </div>
    </form>
  )
}
