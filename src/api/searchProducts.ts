'use server'

import { createClient } from '@/utils/supabase/server'
import type { Products } from '@/app/lib/products'

export interface SearchState {
  success: boolean
  message: string
  data?: Products[]
}

export default async function SearchProductsAction(
  prevState: SearchState,
  formData: FormData,
): Promise<SearchState> {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const storeId = formData.get('storeId') as string

  try {
    let targetProductIds: string[] = []

    // 우선 카테고리, category는 별도 테이블에 저장되어 있기에
    // 배열로 출력해야 합니다. 일단 필요없는데 추후 카테고리 검색도 있을거 같아 추가했습니다.
    // supabase에서 categories 테이블의 id 컬럼으로 요청 보내야합니다.
    if (category) {
      const { data: categoryData, error: categoryError } = await supabase
        .from('product_categories')
        .select('product_id')
        .eq('category_id', category)

      if (categoryError) throw categoryError

      // 배열로 내보내기 때문에 map...
      targetProductIds = categoryData.map((item) => item.product_id)

      // 카테고리가 없다면 결과는 없다고 출력.
      if (targetProductIds.length === 0) {
        return {
          success: true,
          message: '조건에 맞는 상품이 없습니다.',
          data: [],
        }
      }
    }

    // 문의용으로 추가한 쿼리입니다. 이름, 담당 스토어는 테이블에 있으니 쓸게요.
    let query = supabase.from('products').select('*')

    // 쿼리문입니다.
    if (name) query = query.ilike('name', `%${name}%`)
    if (storeId) query = query.eq('storeId', storeId)

    if (category && targetProductIds.length > 0) {
      query = query.in('id', targetProductIds)
    }

    const { data, error } = await query
    if (error) throw error

    return {
      success: true,
      message: '조회에 성공했습니다.',
      data: data,
    }
  } catch (error: unknown) {
    console.error('검색 서버 액션 에러 상세:', error)
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.'
    return {
      success: false,
      message: `에러 상세: ${errorMessage}`, // 2. 화면에도 상세 에러 출력
      data: [],
    }
  }
}
