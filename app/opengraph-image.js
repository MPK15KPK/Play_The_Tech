import { ImageResponse } from 'next/og'
import { ogFonts, OG_SIZE, ogCard } from '../lib/og.js'

export const runtime = 'nodejs'
export const alt = 'playthetech — tool comparisons sourced from vendor documentation'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    ogCard({
      title: 'Tool comparisons for people who buy software',
      pair: null,
      footer: 'Two tools per page · every figure traced to the vendor page it came from',
    }),
    { ...OG_SIZE, fonts: await ogFonts() },
  )
}
