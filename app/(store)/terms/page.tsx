export default function TermsPage() {
  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      <div className="max-w-3xl mx-auto px-6 py-16 pb-24">
        <p className="t-label mb-3">Legal</p>
        <h1 className="t-h1 mb-8">Terms & <span className="p-text">Conditions</span></h1>
        <div className="space-y-4 text-sm leading-relaxed" style={{color:'var(--text-3)'}}>
          {[['Acceptance','By using Elyvate, you agree to these Terms and Conditions.'],
            ['Products & Pricing','All prices in USD. Subject to availability. We may modify prices at any time.'],
            ['Shipping','Free worldwide shipping. Delivery 7–20 days. We are not responsible for customs delays.'],
            ['Returns','30-day returns. Items must be in original condition. Refunds within 5-7 business days.'],
            ['Liability','Elyvate is not liable for indirect or consequential damages from product use.']].map(([t,b])=>(
            <div key={t as string} className="card p-6"><h2 className="font-bold text-base mb-2" style={{color:'var(--text)'}}>{t}</h2><p>{b}</p></div>
          ))}
        </div>
      </div>
    </div>
  )
}
