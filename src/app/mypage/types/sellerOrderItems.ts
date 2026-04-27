export interface sellerOrderItems {
id: number
store_id: number
name: string
thumbnail_image: string
content?: string
model: string
inventory: number
price: number
discount_rate: number
options: Options
average_grade: number
created_at: string
updated_at: string
}

export interface Options {
  colors?: string[]
}
