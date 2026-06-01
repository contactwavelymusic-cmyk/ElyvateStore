'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { getProducts, getProductImage, formatPrice } from '@/lib/products'
import type { Product } from '@/types'

const HERO_MP4 = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4'
const HLS_URL  = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="stars">{[1,2,3,4,5].map(i => <span key={i} style={{ opacity: i <= Math.round(rating) ? 1 : 0.3 }}>★</span>)}</div>
      {count !== undefined && <span className="text-xs" style={{ color: 'var(--text-4)' }}>({count.toLocaleString()})</span>}
    </div>
  )
}

export default function HomePage() {
  const hlsRef = useRef<HTMLVideoElement>(null)
  const { addItem } = useCart()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts({ featured: true, limit: 3 }).then(({ products }) => setProducts(products))
  }, [])

  useEffect(() => {
    const video = hlsRef.current; if (!video) return
    if (video.canPlayType('application/vnd.apple.mpegurl')) { video.src = HLS_URL }
    else { import('hls.js').then(({ default: Hls }) => { if (Hls.isSupported()) { const h = new Hls({ enableWorker: false }); h.loadSource(HLS_URL); h.attachMedia(video) } }) }
  }, [])

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" src={HERO_MP4} autoPlay loop muted playsInline style={{ opacity: 0.18 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--bg) 0%, rgba(13,1,23,0.7) 50%, transparent 100%)' }} />
        <div className="starfield absolute inset-0" />
        {/* Large purple glow top right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(139,92,246,0.25) 0%, transparent 65%)', filter: 'blur(40px)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <div className="anim-fadeup d1 flex items-center gap-2 mb-6">
              <span style={{ color: 'var(--p-light)', fontSize: '0.65rem' }}>✦</span>
              <span className="t-label">Premium Galaxy Projectors</span>
            </div>
            <h1 className="anim-fadeup d2 t-hero mb-6">
              TRANSFORM<br />YOUR ROOM<br />INTO A <span className="p-text">GALAXY</span>
            </h1>
            <p className="anim-fadeup d3 text-base leading-relaxed mb-8 max-w-md" style={{ color: 'var(--text-3)' }}>
              Immerse yourself in a universe of nebulae, stars and endless possibilities.
            </p>
            <div className="anim-fadeup d4 flex flex-wrap gap-4 mb-14">
              <Link href="/shop" className="btn btn-primary btn-xl">Shop Collection</Link>
            </div>
            {/* Trust badges */}
            <div className="anim-fadeup d5 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[['🚚','Free Shipping','Worldwide on orders over $89'],['↩️','30-Day Returns','Love it or return it hassle-free'],['🛡️','2-Year Warranty','Premium quality you can trust'],['🔒','Secure Payment','100% safe & secure checkout']].map(([icon,title,sub])=>(
                <div key={title as string} className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span className="text-xl">{icon}</span>
                  <p className="text-[10px] font-bold uppercase tracking-wider leading-tight" style={{ color: 'var(--text-2)' }}>{title}</p>
                  <p className="text-[9px] leading-tight" style={{ color: 'var(--text-4)' }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero product with platform glow */}
          <div className="anim-fadein d3 relative flex items-center justify-center">
            <div className="product-platform w-full max-w-[520px] mx-auto" style={{ animation: 'float 5s ease-in-out infinite' }}>
              <Image src="/images/product-1.png" alt="Galaxy Projector" width={600} height={600} className="w-full h-auto object-contain relative z-10" style={{ filter: 'drop-shadow(0 0 60px rgba(139,92,246,0.5))' }} priority />
            </div>
            {/* Moon/planet decorative */}
            <div className="absolute top-8 right-8 w-16 h-16 rounded-full opacity-60 pointer-events-none" style={{ background: 'radial-gradient(circle at 35% 35%, #c4b5fd, #7c3aed)', boxShadow: '0 0 30px rgba(139,92,246,0.4)' }} />
            <div className="absolute bottom-16 right-4 text-[10px] uppercase tracking-[0.2em] opacity-30 rotate-90" style={{ color: 'var(--text-4)' }}>◉ Scroll to Explore</div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-3" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }}>
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 22s linear infinite', width: 'max-content' }}>
          {Array(8).fill(['Free Worldwide Shipping ✦','Premium Quality ✦','30-Day Returns ✦','Secure Payment ✦','10,000+ Happy Customers ✦']).flat().map((t,i)=>(
            <span key={i} className="text-[10px] uppercase tracking-[0.3em] px-8" style={{ color: 'var(--text-4)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="t-label mb-3">Featured Products</p>
              <h2 className="t-h1">Crafted for <span className="p-text">Atmosphere</span></h2>
            </div>
            <Link href="/shop" className="text-sm uppercase tracking-widest hover:text-[var(--p-light)] transition-colors" style={{ color: 'var(--text-3)' }}>View All →</Link>
          </div>

          {products.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="card" style={{ height: 420 }}>
                  <div className="skeleton h-64 rounded-t-2xl" />
                  <div className="p-5 space-y-3">
                    <div className="skeleton h-4 rounded w-3/4" />
                    <div className="skeleton h-3 rounded w-1/2" />
                    <div className="skeleton h-8 rounded mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p, i) => (
                <div key={p.id} className="card card-hover group">
                  <Link href={`/products/${p.slug}`}>
                    <div className="relative overflow-hidden rounded-t-2xl" style={{ height: 260, background: 'linear-gradient(135deg, var(--bg-3), var(--bg-4))' }}>
                      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 60%, rgba(139,92,246,0.30) 0%, transparent 65%)' }} />
                      {/* Platform glow */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-16 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(12px)' }} />
                      <Image src={getProductImage(p, 0)} alt={p.name} fill className="object-contain p-8 group-hover:scale-105 transition-transform duration-500 relative z-10" />
                      {p.is_featured && <span className="tag absolute top-3 left-3 z-20">Featured</span>}
                      {p.original_price && p.price < p.original_price && (
                        <span className="tag tag-sale absolute top-3 right-3 z-20">-{Math.round((1 - p.price/p.original_price)*100)}%</span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-sm mb-1.5 group-hover:text-[var(--p-light)] transition-colors">{p.name}</h3>
                      {p.rating && <StarRating rating={p.rating} count={p.review_count} />}
                      <p className="text-xs mt-2 mb-3 line-clamp-2" style={{ color: 'var(--text-3)' }}>{p.short_description}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-lg p-text">{formatPrice(p.price)}</span>
                        {p.original_price && <span className="text-xs line-through" style={{ color: 'var(--text-4)' }}>{formatPrice(p.original_price)}</span>}
                      </div>
                    </div>
                  </Link>
                  <div className="px-5 pb-5">
                    <button onClick={() => addItem(p as any)} className="btn btn-primary btn-full btn-sm"><span>Add to Cart</span></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="relative aspect-video rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-2)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(139,92,246,0.35), transparent 65%)' }} />
            <Image src="/images/product-3.png" alt="Atmosphere" fill className="object-contain p-8" />
          </div>
          <div>
            <p className="t-label mb-4">Designing Spaces</p>
            <h2 className="t-h1 mb-2">That <span className="p-text">INSPIRE</span></h2>
            <div className="divider" />
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-3)' }}>
              At Elyvate, we believe in the power of light to transform your surroundings and elevate your everyday. Our galaxy projectors are crafted to bring the universe closer to you.
            </p>
            <Link href="/about" className="btn btn-outline">Our Story</Link>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[['50K+','Happy Customers'],['100K+','Products Sold'],['4.9★','Customer Rating']].map(([v,l])=>(
                <div key={l}><p className="font-black text-2xl p-text">{v}</p><p className="text-[11px] mt-1" style={{ color: 'var(--text-4)' }}>{l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA HLS ── */}
      <section className="relative py-36 overflow-hidden" style={{ borderTop: '1px solid var(--border)' }}>
        <video ref={hlsRef} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline style={{ opacity: 0.35 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--bg) 0%, rgba(13,1,23,0.5) 50%, var(--bg) 100%)' }} />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="t-label mb-5">Limited Collection</p>
          <h2 className="t-hero mb-6">Your Room Deserves<br /><span className="p-text">The Stars</span></h2>
          <p className="text-base mb-10" style={{ color: 'var(--text-3)' }}>Free worldwide shipping on all orders.</p>
          <Link href="/shop" className="btn btn-primary btn-xl"><span>Shop the Collection</span></Link>
        </div>
      </section>
    </div>
  )
}
