'use client'
import { useState } from 'react'
import Link from 'next/link'

const LINKS = [['profile','👤','Profile'],['orders','📦','Order History'],['addresses','📍','Addresses'],['wishlist','❤️','Wishlist']]

export default function ProfilePage() {
  const [form, setForm] = useState({ fullName:'John Doe', email:'john@example.com', phone:'+1 234 567 8900' })
  const [saved, setSaved] = useState(false)
  const h = (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({...p, [e.target.name]: e.target.value}))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }
  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      <div className="max-w-5xl mx-auto px-6 py-10 pb-24">
        <p className="t-label mb-2">My Account</p>
        <h1 className="t-h1 mb-8">Hello, <span className="p-text">John</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <nav className="card p-4 space-y-1">
              {LINKS.map(([slug,icon,label])=>(
                <Link key={slug} href={`/account/${slug}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                  style={{color:slug==='profile'?'var(--p-light)':'var(--text-3)',background:slug==='profile'?'var(--p-subtle)':'transparent',borderLeft:slug==='profile'?'2px solid var(--p)':'2px solid transparent'}}>
                  <span>{icon}</span>{label}
                </Link>
              ))}
              <div className="h-px my-2" style={{background:'var(--border)'}}/>
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full text-left hover:text-red-400 transition-colors" style={{color:'var(--text-4)'}}>
                🚪 Sign Out
              </button>
            </nav>
          </aside>
          <div className="md:col-span-3 card p-7">
            <h2 className="font-bold text-lg mb-5">Profile Details</h2>
            {saved && <div className="mb-5 p-4 text-sm rounded-xl" style={{background:'rgba(16,185,129,0.07)',border:'1px solid rgba(16,185,129,0.3)',color:'var(--success)'}}>✓ Profile updated successfully</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[['fullName','Full Name'],['email','Email Address'],['phone','Phone Number']].map(([n,l])=>(
                <div key={n} className={n==='email'?'sm:col-span-2':''}>
                  <label className="inp-label">{l}</label>
                  <input name={n} value={(form as any)[n]} onChange={h} className="inp"/>
                </div>
              ))}
            </div>
            <div className="h-px my-5" style={{background:'var(--border)'}}/>
            <h3 className="font-bold mb-4">Change Password</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="inp-label">Current Password</label><input type="password" placeholder="••••••••" className="inp"/></div>
              <div><label className="inp-label">New Password</label><input type="password" placeholder="Min. 8 characters" className="inp"/></div>
            </div>
            <button onClick={save} className="btn btn-primary mt-6"><span>Save Changes</span></button>
          </div>
        </div>
      </div>
    </div>
  )
}
