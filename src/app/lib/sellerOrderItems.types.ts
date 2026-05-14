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
  state: '판매중' | '준비중' | '판매중지' | '품절'
  created_at: string
  updated_at: string
}
