import Link from 'next/link'

const LINKS = {
  Shop:    [['All Products','/shop'],['Collections','/collections'],['New Arrivals','/shop'],['Best Sellers','/shop']],
  Account: [['My Account','/account/profile'],['Order History','/account/orders'],['Wishlist','/wishlist'],['Track Order','/account/orders']],
  Support: [['FAQ','/faq'],['Contact Us','/contact'],['Privacy Policy','/privacy'],['Terms','/terms']],
}

export default function Footer() {
  return (
    <footer style={{background:'var(--bg-2)',borderTop:'1px solid var(--border)'}}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <span className="font-black text-xl tracking-widest uppercase p-text block mb-3" style={{letterSpacing:'0.18em'}}>EL<span style={{color:'var(--p-light)'}}>Y</span>VATE</span>
          <p className="text-sm leading-relaxed mb-5" style={{color:'var(--text-3)'}}>Premium ambient lighting that transforms your space into an experience.</p>
          <p className="text-xs mb-5 flex items-center gap-2" style={{color:'var(--text-4)'}}><span>📧</span>elyvate.business@gmail.com</p>
          <div className="grid grid-cols-2 gap-2">
            {[['🚚','Free Worldwide Shipping'],['↩️','30-Day Returns'],['🔒','Secure Checkout'],['⚡','Fast Dispatch']].map(([icon,text])=>(
              <div key={text as string} className="flex items-center gap-2 text-[11px]" style={{color:'var(--text-4)'}}><span>{icon}</span>{text}</div>
            ))}
          </div>
        </div>
        {/* Link cols */}
        {Object.entries(LINKS).map(([title,items])=>(
          <div key={title}>
            <p className="t-label mb-5">{title}</p>
            <ul className="space-y-2.5">
              {items.map(([label,href])=>(
                <li key={label}><Link href={href} className="text-sm transition-colors hover:text-[var(--p-light)]" style={{color:'var(--text-3)'}}>{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3" style={{borderTop:'1px solid var(--border)'}}>
        <p className="text-xs" style={{color:'var(--text-4)'}}>© 2026 Elyvate. All rights reserved.</p>
        <p className="text-xs" style={{color:'var(--text-4)'}}>Built with Next.js · Deployed on Vercel</p>
      </div>
    </footer>
  )
}
