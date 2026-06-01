'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { getProductImage } from '@/lib/products'

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, totalItems } = useCart()
  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      <div style={{borderBottom:'1px solid var(--border)',background:'var(--bg-2)'}}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-[11px] uppercase tracking-widest" style={{color:'var(--text-4)'}}>
          <Link href="/" className="hover:text-[var(--p-light)] transition-colors">Home</Link><span>/</span>
          <span style={{color:'var(--text-2)'}}>Cart</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8 pb-24">
        <h1 className="font-black text-3xl mb-8" style={{letterSpacing:'-0.02em'}}>YOUR CART</h1>
        {items.length === 0 ? (
          <div className="text-center py-28">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl rounded-2xl" style={{background:'var(--p-subtle)',border:'1px solid var(--p-border-2)'}}>🛒</div>
            <p className="font-bold mb-2">Your cart is empty</p>
            <p className="text-sm mb-8" style={{color:'var(--text-3)'}}>Add some products to get started</p>
            <Link href="/shop" className="btn btn-primary btn-lg"><span>Start Shopping</span></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 pb-3 text-[10px] uppercase tracking-widest" style={{color:'var(--text-4)',borderBottom:'1px solid var(--border)'}}>
                <span className="col-span-5">Product</span><span className="col-span-2 text-center">Price</span>
                <span className="col-span-3 text-center">Quantity</span><span className="col-span-2 text-right">Total</span>
              </div>
              <div className="space-y-3 mt-3">
                {items.map(item=>(
                  <div key={item.id} className="card p-4 grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                      <div className="w-16 h-16 flex-shrink-0 rounded-xl flex items-center justify-center relative overflow-hidden" style={{background:'var(--bg-3)',border:'1px solid var(--border)'}}>
                        <div className="absolute inset-0" style={{background:'radial-gradient(circle at center,rgba(139,92,246,0.2),transparent 70%)'}}/>
                        <Image src={getProductImage(item.product)} alt={item.product.name} width={52} height={52} className="w-11 h-11 object-contain relative z-10"/>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{item.product.name}</p>
                        <p className="text-[11px] mt-0.5" style={{color:'var(--text-4)'}}>Midnight Black</p>
                        <button onClick={()=>removeItem(item.id)} className="text-[11px] mt-1 hover:text-red-400 transition-colors" style={{color:'var(--text-4)'}}>Remove</button>
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-2 text-center">
                      <span className="font-bold text-sm p-text">{formatPrice(item.product.price)}</span>
                    </div>
                    <div className="col-span-4 md:col-span-3 flex justify-center">
                      <div className="flex items-center rounded-lg" style={{border:'1px solid var(--border-2)'}}>
                        <button onClick={()=>item.quantity>1?updateQty(item.id,item.quantity-1):removeItem(item.id)} className="w-9 h-9 flex items-center justify-center hover:text-[var(--p-light)] transition-colors" style={{color:'var(--text-3)'}}>−</button>
                        <span className="w-9 h-9 flex items-center justify-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={()=>updateQty(item.id,item.quantity+1)} className="w-9 h-9 flex items-center justify-center hover:text-[var(--p-light)] transition-colors" style={{color:'var(--text-3)'}}>+</button>
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-2 text-right">
                      <span className="font-black p-text">{formatPrice(item.product.price*item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Summary */}
            <div className="card p-6 h-fit sticky top-24">
              <p className="text-[10px] uppercase tracking-widest mb-5" style={{color:'var(--text-4)'}}>Order Summary</p>
              <div className="space-y-3 mb-5 text-sm">
                <div className="flex justify-between"><span style={{color:'var(--text-3)'}}>Subtotal ({totalItems} items)</span><span className="font-bold">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span style={{color:'var(--text-3)'}}>Shipping</span><span className="font-bold" style={{color:'var(--p-light)'}}>Free</span></div>
                <div className="flex justify-between"><span style={{color:'var(--text-3)'}}>Tax</span><span style={{color:'var(--text-3)'}}>$0.00</span></div>
                <div className="h-px" style={{background:'var(--border)'}}/>
                <div className="flex justify-between font-black text-lg"><span>Total</span><span className="p-text">{formatPrice(subtotal)}</span></div>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {['VISA','MC','PP','APAY'].map(p=><div key={p} className="px-2 py-1 rounded-md text-[9px] font-bold" style={{background:'var(--bg-4)',border:'1px solid var(--border)',color:'var(--text-3)'}}>{p}</div>)}
              </div>
              <p className="text-[10px] mb-4" style={{color:'var(--text-4)'}}>We Accept</p>
              <Link href="/checkout" className="btn btn-primary btn-full mb-3"><span>Proceed to Checkout</span></Link>
              <Link href="/shop" className="btn btn-outline btn-full text-center">Continue Shopping</Link>
              <div className="flex items-center justify-center gap-2 mt-4 text-[10px]" style={{color:'var(--text-4)'}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Free Shipping · 30-Day Returns · Secure Checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
