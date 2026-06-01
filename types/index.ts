export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  price: number
  original_price?: number
  images: string[]
  category_id?: string
  category?: Category
  stock: number
  sku?: string
  features?: string[]
  specs?: Record<string, string>
  rating?: number
  review_count?: number
  is_featured?: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  display_order: number
  is_active: boolean
  created_at: string
}

export interface CartItem {
  id: string
  product_id: string
  product: Product
  quantity: number
  user_id?: string
  session_id?: string
}

export interface WishlistItem {
  id: string
  product_id: string
  product: Product
  user_id: string
  created_at: string
}

export interface Order {
  id: string
  order_number: string
  user_id?: string
  customer_email: string
  customer_name: string
  customer_phone?: string
  items: OrderItem[]
  subtotal: number
  shipping_cost: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  shipping_address: Address
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_image?: string
  quantity: number
  price: number
  total: number
}

export interface Address {
  full_name: string
  email?: string
  phone?: string
  street: string
  apartment?: string
  city: string
  state: string
  zip: string
  country: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  avatar_url?: string
  role: 'customer' | 'admin'
  created_at: string
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  user_name: string
  rating: number
  comment?: string
  created_at: string
}

export interface SiteSetting {
  key: string
  value: string
}
