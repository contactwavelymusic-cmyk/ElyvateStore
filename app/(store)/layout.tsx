import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/store/CartDrawer'
import Footer from '@/components/layout/Footer'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>{children}</main>
      <Footer />
    </>
  )
}
