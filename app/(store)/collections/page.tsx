'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCategories, getProducts, getProductImage } from '@/lib/products'
import type { Category, Product } from '@/types'

export default function CollectionsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts]     = useState<Product[]>([])

  useEffect(() => {
    getCategories().then(({ categories: c }) => setCategories(c))
    getProducts({ featured: true, limit: 8 }).then(({ products: p }) => setProducts(p))
  }, [])

  // Fallback static categories if Supabase empty
  const STATIC = [
    { id:'1', name:'Galaxy Projectors', slug:'galaxy-projectors', description:'Transform any room into a breathtaking cosmos' },
    { id:'2', name:'Accessories',       slug:'accessories',       description:'Remote controls, stands and add-ons' },
    { id:'3', name:'Bundles',           slug:'bundles',           description:'Save more with curated product bundles' },
    { id:'4', name:'New Arrivals',      slug:'new-arrivals',      description:'The latest additions to our collection' },
  ]
  const cats = categories.length > 0 ? categories : STATIC
  const imgs = ['/images/product-1.png','/images/product-2.png','/images/product-3.png','/images/product-1.png']

  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      <div style={{borderBottom:'1px solid var(--border)',background:'var(--bg-2)'}}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-[11px] uppercase tracking-widest" style={{color:'var(--text-4)'}}>
          <Link href="/" className="hover:text-[var(--p-light)] transition-colors">Home</Link>
          <span>/</span><span style={{color:'var(--text-2)'}}>Collections</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 pb-24">
        <div className="mb-12">
          <h1 className="t-h1 mb-2">OUR COLLECTIONS</h1>
          <p className="text-sm" style={{color:'var(--text-3)'}}>Handpicked collections to inspire your space.</p>
        </div>

        {/* 2x2 collection grid — matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {cats.slice(0,4).map((c,i)=>(
            <Link key={c.id} href={`/shop?category=${c.slug}`} className="card card-hover group relative overflow-hidden" style={{minHeight:200}}>
              <div className="absolute inset-0" style={{background:'linear-gradient(135deg,var(--bg-3),var(--bg-4))'}}/>
              <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{background:'radial-gradient(circle at 80% 20%, rgba(139,92,246,0.20), transparent 65%)'}}/>
              {/* Product image right side */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-36 h-36 flex items-center justify-center" style={{opacity:0.85}}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-8 pointer-events-none" style={{background:'radial-gradient(ellipse at center,rgba(139,92,246,0.5),transparent 70%)',filter:'blur(8px)'}}/>
                <Image src={imgs[i%3]} alt={c.name} width={140} height={140} className="object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"/>
              </div>
              <div className="relative z-10 p-7 pr-44">
                <h3 className="font-black text-lg mb-2 group-hover:text-[var(--p-light)] transition-colors">{c.name}</h3>
                {c.description && <p className="text-sm mb-3" style={{color:'var(--text-3)'}}>{c.description}</p>}
                <span className="text-xs uppercase tracking-widest" style={{color:'var(--p-light)'}}>Explore Now →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured products in collection */}
        {products.length > 0 && (
          <div>
            <h2 className="t-h2 mb-8">Featured <span className="p-text">Products</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0,4).map(p=>(
                <Link key={p.id} href={`/products/${p.slug}`} className="card card-hover group">
                  <div className="relative overflow-hidden rounded-t-2xl" style={{height:160,background:'linear-gradient(135deg,var(--bg-3),var(--bg-4))'}}>
                    <div className="absolute inset-0" style={{background:'radial-gradient(circle at center,rgba(139,92,246,0.2),transparent 70%)'}}/>
                    <Image src={getProductImage(p)} alt={p.name} fill className="object-contain p-5 group-hover:scale-105 transition-transform duration-500"/>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-xs mb-1 group-hover:text-[var(--p-light)] transition-colors">{p.name}</p>
                    <p className="font-black text-sm p-text">{p.price ? `$${p.price.toFixed(2)}` : ''}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
