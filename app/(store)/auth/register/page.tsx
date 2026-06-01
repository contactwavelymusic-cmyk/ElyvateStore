'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const [step, setStep]    = useState<'form'|'verify'>('form')
  const [form, setForm]    = useState({ fullName:'', email:'', phone:'', password:'', confirm:'' })
  const [loading, setLoad] = useState(false)
  const [error, setError]  = useState('')
  const h = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({...p, [e.target.name]: e.target.value}))
  const register = async () => {
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoad(true); setError('')
    try {
      const { error: err } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { full_name: form.fullName, phone: form.phone } } })
      if (err) { setError(err.message); return }
      setStep('verify')
    } catch { setError('Something went wrong.') }
    finally { setLoad(false) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10" style={{paddingTop:'84px',background:'var(--bg)'}}>
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{background:'radial-gradient(circle at 80% 20%,rgba(139,92,246,0.15),transparent 65%)',filter:'blur(40px)'}}/>
      <div className="w-full max-w-[420px] relative z-10">
        <div className="text-center mb-8">
          <p className="font-black text-2xl tracking-widest uppercase p-text mb-1">ELYVATE</p>
          <p className="text-[10px] uppercase tracking-widest" style={{color:'var(--text-4)'}}>{step==='form'?'Create Account':'Verify Email'}</p>
        </div>
        <div className="card p-8">
          {step==='form' ? (
            <>
              <h2 className="font-black text-xl mb-1">Join Elyvate</h2>
              <p className="text-sm mb-7" style={{color:'var(--text-3)'}}>Create your free account to start shopping</p>
              {error && <div className="mb-5 p-4 text-sm rounded-xl" style={{background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.25)',color:'var(--error)'}}>{error}</div>}
              <div className="space-y-4 mb-6">
                {[['fullName','Full Name','text','John Doe'],['email','Email Address','email','john@example.com'],['phone','Phone Number','tel','+1 234 567 8900'],['password','Password','password','Min. 8 characters'],['confirm','Confirm Password','password','Repeat password']].map(([n,l,t,ph])=>(
                  <div key={n}><label className="inp-label">{l}</label><input name={n} type={t} value={(form as any)[n]} onChange={h} placeholder={ph} className="inp"/></div>
                ))}
              </div>
              <button onClick={register} disabled={loading} className="btn btn-primary btn-full mb-4">
                <span>{loading?'Creating Account...':'Create Account →'}</span>
              </button>
              <p className="text-center text-xs" style={{color:'var(--text-3)'}}>Already have an account? <Link href="/auth/login" className="font-bold hover:underline" style={{color:'var(--p-light)'}}>Sign in</Link></p>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl rounded-2xl" style={{background:'var(--p-subtle)',border:'1px solid var(--p-border-2)'}}>📧</div>
              <h2 className="font-black text-xl mb-2">Check Your Email</h2>
              <p className="text-sm mb-6" style={{color:'var(--text-3)'}}>We sent a verification link to<br/><strong style={{color:'var(--text)'}}>{form.email}</strong></p>
              <Link href="/auth/login" className="btn btn-primary btn-full"><span>Go to Sign In →</span></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
