export interface Options {
  colors?: string[]
  size?: string[]
  nib?: string[]
  count?: number[]
}

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
  options: Options
  average_grade: number
  state: "판매중" | "준비중" | "판매중지" | "품절"
  created_at: string
  updated_at: string
}