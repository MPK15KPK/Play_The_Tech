import { readFile } from 'node:fs/promises'
import path from 'node:path'

// Read from the repo, not the network. Satori takes woff (not woff2).
const FONT_DIR = path.join(process.cwd(), 'assets', 'fonts')

let cached = null

export async function ogFonts() {
  if (cached) return cached
  const [condensed, mono] = await Promise.all([
    readFile(path.join(FONT_DIR, 'IBMPlexSansCondensed-SemiBold.woff')),
    readFile(path.join(FONT_DIR, 'IBMPlexMono-Regular.woff')),
  ])
  cached = [
    { name: 'PlexCondensed', data: condensed, weight: 600, style: 'normal' },
    { name: 'PlexMono', data: mono, weight: 400, style: 'normal' },
  ]
  return cached
}

export const OG_SIZE = { width: 1200, height: 630 }

// The palette, again — the card is a page like any other.
export const C = {
  paper: '#FFFFFF',
  ink: '#14181B',
  inkMuted: '#5A6570',
  rule: '#D5D9DD',
  mark: '#A85B00',
}

/** The shared card. No gradient, no illustration, no logo mark. */
export function ogCard({ title, pair, footer }) {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: C.paper, padding: '56px 64px', justifyContent: 'space-between',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              borderBottom: `3px solid ${C.ink}`, paddingBottom: 20,
            },
            children: [
              { type: 'div', props: { style: { fontFamily: 'PlexMono', fontSize: 26, color: C.ink, letterSpacing: '0.02em' }, children: 'playthetech' } },
              { type: 'div', props: { style: { fontFamily: 'PlexMono', fontSize: 20, color: C.inkMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }, children: 'tool comparison' } },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 24 },
            children: [
              { type: 'div', props: { style: { fontFamily: 'PlexCondensed', fontSize: title.length > 78 ? 62 : 76, lineHeight: 1.08, color: C.ink, letterSpacing: '-0.02em' }, children: title } },
              pair
                ? { type: 'div', props: { style: { fontFamily: 'PlexMono', fontSize: 30, color: C.mark }, children: pair } }
                : null,
            ].filter(Boolean),
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex', fontFamily: 'PlexMono', fontSize: 22, color: C.inkMuted,
              borderTop: `1px solid ${C.rule}`, paddingTop: 20,
            },
            children: footer,
          },
        },
      ],
    },
  }
}
