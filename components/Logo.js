/**
 * The PlayTheTech Brand Mark: An authoritative, high-precision tech benchmark masthead.
 * Combines an obsidian prism emblem, sharp editorial typography, and an independent benchmark kicker.
 */

export function LogoMark({ size = 38 }) {
  return (
    <img
      src="/logo.png"
      alt="PlayTheTech"
      width={size}
      height={size}
      className="brand-logo-mark custom-logo-mark"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  )
}

export default function Logo() {
  return (
    <span className="logo ptt-masthead" aria-label="PlayTheTech — Independent Benchmarks">
      <LogoMark size={38} />
      <span className="ptt-title-block">
        <span className="ptt-brand-name">
          <span className="ptt-word-play">PLAY</span>
          <span className="ptt-word-the">THE</span>
          <span className="ptt-word-tech">TECH</span>
          <span className="ptt-live-dot" title="Verified Primary Benchmark Index"></span>
        </span>
        <span className="ptt-masthead-kicker">
          <span className="ptt-kicker-rule"></span>
          <span className="ptt-kicker-label">INDEPENDENT BENCHMARKS</span>
          <span className="ptt-kicker-rule"></span>
        </span>
      </span>
    </span>
  )
}
