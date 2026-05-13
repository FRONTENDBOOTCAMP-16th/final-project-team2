import { ProductPreview } from './categories'

export interface ProductLike {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

// 확장 타입
export type ProductLikeWithProduct = ProductLike & {
  products: ProductPreview
}
