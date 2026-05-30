"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4";
const HLS_URL = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

const products = [
  {
    id: 1,
    name: "Astronaut Galaxy Projector",
    price: 44.99,
    tag: "Bestseller",
    desc: "Transform any room into a breathtaking galaxy. 360° rotation, 8 projection modes.",
    gradient: "from-[#0a0a1a] to-[#12122a]",
    accent: "#6b7ff0",
  },
  {
    id: 2,
    name: "Sunset Projection Lamp",
    price: 34.99,
    tag: "New",
    desc: "Cast warm golden-hour light across your walls. Perfect for photography & ambiance.",
    gradient: "from-[#1a0a00] to-[#2a1200]",
    accent: "#e8823a",
  },
  {
    id: 3,
    name: "Levitating Moon Lamp",
    price: 39.99,
    tag: "Premium",
    desc: "Magnetic levitation with realistic moon surface detail. Touch-sensitive brightness.",
    gradient: "from-[#0a0f0a] to-[#0f1a0f]",
    accent: "#a8c4a0",
  },
];

export default function Home() {
  const hlsRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = hlsRef.current;
    if (!video) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_URL;
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(HLS_URL);
          hls.attachMedia(video);
        }
      });
    }
  }, []);

  return (
    <main className="grain">
      {/* ─── HERO ─── */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="animate-fade-up delay-1 text-[10px] uppercase tracking-[0.4em] text-[#c9a84c] mb-6">
            Premium Ambient Lighting
          </p>
          <h1 className="animate-fade-up delay-2 text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6" style={{ letterSpacing: "-0.03em" }}>
            <span className="gold-text">Elevate</span>
            <br />
            <span className="text-white">Your Universe</span>
          </h1>
          <p className="animate-fade-up delay-3 text-white/50 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Galaxy projectors, sunset lamps & levitating moon lamps. Turn any room into a cinematic experience.
          </p>
          <div className="animate-fade-up delay-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-gold inline-block">
              Shop Collection
            </Link>
            <Link href="#features" className="btn-outline inline-block">
              Explore More
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[9px] uppercase tracking-widest text-white/30">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a84c] to-transparent" />
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="border-y border-[rgba(201,168,76,0.1)] py-3 overflow-hidden bg-[#080808]">
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "scroll 20s linear infinite" }}>
          {Array(3).fill(["Free Worldwide Shipping", "Premium Quality", "30-Day Returns", "Secure Payment", "24/7 Support"]).flat().map((t, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.3em] text-white/25 inline-flex items-center gap-12">
              {t}
              <span className="text-[#c9a84c] opacity-50">✦</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>

      {/* ─── PRODUCTS ─── */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a84c] mb-4">Our Collection</p>
          <h2 className="text-4xl md:text-5xl font-black" style={{ letterSpacing: "-0.02em" }}>
            Crafted for <span className="gold-text">Atmosphere</span>
          </h2>
          <div className="divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="card-dark block overflow-hidden group">
              {/* Image placeholder with gradient */}
              <div
                className={`h-64 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative overflow-hidden`}
              >
                <div
                  className="w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-2xl"
                  style={{ background: p.accent }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle at center, ${p.accent}, transparent 70%)` }}
                />
                <span className="text-5xl relative z-10">
                  {p.id === 1 ? "🌌" : p.id === 2 ? "🌅" : "🌙"}
                </span>
                {/* Tag */}
                <span
                  className="absolute top-4 right-4 text-[9px] uppercase tracking-widest px-3 py-1 border"
                  style={{ borderColor: p.accent, color: p.accent, background: `${p.accent}15` }}
                >
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 group-hover:text-[#c9a84c] transition-colors">{p.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#c9a84c] font-bold text-xl">${p.price}</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/30 group-hover:text-[#c9a84c] transition-colors">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 px-6 border-t border-[rgba(201,168,76,0.08)]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "🌍", title: "Worldwide Shipping", desc: "Delivered to 200+ countries" },
            { icon: "🔒", title: "Secure Checkout", desc: "256-bit SSL encryption" },
            { icon: "↩️", title: "30-Day Returns", desc: "No questions asked" },
            { icon: "⚡", title: "Fast Dispatch", desc: "Orders shipped within 24h" },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="text-sm font-semibold mb-1 text-white/80">{f.title}</h4>
              <p className="text-xs text-white/30">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA SECTION (HLS video) ─── */}
      <section
        className="relative py-32 md:py-44 overflow-hidden border-t"
        style={{ borderColor: "rgba(201,168,76,0.15)" }}
      >
        {/* HLS Background Video */}
        <video
          ref={hlsRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808] z-0" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a84c] mb-6">Limited Collection</p>
          <h2 className="text-4xl md:text-6xl font-black mb-6" style={{ letterSpacing: "-0.02em" }}>
            Your Room Deserves
            <br />
            <span className="gold-text">The Stars</span>
          </h2>
          <p className="text-white/40 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of customers who transformed their space with Elyvate lighting. Free worldwide shipping on all orders.
          </p>
          <Link href="/products" className="btn-gold inline-block text-sm">
            Shop Now — Free Shipping
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[rgba(201,168,76,0.08)] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span
              className="text-xl font-black tracking-[0.15em] uppercase"
              style={{
                background: "linear-gradient(135deg, #e8c97a, #c9a84c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Elyvate
            </span>
            <p className="text-white/20 text-xs mt-1">Elevate Your Universe</p>
          </div>
          <div className="flex gap-8">
            {[["Shop", "/products"], ["Account", "/account"], ["Login", "/auth/login"]].map(([l, h]) => (
              <Link key={l} href={h} className="text-xs uppercase tracking-widest text-white/30 hover:text-[#c9a84c] transition-colors">
                {l}
              </Link>
            ))}
          </div>
          <p className="text-white/20 text-xs">© 2026 Elyvate. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
