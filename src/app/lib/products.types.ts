export type OptionType = 'color' | 'size'

export interface ProductOptionType {
  name: OptionType
  values: string[]
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
  options: ProductOptionType[] | null
  average_grade: number
  create_at: string
  update_at: string
}
