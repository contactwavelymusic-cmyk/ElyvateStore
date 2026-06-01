'use client'
import { useState } from 'react'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }
  return (
    <div className="p-6 md:p-10 max-w-2xl">
      <div className="mb-8"><p className="t-label mb-1">Configuration</p><h1 className="font-black text-2xl">Settings</h1></div>
      {saved && <div className="mb-6 p-4 text-sm rounded-xl" style={{background:'rgba(16,185,129,0.07)',border:'1px solid rgba(16,185,129,0.3)',color:'var(--success)'}}>✓ Settings saved</div>}
      <div className="space-y-5">
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-base">Store Information</h2>
          <div><label className="inp-label">Store Name</label><input defaultValue="Elyvate" className="inp"/></div>
          <div><label className="inp-label">Contact Email</label><input defaultValue="elyvate.business@gmail.com" className="inp"/></div>
          <div><label className="inp-label">Support Phone</label><input defaultValue="+1 (234) 567-8900" className="inp"/></div>
        </div>
        <div className="card p-6 space-y-3">
          <h2 className="font-bold text-base mb-1">Email Notifications</h2>
          {['New order notification','Order status updates','Low stock alerts','New customer registration'].map(label => (
            <label key={label} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm" style={{color:'var(--text-2)'}}>{label}</span>
              <div className="w-10 h-5 rounded-full relative" style={{background:'var(--p)'}}>
                <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white"/>
              </div>
            </label>
          ))}
        </div>
        <div className="card p-6">
          <h2 className="font-bold text-base mb-2">Admin Credentials</h2>
          <p className="text-xs mb-4" style={{color:'var(--text-4)'}}>Set via Vercel environment variables</p>
          <div className="p-4 rounded-xl font-mono text-xs space-y-1" style={{background:'var(--bg-3)',border:'1px solid var(--border)',color:'var(--text-3)'}}>
            <p>ADMIN_EMAIL=admin@elyvate.com</p>
            <p>ADMIN_PASSWORD=Elyvate@Admin2025!</p>
          </div>
        </div>
        <button onClick={save} className="btn btn-primary btn-lg"><span>Save Settings</span></button>
      </div>
    </div>
  )
}
