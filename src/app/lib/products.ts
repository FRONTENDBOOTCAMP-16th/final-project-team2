export interface ProductOptions {
  color?: string[]
  size?: string[]
}

export interface Products {
  id: string
  store_id: string
  name: string
  thumbnail_image: string
  content: string
  model?: string
  inventory: number
  price: number
  discount_rate: number
  options: ProductOptions | null
  average_grade: number
  create_at: string
  update_at: string
}

// 상품 옵션 확장 타입
export interface Option {
  name: OptionType
  values: string[]
}

// 상품 옵션 라벨
export type OptionType = 'color' | 'size'
