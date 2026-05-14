import { ProductLike } from '@/app/lib/productLike.types'
import { createClient } from '@/utils/supabase/client'
import {
  ProductCategoriesWithCategory,
  ProductPreview,
} from '@/app/lib/categories.types'
import { CATEGORY_GROUPS } from '../consumer/wishlist/lib/categoryGroup'

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

export const fetchLikes = async (
  page: number,
  limit: number,
  category: string = 'all',
) => {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { items: [], count: 0 }

  let filteredProductIds: string[] | null = null

  if (category !== 'all') {
    const group = CATEGORY_GROUPS.find((g) => g.id === category)
    const categoryNames = group?.categories ?? []

    const { data: categoryData } = await supabase
      .from('categories')
      .select('id')
      .in('name', categoryNames)

    const categoryIds = categoryData?.map((c) => c.id) ?? []

    const { data: categoryProducts } = await supabase
      .from('product_categories')
      .select('product_id')
      .in('category_id', categoryIds)
    filteredProductIds = categoryProducts?.map((c) => c.product_id) ?? []
  }

  let query = supabase
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
      { count: 'exact' }, // 나눠서 가져오는 데이터의 총 개수 (표시용)
    )
    .eq('user_id', user.id)

  if (filteredProductIds !== null) {
    query = query.in('product_id', filteredProductIds)
  }

  const { data, error, count } = await query
    .range(from, to)
    .returns<ProductLikeWithProductRaw[]>()

  if (error) throw error
  if (!data) return { items: [], count: 0 }

  const rows = data ?? []

  return {
    items: rows.map((item) => {
      const product = Array.isArray(item.products)
        ? item.products[0]
        : item.products

      return {
        ...item,
        products: product,
      }
    }),
    count: count ?? 0,
  }
}
