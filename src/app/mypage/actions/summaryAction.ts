'use server'

import { connection } from 'next/server' 
import { createClient } from '@/utils/supabase/server'

export async function getSummaryData(
  userId: string,
  role: 'USER' | 'BUSINESS',
) {
  await connection()

  const supabase = await createClient()

  try {
    if (role === 'USER') {
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
        count1: orders.count ?? 0,
        count2: coupons.count ?? 0,
        text3: String(wishlist.count ?? 0),  // 숫자를 문자열로 변환
      }
    } else {
      const { data: store, error: storeError } = await supabase
        .from('stores')
        .select('id, name')
        .eq('owner_id', userId)
        .maybeSingle()

      if (storeError || !store) {
        console.error('상점 조회 에러:', storeError)
        return { count1: 0, count2: 0, text3: '상점 없음' }
      }

      const [orderItemsResult, productsResult] = await Promise.all([
        // products 테이블을 거치지 않고 store_id로 바로 조회
        supabase
          .from('order_items')
          .select('id, product_id, products!inner(store_id)')
          .eq('products.store_id', store.id),
        supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('store_id', store.id),
      ])

      // 에러 로깅 추가
      if (orderItemsResult.error) {
        console.error('주문 조회 에러:', orderItemsResult.error)
      }
      if (productsResult.error) {
        console.error('상품 조회 에러:', productsResult.error)
      }

      return {
        count1: orderItemsResult.data?.length ?? 0,
        count2: productsResult.count ?? 0,
        text3: store.name,
      }
    }
  } catch (error) {
    console.error('Summary Data Fetch Error:', error)
    return { count1: 0, count2: 0, text3: 'Error' }
  }
}