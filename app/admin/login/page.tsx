'use client'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [form, setForm]   = useState({ email:'', password:'' })
  const [loading, setLoad] = useState(false)
  const [error, setError]  = useState('')

  const login = async () => {
    setLoad(true); setError('')
    try {
      const res  = await fetch('/api/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Invalid credentials'); return }
      window.location.href = '/admin/dashboard'
    } catch { setError('Something went wrong.') }
    finally { setLoad(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{background:'var(--bg)'}}>
      {/* Purple glow */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{background:'radial-gradient(circle at 80% 20%,rgba(139,92,246,0.2),transparent 65%)',filter:'blur(40px)'}}/>
      <div className="w-full max-w-[380px] relative z-10">
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center font-black text-xl text-white"
            style={{background:'var(--p)',boxShadow:'0 8px 32px var(--p-glow)'}}>E</div>
          <p className="font-black text-xl tracking-widest uppercase p-text">ELYVATE</p>
          <p className="text-[10px] uppercase tracking-widest mt-1" style={{color:'var(--text-4)'}}>Admin Panel</p>
        </div>
        <div className="card p-8">
          <h2 className="font-black text-xl mb-1">Admin Access</h2>
          <p className="text-sm mb-6" style={{color:'var(--text-3)'}}>Restricted — authorized personnel only</p>
          {error && <div className="mb-5 p-4 text-sm rounded-xl" style={{background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.25)',color:'var(--error)'}}>{error}</div>}
          <div className="space-y-4 mb-6">
            <div><label className="inp-label">Admin Email</label><input type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="admin@elyvate.com" className="inp" onKeyDown={e=>e.key==='Enter'&&login()}/></div>
            <div><label className="inp-label">Password</label><input type="password" value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} placeholder="••••••••" className="inp" onKeyDown={e=>e.key==='Enter'&&login()}/></div>
          </div>
          <button onClick={login} disabled={loading} className="btn btn-primary btn-full btn-lg">
            <span>{loading ? 'Signing in...' : 'Access Dashboard →'}</span>
            {loading && <svg style={{animation:'spin 0.8s linear infinite',width:14,height:14}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>}
          </button>
        </div>
        <p className="text-center text-[10px] mt-5" style={{color:'var(--text-4)'}}>Default: admin@elyvate.com / Elyvate@Admin2025!</p>
      </div>
    </div>
  )
}
