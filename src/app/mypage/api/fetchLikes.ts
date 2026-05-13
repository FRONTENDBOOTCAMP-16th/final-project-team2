import { ProductLike } from '@/app/lib/productLike'
import { createClient } from '@/utils/supabase/client'
import {
  ProductCategoriesWithCategory,
  ProductPreview,
} from '@/app/lib/categories'

// categories 포함된 products (UI용)
export type ProductCategories = {
  id: string
  product_id: string
  category_id: string
  categories: ProductCategoriesWithCategory
}

// Supabase raw join 결과 타입
type ProductLikeWithProductRaw = ProductLike & {
  products: ProductPreview
}

// 최종 UI 타입
export type ProductLikeWithProduct = ProductLike & {
  products: ProductPreview | ProductPreview[]
}

export const fetchLikes = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('product_likes')
    .select(
      `
    id,
    created_at,
    user_id,
    product_id,
    products (
      id,
      name,
      thumbnail_image,
      price,
      discount_rate,
      product_categories (
        id,
        product_id,
        category_id,
        categories (id, name)
      )
    )
  `,
    )
    .eq('user_id', user.id)
    .returns<ProductLikeWithProductRaw[]>()

  if (error) throw error

  const rows = data ?? []

  return rows.map((item) => {
    const product = Array.isArray(item.products)
      ? item.products[0]
      : item.products

    return {
      ...item,
      products: product,
    }
  })
}
