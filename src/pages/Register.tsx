import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')
    if (password.length < 6) { setError('Use at least 6 characters for your password.'); return }
    setBusy(true)
    try {
      const signedIn = await register(email.trim(), password)
      if (signedIn) navigate('/tasks', { replace: true })
      else setMessage('Check your email to confirm your account, then log in.')
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to create the account.')
    } finally {
      setBusy(false)
    }
  }

  return <section className="details-panel panel">
    <h1>Create an account</h1>
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="register-email">Email</label>
      <input id="register-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      <label htmlFor="register-password">Password</label>
      <input id="register-password" type="password" autoComplete="new-password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required />
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      <button type="submit" disabled={busy}>{busy ? 'Creating account...' : 'Register'}</button>
    </form>
    <p>Already registered? <Link to="/login">Log in</Link></p>
  </section>
}

export default Register
