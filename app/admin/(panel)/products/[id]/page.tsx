'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function EditProductPage() {
  const { id } = useParams<{id:string}>()
  const [form, setForm] = useState<any>(null)
  const [loading, setLoad] = useState(true)
  const [saving, setSave]  = useState(false)
  const [saved, setSaved]  = useState(false)
  const [error, setError]  = useState('')

  useEffect(() => {
    supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
      setForm(data || {}); setLoad(false)
    })
  }, [id])

  const h = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm((p: any) => ({...p, [e.target.name]: e.target.type==='checkbox'?(e.target as HTMLInputElement).checked:e.target.value}))

  const save = async () => {
    setSave(true); setError('')
    const { error: err } = await supabase.from('products').update({
      name: form.name, price: parseFloat(form.price), original_price: form.original_price?parseFloat(form.original_price):null,
      stock: parseInt(form.stock)||0, short_description: form.short_description, description: form.description,
      is_featured: form.is_featured, is_active: form.is_active, updated_at: new Date().toISOString(),
    }).eq('id', id)
    if (err) setError(err.message)
    else { setSaved(true); setTimeout(()=>setSaved(false),2500) }
    setSave(false)
  }

  const del = async () => {
    if (!confirm('Delete this product?')) return
    await supabase.from('products').delete().eq('id', id)
    window.location.href = '/admin/products'
  }

  if (loading) return <div className="p-10"><div className="skeleton h-8 rounded w-48 mb-4"/><div className="skeleton h-64 rounded"/></div>

  return (
    <div className="p-6 md:p-10 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="w-8 h-8 flex items-center justify-center rounded-lg hover:text-[var(--p-light)] transition-colors" style={{border:'1px solid var(--border)',color:'var(--text-3)'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <div><p className="t-label mb-0.5">Products</p><h1 className="font-black text-2xl">Edit Product</h1></div>
      </div>
      {saved && <div className="mb-6 p-4 text-sm rounded-xl" style={{background:'rgba(16,185,129,0.07)',border:'1px solid rgba(16,185,129,0.3)',color:'var(--success)'}}>✓ Product updated</div>}
      {error && <div className="mb-6 p-4 text-sm rounded-xl" style={{background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.25)',color:'var(--error)'}}>{error}</div>}
      <div className="space-y-5">
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-base">Basic Information</h2>
          <div><label className="inp-label">Product Name</label><input name="name" value={form.name||''} onChange={h} className="inp"/></div>
          <div><label className="inp-label">Short Description</label><input name="short_description" value={form.short_description||''} onChange={h} className="inp"/></div>
          <div><label className="inp-label">Full Description</label><textarea name="description" value={form.description||''} onChange={h as any} rows={4} className="inp"/></div>
        </div>
        <div className="card p-6 space-y-4">
          <h2 className="font-bold text-base">Pricing & Inventory</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="inp-label">Sale Price ($)</label><input name="price" value={form.price||''} onChange={h} type="number" step="0.01" className="inp"/></div>
            <div><label className="inp-label">Original Price ($)</label><input name="original_price" value={form.original_price||''} onChange={h} type="number" step="0.01" className="inp"/></div>
            <div><label className="inp-label">Stock</label><input name="stock" value={form.stock||''} onChange={h} type="number" className="inp"/></div>
            <div><label className="inp-label">SKU</label><input name="sku" value={form.sku||''} onChange={h} className="inp"/></div>
          </div>
        </div>
        <div className="card p-5 space-y-3">
          {[['is_featured','Featured product (homepage)'],['is_active','Active (visible to customers)']].map(([n,l])=>(
            <label key={n} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium">{l}</span>
              <div onClick={()=>setForm((p:any)=>({...p,[n]:!p[n]}))} className="w-10 h-5 rounded-full relative cursor-pointer transition-all"
                style={{background:form[n]?'var(--p)':'var(--bg-4)',border:'1px solid var(--border-2)'}}>
                <div className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all" style={{left:form[n]?'calc(100% - 18px)':'2px'}}/>
              </div>
            </label>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={save} disabled={saving} className="btn btn-primary btn-lg"><span>{saving?'Saving...':'Save Changes'}</span></button>
          <Link href="/admin/products" className="btn btn-outline">Cancel</Link>
          <button onClick={del} className="btn ml-auto" style={{background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.25)',color:'var(--error)'}}>Delete</button>
        </div>
      </div>
    </div>
  )
}
