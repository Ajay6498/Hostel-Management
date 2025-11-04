import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { isAuthenticated, loginWithEmailPassword } from '../auth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated()) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = loginWithEmailPassword(email.trim(), password)
    setLoading(false)
    if (!result.ok) {
      setError(result.message)
      return
    }
    navigate(location.state?.from?.pathname || '/', { replace: true })
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p style={{ color: '#93a1b6', marginTop: 0 }}>Sign in to manage your hostel</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error ? <div className="error">{error}</div> : null}
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
            <button className="btn" type="button" onClick={() => { setEmail('manager@example.com'); setPassword('manager123') }}>Use manager</button>
          </div>
        </form>
        <div style={{ marginTop: 12, color: '#93a1b6', fontSize: 12 }}>
          Hint: admin@example.com / admin123 · New here? <a href="/register">Create an account</a>
        </div>
      </div>
    </div>
  )
}


