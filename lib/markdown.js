import { marked } from 'marked'
import { longDate, slugify } from './format.js'
import { siteUrl } from './site.js'

// Renders post Markdown to the HTML string the server sends. Tables are built
// here rather than by marked's default renderer, because the table is the
// product (UI.md §4) and needs structure marked does not emit: row headers,
// winner glyphs, source superscripts, and rule-weight grouping.
//
// AUTHORING CONVENTIONS — all optional, all documented in the admin form:
//
//   [^2]            anywhere   superscript source ref, links to the source list
//   ▸ $499/mo       in a cell  marks the winning cell for that row
//   Not published   in a cell  rendered in --flag; never leave a cell empty
//   § Capability    first cell starts a new row group (heavier rule above)
//
// And optional front matter at the very top of the content, feeding the
// verification stamp under the table:
//
//   ---
//   verified: 2026-08-12
//   method: documentation
//   criteria: ops-tools-v1
//   ---

marked.setOptions({ gfm: true, breaks: false })

const FRONT = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

/** Splits optional front matter off the top. Unknown keys are ignored. */
export function parseFrontMatter(raw) {
  const src = String(raw || '')
  const m = src.match(FRONT)
  if (!m) return { meta: {}, body: src }

  const meta = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^\s*([A-Za-z_][\w-]*)\s*:\s*(.*)$/)
    if (kv) meta[kv[1].toLowerCase()] = kv[2].trim().replace(/^["']|["']$/g, '')
  }
  return { meta, body: src.slice(m[0].length) }
}


/** Markdown inline syntax stripped, for structured-data values. */
function plain(md) {
  return String(md || '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[\^\d+\]/g, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** [^3] → a superscript link into the sources list at the foot of the page. */
function sourceRefs(html) {
  return html.replace(/\[\^(\d{1,2})\]/g, (_, n) =>
    `<sup class="ref"><a href="#source-${n}" aria-label="Source ${n}">${n}</a></sup>`)
}

/**
 * Bare vendor domains in prose — "11x.ai; artisan.co; clay.com" — become real
 * links.
 *
 * A sources line is normally authored as plain text, so the only vendors that
 * ended up linked were the ones someone happened to write as Markdown links.
 * On a roundup that meant one linked vendor out of seven, and the one carrying
 * the link was Salezx. Every vendor named gets the same treatment (R1.3), and
 * the Salezx link stops being the page's lone outbound (R8.2).
 *
 * Text nodes only: anything already inside an anchor, code, or a heading is
 * left exactly as it was authored.
 */
const LINK_TLD = /^(com|ai|io|co|net|org|app|dev|so|xyz|tech|cloud|sh|to|me|us|ca|uk|de|fr|in|au|eu|nl|es|it|jp)$/
const BARE_DOMAIN = /\b((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+)([a-z]{2,})\b(\/[^\s<>"')\]]*)?/gi
const NO_LINK_INSIDE = /^(a|code|pre|h[1-6])$/i

function linkifyText(text, skipHosts) {
  if (!text || !text.includes('.')) return text
  return text.replace(BARE_DOMAIN, (full, labels, tld, path) => {
    if (!LINK_TLD.test(tld.toLowerCase())) return full
    const host = (labels + tld).toLowerCase()
    if (skipHosts.has(host.replace(/^www\./, ''))) return full
    if (host.split('.').length > 4) return full
    return `<a href="https://${host}${path || ''}" rel="nofollow noopener" target="_blank">${full}</a>`
  })
}

function autolinkDomains(html) {
  let own = ''
  try { own = new URL(siteUrl()).hostname.replace(/^www\./, '') } catch {}
  // Our own domain is an internal reference, not a source to cite outward.
  const skipHosts = new Set([own].filter(Boolean))

  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
  let out = ''
  let last = 0
  let depth = 0
  let m
  while ((m = tags.exec(html)) !== null) {
    const text = html.slice(last, m.index)
    out += depth > 0 ? text : linkifyText(text, skipHosts)
    out += m[0]
    last = tags.lastIndex
    if (NO_LINK_INSIDE.test(m[1]) && !m[0].endsWith('/>')) {
      if (m[0][1] === '/') depth = Math.max(0, depth - 1)
      else depth += 1
    }
  }
  const tail = html.slice(last)
  return out + (depth > 0 ? tail : linkifyText(tail, skipHosts))
}

function cellHtml(cell) {
  let text = String(cell?.text ?? '').trim()

  const win = text.startsWith('▸')
  if (win) text = text.replace(/^▸\s*/, '')

  const group = text.startsWith('§')
  if (group) text = text.replace(/^§\s*/, '')

  // R2.4: absence of data is information. Never blank, never an em-dash.
  const missing = text === '' || text === '—' || text === '-'
  if (missing) text = 'Not published'

  let inner = /^Not published$/i.test(text)
    ? '<span class="np">Not published</span>'
    : sourceRefs(marked.parseInline(text))

  if (win) {
    // Colour alone is invisible to a screen reader and to a text-extracting
    // model, which is the entire audience for this highlight. UI.md §4.3.
    inner = `<span class="vh">Best in row — </span><span class="win-mark" aria-hidden="true">▸</span>${inner}`
  }
  return { inner, win, group }
}


/** A lone image becomes a figure. Caption comes from the markdown title:
 *  ![alt text](src "Caption naming the product and capture date") */
function figureFor(token) {
  const only = (token.tokens || []).filter((t) => t.type !== 'space' && !(t.type === 'text' && !t.raw.trim()))
  if (only.length !== 1 || only[0].type !== 'image') return null
  const img = only[0]
  const cap = img.title ? `<figcaption>${esc(img.title)}</figcaption>` : ''
  const href = esc(img.href)
  const isJpgOrPng = /\.(jpe?g|png)$/i.test(img.href)
  const webpHref = isJpgOrPng ? esc(img.href.replace(/\.(jpe?g|png)$/i, '.webp')) : null

  if (webpHref) {
    return `<figure class="shot"><picture><source srcset="${webpHref}" type="image/webp"><img src="${href}" alt="${esc(img.text || '')}" loading="lazy" decoding="async"></picture>${cap}</figure>`
  }
  return `<figure class="shot"><img src="${href}" alt="${esc(img.text || '')}" loading="lazy" decoding="async">${cap}</figure>`
}

function renderTable(token, ctx) {
  const align = token.align || []
  const alignAttr = (i) => (align[i] ? ` style="text-align:${align[i]}"` : '')

  const head = token.header.map((c, i) =>
    `<th scope="col"${alignAttr(i)}>${sourceRefs(marked.parseInline(String(c.text ?? '').trim()))}</th>`
  ).join('')

  const body = token.rows.map((row) => {
    const cells = row.map((c) => cellHtml(c))
    const isGroup = cells[0]?.group
    const tds = cells.map((c, i) => {
      const cls = ['cell']
      if (c.win) cls.push('win')
      // First column is a row header: it names what the row measures.
      const tag = i === 0 ? 'th scope="row"' : 'td'
      const close = i === 0 ? 'th' : 'td'
      return `<${tag} class="${cls.join(' ')}"${alignAttr(i)}>${c.inner}</${close}>`
    }).join('')
    return `<tr${isGroup ? ' class="group"' : ''}>${tds}</tr>`
  }).join('\n')

  const caption = ctx.caption
    ? `<caption>${esc(ctx.caption)}</caption>`
    : ''

  return `<div class="table-wrap"><table class="spec">${caption}
<thead><tr>${head}</tr></thead>
<tbody>
${body}
</tbody>
</table></div>`
}

/** The QA stamp under the comparison table. Omits what it was not told. */
function renderStamp(meta, fallbackDate) {
  const verified = meta.verified ? longDate(meta.verified) : longDate(fallbackDate)
  const parts = []
  if (verified) parts.push(['Verified', verified])
  // Never asserted by default: claiming hands-on testing that did not happen
  // is exactly what GUARDRAILS R2.5 forbids.
  if (meta.method) parts.push(['Method', meta.method])
  if (meta.criteria) parts.push(['Criteria', meta.criteria])
  if (!parts.length) return ''

  const items = parts.map(([k, v]) =>
    `<div class="stamp-item"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')
  return `<dl class="stamp">${items}</dl>`
}

function renderHeading(token) {
  const text = sourceRefs(marked.parseInline(token.text))
  const id = slugify(token.text)
  const d = Math.min(Math.max(token.depth, 2), 4) // never a second H1
  return `<h${d} id="${esc(id)}">${text}</h${d}>`
}

/**
 * @param {string} raw     post content, Markdown, optional front matter
 * @param {object} opts    { caption, verifiedFallback }
 * @returns {{ html: string, meta: object, headings: {id,text,depth}[] }}
 */
export function renderContent(raw, opts = {}) {
  const { meta, body } = parseFrontMatter(raw)
  const tokens = marked.lexer(body)
  const headings = []

  // A post that writes its own opening H2 keeps it; the page suppresses the
  // template heading rather than printing two. Roundups need this — "how do X
  // and Y compare" is the wrong question for a seven-tool list.
  const firstBlock = tokens.find((t) => t.type !== 'space')
  const opensWithHeading = firstBlock?.type === 'heading' && firstBlock.depth === 2

  const ctx = { caption: opts.caption, tableCount: 0 }
  const out = []
  const faq = []
  let inFaq = false
  let pendingQuestion = null
  let buf = []

  const flush = () => {
    if (!buf.length) return
    buf.links = tokens.links // reflink definitions live on the token array
    out.push(marked.parser(buf))
    buf = []
  }

  for (const t of tokens) {
    if (t.type === 'table') {
      flush()
      ctx.tableCount += 1
      out.push(renderTable(t, ctx))
      // The stamp belongs to the comparison table, which is the first one.
      if (ctx.tableCount === 1) out.push(renderStamp(meta, opts.verifiedFallback))
    } else if (t.type === 'heading') {
      flush()
      headings.push({ id: slugify(t.text), text: t.text, depth: t.depth })
      out.push(renderHeading(t))

      if (t.depth === 2) inFaq = /frequently asked|faq|common questions/i.test(t.text)
      // Some posts write each question as an H3 rather than bold text.
      if (inFaq && t.depth === 3) pendingQuestion = t.text
    } else if (t.type === 'paragraph' && figureFor(t)) {
      flush()
      out.push(figureFor(t))
    } else {
      if (inFaq && t.type === 'paragraph') {
        const raw = String(t.text || '').trim()
        const bold = raw.match(/^\*\*(.+?)\*\*\s*\n?([\s\S]*)$/)
        if (bold && bold[2].trim()) {
          faq.push({ q: bold[1].trim(), a: plain(bold[2]) })
          pendingQuestion = null
        } else if (pendingQuestion) {
          faq.push({ q: pendingQuestion, a: plain(raw) })
          pendingQuestion = null
        }
      }
      buf.push(t)
    }
  }
  flush()

  return { html: autolinkDomains(sourceRefs(out.join('\n'))), meta, headings, tableCount: ctx.tableCount, opensWithHeading, faq }
}

/** Plain text, for meta descriptions and OG tags. */
export function toPlainText(md, limit = 300) {
  const { body } = parseFrontMatter(md)
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\|/g, ' ')
    .replace(/[#>*_`~\[\]()▸§]/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text
}

/** Pulls the comparison table out of rendered HTML, for the homepage preview. */
export function extractFirstTable(html) {
  const m = String(html || '').match(/<div class="table-wrap">[\s\S]*?<\/table><\/div>/)
  return m ? m[0] : ''
}

/**
 * Every external link the post body cites, deduped by host.
 *
 * The schema carries two source links, which is right for a head-to-head but
 * leaves a seven-tool roundup citing five vendors it never lists. This surfaces
 * all of them under Sources — the same treatment for every vendor named,
 * which is what GUARDRAILS R1.3 requires.
 */
export function extractLinks(html, exclude = []) {
  const skip = new Set(
    exclude.filter(Boolean).map((u) => {
      try { return new URL(u).hostname.replace(/^www\./, '') } catch { return '' }
    }),
  )

  const seen = new Map()
  const re = /<a\s+href="(https?:\/\/[^"]+)"[^>]*>(.*?)<\/a>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    const href = m[1]
    const text = m[2].replace(/<[^>]+>/g, '').trim()
    let host
    try { host = new URL(href).hostname.replace(/^www\./, '') } catch { continue }
    if (skip.has(host) || seen.has(host)) continue
    seen.set(host, { href, host, text: text || host })
  }
  // Alphabetical, not document order: whichever vendor happens to be linked
  // earliest in the prose should not get top billing in the list (R1.3).
  return [...seen.values()].sort((a, b) => a.host.localeCompare(b.host))
}
