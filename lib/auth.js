// HMAC-SHA256 over Web Crypto, not node:crypto — the same code runs in
// middleware, which is edge runtime. See BUILD-SPEC §3.

export const COOKIE_NAME = 'ptt_session'
export const TTL_MS = 12 * 60 * 60 * 1000 // 12 hours

const enc = new TextEncoder()
const dec = new TextDecoder()

function toB64url(bytes) {
  let s = ''
  for (const b of bytes) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromB64url(str) {
  const pad = str.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(pad + '='.repeat((4 - (pad.length % 4)) % 4))
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

async function hmacKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

/** token = base64url(payload) "." base64url(hmac) */
export async function createToken(email, secret, ttlMs = TTL_MS) {
  const payload = toB64url(enc.encode(JSON.stringify({ email, exp: Date.now() + ttlMs })))
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(payload))
  return `${payload}.${toB64url(new Uint8Array(sig))}`
}

/**
 * Returns the payload, or null. A bad signature and an expired token fail
 * identically and silently — the caller cannot tell them apart.
 */
export async function verifyToken(token, secret) {
  try {
    if (!token || !secret) return null
    const [payload, sig] = token.split('.')
    if (!payload || !sig) return null

    const ok = await crypto.subtle.verify(
      'HMAC',
      await hmacKey(secret),
      fromB64url(sig),
      enc.encode(payload),
    )
    if (!ok) return null

    const data = JSON.parse(dec.decode(fromB64url(payload)))
    if (!data?.exp || Date.now() > data.exp) return null
    return data
  } catch {
    return null
  }
}

/** Length-independent comparison, so a wrong password leaks no timing signal. */
export async function safeEqual(a, b) {
  const key = await hmacKey(crypto.randomUUID())
  const [x, y] = await Promise.all([
    crypto.subtle.sign('HMAC', key, enc.encode(String(a))),
    crypto.subtle.sign('HMAC', key, enc.encode(String(b))),
  ])
  const av = new Uint8Array(x)
  const bv = new Uint8Array(y)
  let diff = 0
  for (let i = 0; i < av.length; i++) diff |= av[i] ^ bv[i]
  return diff === 0
}

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: TTL_MS / 1000,
  }
}

/* ------------------------------------------------------------------ *
 * Password hashing — PBKDF2 over Web Crypto, same reason as the HMAC
 * above: no node:crypto, so the code stays runtime-agnostic.
 * ------------------------------------------------------------------ */

const PBKDF2_ITER = 210_000

async function derive(password, salt) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITER, hash: 'SHA-256' },
    key,
    256,
  )
  return new Uint8Array(bits)
}

/** Returns `pbkdf2$<iterations>$<salt>$<hash>`, all base64url. */
export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await derive(password, salt)
  return `pbkdf2$${PBKDF2_ITER}$${toB64url(salt)}$${toB64url(hash)}`
}

export async function verifyPassword(password, stored) {
  try {
    const [scheme, iter, salt, hash] = String(stored || '').split('$')
    if (scheme !== 'pbkdf2') return false
    const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: fromB64url(salt), iterations: Number(iter), hash: 'SHA-256' },
      key,
      256,
    )
    const got = new Uint8Array(bits)
    const want = fromB64url(hash)
    if (got.length !== want.length) return false
    let diff = 0
    for (let i = 0; i < got.length; i++) diff |= got[i] ^ want[i]
    return diff === 0
  } catch {
    return false
  }
}
