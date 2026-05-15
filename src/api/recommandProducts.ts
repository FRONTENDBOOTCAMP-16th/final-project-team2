import {
  mainCategoryConvert,
  MainCategoryType,
} from '@/app/(shop)/products/[mainCategory]/lib/category'
import { Products } from '@/app/lib/products.types'
import { createStaticClient } from '@/utils/supabase/static'
import { cacheLife, cacheTag } from 'next/cache'

type GetRecommendedProductsParams = {
  productId: string
  mainCategoryKey: MainCategoryType
  limit?: number
}

export async function getRecommendedProducts({
  productId,
  mainCategoryKey,
  limit = 4,
}: GetRecommendedProductsParams): Promise<Products[]> {
  'use cache'

  cacheLife('hours')
  cacheTag('products')
  cacheTag(`recommended-products-${productId}`)

  const supabase = await createStaticClient()

  const mainCategoryName = mainCategoryConvert[mainCategoryKey]

  const { data: mainCategory, error: mainCategoryError } = await supabase
    .from('categories')
    .select('id, name, parent_id')
    .eq('name', mainCategoryName)
    .maybeSingle()

  if (mainCategoryError) {
    throw new Error(mainCategoryError.message)
  }

  if (!mainCategory) {
    return []
  }

  const { data: childCategories, error: childError } = await supabase
    .from('categories')
    .select('id')
    .eq('parent_id', mainCategory.id)

  if (childError) {
    throw new Error(childError.message)
  }

  const categoryIds = [
    mainCategory.id,
    ...(childCategories?.map((item) => item.id) ?? []),
  ]

  const { data: productCategoryData, error: categoryError } = await supabase
    .from('product_categories')
    .select('product_id')
    .in('category_id', categoryIds)

  if (categoryError) {
    throw new Error(categoryError.message)
  }

  const productIds =
    productCategoryData
      ?.map((item) => item.product_id)
      .filter((id) => id !== productId) ?? []

  if (productIds.length === 0) {
    return []
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds)
    .neq('id', productId)
    .order('average_grade', {
      ascending: false,
      nullsFirst: false,
    })
    .order('created_at', {
      ascending: false,
    })
    .limit(limit)

  if (error) {
    throw new Error(error.message)
  }

  return (data as Products[]) ?? []
}
