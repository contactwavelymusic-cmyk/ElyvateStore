"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const products: Record<string, {
  id: number; name: string; price: number; tag: string;
  desc: string; emoji: string; gradient: string; accent: string;
  features: string[]; specs: [string, string][];
}> = {
  "1": {
    id: 1, name: "Astronaut Galaxy Projector", price: 44.99, tag: "Bestseller",
    emoji: "🌌", gradient: "from-[#0a0a1a] to-[#1a1a3a]", accent: "#6b7ff0",
    desc: "Step into the cosmos without leaving your room. The Astronaut Galaxy Projector casts thousands of stars, nebulae, and galaxies across your ceiling and walls. Perfect for bedrooms, gaming rooms, and meditation spaces.",
    features: ["8 galaxy projection modes", "360° full rotation", "Built-in Bluetooth speaker", "Remote + app control", "Timer function 1–24h", "USB powered"],
    specs: [["Coverage", "Up to 32m²"], ["Colors", "16 million"], ["Noise", "<30dB"], ["Power", "5W USB"], ["Material", "ABS + PC"], ["Warranty", "12 months"]],
  },
  "2": {
    id: 2, name: "Sunset Projection Lamp", price: 34.99, tag: "New",
    emoji: "🌅", gradient: "from-[#1a0a00] to-[#3a1800]", accent: "#e8823a",
    desc: "Recreate the magic of golden hour anytime. The Sunset Projection Lamp casts warm rainbow light gradients across your walls — a must-have for content creators, photographers, and anyone who loves cozy vibes.",
    features: ["RGB sunset gradient", "Adjustable projection angle", "3 brightness levels", "Touch control", "Compact design", "USB-C powered"],
    specs: [["Coverage", "Up to 20m²"], ["Colors", "Warm RGB"], ["Noise", "Silent"], ["Power", "5W USB-C"], ["Material", "ABS"], ["Warranty", "12 months"]],
  },
  "3": {
    id: 3, name: "Levitating Moon Lamp", price: 39.99, tag: "Premium",
    emoji: "🌙", gradient: "from-[#0a0f0a] to-[#1a2a1a]", accent: "#a8c4a0",
    desc: "The Levitating Moon Lamp defies gravity with magnetic levitation technology. The realistic lunar surface detail combined with soft ambient glow creates an otherworldly centerpiece for any room.",
    features: ["Magnetic levitation", "Realistic moon texture", "Touch brightness control", "3 color temperatures", "Auto-spin rotation", "Base LED lighting"],
    specs: [["Diameter", "15cm"], ["Float height", "2–3cm"], ["Power", "12W base"], ["Colors", "Warm/Cool/Natural"], ["Material", "PLA + Resin"], ["Warranty", "18 months"]],
  },
};

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const p = products[id];
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!p) return (
    <main className="min-h-screen pt-28 flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/40 mb-4">Product not found</p>
        <Link href="/products" className="btn-gold">Back to Shop</Link>
      </div>
    </main>
  );

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-12 text-[10px] uppercase tracking-widest text-white/30">
          <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#c9a84c] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-white/60">{p.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Visual */}
          <div className={`bg-gradient-to-br ${p.gradient} aspect-square flex items-center justify-center relative overflow-hidden border border-[rgba(255,255,255,0.05)]`}>
            <div className="w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: p.accent }} />
            <span className="text-9xl relative z-10">{p.emoji}</span>
            <span className="absolute top-6 left-6 text-[9px] uppercase tracking-widest px-3 py-1 border"
              style={{ borderColor: p.accent, color: p.accent, background: `${p.accent}15` }}>
              {p.tag}
            </span>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a84c] mb-3">Elyvate Collection</p>
            <h1 className="text-3xl md:text-4xl font-black mb-4" style={{ letterSpacing: "-0.02em" }}>{p.name}</h1>
            <div className="divider" />
            <p className="text-white/50 text-sm leading-relaxed mb-8">{p.desc}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-black text-[#c9a84c]">${p.price}</span>
              <span className="text-white/30 text-sm line-through">${(p.price * 1.4).toFixed(2)}</span>
              <span className="text-xs bg-[rgba(201,168,76,0.1)] text-[#c9a84c] px-2 py-1 border border-[rgba(201,168,76,0.2)]">Save 30%</span>
            </div>

            {/* Qty + Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[rgba(255,255,255,0.1)]">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 text-white/60 hover:text-white transition-colors flex items-center justify-center">−</button>
                <span className="w-10 h-10 flex items-center justify-center text-sm">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 text-white/60 hover:text-white transition-colors flex items-center justify-center">+</button>
              </div>
              <button onClick={handleAdd} className={`btn-gold flex-1 ${added ? "opacity-70" : ""}`}>
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </div>

            <Link href="/checkout" className="btn-outline w-full text-center block mb-8">Buy Now</Link>

            {/* Features */}
            <div className="border-t border-[rgba(255,255,255,0.06)] pt-8 mb-8">
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4">Features</p>
              <div className="grid grid-cols-2 gap-2">
                {p.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <span className="text-[#c9a84c] text-xs">✦</span> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="border-t border-[rgba(255,255,255,0.06)] pt-8">
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-4">Specifications</p>
              <div className="space-y-2">
                {p.specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm border-b border-[rgba(255,255,255,0.04)] pb-2">
                    <span className="text-white/40">{k}</span>
                    <span className="text-white/70">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
