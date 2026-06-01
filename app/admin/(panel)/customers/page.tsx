import { supabaseAdmin } from '@/lib/supabase'

async function getCustomers() {
  const { data } = await supabaseAdmin.from('profiles').select('*, orders:orders(id,total)').order('created_at', { ascending: false })
  return data || []
}

export default async function AdminCustomersPage() {
  const customers = await getCustomers()
  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div><p className="t-label mb-1">Manage</p><h1 className="font-black text-2xl">Customers</h1></div>
        <input placeholder="Search customers..." className="inp" style={{maxWidth:260}}/>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{borderBottom:'1px solid var(--border)',background:'var(--bg-2)'}}>
                {['Customer','Role','Orders','Joined','Status'].map(h=>(
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest font-semibold" style={{color:'var(--text-4)'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-16 text-center">
                  <p className="text-3xl mb-3">👥</p>
                  <p className="font-bold mb-1">No customers yet</p>
                  <p className="text-sm" style={{color:'var(--text-3)'}}>Customers will appear here after they register.</p>
                </td></tr>
              ) : customers.map((c: any) => {
                const orderCount = c.orders?.length || 0
                const spent = c.orders?.reduce((s: number, o: any) => s + (o.total || 0), 0) || 0
                return (
                  <tr key={c.id} style={{borderBottom:'1px solid var(--border)'}} className="transition-colors hover:bg-[var(--p-subtle)]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                          style={{background:'var(--p-subtle)',border:'1px solid var(--p-border)',color:'var(--p-light)'}}>
                          {(c.full_name||'U')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{c.full_name || 'Unknown'}</p>
                          <p className="text-[11px]" style={{color:'var(--text-4)'}}>{c.phone || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="tag text-[9px]">{c.role || 'customer'}</span></td>
                    <td className="px-5 py-4">
                      <p className="font-bold">{orderCount}</p>
                      {spent > 0 && <p className="text-[11px] p-text font-bold">${spent.toFixed(2)}</p>}
                    </td>
                    <td className="px-5 py-4 text-xs" style={{color:'var(--text-3)'}}>{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <span className="tag text-[9px]" style={{color:'var(--success)',borderColor:'rgba(16,185,129,0.3)',background:'rgba(16,185,129,0.07)'}}>Active</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
