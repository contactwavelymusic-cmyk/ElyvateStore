'use client'
import { useState } from 'react'

const FAQS = [
  {q:'How long does shipping take?',a:'Free worldwide shipping takes 7–20 business days. Tracking number sent within 24h of dispatch.'},
  {q:'Do you offer free shipping?',a:'Yes! All orders include free worldwide shipping, no minimum required.'},
  {q:'What is your return policy?',a:'30-day hassle-free returns. Contact us and we\'ll arrange it at no cost to you.'},
  {q:'Are the products safe to use?',a:'All products are CE and FCC certified and meet international safety standards.'},
  {q:'What payment methods do you accept?',a:'Visa, Mastercard, PayPal, and Apple Pay through our secure 2Checkout payment gateway.'},
  {q:'Can I track my order?',a:'Yes! Once your order ships, you\'ll receive a tracking number via email.'},
  {q:'Do projectors work in a lit room?',a:'Best results in dark rooms. The darker the room, the more vivid the projection.'},
  {q:'What warranty do you offer?',a:'Minimum 12-month warranty on all products. Levitating Moon Lamp includes 18 months.'},
]

export default function FAQPage() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      <div className="max-w-3xl mx-auto px-6 py-16 pb-24">
        <div className="text-center mb-12">
          <p className="t-label mb-3">Support</p>
          <h1 className="t-h1 mb-3">Frequently Asked <span className="p-text">Questions</span></h1>
        </div>
        <div className="space-y-3">
          {FAQS.map((f,i) => (
            <div key={i} className="card overflow-hidden">
              <button onClick={() => setOpen(open===i?null:i)} className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[var(--p-subtle)]">
                <span className="font-semibold text-sm pr-4">{f.q}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p-light)" strokeWidth="2"
                  style={{transform:open===i?'rotate(180deg)':'none',transition:'transform 0.3s',flexShrink:0}}><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {open===i && <div className="px-5 pb-5 text-sm leading-relaxed" style={{color:'var(--text-3)',borderTop:'1px solid var(--border)'}}><div className="pt-4">{f.a}</div></div>}
            </div>
          ))}
        </div>
        <div className="text-center mt-10 card p-8">
          <p className="font-bold mb-2">Still have questions?</p>
          <p className="text-sm mb-5" style={{color:'var(--text-3)'}}>Our support team is always here to help.</p>
          <a href="/contact" className="btn btn-primary"><span>Contact Us</span></a>
        </div>
      </div>
    </div>
  )
}
