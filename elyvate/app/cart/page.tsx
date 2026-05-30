"use client";
import { useState } from "react";
import Link from "next/link";

const initialCart = [
  { id: 1, name: "Astronaut Galaxy Projector", price: 44.99, qty: 1, emoji: "🌌" },
  { id: 3, name: "Levitating Moon Lamp", price: 39.99, qty: 1, emoji: "🌙" },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const updateQty = (id: number, delta: number) => {
    setCart(c => c.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const remove = (id: number) => setCart(c => c.filter(i => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a84c] mb-3">Your</p>
          <h1 className="text-5xl font-black" style={{ letterSpacing: "-0.02em" }}>
            Shopping <span className="gold-text">Cart</span>
          </h1>
          <div className="divider" />
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-6">🛒</p>
            <p className="text-white/40 mb-6">Your cart is empty</p>
            <Link href="/products" className="btn-gold">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="card-dark p-5 flex items-center gap-5">
                  <div className="w-16 h-16 bg-[#111] flex items-center justify-center text-3xl flex-shrink-0 border border-[rgba(255,255,255,0.05)]">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                    <p className="text-[#c9a84c] font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center border border-[rgba(255,255,255,0.1)]">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 text-white/50 hover:text-white flex items-center justify-center text-lg">−</button>
                    <span className="w-8 h-8 flex items-center justify-center text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 text-white/50 hover:text-white flex items-center justify-center text-lg">+</button>
                  </div>
                  <div className="text-right min-w-[70px]">
                    <p className="font-bold text-white">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                  <button onClick={() => remove(item.id)} className="text-white/20 hover:text-red-400 transition-colors ml-2 text-xl">×</button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="card-dark p-6 sticky top-24">
                <h2 className="text-sm uppercase tracking-widest text-white/50 mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Shipping</span>
                    <span className="text-[#c9a84c]">Free</span>
                  </div>
                  <div className="border-t border-[rgba(255,255,255,0.06)] pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#c9a84c] text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="btn-gold w-full text-center block mb-3">
                  Proceed to Checkout
                </Link>
                <Link href="/products" className="btn-outline w-full text-center block text-[10px]">
                  Continue Shopping
                </Link>
                <div className="mt-6 flex items-center justify-center gap-2 text-white/20 text-xs">
                  <span>🔒</span> Secure SSL checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
