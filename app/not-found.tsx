import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{background:'var(--bg)'}}>
      <div className="text-center">
        <p className="font-black text-8xl p-text mb-4">404</p>
        <h2 className="font-black text-2xl mb-3">Page Not Found</h2>
        <p className="text-sm mb-8" style={{color:'var(--text-3)'}}>The page you're looking for doesn't exist.</p>
        <Link href="/" className="btn btn-primary btn-lg"><span>Go Home</span></Link>
      </div>
    </div>
  )
}
