'use server'

import { createClient } from '@/utils/supabase/server'

export async function getSummaryData(
  userId: string,
  role: 'USER' | 'BUSINESS',
) {
  const supabase = await createClient()

  try {
    if (role === 'USER') {
      // 소비자의 경우: 주문 내역, 남은 쿠폰, 찜한 상품에서 갯수를 가져옵니다.
      const [orders, coupons, wishlist] = await Promise.all([
        supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId),
        supabase
          .from('user_coupons')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('is_used', false),
        supabase
          .from('product_likes')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId),
      ])

      return {
        count1: orders.count || 0,
        count2: coupons.count || 0,
        text3: String(wishlist.count || 0),
      }
    } else {
      // 판매자의 경우: 주문 현황, 등록 상품의 갯수와 상점명을 가져옵니다.
      const { data: store, error: storeError } = await supabase
        .from('stores')
        .select('id, name')
        .eq('owner_id', userId)
        .maybeSingle()

      if (storeError || !store) {
        console.error('상점 조회 에러:', storeError)
        return { count1: 0, count2: 0, text3: '상점 없음' }
      }

      // 상점 ID를 기준으로 주문과 상품 개수를 가져옵니다.
      const [orderItemsResult, productsResult] = await Promise.all([
        supabase
          .from('order_items')
          .select('id, products!inner(store_id)')
          .eq('products.store_id', store.id),
        supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('store_id', store.id),
      ])

      return {
        count1: orderItemsResult.data?.length || 0,
        count2: productsResult.count || 0,
        text3: store.name,
      }
    }
  } catch (error) {
    console.error('Summary Data Fetch Error:', error)
    return { count1: 0, count2: 0, text3: 'Error' }
  }
}
