'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  {href:'/admin/dashboard',label:'Dashboard',  icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>},
  {href:'/admin/products', label:'Products',   icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>},
  {href:'/admin/orders',   label:'Orders',     icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>},
  {href:'/admin/customers',label:'Customers',  icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>},
  {href:'/admin/settings', label:'Settings',   icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>},
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [col, setCol] = useState(false)
  return (
    <aside className="admin-side py-5 transition-all duration-300" style={{width:col?'60px':'215px'}}>
      <div className="px-4 mb-7 flex items-center justify-between">
        {!col && (
          <Link href="/">
            <p className="font-black tracking-widest uppercase text-sm p-text" style={{letterSpacing:'0.15em'}}>EL<span style={{WebkitTextFillColor:'var(--p-light)'}}>Y</span>VATE</p>
            <p className="text-[9px] tracking-widest mt-0.5" style={{color:'var(--text-4)'}}>ADMIN PANEL</p>
          </Link>
        )}
        <button onClick={()=>setCol(c=>!c)} className="p-1.5 rounded-lg hover:bg-[var(--p-subtle)] transition-colors ml-auto" style={{color:'var(--text-4)'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{col?<path d="m9 18 6-6-6-6"/>:<path d="m15 18-6-6 6-6"/>}</svg>
        </button>
      </div>
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV.map(item=>{
          const active = pathname===item.href || pathname.startsWith(item.href+'/')
          return (
            <Link key={item.href} href={item.href}
              className={`admin-link ${active?'active':''}`}
              title={col?item.label:undefined}
              style={{justifyContent:col?'center':undefined}}>
              <span className="flex-shrink-0" style={{color:active?'var(--p-light)':'var(--text-4)'}}>{item.icon}</span>
              {!col && <span>{item.label}</span>}
              {active && !col && <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:'var(--p)',boxShadow:'0 0 6px var(--p)'}}/>}
            </Link>
          )
        })}
      </nav>
      <div className="px-3 mt-4 space-y-0.5" style={{borderTop:'1px solid var(--border)',paddingTop:'1rem'}}>
        <Link href="/" className="admin-link" title={col?'View Store':undefined} style={{justifyContent:col?'center':undefined}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" strokeWidth="1.8" className="flex-shrink-0"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          {!col && <span>View Store</span>}
        </Link>
        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="admin-link w-full" style={{justifyContent:col?'center':undefined}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" strokeWidth="1.8" className="flex-shrink-0"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            {!col && <span>Sign Out</span>}
          </button>
        </form>
      </div>
    </aside>
  )
}
