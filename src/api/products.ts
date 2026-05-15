import { Products } from '@/app/lib/products.types'
import { cacheLife, cacheTag } from 'next/cache'

import {
  getMainCategoryName,
  getSubCategoryName,
  isMainCategory,
} from '@/app/(shop)/products/[mainCategory]/lib/category'

import { notFound } from 'next/navigation'
import { createStaticClient } from '@/utils/supabase/static'

type ProductsResponse = {
  products: Products[]
  totalCount: number
}

type GetProductsParams = {
  mainCategory: string
  category?: string
  sort: string
  page?: number
  pageSize: number
}

export const getProductsCategory = async (
  params: GetProductsParams,
): Promise<ProductsResponse> => {
  'use cache'

  cacheLife('hours')

  cacheTag('products')
  cacheTag(`products-${params.mainCategory}`)

  const supabase = await createStaticClient()

  // 메인 카테고리 검증
  if (!isMainCategory(params.mainCategory)) {
    notFound()
  }

  const mainCategoryKey = params.mainCategory

  const mainCategoryName = getMainCategoryName(mainCategoryKey)

  const subCategoryName = getSubCategoryName(mainCategoryKey, params.category)

  // 메인 카테고리 조회
  const { data: mainCategory, error: mainCategoryError } = await supabase
    .from('categories')
    .select('id, name, parent_id')
    .eq('name', mainCategoryName)
    .maybeSingle()

  if (mainCategoryError) {
    throw new Error(mainCategoryError.message)
  }

  if (!mainCategory) {
    return {
      products: [],
      totalCount: 0,
    }
  }

  let categoryIds: string[] = []

  // 서브 카테고리 존재
  if (subCategoryName) {
    const { data: subCategoryData, error: subCategoryError } = await supabase
      .from('categories')
      .select('id, name, parent_id')
      .eq('name', subCategoryName)
      .eq('parent_id', mainCategory.id)
      .maybeSingle()

    if (subCategoryError) {
      throw new Error(subCategoryError.message)
    }

    if (!subCategoryData) {
      return {
        products: [],
        totalCount: 0,
      }
    }

    categoryIds = [subCategoryData.id]
  }

  // 전체 카테고리
  else {
    const { data: childCategories, error: childError } = await supabase
      .from('categories')
      .select('id')
      .eq('parent_id', mainCategory.id)

    if (childError) {
      throw new Error(childError.message)
    }

    categoryIds = [
      mainCategory.id,
      ...(childCategories?.map((item) => item.id) ?? []),
    ]
  }

  // 상품 ID 조회
  const { data: productCategoryData, error: productCategoryError } =
    await supabase
      .from('product_categories')
      .select('product_id')
      .in('category_id', categoryIds)

  if (productCategoryError) {
    throw new Error(productCategoryError.message)
  }

  const productIds = productCategoryData?.map((item) => item.product_id) ?? []

  if (productIds.length === 0) {
    return {
      products: [],
      totalCount: 0,
    }
  }

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .in('id', productIds)

  // 정렬
  switch (params.sort) {
    case 'latest':
      query = query.order('created_at', {
        ascending: false,
      })
      break

    case 'lowPrice':
      query = query.order('price', {
        ascending: true,
      })
      break

    case 'highPrice':
      query = query.order('price', {
        ascending: false,
      })
      break

    case 'popular':
      query = query
        .order('average_grade', {
          ascending: false,
          nullsFirst: false,
        })
        .order('created_at', {
          ascending: false,
        })
      break

    default:
      query = query.order('created_at', {
        ascending: false,
      })
  }

  // 페이지네이션
  const currentPage = params.page && params.page > 0 ? params.page : 1

  const from = (currentPage - 1) * params.pageSize

  const to = from + params.pageSize - 1

  const { data, error, count } = await query.range(from, to)

  if (error) {
    throw new Error(error.message)
  }

  return {
    products: (data as Products[]) ?? [],
    totalCount: count ?? 0,
  }
}
