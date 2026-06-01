export default function PrivacyPage() {
  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      <div className="max-w-3xl mx-auto px-6 py-16 pb-24">
        <p className="t-label mb-3">Legal</p>
        <h1 className="t-h1 mb-8">Privacy <span className="p-text">Policy</span></h1>
        <div className="space-y-4 text-sm leading-relaxed" style={{color:'var(--text-3)'}}>
          {[['Information We Collect','We collect name, email, phone, and payment info when you purchase.'],
            ['How We Use It','To process orders, send emails, and improve our service. Never sold to third parties.'],
            ['Data Security','256-bit SSL encryption on all transactions and data storage.'],
            ['Cookies','Used for browsing experience and analytics. Disable in browser settings.'],
            ['Contact','Questions? Email elyvate.business@gmail.com']].map(([t,b])=>(
            <div key={t as string} className="card p-6"><h2 className="font-bold text-base mb-2" style={{color:'var(--text)'}}>{t}</h2><p>{b}</p></div>
          ))}
        </div>
      </div>
    </div>
  )
}
