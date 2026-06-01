import { supabaseAdmin } from '@/lib/supabase'
import OrdersClient from './OrdersClient'

async function getOrders() {
  const { data } = await supabaseAdmin.from('orders').select('*').order('created_at', { ascending: false })
  return data || []
}

export default async function AdminOrdersPage() {
  const orders = await getOrders()
  return <OrdersClient initialOrders={orders} />
}
