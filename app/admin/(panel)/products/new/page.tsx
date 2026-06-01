'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/utils'

export default function NewProductPage() {
  const [form, setForm] = useState({ name:'', price:'', original_price:'', stock:'50', sku:'', short_desc:'', desc:'', category:'', is_featured:false, is_active:true })
  const [features, setFeatures] = useState<string[]>([])
  const [featInput, setFeatInput] = useState('')
  const [images, setImages] = useState<string[]>(['/images/product-1.png'])
  const [loading, setLoading] = useState(false)
  const [saved, setSaved]     = useState(false)
  const [error, setError]     = useState('')

  const h = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }))

  const addFeat = () => { if (featInput.trim()) { setFeatures(p => [...p, featInput.trim()]); setFeatInput('') } }
  const addImg  = (src: string) => { if (src.trim()) setImages(p => [...p, src.trim()]) }

  const save = async () => {
    if (!form.name || !form.price) { setError('Name and price are required'); return }
    setLoading(true); setError('')
    try {
      const { error: err } = await supabase.from('products').insert({
        name: form.name, slug: slugify(form.name), price: parseFloat(form.price),
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        stock: parseInt(form.stock) || 0, sku: form.sku || null,
        short_description: form.short_desc, description: form.desc,
        images, features, is_featured: form.is_featured, is_active: form.is_active,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      })
      if (err) { setError(err.message); return }
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="w-8 h-8 flex items-center justify-center rounded-lg hover:text-[var(--p-light)] transition-colors" style={{border:'1px solid var(--border)',color:'var(--text-3)'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <div><p className="t-label mb-0.5">Products</p><h1 className="font-black text-2xl">Add New Product</h1></div>
      </div>

      {saved && <div className="mb-6 p-4 text-sm rounded-xl" style={{background:'rgba(16,185,129,0.07)',border:'1px solid rgba(16,185,129,0.3)',color:'var(--success)'}}>✓ Product saved successfully!</div>}
      {error && <div className="mb-6 p-4 text-sm rounded-xl" style={{background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.25)',color:'var(--error)'}}>{error}</div>}

      <div className="space-y-5">
        {/* Basic Info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-base mb-1">Basic Information</h2>
          <div><label className="inp-label">Product Name *</label><input name="name" value={form.name} onChange={h} placeholder="Astronaut Galaxy Projector" className="inp"/></div>
          <div><label className="inp-label">Short Description</label><input name="short_desc" value={form.short_desc} onChange={h} placeholder="8 galaxy modes · 360° rotation · Bluetooth speaker" className="inp"/></div>
          <div><label className="inp-label">Full Description</label><textarea name="desc" value={form.desc} onChange={h as any} placeholder="Detailed product description..." rows={5} className="inp"/></div>
        </div>

        {/* Pricing */}
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-base mb-1">Pricing & Inventory</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="inp-label">Sale Price ($) *</label><input name="price" value={form.price} onChange={h} placeholder="44.99" type="number" step="0.01" className="inp"/></div>
            <div><label className="inp-label">Original Price ($)</label><input name="original_price" value={form.original_price} onChange={h} placeholder="64.99" type="number" step="0.01" className="inp"/></div>
            <div><label className="inp-label">Stock Quantity</label><input name="stock" value={form.stock} onChange={h} placeholder="50" type="number" className="inp"/></div>
            <div><label className="inp-label">SKU</label><input name="sku" value={form.sku} onChange={h} placeholder="ELY-AGP-001" className="inp"/></div>
          </div>
        </div>

        {/* Images */}
        <div className="card p-6">
          <h2 className="font-bold text-base mb-4">Product Images</h2>
          <p className="text-xs mb-3" style={{color:'var(--text-4)'}}>Enter image URLs or use local paths like /images/product-1.png</p>
          <div className="flex flex-wrap gap-3 mb-4">
            {images.map((img, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden" style={{border:'1px solid var(--border)'}}>
                <img src={img} alt="" className="w-full h-full object-contain p-1" style={{background:'var(--bg-3)'}}/>
                <button onClick={() => setImages(p => p.filter((_,j)=>j!==i))} className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white" style={{background:'rgba(239,68,68,0.8)'}}>×</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input id="imgUrl" placeholder="https://... or /images/product-1.png" className="inp flex-1"/>
            <button onClick={() => { const v = (document.getElementById('imgUrl') as HTMLInputElement).value; addImg(v); (document.getElementById('imgUrl') as HTMLInputElement).value = '' }} className="btn btn-outline btn-sm flex-shrink-0">Add</button>
          </div>
          <p className="text-[11px] mt-2" style={{color:'var(--text-4)'}}>Local demo images: /images/product-1.png · /images/product-2.png · /images/product-3.png</p>
        </div>

        {/* Features */}
        <div className="card p-6">
          <h2 className="font-bold text-base mb-4">Features</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {features.map((f,i) => (
              <span key={i} className="tag flex items-center gap-1.5">
                {f}
                <button onClick={() => setFeatures(p => p.filter((_,j)=>j!==i))} className="hover:text-red-400 transition-colors">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={featInput} onChange={e=>setFeatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addFeat()} placeholder="e.g. 360° rotation" className="inp flex-1"/>
            <button onClick={addFeat} className="btn btn-outline btn-sm">Add</button>
          </div>
        </div>

        {/* Toggles */}
        <div className="card p-5 space-y-3">
          {[['is_featured','Featured product (shown on homepage)'],['is_active','Active (visible to customers)']].map(([name,label])=>(
            <label key={name} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium">{label}</span>
              <div onClick={()=>setForm(p=>({...p,[name]:!(p as any)[name]}))}
                className="w-10 h-5 rounded-full relative cursor-pointer transition-all"
                style={{background:(form as any)[name]?'var(--p)':'var(--bg-4)',border:'1px solid var(--border-2)'}}>
                <div className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all" style={{left:(form as any)[name]?'calc(100% - 18px)':'2px'}}/>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={save} disabled={loading} className="btn btn-primary btn-lg">
            <span>{loading ? 'Saving...' : 'Save Product'}</span>
            {loading && <svg style={{animation:'spin 0.8s linear infinite',width:14,height:14}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>}
          </button>
          <Link href="/admin/products" className="btn btn-outline">Cancel</Link>
        </div>
      </div>
    </div>
  )
}
