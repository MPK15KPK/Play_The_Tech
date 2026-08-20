import { currentEmail, readSettings } from '../../../lib/credentials.js'
import SettingsForm from './SettingsForm.js'
import { requireAdmin } from '../../../lib/session.js'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Sign-in settings',
  robots: { index: false, follow: false, nocache: true },
}

export default async function SettingsPage() {
  await requireAdmin('/admin/settings')

  const email = await currentEmail()
  const stored = await readSettings()

  return (
    <div className="shell admin-shell">
      <div className="admin-bar">
        <a href="/admin">← Admin</a>
        <span className="spacer" />
        <span>Sign-in settings</span>
      </div>

      {/* Two columns, same shape as /request. A 32rem form alone in a
          full-width shell leaves two thirds of the page empty. */}
      <div className="request-layout">
        <div className="form-page">
          <h1>Change how you sign in</h1>
          <p>
            These credentials replace the pair in the environment file. You need the
            current password to change either field.
          </p>
          <SettingsForm currentEmailValue={email} />
        </div>

        <aside className="request-aside">
          <div className="aside-card">
            <p className="aside-label">In force now</p>
            <dl className="aside-facts">
              <div>
                <dt>Email</dt>
                <dd>{email}</dd>
              </div>
              <div>
                <dt>Password</dt>
                <dd>{stored?.password_hash ? 'Stored in the database' : 'From the environment file'}</dd>
              </div>
              <div>
                <dt>Changed</dt>
                <dd>
                  {stored?.updated_at
                    ? new Date(stored.updated_at).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
                      })
                    : 'Never'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="aside-card">
            <p className="aside-label">If you forget it</p>
            <p className="aside-plain">
              The <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code> in{' '}
              <code>.env</code> keep working even after you change these. There is no
              password-reset email on this site, so that pair is the only way back in.
            </p>
            <p className="aside-plain">
              Anyone able to read <code>.env</code> can already read the database
              connection string, so keeping it live gives away nothing you had.
            </p>
          </div>

          <div className="aside-card">
            <p className="aside-label">How it is stored</p>
            <p className="aside-plain">
              PBKDF2-SHA256, 210,000 iterations, with a fresh salt per password. The
              password itself is never written down — only a hash it cannot be recovered
              from.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
