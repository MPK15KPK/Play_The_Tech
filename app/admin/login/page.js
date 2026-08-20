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
    <div className="shell">
      <div className="form-page auth">
        <span className="auth-mark"><LogoMark size={40} /></span>
        <h1>Sign in</h1>
        <p className="auth-note">Editor access for playthetech.</p>
        <LoginForm />
      </div>
    </div>
  )
}
