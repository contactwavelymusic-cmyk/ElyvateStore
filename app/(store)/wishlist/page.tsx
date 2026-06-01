import Link from 'next/link'
export default function WishlistPage() {
  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      <div className="max-w-5xl mx-auto px-6 py-12 pb-24">
        <p className="t-label mb-2">Saved Items</p>
        <h1 className="t-h1 mb-8">My <span className="p-text">Wishlist</span></h1>
        <div className="card p-16 text-center">
          <p className="text-5xl mb-4">❤️</p>
          <p className="font-bold mb-2">Your wishlist is empty</p>
          <p className="text-sm mb-6" style={{color:'var(--text-3)'}}>Save products you love for later</p>
          <Link href="/shop" className="btn btn-primary"><span>Browse Products</span></Link>
        </div>
      </div>
    </div>
  )
}
