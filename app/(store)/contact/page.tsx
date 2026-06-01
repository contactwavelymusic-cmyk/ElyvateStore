'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({name:'',email:'',subject:'',message:''})
  const [sent, setSent]   = useState(false)
  const [load, setLoad]   = useState(false)
  const h = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(p=>({...p,[e.target.name]:e.target.value}))
  const submit = async () => { setLoad(true); await new Promise(r=>setTimeout(r,1500)); setLoad(false); setSent(true) }

  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      <div className="max-w-6xl mx-auto px-6 py-16 pb-24">
        <div className="mb-14">
          <p className="t-label mb-3">Support</p>
          <h1 className="t-h1 mb-2">GET IN <span className="p-text">TOUCH</span></h1>
          <div className="divider"/>
          <p className="text-sm" style={{color:'var(--text-3)'}}>We'd love to hear from you. Whether you have a question about our products or need support, our team is here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left info — matching mockup layout */}
          <div className="space-y-5">
            {[
              {icon:'📧',label:'Email',val:'hello@elyvate.com'},
              {icon:'📞',label:'Phone',val:'+1 (234) 567-8900'},
              {icon:'📍',label:'Address',val:'123 Galaxy Road, New York, NY 10001'},
            ].map(item=>(
              <div key={item.label} className="card p-5 flex items-center gap-5">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-xl rounded-xl" style={{background:'var(--p-subtle)',border:'1px solid var(--p-border-2)'}}>{item.icon}</div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{color:'var(--text-4)'}}>{item.label}</p>
                  <p className="font-semibold text-sm">{item.val}</p>
                </div>
              </div>
            ))}
            {/* Socials matching mockup */}
            <div className="card p-5">
              <p className="text-[10px] uppercase tracking-widest mb-4" style={{color:'var(--text-4)'}}>Follow Us</p>
              <div className="flex gap-3">
                {[['IG','Instagram'],['FB','Facebook'],['TW','Twitter'],['YT','YouTube'],['TK','TikTok']].map(([s,l])=>(
                  <button key={s} title={l} className="w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold transition-all hover:bg-[var(--p)] hover:text-white hover:border-[var(--p)]"
                    style={{border:'1px solid var(--border-2)',color:'var(--text-3)'}}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Right form — matching mockup */}
          <div className="card p-7">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl rounded-2xl" style={{background:'var(--p-subtle)',border:'1px solid var(--p-border-2)'}}>✅</div>
                <h3 className="font-black text-xl mb-2">Message Sent!</h3>
                <p className="text-sm" style={{color:'var(--text-3)'}}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className="inp-label">Your Name</label><input name="name" value={form.name} onChange={h} placeholder="Your Name" className="inp"/></div>
                  <div><label className="inp-label">Email Address</label><input name="email" value={form.email} onChange={h} placeholder="Email Address" className="inp"/></div>
                </div>
                <div className="mb-4"><label className="inp-label">Subject</label><input name="subject" value={form.subject} onChange={h} placeholder="Subject" className="inp"/></div>
                <div className="mb-6"><label className="inp-label">Your Message</label><textarea name="message" value={form.message} onChange={h as any} placeholder="Your Message" rows={5} className="inp"/></div>
                <button onClick={submit} disabled={load} className="btn btn-primary btn-full btn-lg">
                  <span>{load?'Sending...':'Send Message'}</span>
                  {load&&<svg style={{animation:'spin 0.8s linear infinite',width:14,height:14}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
