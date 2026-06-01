import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { ThemeProvider } from '@/context/ThemeContext'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: { default: 'Elyvate — Elevate Your Universe', template: '%s | Elyvate' },
  description: 'Premium galaxy projectors, sunset lamps & levitating moon lamps. Transform any room into a cinematic experience. Free worldwide shipping.',
  keywords: ['galaxy projector', 'ambient lighting', 'moon lamp', 'sunset lamp', 'room decor'],
  openGraph: {
    title: 'Elyvate — Elevate Your Universe',
    description: 'Premium ambient lighting for every space.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            const t = localStorage.getItem('elyvate_theme') || 'dark';
            document.documentElement.setAttribute('data-theme', t);
          } catch(e) {
            document.documentElement.setAttribute('data-theme', 'dark');
          }
        ` }} />
      </head>
      <body className={geist.variable}>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
