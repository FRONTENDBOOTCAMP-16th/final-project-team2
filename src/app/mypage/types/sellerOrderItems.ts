import { ProductOptionType } from '@/app/lib/products.types'

export interface SellerProduct {
  id: number
  store_id: number
  name: string
  thumbnail_image: string
  content?: string
  model?: string
  inventory: number
  price: number
  discount_rate: number
  options: ProductOptionType[]
  average_grade: number
  status: 'ON_SALE' | 'PREPARING' | 'HIDDEN' | 'SOLD_OUT'
  created_at: string
  updated_at: string
}
