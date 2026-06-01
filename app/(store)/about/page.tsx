import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div style={{minHeight:'100vh',paddingTop:'64px',background:'var(--bg)'}}>
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none" style={{background:'radial-gradient(circle at 80% 20%,rgba(139,92,246,0.25),transparent 65%)',filter:'blur(40px)'}}/>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="t-label mb-4">About Elyvate</p>
            <h1 className="t-hero mb-6">DESIGNING SPACES<br />THAT <span className="p-text">INSPIRE</span></h1>
            <p className="text-base leading-relaxed mb-8" style={{color:'var(--text-3)'}}>
              At Elyvate, we believe in the power of light to transform your surroundings and elevate your everyday. Our galaxy projectors are crafted to bring the universe closer to you.
            </p>
            <Link href="/shop" className="btn btn-primary btn-lg"><span>Our Story</span></Link>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden" style={{border:'1px solid var(--border-2)'}}>
            <div className="absolute inset-0" style={{background:'radial-gradient(circle at center,rgba(139,92,246,0.30),transparent 60%)'}}/>
            <Image src="/images/product-1.png" alt="Elyvate" fill className="object-contain p-10"/>
          </div>
        </div>
      </section>

      {/* Mission Vision Values — matching mockup icons */}
      <section className="py-20 px-6" style={{background:'var(--bg-2)',borderBottom:'1px solid var(--border)'}}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {icon:'🎯',title:'Our Mission',desc:'Inspire wonder through innovative technology and premium ambient lighting solutions.'},
            {icon:'👁️',title:'Our Vision',desc:'Illuminate every space with cosmic beauty and transform ordinary rooms into extraordinary experiences.'},
            {icon:'💎',title:'Our Values',desc:'Quality, creativity and customer care are at the heart of everything we do.'},
          ].map(item=>(
            <div key={item.title} className="card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center text-3xl" style={{background:'var(--p-subtle)',border:'1px solid var(--p-border-2)'}}>
                {item.icon}
              </div>
              <h3 className="font-black text-lg mb-3 p-text">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{color:'var(--text-3)'}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats — matching mockup */}
      <section className="py-20 px-6" style={{borderBottom:'1px solid var(--border)'}}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['50K+','Happy Customers'],['100K+','Products Sold'],['120+','Countries Served'],['4.9★','Customer Rating']].map(([v,l])=>(
            <div key={l}><p className="font-black text-4xl p-text mb-2">{v}</p><p className="text-xs uppercase tracking-widest" style={{color:'var(--text-4)'}}>{l}</p></div>
          ))}
        </div>
      </section>

      {/* Room atmosphere shot */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden" style={{border:'1px solid var(--border-2)'}}>
            <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at center,rgba(139,92,246,0.35),transparent 60%)'}}/>
            <Image src="/images/product-2.png" alt="Room atmosphere" fill className="object-contain p-16"/>
            <div className="absolute inset-0 flex items-end p-8">
              <div>
                <p className="font-black text-2xl text-white mb-2">Experience the Universe</p>
                <p className="text-sm text-white/60">From your room, every night.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
