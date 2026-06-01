'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const SC: Record<string,string> = { pending:'#f59e0b', processing:'#8b5cf6', shipped:'#6b7ff0', delivered:'#10b981', cancelled:'#ef4444' }

export default function OrdersClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders]   = useState(initialOrders)
  const [sel, setSel]         = useState<any|null>(null)
  const [search, setSearch]   = useState('')

  const filtered = orders.filter(o =>
    (o.order_number||o.id||'').toLowerCase().includes(search.toLowerCase()) ||
    (o.customer_name||'').toLowerCase().includes(search.toLowerCase()) ||
    (o.customer_email||'').toLowerCase().includes(search.toLowerCase())
  )

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders(p => p.map(o => o.id === id ? { ...o, status } : o))
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div><p className="t-label mb-1">Manage</p><h1 className="font-black text-2xl">Orders</h1></div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search orders..." className="inp" style={{maxWidth:260}}/>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{borderBottom:'1px solid var(--border)',background:'var(--bg-2)'}}>
                {['Order #','Customer','Date','Status','Total','Action'].map(h=>(
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest font-semibold" style={{color:'var(--text-4)'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-16 text-center">
                  <p className="text-3xl mb-3">📋</p>
                  <p className="font-bold mb-1">No orders yet</p>
                  <p className="text-sm" style={{color:'var(--text-3)'}}>Orders will appear here when customers purchase.</p>
                </td></tr>
              ) : filtered.map(o=>(
                <tr key={o.id} className="cursor-pointer transition-colors hover:bg-[var(--p-subtle)]" style={{borderBottom:'1px solid var(--border)'}} onClick={()=>setSel(o)}>
                  <td className="px-5 py-4 font-mono text-xs font-bold" style={{color:'var(--p-light)'}}>{o.order_number || o.id?.slice(-8).toUpperCase()}</td>
                  <td className="px-5 py-4">
                    <p className="font-semibold">{o.customer_name}</p>
                    <p className="text-[11px]" style={{color:'var(--text-4)'}}>{o.customer_email}</p>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{color:'var(--text-3)'}}>{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4" onClick={e=>e.stopPropagation()}>
                    <select value={o.status} onChange={e=>updateStatus(o.id,e.target.value)}
                      className="text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded-lg outline-none"
                      style={{background:'var(--bg-4)',border:`1px solid ${SC[o.status]||'var(--border)'}40`,color:SC[o.status]||'var(--text-3)',fontFamily:'inherit'}}>
                      {['pending','processing','shipped','delivered','cancelled'].map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4 font-black p-text">${o.total?.toFixed(2)||'0.00'}</td>
                  <td className="px-5 py-4">
                    <button className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all hover:border-[var(--p)] hover:text-[var(--p-light)]"
                      style={{border:'1px solid var(--border)',color:'var(--text-4)'}} onClick={e=>{e.stopPropagation();setSel(o)}}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{background:'rgba(0,0,0,0.8)',backdropFilter:'blur(16px)'}} onClick={()=>setSel(null)}>
          <div className="w-full max-w-md card p-0 overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4" style={{borderBottom:'1px solid var(--border)',background:'var(--bg-2)'}}>
              <div><p className="t-label text-[9px] mb-0.5">Order Details</p><p className="font-black">{sel.order_number||sel.id?.slice(-8).toUpperCase()}</p></div>
              <button onClick={()=>setSel(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:text-red-400 transition-colors" style={{border:'1px solid var(--border)',color:'var(--text-3)'}}>×</button>
            </div>
            <div className="p-6 space-y-3">
              {[['Customer',sel.customer_name],['Email',sel.customer_email],['Phone',sel.customer_phone||'—'],['Date',new Date(sel.created_at).toLocaleDateString()],['Status',sel.status],['Total',`$${sel.total?.toFixed(2)||'0.00'}`]].map(([k,v])=>(
                <div key={k} className="flex justify-between text-sm pb-3" style={{borderBottom:'1px solid var(--border)'}}>
                  <span style={{color:'var(--text-4)'}}>{k}</span>
                  <span style={{color:k==='Total'?'var(--p-light)':k==='Status'?SC[v as string]||'var(--text-2)':'var(--text-2)'}}>{v}</span>
                </div>
              ))}
              {sel.shipping_address && (
                <div className="text-sm pb-3" style={{borderBottom:'1px solid var(--border)'}}>
                  <p style={{color:'var(--text-4)'}} className="mb-1">Ship to</p>
                  <p style={{color:'var(--text-2)'}}>{typeof sel.shipping_address === 'string' ? sel.shipping_address : `${sel.shipping_address.street}, ${sel.shipping_address.city}, ${sel.shipping_address.country}`}</p>
                </div>
              )}
            </div>
            <div className="px-6 pb-6 flex flex-col gap-2">
              <button className="btn btn-primary btn-full"><span>📦 Forward to Supplier</span></button>
              <button onClick={()=>setSel(null)} className="btn btn-outline btn-full">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
