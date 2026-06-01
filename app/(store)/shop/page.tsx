'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { getProducts, getCategories, getProductImage, formatPrice } from '@/lib/products'
import type { Product, Category } from '@/types'

function Stars({ r }: { r: number }) {
  return <div className="stars">{[1,2,3,4,5].map(i => <span key={i} style={{ opacity: i <= Math.round(r) ? 1 : 0.3 }}>★</span>)}</div>
}

export default function ShopPage() {
  const [products, setProducts]     = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading]       = useState(true)
  const [activeCat, setActiveCat]   = useState('all')
  const [sort, setSort]             = useState('Featured')
  const [priceMax, setPriceMax]     = useState(500)
  const [features, setFeatures]     = useState<string[]>([])
  const { addItem } = useCart()

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([p, c]) => {
      setProducts(p.products); setCategories(c.categories); setLoading(false)
    })
  }, [])

  const FEATS = ['Timer','Remote','Bluetooth','Adjustable','Portable']
  const toggleFeat = (f: string) => setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])

  const filtered = products.filter(p => {
    if (activeCat !== 'all' && p.category_id !== activeCat) return false
    if (p.price > priceMax) return false
    return true
  })

  return (
    <div style={{ minHeight: '100vh', paddingTop: '64px', background: 'var(--bg)' }}>
      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-4)' }}>
          <Link href="/" className="hover:text-[var(--p-light)] transition-colors">Home</Link>
          <span>/</span><span style={{ color: 'var(--text-2)' }}>Shop</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 flex gap-8 pt-8">
        {/* ── Sidebar ── */}
        <aside className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            {/* Categories */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold mb-3" style={{ color: 'var(--text-4)' }}>Categories</p>
              <nav className="space-y-0.5">
                <button onClick={() => setActiveCat('all')} className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-all"
                  style={{ color: activeCat === 'all' ? 'var(--p-light)' : 'var(--text-3)', background: activeCat === 'all' ? 'var(--p-subtle)' : 'transparent', borderLeft: activeCat === 'all' ? '2px solid var(--p)' : '2px solid transparent' }}>
                  <span>All Products</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </button>
                {categories.map(c => (
                  <button key={c.id} onClick={() => setActiveCat(c.id)} className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-all"
                    style={{ color: activeCat === c.id ? 'var(--p-light)' : 'var(--text-3)', background: activeCat === c.id ? 'var(--p-subtle)' : 'transparent', borderLeft: activeCat === c.id ? '2px solid var(--p)' : '2px solid transparent' }}>
                    <span>{c.name}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                ))}
                {/* Static fallback cats */}
                {categories.length === 0 && ['Projectors','Accessories','Bundles','New Arrivals','Best Sellers'].map(c => (
                  <button key={c} className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-left transition-all" style={{ color: 'var(--text-3)', borderLeft: '2px solid transparent' }}>
                    <span>{c}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                ))}
              </nav>
            </div>
            {/* Price */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold mb-3" style={{ color: 'var(--text-4)' }}>Price Range</p>
              <input type="range" min={0} max={500} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} className="w-full" style={{ accentColor: 'var(--p)' }} />
              <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--text-3)' }}><span>$0</span><span>${priceMax}+</span></div>
            </div>
            {/* Color swatches */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold mb-3" style={{ color: 'var(--text-4)' }}>Color</p>
              <div className="flex gap-2">
                {['#1a0040','#f5f0ff','#7c3aed'].map((c, i) => (
                  <button key={i} className="w-7 h-7 rounded-full border-2 transition-all" style={{ background: c, borderColor: i === 0 ? 'var(--p-light)' : 'var(--border-2)' }} />
                ))}
              </div>
            </div>
            {/* Features */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold mb-3" style={{ color: 'var(--text-4)' }}>Features</p>
              <div className="space-y-2">
                {FEATS.map(f => (
                  <label key={f} className="flex items-center gap-2.5 cursor-pointer">
                    <div onClick={() => toggleFeat(f)} className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ border: `1px solid ${features.includes(f) ? 'var(--p)' : 'var(--border-2)'}`, background: features.includes(f) ? 'var(--p)' : 'transparent' }}>
                      {features.includes(f) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>}
                    </div>
                    <span className="text-sm" style={{ color: 'var(--text-3)' }}>{f}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Products grid ── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>
              Showing <strong style={{ color: 'var(--text)' }}>1–{filtered.length}</strong> of <strong style={{ color: 'var(--text)' }}>{filtered.length}</strong> products
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>Sort by:</span>
              <select value={sort} onChange={e => setSort(e.target.value)} className="text-xs px-3 py-2 rounded-lg outline-none" style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', color: 'var(--text-2)', fontFamily: 'inherit' }}>
                {['Featured','Price: Low to High','Price: High to Low','Best Rated','Newest'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[1,2,3,4,5,6].map(i => <div key={i} className="card" style={{ height: 380 }}><div className="skeleton h-56 rounded-t-2xl" /><div className="p-4 space-y-2"><div className="skeleton h-4 rounded w-3/4" /><div className="skeleton h-3 rounded w-1/2" /></div></div>)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-4xl mb-4">🔭</p>
              <p className="font-bold mb-2">No products found</p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Try adjusting your filters or add products from the admin panel.</p>
              <Link href="/admin/products/new" className="btn btn-primary"><span>Add Products</span></Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p, i) => (
                <div key={p.id} className="card card-hover group">
                  <Link href={`/products/${p.slug}`}>
                    <div className="relative overflow-hidden rounded-t-2xl" style={{ height: 220, background: 'linear-gradient(135deg, var(--bg-3), var(--bg-4))' }}>
                      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 65%, rgba(139,92,246,0.25) 0%, transparent 65%)' }} />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-12 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.5), transparent 70%)', filter: 'blur(10px)' }} />
                      <Image src={getProductImage(p)} alt={p.name} fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 relative z-10" />
                      {p.original_price && p.price < p.original_price && (
                        <span className="tag tag-sale absolute top-3 right-3 z-20 text-[9px]">-{Math.round((1-p.price/p.original_price)*100)}%</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm mb-1 group-hover:text-[var(--p-light)] transition-colors">{p.name}</h3>
                      {p.rating && <div className="flex items-center gap-1.5 mb-1"><Stars r={p.rating} /><span className="text-[11px]" style={{ color: 'var(--text-4)' }}>({p.review_count})</span></div>}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-black p-text">{formatPrice(p.price)}</span>
                        {p.original_price && <span className="text-xs line-through" style={{ color: 'var(--text-4)' }}>{formatPrice(p.original_price)}</span>}
                      </div>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <button onClick={() => addItem(p as any)} className="btn btn-primary btn-full btn-sm"><span>Add to Cart</span></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {[1,2,3].map(n => (
                <button key={n} className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all"
                  style={{ background: n===1 ? 'var(--p)' : 'transparent', color: n===1 ? '#fff' : 'var(--text-3)', border: `1px solid ${n===1 ? 'var(--p)' : 'var(--border)'}` }}>{n}</button>
              ))}
              <button className="w-9 h-9 flex items-center justify-center rounded-lg" style={{ border: '1px solid var(--border)', color: 'var(--text-3)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
