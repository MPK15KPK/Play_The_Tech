// Fixed-window counter, in process memory.
//
// Deliberately not Redis: one App Service instance, and the failure this
// guards against is a script hammering one endpoint, not a distributed
// attack. It resets on restart and does not span scaled-out instances — if
// the app is ever scaled past one instance, this needs to move to the
// database or a cache.

const buckets = new Map()

export function rateLimit(key, limit, windowMs) {
  const now = Date.now()
  const b = buckets.get(key)

  if (!b || now > b.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }
  b.count += 1
  if (b.count > limit) {
    return { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) }
  }
  return { ok: true, retryAfter: 0 }
}

// Bounded so a spray of unique IPs cannot grow the map without limit.
setInterval(() => {
  const now = Date.now()
  for (const [k, v] of buckets) if (now > v.reset) buckets.delete(k)
}, 60_000).unref?.()

export function clientIp(req) {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-client-ip') || req.headers.get('x-real-ip') || 'unknown'
}
