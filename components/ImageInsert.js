'use client'

import { useRef, useState } from 'react'

const MAX_W = 1400       // wide enough for a full-width screenshot on a 2x display
const QUALITY = 0.82
const WARN_AT = 400_000  // ~400KB of base64 in one image is worth a warning

/**
 * Reads an image, downscales it in a canvas, and inserts a markdown figure
 * with a data: URI into the content textarea.
 *
 * Inlining base64 is the owner's chosen trade-off: no storage service to run,
 * at the cost of page weight, since the bytes cannot be cached separately from
 * the HTML. The downscale-and-recompress step is what keeps that cost sane —
 * a 4MB phone photo lands at roughly 150KB.
 */
export default function ImageInsert({ textareaRef, onInsert }) {
  const fileRef = useRef(null)
  const [alt, setAlt] = useState('')
  const [caption, setCaption] = useState('')
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState('')

  async function shrink(file) {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_W / bitmap.width)
    const w = Math.round(bitmap.width * scale)
    const h = Math.round(bitmap.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(bitmap, 0, 0, w, h)
    bitmap.close?.()

    // WebP where the browser supports it, JPEG otherwise. PNG only for images
    // that need transparency, since it is far heavier at photographic content.
    const type = file.type === 'image/png' ? 'image/png' : 'image/webp'
    const data = canvas.toDataURL(type, QUALITY)
    return { data, w, h, type }
  }

  async function handle(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!alt.trim()) {
      setNote('Write the alt text first — it describes the image for screen readers and for search.')
      e.target.value = ''
      return
    }

    setBusy(true)
    setNote('')
    try {
      const { data, w, h } = await shrink(file)
      const kb = Math.round(data.length / 1024)

      const md = caption.trim()
        ? `\n\n![${alt.trim()}](${data} "${caption.trim().replace(/"/g, "'")}")\n\n`
        : `\n\n![${alt.trim()}](${data})\n\n`

      // Insert at the cursor rather than appending, so it lands in context.
      const ta = textareaRef?.current
      if (ta) {
        const at = ta.selectionStart ?? ta.value.length
        onInsert(ta.value.slice(0, at) + md + ta.value.slice(at))
      } else {
        onInsert(null, md)
      }

      setNote(
        `Inserted at ${w}×${h}, ${kb}KB.` +
        (data.length > WARN_AT ? ' That is large for an inlined image — consider a tighter crop.' : ''),
      )
      setAlt('')
      setCaption('')
    } catch (err) {
      setNote(`Could not read that image: ${err.message}`)
    }
    setBusy(false)
    e.target.value = ''
  }

  return (
    <div className="image-insert">
      <p className="aside-label">Inline Image Attachment</p>

      <div className="row">
        <div className="field">
          <label htmlFor="img-alt">
            Alt Text <span className="req-pill">Required</span>
          </label>
          <input
            id="img-alt" type="text" value={alt} maxLength={300}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Describe what the screenshot shows"
          />
        </div>
        <div className="field">
          <label htmlFor="img-cap">Caption</label>
          <input
            id="img-cap" type="text" value={caption} maxLength={300}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Product name and capture date"
          />
        </div>
      </div>

      <div className="image-insert-actions">
        <button
          type="button"
          className="button secondary"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
        >
          {busy ? 'Processing…' : '📁 Choose Image'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handle}
          className="vh"
        />
        <span className="hint">
          Downscaled to {MAX_W}px wide and converted to optimized WebP.
        </span>
      </div>

      {note ? <p className="hint" style={{ color: '#DC2626', fontWeight: 600 }}>{note}</p> : null}
    </div>
  )
}
