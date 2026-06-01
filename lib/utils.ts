import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style:'currency', currency:'USD' }).format(price)
}
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', { year:'numeric', month:'long', day:'numeric' }).format(new Date(date))
}
export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]+/g,'')
}
export function truncate(text: string, len: number): string {
  return text.length > len ? text.slice(0,len)+'...' : text
}
export function generateOrderNumber(): string {
  return 'ELY-' + Date.now().toString(36).toUpperCase()
}
export function getStarArray(rating: number): ('full'|'half'|'empty')[] {
  const stars: ('full'|'half'|'empty')[] = []
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push('full')
    else if (rating >= i-0.5) stars.push('half')
    else stars.push('empty')
  }
  return stars
}
