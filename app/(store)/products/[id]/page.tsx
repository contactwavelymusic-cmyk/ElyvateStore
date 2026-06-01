'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { getProductBySlug, getProducts, getProductImage, formatPrice } from '@/lib/products'
import type { Product } from '@/types'

const TABS = ['Description','Features','Shipping & Returns'] as const
type Tab = typeof TABS[number]

function Stars({ r, count }: { r: number; count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="stars">{[1,2,3,4,5].map(i=><span key={i} style={{opacity:i<=Math.round(r)?1:0.3}}>★</span>)}</div>
      <span className="font-bold text-sm">{r}</span>
      {count !== undefined && <span className="text-sm" style={{color:'var(--text-3)'}}>({count.toLocaleString()} reviews)</span>}
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams<{id:string}>()
  const [product, setProduct] = useState<Product|null>(null)
  const [related, setRelated]   = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [qty, setQty]           = useState(1)
  const [tab, setTab]           = useState<Tab>('Description')
  const [added, setAdded]       = useState(false)
  const [wish, setWish]         = useState(false)
  const [selImg, setSelImg]     = useState(0)
  const { addItem } = useCart()

  useEffect(() => {
    getProductBySlug(id).then(({ product: p }) => {
      setProduct(p); setLoading(false)
      if (p) getProducts({ limit: 4 }).then(({ products }) => setRelated(products.filter(x => x.id !== p.id).slice(0,4)))
    })
  }, [id])

  const handleAdd = () => { if (!product) return; addItem(product as any, qty); setAdded(true); setTimeout(()=>setAdded(false),2500) }

  if (loading) return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div className="skeleton aspect-square rounded-2xl"/>
          <div className="space-y-4 pt-4"><div className="skeleton h-5 rounded w-1/3"/><div className="skeleton h-10 rounded w-3/4"/><div className="skeleton h-4 rounded w-1/2"/><div className="skeleton h-20 rounded"/><div className="skeleton h-14 rounded mt-6"/></div>
        </div>
      </div>
    </div>
  )

  if (!product) return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div className="text-center"><p className="text-6xl mb-4">🔭</p><p className="mb-6" style={{color:'var(--text-3)'}}>Product not found</p><Link href="/shop" className="btn btn-primary"><span>Back to Shop</span></Link></div>
    </div>
  )

  const imgs = product.images?.length ? product.images : [getProductImage(product,0), getProductImage(product,1), getProductImage(product,2), getProductImage(product,0)]
  const savings = product.original_price ? product.original_price - product.price : 0

  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      {/* Breadcrumb */}
      <div style={{borderBottom:'1px solid var(--border)',background:'var(--bg-2)'}}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-[11px] uppercase tracking-widest" style={{color:'var(--text-4)'}}>
          <Link href="/" className="hover:text-[var(--p-light)] transition-colors">Home</Link><span>/</span>
          <Link href="/shop" className="hover:text-[var(--p-light)] transition-colors">Products</Link><span>/</span>
          <span style={{color:'var(--text-2)'}}>{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-20">
          {/* ── Images ── */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center"
              style={{background:'linear-gradient(135deg,var(--bg-3),var(--bg-4))',border:'1px solid var(--border-2)'}}>
              <div className="absolute inset-0" style={{background:'radial-gradient(circle at 50% 60%, rgba(139,92,246,0.30) 0%, transparent 65%)'}}/>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-24 pointer-events-none" style={{background:'radial-gradient(ellipse at center, rgba(139,92,246,0.55), transparent 70%)',filter:'blur(16px)'}}/>
              <Image src={imgs[selImg] || getProductImage(product)} alt={product.name} fill className="object-contain p-10 relative z-10" style={{animation:'float 4s ease-in-out infinite'}} priority/>
              {savings > 0 && <span className="tag tag-sale absolute top-5 right-5 z-20">Save {formatPrice(savings)}</span>}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0,1,2,3].map(i=>(
                <button key={i} onClick={()=>setSelImg(i)} className="aspect-square rounded-xl overflow-hidden flex items-center justify-center transition-all"
                  style={{background:'var(--bg-3)',border:`2px solid ${selImg===i?'var(--p)':'var(--border)'}`}}>
                  <Image src={imgs[i]||getProductImage(product)} alt="" width={80} height={80} className="w-14 h-14 object-contain opacity-80"/>
                </button>
              ))}
            </div>
          </div>

          {/* ── Info ── */}
          <div>
            <p className="t-label mb-2">Elyvate Collection</p>
            <h1 className="t-h1 mb-3">{product.name}</h1>
            {product.rating && <div className="mb-5"><Stars r={product.rating} count={product.review_count}/></div>}
            {/* Price box */}
            <div className="p-5 rounded-xl mb-5 flex items-center justify-between" style={{background:'var(--bg-3)',border:'1px solid var(--border-2)'}}>
              <div className="flex items-baseline gap-3">
                <span className="font-black text-4xl p-text">{formatPrice(product.price)}</span>
                {product.original_price && <span className="text-base line-through" style={{color:'var(--text-4)'}}>{formatPrice(product.original_price)}</span>}
              </div>
              {savings > 0 && <span className="tag">Save {formatPrice(savings)}</span>}
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{color:'var(--text-3)'}}>{product.short_description || product.description}</p>
            {/* Color */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest mb-2" style={{color:'var(--text-3)'}}>Color: <strong style={{color:'var(--text)'}}>Midnight Black</strong></p>
              <div className="flex gap-2">
                {['#1a0040','#f5f0ff','#2d1b4e'].map((c,i)=>(
                  <button key={c} className="w-8 h-8 rounded-full border-2 transition-all" style={{background:c,borderColor:i===0?'var(--p-light)':'var(--border-2)'}}/>
                ))}
              </div>
            </div>
            {/* Qty */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest mb-2" style={{color:'var(--text-3)'}}>Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg" style={{border:'1px solid var(--border-2)'}}>
                  <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-11 h-11 flex items-center justify-center text-lg hover:text-[var(--p-light)] transition-colors" style={{color:'var(--text-3)'}}>−</button>
                  <span className="w-10 text-center font-bold">{qty}</span>
                  <button onClick={()=>setQty(q=>q+1)} className="w-11 h-11 flex items-center justify-center text-lg hover:text-[var(--p-light)] transition-colors" style={{color:'var(--text-3)'}}>+</button>
                </div>
              </div>
            </div>
            {/* CTAs */}
            <div className="flex gap-3 mb-3">
              <button onClick={handleAdd} className="btn btn-primary flex-1 btn-lg" style={{opacity:added?0.8:1}}>
                <span>{added?'✓ Added to Cart!':'Add to Cart'}</span>
              </button>
              <button onClick={()=>setWish(w=>!w)} className="w-12 h-12 flex items-center justify-center rounded-lg transition-all flex-shrink-0"
                style={{border:'1px solid var(--border-2)',color:wish?'#ef4444':'var(--text-3)',background:wish?'rgba(239,68,68,0.07)':'transparent'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wish?'currentColor':'none'} stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <p className="text-xs mb-5 text-center" style={{color:'var(--text-4)'}}>Add to Wishlist ♡</p>
            {/* Badges */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[['🚚','Free Shipping'],['↩️','30-Day Returns'],['🛡️','2-Year Warranty'],['🔒','Secure Checkout']].map(([icon,text])=>(
                <div key={text as string} className="flex flex-col items-center gap-1 p-3 rounded-xl text-center" style={{background:'var(--bg-3)',border:'1px solid var(--border)'}}>
                  <span className="text-lg">{icon}</span>
                  <span className="text-[9px] uppercase tracking-wide leading-tight" style={{color:'var(--text-3)'}}>{text}</span>
                </div>
              ))}
            </div>
            {/* Tabs */}
            <div className="rounded-xl overflow-hidden" style={{border:'1px solid var(--border)'}}>
              <div className="flex" style={{borderBottom:'1px solid var(--border)'}}>
                {TABS.map(t=>(
                  <button key={t} onClick={()=>setTab(t)} className="flex-1 py-3 text-[10px] uppercase tracking-widest transition-all"
                    style={{color:tab===t?'var(--p-light)':'var(--text-3)',borderBottom:tab===t?'2px solid var(--p)':'2px solid transparent',marginBottom:'-1px',background:'transparent'}}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {tab==='Description' && <p className="text-sm leading-relaxed" style={{color:'var(--text-3)'}}>{product.description}</p>}
                {tab==='Features' && (
                  <div className="grid grid-cols-2 gap-2">
                    {(product.features || []).map(f=>(
                      <div key={f} className="flex items-center gap-2 text-sm" style={{color:'var(--text-3)'}}><span style={{color:'var(--p-light)',fontSize:'8px'}}>✦</span>{f}</div>
                    ))}
                    {(!product.features || product.features.length === 0) && <p className="text-sm col-span-2" style={{color:'var(--text-4)'}}>No features listed yet.</p>}
                  </div>
                )}
                {tab==='Shipping & Returns' && (
                  <div className="space-y-2 text-sm" style={{color:'var(--text-3)'}}>
                    <p>🌍 <strong style={{color:'var(--text)'}}>Free worldwide shipping</strong> on all orders</p>
                    <p>📦 Delivery in <strong style={{color:'var(--text)'}}>7–20 business days</strong></p>
                    <p>↩️ <strong style={{color:'var(--text)'}}>30-day hassle-free returns</strong></p>
                  </div>
                )}
              </div>
            </div>
            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-4 p-5 rounded-xl" style={{background:'var(--bg-3)',border:'1px solid var(--border)'}}>
                <p className="text-[10px] uppercase tracking-widest mb-4" style={{color:'var(--text-4)'}}>Specifications</p>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {Object.entries(product.specs).map(([k,v])=>(
                    <div key={k} className="flex justify-between text-xs pb-2" style={{borderBottom:'1px solid var(--border)'}}>
                      <span style={{color:'var(--text-4)'}}>{k}</span>
                      <span style={{color:'var(--text-2)'}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h3 className="t-h3 mb-6">You May Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p=>(
                <Link key={p.id} href={`/products/${p.slug}`} className="card card-hover group p-4">
                  <div className="h-32 flex items-center justify-center mb-3 rounded-xl relative overflow-hidden" style={{background:'var(--bg-3)'}}>
                    <div className="absolute inset-0" style={{background:'radial-gradient(circle at center,rgba(139,92,246,0.2),transparent 70%)'}}/>
                    <Image src={getProductImage(p)} alt={p.name} width={100} height={100} className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"/>
                  </div>
                  <p className="font-semibold text-xs mb-1 group-hover:text-[var(--p-light)] transition-colors">{p.name}</p>
                  {p.rating && <div className="stars mb-1 text-[10px]">{[1,2,3,4,5].map(i=><span key={i} style={{opacity:i<=Math.round(p.rating!)?1:0.3}}>★</span>)}</div>}
                  <span className="font-black text-sm p-text">{formatPrice(p.price)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
