import { Products } from '@/app/lib/products'
import { createClient } from '@/utils/supabase/server'
import { categoriesList } from './categoriesList'
import { Categories } from '@/app/lib/categories'

export interface ProductWithCategory extends Products {
  category_path: string
  category_name_kr: string | null
}

interface ProductRow extends Products {
  product_categories: {
    category_id: string
  }[]
}

interface GetProductsAllProps {
  sort?: string
  pageSize: number
  page?: number
  search?: string
}

export const getProductsAll = async ({
  sort = 'latest',
  pageSize = 8,
  page = 1,
}: GetProductsAllProps) => {
  const supabase = await createClient()

  // 상품 조회 - 전체 삼품 조회, 각 상품마다 연결된 category_id 함께 조회
  let query = supabase
    .from('products')
    .select('*, product_categories(category_id)', { count: 'exact' })

  // 상품 정렬 기준
  switch (sort) {
    case 'average_grade':
      query = query
        .order('average_grade', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
      break
    case 'discount_rate':
      query = query
        .order('discount_rate', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
      break
    case 'inventory':
      query = query
        .gt('inventory', 0)
        .order('inventory', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false })
      break
    default:
      query = query.order('created_at', { ascending: false })
      break
  }

  // 페이지네이션을 위한 상품 호출 개수 카운트
  const from = ((page || 1) - 1) * pageSize
  const to = from + pageSize - 1
  const { data, error, count } = await query.range(from, to)

  if (error) throw error

  const productRows = (data as ProductRow[]) ?? []

  // category_id를 골라내어 배열로 담은 후, DB에서 효율적인 호출을 위해 중복 카테고리 걸러냄
  const allCategoryIds = productRows
    .map((products) => products.product_categories?.[0]?.category_id)
    .filter((id): id is string => id !== null && id !== undefined)

  const categoryIds = allCategoryIds.filter(
    (id, index) => allCategoryIds.indexOf(id) === index,
  )

  // 해당 소분류 카테고리 조회
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id, name, parent_id')
    .in('id', categoryIds)

  // 부모 카테고리 추가 조회
  const allParentIds = ((categoryData as Categories[]) ?? [])
    .map((categories) => categories.parent_id)
    .filter((id): id is string => id !== null && id !== undefined)

  // 중복 제거
  const parentIds = allParentIds.filter(
    (id, index) => allParentIds.indexOf(id) === index,
  )

  // 소분류의 부모(대분류) 카테고리 정보 조회
  const { data: parentData } =
    parentIds.length > 0
      ? await supabase
          .from('categories')
          .select('id, name, parent_id')
          .in('id', parentIds)
      : { data: [] }

  // 데이터의 관리를 위해 소분류, 대분류 합침
  const categoryList: Categories[] = [
    ...((categoryData as Categories[]) ?? []),
    ...((parentData as Categories[]) ?? []),
  ]

  const products = productRows.map((product) => {
    // 소분류 카테고리 코드(c1000...) 뽑아오기
    const categoryId = product.product_categories?.[0]?.category_id ?? null
    // 위에서 찾은 카테고리 코드로 소분류 카테고리와 매칭하여 해당되는 소분류 이름표 달아주기
    const category =
      categoryList.find((category) => category.id === categoryId) ?? null

    // 구조 분해 할당 시 product_categories는 화면에 불필요하므로 제외해도 됨
    const { product_categories, ...restProduct } = product

    return {
      ...restProduct,
      category_path:
        categoriesList(categoryId, category, categoryList) ?? 'unknown',
      category_name_kr: category?.name ?? null,
    }
  })

  return {
    products: products as ProductWithCategory[],
    totalCount: count ?? 0,
  }
}
