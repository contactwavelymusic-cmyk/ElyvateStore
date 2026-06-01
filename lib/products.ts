import { supabase } from './supabase'
import type { Product, Category } from '@/types'

export async function getProducts(opts?: { featured?: boolean; category?: string; limit?: number }) {
  let q = supabase.from('products').select('*, category:categories(*)').eq('is_active', true)
  if (opts?.featured)  q = q.eq('is_featured', true)
  if (opts?.category)  q = q.eq('category_id', opts.category)
  if (opts?.limit)     q = q.limit(opts.limit)
  q = q.order('created_at', { ascending: false })
  const { data, error } = await q
  return { products: (data as Product[]) || [], error }
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products').select('*, category:categories(*)').eq('slug', slug).eq('is_active', true).single()
  return { product: data as Product | null, error }
}

export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*').eq('is_active', true).order('display_order')
  return { categories: (data as Category[]) || [], error }
}

export function getProductImage(product: Product, index = 0): string {
  if (product.images && product.images.length > index && product.images[index]) {
    return product.images[index]
  }
  // Fallback to local demo images by order of creation
  const fallbacks = ['/images/product-1.png', '/images/product-2.png', '/images/product-3.png']
  return fallbacks[index % fallbacks.length]
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style:'currency', currency:'USD' }).format(price)
}
