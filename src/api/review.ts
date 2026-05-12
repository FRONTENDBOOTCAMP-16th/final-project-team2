// src/api/reviews.ts

import { Reviews } from '@/app/lib/Reviews'
import { createClient } from '@/utils/supabase/server'

export async function getProductReviews(productId: string): Promise<Reviews[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
      *,
      users (
        id,
        nickname,
        profile_image
      )
    `,
    )
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('리뷰 불러오기 실패:', error.message)
    return []
  }

  return data ?? []
}
