'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ForgotPage() {
  const [email, setEmail]  = useState('')
  const [loading, setLoad] = useState(false)
  const [sent, setSent]    = useState(false)
  const [error, setError]  = useState('')
  const submit = async () => {
    setLoad(true); setError('')
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/reset-password` })
      if (err) { setError(err.message); return }
      setSent(true)
    } catch { setError('Something went wrong.') }
    finally { setLoad(false) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{paddingTop:'64px',background:'var(--bg)'}}>
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8"><p className="font-black text-2xl tracking-widest uppercase p-text">ELYVATE</p></div>
        <div className="card p-8">
          {!sent ? (
            <>
              <h2 className="font-black text-xl mb-1">Forgot Password?</h2>
              <p className="text-sm mb-7" style={{color:'var(--text-3)'}}>Enter your email and we'll send a reset link</p>
              {error && <div className="mb-5 p-4 text-sm rounded-xl" style={{background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.25)',color:'var(--error)'}}>{error}</div>}
              <label className="inp-label">Email Address</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="john@example.com" className="inp mb-6" onKeyDown={e=>e.key==='Enter'&&submit()}/>
              <button onClick={submit} disabled={loading} className="btn btn-primary btn-full mb-4"><span>{loading?'Sending...':'Send Reset Link'}</span></button>
              <Link href="/auth/login" className="block text-center text-xs hover:text-[var(--p-light)] transition-colors" style={{color:'var(--text-4)'}}>← Back to Sign In</Link>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl rounded-2xl" style={{background:'var(--p-subtle)',border:'1px solid var(--p-border-2)'}}>📧</div>
              <h2 className="font-black text-xl mb-2">Check Your Email</h2>
              <p className="text-sm mb-6" style={{color:'var(--text-3)'}}>Reset link sent to <strong style={{color:'var(--text)'}}>{email}</strong></p>
              <Link href="/auth/login" className="btn btn-primary btn-full"><span>Back to Sign In</span></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
