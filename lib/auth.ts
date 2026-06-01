import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    || 'admin@elyvate.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Elyvate@Admin2025!'
const SESSION_COOKIE = 'elyvate_admin_session'
const SESSION_VALUE  = 'authenticated_elyvate_admin_v1'

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD
}

export async function setAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_COOKIE)
    return session?.value === SESSION_VALUE
  } catch {
    return false
  }
}

export async function requireAdminAuth() {
  try {
    const isAuth = await getAdminSession()
    if (!isAuth) redirect('/admin/login')
  } catch (error: any) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error
    redirect('/admin/login')
  }
}
