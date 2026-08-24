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
        <label htmlFor="title">
          Title <span className="req-pill">Required</span>
        </label>
        <input
          id="title" name="title" type="text" value={form.title}
          onChange={(e) => onTitle(e.target.value)} maxLength={200}
          placeholder="e.g. HubSpot vs Salesforce for growing sales teams (2026)"
        />
        <span className="hint">Write the exact comparative query a buyer types, not a short generic label.</span>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="slug">
            Slug <span className="req-pill">Required</span>
          </label>
          <input
            id="slug" name="slug" type="text" value={form.slug}
            onChange={(e) => { setSlugTouched(true); set('slug', e.target.value) }}
            maxLength={120}
            placeholder="hubspot-vs-salesforce"
          />
          <span className="hint">URL path: /compare/{form.slug || '…'} (lowercase, hyphens, unique).</span>
        </div>
        <div className="field">
          <label htmlFor="type">
            Comparison Format <span className="req-pill">Required</span>
          </label>
          <select id="type" name="type" value={form.type} onChange={(e) => set('type', e.target.value)}>
            <option value="comparison">Head-to-Head Comparison (2 tools)</option>
            <option value="roundup">Multi-tool Industry Roundup / Rankings</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="tool_1">
            Tool 1 Name <span className="req-pill">Required</span>
          </label>
          <input id="tool_1" type="text" value={form.tool_1} onChange={(e) => set('tool_1', e.target.value)} maxLength={120} placeholder="e.g. HubSpot Sales Hub" />
        </div>
        <div className="field">
          <label htmlFor="tool_2">
            Tool 2 Name <span className="req-pill">Required</span>
          </label>
          <input id="tool_2" type="text" value={form.tool_2} onChange={(e) => set('tool_2', e.target.value)} maxLength={120} placeholder="e.g. Salesforce Sales Cloud" />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="website_1">Tool 1 Domain</label>
          <input id="website_1" type="text" value={form.website_1 || ''} onChange={(e) => set('website_1', e.target.value)} maxLength={200} placeholder="hubspot.com" />
          <span className="hint">Domain only without https://</span>
        </div>
        <div className="field">
          <label htmlFor="website_2">Tool 2 Domain</label>
          <input id="website_2" type="text" value={form.website_2 || ''} onChange={(e) => set('website_2', e.target.value)} maxLength={200} placeholder="salesforce.com" />
          <span className="hint">Domain only without https://</span>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="link_1">
            Primary Source 1 <span className="req-pill">Required</span>
          </label>
          <input id="link_1" type="url" value={form.link_1 || ''} onChange={(e) => set('link_1', e.target.value)} maxLength={500} placeholder="https://www.hubspot.com/pricing/sales" />
          <span className="hint">Direct vendor pricing/docs page. Powers source mark [^1].</span>
        </div>
        <div className="field">
          <label htmlFor="link_2">
            Primary Source 2 <span className="req-pill">Required</span>
          </label>
          <input id="link_2" type="url" value={form.link_2 || ''} onChange={(e) => set('link_2', e.target.value)} maxLength={500} placeholder="https://www.salesforce.com/editions-pricing/sales-cloud" />
          <span className="hint">Direct vendor pricing/docs page. Powers source mark [^2].</span>
        </div>
      </div>

      <div className="field">
        <label htmlFor="summary">
          Executive Summary <span className="req-pill">Required</span>
          {' — '}
          <span style={{ color: summaryOk ? '#059669' : '#DC2626', fontWeight: 700 }}>
            {words} words {summaryOk ? '✓' : '(aim for 40–60 words)'}
          </span>
        </label>
        <textarea id="summary" rows={4} value={form.summary || ''} onChange={(e) => set('summary', e.target.value)} maxLength={1200} placeholder="Provide a concise 2-sentence verdict directly answering which tool wins for what specific scenario..." />
        <span className="hint">
          40–60 words (enforced 20–80). State the fundamental difference immediately in sentence one.
        </span>
      </div>

      <div className="field">
        <label htmlFor="content">
          Markdown Benchmark Body &amp; Matrix <span className="req-pill">Required</span>
        </label>
        <textarea
          id="content" className="code" rows={24}
          ref={contentRef}
          value={form.content || ''}
          onChange={(e) => set('content', e.target.value)}
          placeholder={STARTER}
        />
        <ImageInsert
          textareaRef={contentRef}
          onInsert={(full, append) => set('content', full ?? `${form.content || ''}${append}`)}
        />
        <div className="editor-tips-box">
          <strong>Markdown Matrix Syntax Guide:</strong>
          <ul>
            <li><code>▸</code> at the start of a cell marks the category winner.</li>
            <li><code>§</code> at the start of the first cell begins a new group header.</li>
            <li><code>Not published</code> is the standard for unlisted pricing — never leave blank.</li>
            <li><code>[^1]</code> and <code>[^2]</code> automatically link to verified Source Links 1 &amp; 2.</li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="author">
            Author / Analyst <span className="req-pill">Required</span>
          </label>
          <input id="author" type="text" value={form.author || ''} onChange={(e) => set('author', e.target.value)} maxLength={120} placeholder="e.g. Editorial Analyst Team" />
          <span className="hint">Author attribution for editorial transparency.</span>
        </div>

        <div className="field checkbox-field">
          <label htmlFor="published" className="checkbox-label">
            <input
              id="published" type="checkbox" checked={Boolean(form.published)}
              onChange={(e) => set('published', e.target.checked)}
            />
            <span>
              <strong>Publish Live to Index</strong>
              <small>Verified by human editor and matches live vendor pricing.</small>
            </span>
          </label>
        </div>
      </div>

      <div className="actions">
        <button type="submit" className="button" disabled={state === 'saving'}>
          {state === 'saving' ? 'Saving…' : post ? 'Save Changes →' : 'Publish Comparison →'}
        </button>
        <a className="button secondary" href="/admin">Cancel</a>
      </div>
    </form>
  )
}
