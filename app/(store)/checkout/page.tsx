'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { getProductImage } from '@/lib/products'

const STEPS = ['Shipping','Payment','Review']

export default function CheckoutPage() {
  const [step, setStep]     = useState(0)
  const [loading, setLoad]  = useState(false)
  const [done, setDone]     = useState(false)
  const { items, subtotal, clearCart } = useCart()
  const [ship, setShip] = useState({ fullName:'', email:'', phone:'', street:'', apt:'', city:'', state:'', zip:'', country:'United States', save:false })
  const hs = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => setShip(p=>({...p,[e.target.name]: e.target.type==='checkbox'?(e.target as HTMLInputElement).checked:e.target.value}))

  const place = async () => {
    setLoad(true); await new Promise(r=>setTimeout(r,2000)); setLoad(false); clearCart(); setDone(true)
  }

  if (done) return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{paddingTop:'64px',background:'var(--bg)'}}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center text-4xl rounded-full" style={{background:'var(--p-subtle)',border:'2px solid var(--p)'}}>✅</div>
        <h2 className="t-h2 mb-3">Order Confirmed!</h2>
        <p className="text-sm mb-2" style={{color:'var(--text-3)'}}>Confirmation sent to {ship.email}</p>
        <p className="font-black mb-8 p-text">Order #ELY-{Date.now().toString(36).toUpperCase()}</p>
        <Link href="/shop" className="btn btn-primary btn-xl"><span>Continue Shopping</span></Link>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      <div style={{borderBottom:'1px solid var(--border)',background:'var(--bg-2)'}}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-[11px] uppercase tracking-widest" style={{color:'var(--text-4)'}}>
          <Link href="/cart" className="hover:text-[var(--p-light)] transition-colors">Cart</Link><span>/</span>
          <span style={{color:'var(--text-2)'}}>Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 pb-24">
        {/* Step indicators */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s,i)=>(
            <div key={s} className="flex items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{background:i<=step?'var(--p)':'var(--bg-3)',color:i<=step?'#fff':'var(--text-4)',border:i<=step?'none':'1px solid var(--border)'}}>
                  {i < step ? '✓' : i+1}
                </div>
                <span className="text-[11px] uppercase tracking-widest hidden sm:block font-semibold" style={{color:i===step?'var(--p-light)':'var(--text-4)'}}>{s}</span>
              </div>
              {i < STEPS.length-1 && <div className="w-16 sm:w-28 h-px mx-3" style={{background:i<step?'var(--p)':'var(--border)'}}/>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Form ── */}
          <div className="lg:col-span-2">
            {step===0 && (
              <div className="card p-7">
                <p className="font-bold text-lg mb-5">Shipping Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['fullName','Full Name','John Doe'],['email','Email Address','john@example.com'],['phone','Phone Number','+1 234 567 8900']].map(([n,l,ph])=>(
                    <div key={n} className={n==='fullName'?'':''}><label className="inp-label">{l}</label><input name={n} value={(ship as any)[n]} onChange={hs} placeholder={ph} className="inp"/></div>
                  ))}
                  <div className="sm:col-span-2"><label className="inp-label">Street Address</label><input name="street" value={ship.street} onChange={hs} placeholder="123 Main Street" className="inp"/></div>
                  <div className="sm:col-span-2"><label className="inp-label">Apartment, suite, etc. (optional)</label><input name="apt" value={ship.apt} onChange={hs} placeholder="Apt 4B" className="inp"/></div>
                  <div><label className="inp-label">City</label><input name="city" value={ship.city} onChange={hs} placeholder="New York" className="inp"/></div>
                  <div><label className="inp-label">State / Province</label><input name="state" value={ship.state} onChange={hs} placeholder="NY" className="inp"/></div>
                  <div><label className="inp-label">ZIP / Postal Code</label><input name="zip" value={ship.zip} onChange={hs} placeholder="10001" className="inp"/></div>
                  <div>
                    <label className="inp-label">Country</label>
                    <select name="country" value={ship.country} onChange={hs} className="inp">
                      {['United States','United Kingdom','Canada','Australia','Germany','France','Japan','India','Singapore','UAE'].map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" name="save" checked={ship.save} onChange={hs} className="w-4 h-4 accent-purple-600"/>
                      <span className="text-xs" style={{color:'var(--text-3)'}}>Save this information for next time</span>
                    </label>
                  </div>
                </div>
                <button onClick={()=>setStep(1)} className="btn btn-primary btn-lg mt-6"><span>Continue to Payment →</span></button>
              </div>
            )}

            {step===1 && (
              <div className="card p-7">
                <p className="font-bold text-lg mb-5">Payment Information</p>
                <div className="p-4 rounded-xl mb-5 flex items-center gap-3" style={{background:'var(--p-subtle)',border:'1px solid var(--p-border)'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p-light)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <p className="text-xs" style={{color:'var(--text-2)'}}>Your payment is secured with 256-bit SSL encryption</p>
                </div>
                <div className="space-y-4">
                  <div><label className="inp-label">Card Number</label><input placeholder="1234 5678 9012 3456" className="inp"/></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="inp-label">Expiry Date</label><input placeholder="MM / YY" className="inp"/></div>
                    <div><label className="inp-label">CVV</label><input placeholder="123" className="inp"/></div>
                  </div>
                  <div><label className="inp-label">Name on Card</label><input placeholder="John Doe" className="inp"/></div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={()=>setStep(0)} className="btn btn-outline">← Back</button>
                  <button onClick={()=>setStep(2)} className="btn btn-primary flex-1"><span>Continue to Review →</span></button>
                </div>
              </div>
            )}

            {step===2 && (
              <div className="card p-7">
                <p className="font-bold text-lg mb-5">Review Your Order</p>
                <div className="p-5 rounded-xl mb-5" style={{background:'var(--bg-3)',border:'1px solid var(--border)'}}>
                  <p className="text-[10px] uppercase tracking-widest mb-2" style={{color:'var(--text-4)'}}>Shipping to</p>
                  <p className="text-sm font-bold">{ship.fullName}</p>
                  <p className="text-sm" style={{color:'var(--text-3)'}}>{ship.street}{ship.apt&&`, ${ship.apt}`}, {ship.city}, {ship.state} {ship.zip}</p>
                  <p className="text-sm" style={{color:'var(--text-3)'}}>{ship.country} · {ship.email}</p>
                </div>
                <div className="space-y-3 mb-6">
                  {items.map(item=>(
                    <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl" style={{background:'var(--bg-3)',border:'1px solid var(--border)'}}>
                      <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{background:'var(--bg-4)'}}>
                        <Image src={getProductImage(item.product)} alt={item.product.name} width={40} height={40} className="w-9 h-9 object-contain"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.product.name}</p>
                        <p className="text-xs" style={{color:'var(--text-3)'}}>× {item.quantity}</p>
                      </div>
                      <span className="font-bold p-text">{formatPrice(item.product.price*item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={()=>setStep(1)} className="btn btn-outline">← Back</button>
                  <button onClick={place} disabled={loading} className="btn btn-primary flex-1">
                    <span>{loading?'Placing Order...':'Place Order'}</span>
                    {loading&&<svg style={{animation:'spin 0.8s linear infinite',width:14,height:14}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Order Summary ── */}
          <div className="card p-6 h-fit sticky top-24">
            <p className="text-[10px] uppercase tracking-widest mb-5" style={{color:'var(--text-4)'}}>Order Summary</p>
            <div className="space-y-3 mb-5">
              {items.map(item=>(
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{background:'var(--bg-4)'}}>
                    <Image src={getProductImage(item.product)} alt={item.product.name} width={36} height={36} className="w-8 h-8 object-contain"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{item.product.name}</p>
                    <p className="text-[11px]" style={{color:'var(--text-4)'}}>× {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold">{formatPrice(item.product.price*item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="h-px mb-4" style={{background:'var(--border)'}}/>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span style={{color:'var(--text-3)'}}>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span style={{color:'var(--text-3)'}}>Shipping</span><span className="p-text font-bold">Free</span></div>
              <div className="flex justify-between"><span style={{color:'var(--text-3)'}}>Tax</span><span style={{color:'var(--text-3)'}}>$0.00</span></div>
              <div className="h-px" style={{background:'var(--border)'}}/>
              <div className="flex justify-between font-black text-base"><span>Total</span><span className="p-text">{formatPrice(subtotal)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
