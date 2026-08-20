/**
 * The playthetech mark: a P whose bowl is carved out by a play triangle.
 *
 * Colours are fixed, not themed. The mark previously flipped between light and
 * dark depending on the surface behind it, which meant the header logo and the
 * sign-in logo were different images. A logo is one image everywhere — so it
 * carries its own white tile and sits unchanged on any background.
 */
const INK = '#101F35'   // navy — the P
const MARK = '#1B5FE8'  // brand blue — the wedge and the inner triangle
const TILE = '#FFFFFF'  // the ground the mark always sits on

export function LogoMark({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
      className="logo-mark"
    >
      {/* Its own ground, so the mark never has to adapt to the page */}
      <rect width="120" height="120" rx="26" fill={TILE} />

      {/* P — stem plus bowl */}
      <path d="M30 16h30a30 30 0 0 1 0 60H50v28H30z" fill={INK} />

      {/* The wedge where the bowl meets the stem */}
      <path d="M30 76h20v28z" fill={MARK} />

      {/* Play shape carved out of the bowl */}
      <path d="M52 32l28 18a4 4 0 0 1 0 7L52 75z" fill={TILE} />

      {/* Inner play triangle */}
      <path d="M58 43l17 10-17 10z" fill={MARK} />
    </svg>
  )
}

export default function Logo({ size = 32 }) {
  return (
    <span className="logo">
      <LogoMark size={size} />
      <span className="logo-word">
        <span className="logo-play">play</span>
        <span className="logo-rest">thetech</span>
        <span className="logo-dot">.</span>
      </span>
    </span>
  )
}
