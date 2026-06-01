import { requireAdminAuth } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdminAuth()
  return (
    <div className="flex min-h-screen" style={{ background:'var(--bg)' }}>
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
