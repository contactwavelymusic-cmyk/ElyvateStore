"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 relative">
            <div className="absolute inset-0 rounded-full border border-[#c9a84c] opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#8a6d2f] opacity-80" />
          </div>
          <span
            className="text-lg font-bold tracking-[0.15em] uppercase"
            style={{
              background: "linear-gradient(135deg, #e8c97a, #c9a84c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Elyvate
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {[["Home", "/"], ["Shop", "/products"], ["About", "/#about"]].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-xs uppercase tracking-widest text-white/60 hover:text-[#c9a84c] transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/cart" className="relative">
            <CartIcon />
          </Link>
          <Link href="/auth/signup" className="btn-gold text-[10px] py-2 px-4">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white/70" onClick={() => setOpen(!open)}>
          <div className="w-5 space-y-1">
            <span className={`block h-px bg-[#c9a84c] transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-px bg-[#c9a84c] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-[#c9a84c] transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[rgba(201,168,76,0.1)] bg-[rgba(8,8,8,0.97)] px-6 py-6 flex flex-col gap-5">
          {[["Home", "/"], ["Shop", "/products"], ["Login", "/auth/login"], ["Sign Up", "/auth/signup"], ["Cart", "/cart"]].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-xs uppercase tracking-widest text-white/60 hover:text-[#c9a84c] transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
