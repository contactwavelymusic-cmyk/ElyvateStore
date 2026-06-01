import Link from 'next/link'
import Image from 'next/image'
import { supabaseAdmin } from '@/lib/supabase'

async function getProducts() {
  const { data } = await supabaseAdmin.from('products').select('*').order('created_at', { ascending: false })
  return data || []
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div><p className="t-label mb-1">Manage</p><h1 className="font-black text-2xl">Products</h1></div>
        <Link href="/admin/products/new" className="btn btn-primary btn-sm"><span>+ Add Product</span></Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{borderBottom:'1px solid var(--border)',background:'var(--bg-2)'}}>
                {['Product','SKU','Price','Stock','Status','Actions'].map(h=>(
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-widest font-semibold" style={{color:'var(--text-4)'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-16 text-center">
                  <p className="text-3xl mb-3">📦</p>
                  <p className="font-bold mb-2">No products yet</p>
                  <p className="text-sm mb-5" style={{color:'var(--text-3)'}}>Add your first product to start selling</p>
                  <Link href="/admin/products/new" className="btn btn-primary btn-sm"><span>Add First Product</span></Link>
                </td></tr>
              ) : products.map((p: any)=>(
                <tr key={p.id} style={{borderBottom:'1px solid var(--border)'}} className="transition-colors hover:bg-[var(--p-subtle)]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center overflow-hidden" style={{background:'var(--bg-3)',border:'1px solid var(--border)'}}>
                        {p.images?.[0] ? (
                          <Image src={p.images[0]} alt={p.name} width={44} height={44} className="w-10 h-10 object-contain"/>
                        ) : (
                          <span className="text-xl">📦</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{p.name}</p>
                        <p className="text-[11px] truncate max-w-[160px]" style={{color:'var(--text-4)'}}>{p.short_description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs" style={{color:'var(--text-3)'}}>{p.sku || '—'}</td>
                  <td className="px-5 py-4">
                    <p className="font-black p-text">${p.price?.toFixed(2)}</p>
                    {p.original_price && <p className="text-[11px] line-through" style={{color:'var(--text-4)'}}>${p.original_price?.toFixed(2)}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold" style={{color:p.stock>20?'var(--success)':p.stock>5?'var(--warning)':'var(--error)'}}>{p.stock} units</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="tag text-[9px]" style={{color:p.is_active?'var(--p-light)':'var(--text-4)',borderColor:p.is_active?'var(--p-border-2)':'var(--border)',background:p.is_active?'var(--p-subtle)':'transparent'}}>
                      {p.is_active ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${p.id}`} className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all hover:border-[var(--p)] hover:text-[var(--p-light)]" style={{border:'1px solid var(--border)',color:'var(--text-4)'}}>Edit</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
