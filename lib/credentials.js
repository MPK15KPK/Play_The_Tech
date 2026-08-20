import { one, SETTINGS } from './db.js'
import { verifyPassword, safeEqual } from './auth.js'

/**
 * Resolves the admin login.
 *
 * Stored credentials win when they exist. The environment pair keeps working
 * regardless, as a recovery path — there is no email delivery here, so there
 * is no password-reset flow, and a forgotten stored password would otherwise
 * lock the only account out for good.
 */
export async function readSettings() {
  try {
    return await one(`SELECT admin_email, password_hash FROM ${SETTINGS} WHERE id = 1`)
  } catch (err) {
    console.error('settings read failed:', err.message)
    return null
  }
}

export async function checkCredentials(email, password) {
  const envEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const envPass = process.env.ADMIN_PASSWORD || ''
  const given = String(email || '').trim().toLowerCase()

  const settings = await readSettings()

  if (settings?.password_hash && settings?.admin_email) {
    const emailOk = await safeEqual(given, settings.admin_email.trim().toLowerCase())
    const passOk = await verifyPassword(password, settings.password_hash)
    if (emailOk && passOk) return { ok: true, email: settings.admin_email, source: 'database' }
  }

  if (envEmail && envPass) {
    const [emailOk, passOk] = await Promise.all([
      safeEqual(given, envEmail),
      safeEqual(password, envPass),
    ])
    if (emailOk && passOk) return { ok: true, email: process.env.ADMIN_EMAIL, source: 'environment' }
  }

  return { ok: false }
}

/** The address currently in force, for display in the settings form. */
export async function currentEmail() {
  const settings = await readSettings()
  return settings?.admin_email || process.env.ADMIN_EMAIL || ''
}
