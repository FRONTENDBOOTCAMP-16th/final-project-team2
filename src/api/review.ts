import { Reviews } from '@/app/lib/reviews.types'
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

export async function getAverageGrade(
  productId: string,
): Promise<number | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('average_grade')
    .eq('id', productId)
    .single()

  if (error) {
    console.error('평균 평점 불러오기 실패:', error.message)
    return null
  }

  return data?.average_grade ?? null
}
