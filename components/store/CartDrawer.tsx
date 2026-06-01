'use client'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { getProductImage } from '@/lib/products'

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, subtotal, totalItems } = useCart()
  return (
    <>
      <div className="fixed inset-0 z-50 transition-all duration-500"
        style={{background:'rgba(0,0,0,0.75)',backdropFilter:'blur(8px)',opacity:isOpen?1:0,pointerEvents:isOpen?'auto':'none'}}
        onClick={closeCart}/>
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[400px] flex flex-col"
        style={{background:'var(--bg-2)',borderLeft:'1px solid var(--border)',transform:isOpen?'translateX(0)':'translateX(100%)',transition:'transform 0.42s cubic-bezier(0.16,1,0.3,1)'}}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{borderBottom:'1px solid var(--border)'}}>
          <div>
            <p className="t-label mb-0.5">Your Cart</p>
            <p className="font-black text-xl p-text">{totalItems} Item{totalItems!==1?'s':''}</p>
          </div>
          <button onClick={closeCart} className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--p-subtle)]"
            style={{border:'1px solid var(--border)',color:'var(--text-3)'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{background:'var(--p-subtle)',border:'1px solid var(--p-border-2)'}}>🛒</div>
              <p className="text-sm" style={{color:'var(--text-3)'}}>Your cart is empty</p>
              <Link href="/shop" onClick={closeCart} className="btn btn-primary btn-sm"><span>Start Shopping</span></Link>
            </div>
          ) : items.map(item=>(
            <div key={item.id} className="flex gap-4 p-4 rounded-2xl" style={{background:'var(--bg-3)',border:'1px solid var(--border)'}}>
              <div className="w-16 h-16 flex-shrink-0 rounded-xl flex items-center justify-center relative overflow-hidden" style={{background:'var(--bg-4)'}}>
                <div className="absolute inset-0" style={{background:'radial-gradient(circle at center,rgba(139,92,246,0.2),transparent 70%)'}}/>
                <Image src={getProductImage(item.product)} alt={item.product.name} width={52} height={52} className="w-11 h-11 object-contain relative z-10"/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate mb-1">{item.product.name}</p>
                <p className="font-black text-sm p-text">{formatPrice(item.product.price)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center rounded-lg" style={{border:'1px solid var(--border)'}}>
                    <button onClick={()=>item.quantity>1?updateQty(item.id,item.quantity-1):removeItem(item.id)} className="w-7 h-7 flex items-center justify-center hover:text-[var(--p-light)] transition-colors" style={{color:'var(--text-3)'}}>−</button>
                    <span className="w-7 h-7 flex items-center justify-center text-xs font-bold">{item.quantity}</span>
                    <button onClick={()=>updateQty(item.id,item.quantity+1)} className="w-7 h-7 flex items-center justify-center hover:text-[var(--p-light)] transition-colors" style={{color:'var(--text-3)'}}>+</button>
                  </div>
                  <button onClick={()=>removeItem(item.id)} className="text-xs hover:text-red-400 transition-colors" style={{color:'var(--text-4)'}}>Remove</button>
                </div>
              </div>
              <p className="font-bold text-sm flex-shrink-0">{formatPrice(item.product.price*item.quantity)}</p>
            </div>
          ))}
        </div>
        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 pb-6 pt-4 space-y-3" style={{borderTop:'1px solid var(--border)'}}>
            <div className="flex justify-between text-sm"><span style={{color:'var(--text-3)'}}>Subtotal</span><span className="font-bold">{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span style={{color:'var(--text-3)'}}>Shipping</span><span className="font-bold p-text">Free 🌍</span></div>
            <Link href="/checkout" onClick={closeCart} className="btn btn-primary btn-full"><span>Checkout — {formatPrice(subtotal)}</span></Link>
            <Link href="/cart" onClick={closeCart} className="btn btn-outline btn-full text-center">View Full Cart</Link>
          </div>
        )}
      </div>
    </>
  )
}
