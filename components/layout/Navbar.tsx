'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useTheme } from '@/context/ThemeContext'

const NAV = [['Home','/'],['Shop','/shop'],['Collections','/collections'],['About','/about'],['Reviews','/#reviews'],['FAQ','/faq']]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mob, setMob] = useState(false)
  const pathname = usePathname()
  const { totalItems, toggleCart } = useCart()
  const { theme, toggleTheme } = useTheme()
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  useEffect(() => { setMob(false) }, [pathname])
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ background: scrolled ? 'var(--overlay)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid var(--border)' : 'none' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-base tracking-widest uppercase" style={{ letterSpacing: '0.18em' }}>
            EL<span style={{ color: 'var(--p-light)' }}>Y</span>VATE
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(([l, h]) => {
              const active = pathname === h || (h !== '/' && pathname.startsWith(h))
              return (
                <Link key={h} href={h} className="text-[11px] uppercase tracking-widest relative group transition-colors duration-300"
                  style={{ color: active ? 'var(--p-light)' : 'var(--text-3)' }}>
                  {l}
                  <span className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 rounded-full"
                    style={{ background: 'var(--p-light)', width: active ? '100%' : '0%' }} />
                </Link>
              )
            })}
          </nav>
          <div className="flex items-center gap-1">
            <Link href="/shop" className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-[var(--p-subtle)] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </Link>
            <Link href="/account/profile" className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg hover:bg-[var(--p-subtle)] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>
            <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--p-subtle)] transition-colors">
              {theme === 'dark'
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
            </button>
            <button onClick={toggleCart} className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--p-subtle)] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: 'var(--p)' }}>{totalItems > 9 ? '9+' : totalItems}</span>}
            </button>
            <button className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5" onClick={() => setMob(!mob)}>
              <span className="block w-5 h-px transition-all duration-300" style={{ background: 'var(--text-2)', transform: mob ? 'rotate(45deg) translateY(4px)' : 'none' }} />
              <span className="block w-5 h-px transition-all duration-300" style={{ background: 'var(--text-2)', opacity: mob ? 0 : 1 }} />
              <span className="block w-5 h-px transition-all duration-300" style={{ background: 'var(--text-2)', transform: mob ? 'rotate(-45deg) translateY(-4px)' : 'none' }} />
            </button>
          </div>
        </div>
      </header>
      <div className="fixed inset-0 z-40 md:hidden transition-all duration-400"
        style={{ background: 'var(--overlay)', backdropFilter: 'blur(24px)', opacity: mob ? 1 : 0, pointerEvents: mob ? 'auto' : 'none' }}>
        <div className="flex flex-col items-center justify-center h-full gap-7 pt-16">
          {NAV.map(([l, h]) => <Link key={h} href={h} className="text-xl font-bold tracking-widest uppercase transition-colors" style={{ color: pathname === h ? 'var(--p-light)' : 'var(--text-3)' }}>{l}</Link>)}
          <div className="h-px w-14 my-2" style={{ background: 'var(--border-2)' }} />
          <Link href="/auth/login" className="text-sm uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Login</Link>
          <Link href="/auth/register" className="btn btn-primary">Create Account</Link>
        </div>
      </div>
    </>
  )
}
