import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'

async function getStats() {
  const [orders, products, customers] = await Promise.all([
    supabaseAdmin.from('orders').select('id,total,status,created_at,customer_name,customer_email', { count: 'exact' }).order('created_at', { ascending: false }).limit(5),
    supabaseAdmin.from('products').select('id,name,price,stock,images', { count: 'exact' }).limit(3),
    supabaseAdmin.from('profiles').select('id', { count: 'exact' }),
  ])
  const revenue = orders.data?.reduce((s, o) => s + (o.total || 0), 0) || 0
  return { orders: orders.data || [], orderCount: orders.count || 0, products: products.data || [], productCount: products.count || 0, customerCount: customers.count || 0, revenue }
}

const SC: Record<string,string> = { pending:'#f59e0b', processing:'#8b5cf6', shipped:'#6b7ff0', delivered:'#10b981', cancelled:'#ef4444' }

export default async function DashboardPage() {
  const { orders, orderCount, productCount, customerCount, revenue } = await getStats()

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <p className="t-label mb-1">Welcome Back</p>
        <h1 className="font-black text-2xl">Dashboard <span className="p-text">Overview</span></h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          {label:'Total Orders',  value:orderCount.toString(),         sub:'All time',    icon:'📦'},
          {label:'Revenue',       value:`$${revenue.toFixed(2)}`,      sub:'All time',    icon:'💰'},
          {label:'Customers',     value:customerCount.toString(),       sub:'Registered',  icon:'👥'},
          {label:'Products',      value:productCount.toString(),        sub:'In store',    icon:'🛍️'},
        ].map(s=>(
          <div key={s.label} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-md" style={{color:'var(--p-light)',background:'var(--p-subtle)',border:'1px solid var(--p-border)'}}>{s.sub}</span>
            </div>
            <p className="font-black text-2xl p-text mb-0.5">{s.value}</p>
            <p className="text-[10px] uppercase tracking-widest" style={{color:'var(--text-4)'}}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-base">Recent Orders</h2>
            <Link href="/admin/orders" className="text-[11px] uppercase tracking-widest hover:text-[var(--p-light)] transition-colors" style={{color:'var(--text-4)'}}>View All →</Link>
          </div>
          {orders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-3xl mb-3">📦</p>
              <p className="text-sm" style={{color:'var(--text-3)'}}>No orders yet. Share your store!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((o: any)=>(
                <div key={o.id} className="flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-[var(--p-subtle)]" style={{border:'1px solid var(--border)'}}>
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg font-mono text-[10px] font-bold" style={{background:'var(--p-subtle)',border:'1px solid var(--p-border)',color:'var(--p-light)'}}>{o.id?.slice(-3)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{o.customer_name}</p>
                    <p className="text-[11px] truncate" style={{color:'var(--text-4)'}}>{o.customer_email}</p>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0" style={{color:SC[o.status]||'var(--text-3)',background:`${SC[o.status]||'#888'}12`,border:`1px solid ${SC[o.status]||'#888'}30`}}>{o.status}</span>
                  <span className="font-black text-sm p-text flex-shrink-0">${o.total?.toFixed(2)||'0.00'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-5">
          <div className="card p-5">
            <h2 className="font-black text-base mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[['➕ Add Product','/admin/products/new'],['📋 Manage Orders','/admin/orders'],['👥 View Customers','/admin/customers'],['⚙️ Settings','/admin/settings']].map(([label,href])=>(
                <Link key={label as string} href={href as string} className="flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all hover:bg-[var(--p-subtle)] hover:border-[var(--p-border-2)]" style={{border:'1px solid var(--border)',color:'var(--text-3)'}}>
                  {label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h2 className="font-black text-base mb-3">Store Status</h2>
            <div className="space-y-3">
              {[['Products',productCount > 0?'Active':'No products'],['Orders',orderCount > 0?'Receiving':'Waiting'],['Customers',customerCount > 0?`${customerCount} registered`:'None yet']].map(([k,v])=>(
                <div key={k} className="flex justify-between text-sm">
                  <span style={{color:'var(--text-3)'}}>{k}</span>
                  <span className="font-semibold" style={{color:'var(--p-light)'}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
