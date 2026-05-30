"use client";
import { useState } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Astronaut Galaxy Projector",
    price: 44.99,
    tag: "Bestseller",
    desc: "Transform any room into a breathtaking galaxy. 360° rotation, 8 projection modes.",
    emoji: "🌌",
    gradient: "from-[#0a0a1a] to-[#12122a]",
    accent: "#6b7ff0",
    category: "projector",
  },
  {
    id: 2,
    name: "Sunset Projection Lamp",
    price: 34.99,
    tag: "New",
    desc: "Cast warm golden-hour light across your walls. Perfect for photography & ambiance.",
    emoji: "🌅",
    gradient: "from-[#1a0a00] to-[#2a1200]",
    accent: "#e8823a",
    category: "lamp",
  },
  {
    id: 3,
    name: "Levitating Moon Lamp",
    price: 39.99,
    tag: "Premium",
    desc: "Magnetic levitation with realistic moon surface detail. Touch-sensitive brightness.",
    emoji: "🌙",
    gradient: "from-[#0a0f0a] to-[#0f1a0f]",
    accent: "#a8c4a0",
    category: "lamp",
  },
];

const filters = ["All", "Projector", "Lamp"];

export default function ProductsPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? products : products.filter(p => p.category === active.toLowerCase());

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a84c] mb-3">Elyvate Store</p>
          <h1 className="text-5xl md:text-6xl font-black mb-4" style={{ letterSpacing: "-0.02em" }}>
            Our <span className="gold-text">Collection</span>
          </h1>
          <div className="divider" />
          <p className="text-white/40 text-sm max-w-lg">
            Premium ambient lighting for every space. Free worldwide shipping on all orders.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-12 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`text-[10px] uppercase tracking-widest px-5 py-2 border transition-all duration-300 ${
                active === f
                  ? "border-[#c9a84c] text-[#c9a84c] bg-[rgba(201,168,76,0.08)]"
                  : "border-[rgba(255,255,255,0.1)] text-white/40 hover:border-[rgba(201,168,76,0.3)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <Link key={p.id} href={`/products/${p.id}`} className="card-dark block overflow-hidden group">
              <div className={`h-72 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" style={{ background: p.accent }} />
                <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-500">{p.emoji}</span>
                <span className="absolute top-4 right-4 text-[9px] uppercase tracking-widest px-3 py-1 border" style={{ borderColor: p.accent, color: p.accent, background: `${p.accent}15` }}>
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 group-hover:text-[#c9a84c] transition-colors">{p.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#c9a84c] font-bold text-xl">${p.price}</span>
                  <span className="btn-gold text-[9px] py-2 px-4">Add to Cart</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
