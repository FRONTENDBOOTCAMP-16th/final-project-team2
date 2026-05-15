export interface Categories {
  id: string
  name: string
  create_at: string
  parent_id: string | null
}

export interface ProductCategories {
  id: string
  product_id: string
  category_id: string
}

// 확장 타입 (supabase 원본 타입 아님)
export type ProductCategoriesWithCategory = ProductCategories & {
  categories: Pick<Categories, 'id' | 'name'>
}

// 확장 타입 (supabase 원본 타입 아님)
export interface ProductPreview {
  id: string
  name: string
  thumbnail_image: string
  price: number
  discount_rate: number
  product_categories: ProductCategoriesWithCategory
}

export interface OrderProducts {
  id: string
  name: string
  thumbnail_image: string
  product_categories: ProductCategoriesWithCategory
}

export interface OrderProductCategory {
  categories: {
    id: string
    name: string
  }
}
