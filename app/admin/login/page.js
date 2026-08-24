import { LogoMark } from '../../../components/Logo.js'
import LoginForm from './LoginForm.js'

export const metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false, nocache: true },
}

// useSearchParams in the form needs a request to read; this keeps the build
// from trying to prerender it.
export const dynamic = 'force-dynamic'

export default function LoginPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-head">
          <div className="auth-logo-badge">
            <LogoMark size={34} />
          </div>
          <h1>Sign in</h1>
          <p className="auth-subtitle">Editor &amp; Benchmarking access for playthetech.</p>
        </div>
        <LoginForm />
        <div className="auth-foot">
          <span>Protected by session cookies &amp; Argon2 hashing</span>
        </div>
      </div>
    </div>
  )
}
