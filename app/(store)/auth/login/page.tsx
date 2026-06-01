'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [form, setForm]    = useState({ email:'', password:'' })
  const [loading, setLoad] = useState(false)
  const [error, setError]  = useState('')
  const h = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({...p, [e.target.name]: e.target.value}))
  const login = async () => {
    setLoad(true); setError('')
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
      if (err) { setError(err.message); return }
      window.location.href = '/account/profile'
    } catch { setError('Something went wrong.') }
    finally { setLoad(false) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{paddingTop:'64px',background:'var(--bg)'}}>
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{background:'radial-gradient(circle at 80% 20%,rgba(139,92,246,0.15),transparent 65%)',filter:'blur(40px)'}}/>
      <div className="w-full max-w-[400px] relative z-10">
        <div className="text-center mb-8">
          <p className="font-black text-2xl tracking-widest uppercase p-text mb-1">ELYVATE</p>
          <p className="text-[10px] uppercase tracking-widest" style={{color:'var(--text-4)'}}>Sign In</p>
        </div>
        <div className="card p-8">
          <h2 className="font-black text-xl mb-1">Welcome Back</h2>
          <p className="text-sm mb-7" style={{color:'var(--text-3)'}}>Sign in to your Elyvate account</p>
          {error && <div className="mb-5 p-4 text-sm rounded-xl" style={{background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.25)',color:'var(--error)'}}>{error}</div>}
          <div className="space-y-4 mb-4">
            <div><label className="inp-label">Email Address</label><input name="email" type="email" value={form.email} onChange={h} placeholder="john@example.com" className="inp" onKeyDown={e=>e.key==='Enter'&&login()}/></div>
            <div><label className="inp-label">Password</label><input name="password" type="password" value={form.password} onChange={h} placeholder="••••••••" className="inp" onKeyDown={e=>e.key==='Enter'&&login()}/></div>
          </div>
          <div className="flex justify-end mb-5"><Link href="/auth/forgot-password" className="text-xs hover:underline" style={{color:'var(--p-light)'}}>Forgot password?</Link></div>
          <button onClick={login} disabled={loading} className="btn btn-primary btn-full mb-4">
            <span>{loading ? 'Signing in...' : 'Sign In →'}</span>
            {loading && <svg style={{animation:'spin 0.8s linear infinite',width:14,height:14}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>}
          </button>
          <p className="text-center text-xs" style={{color:'var(--text-3)'}}>No account? <Link href="/auth/register" className="font-bold hover:underline" style={{color:'var(--p-light)'}}>Create one free</Link></p>
        </div>
      </div>
    </div>
  )
}
