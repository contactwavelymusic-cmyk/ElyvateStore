import Link from 'next/link'

const LINKS = [['profile','👤','Profile'],['orders','📦','Order History'],['addresses','📍','Addresses'],['wishlist','❤️','Wishlist']]
const SC: Record<string,string> = { Shipped:'#6b7ff0', Delivered:'#10b981', Processing:'#8b5cf6', Pending:'#f59e0b', Cancelled:'#ef4444' }

export default function OrdersPage() {
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
                  style={{color:slug==='orders'?'var(--p-light)':'var(--text-3)',background:slug==='orders'?'var(--p-subtle)':'transparent',borderLeft:slug==='orders'?'2px solid var(--p)':'2px solid transparent'}}>
                  <span>{icon}</span>{label}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="md:col-span-3">
            <h2 className="font-bold text-lg mb-5">Order History</h2>
            <div className="card p-10 text-center">
              <p className="text-4xl mb-3">📦</p>
              <p className="font-bold mb-2">No orders yet</p>
              <p className="text-sm mb-6" style={{color:'var(--text-3)'}}>Your order history will appear here after you make a purchase.</p>
              <Link href="/shop" className="btn btn-primary"><span>Start Shopping</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
