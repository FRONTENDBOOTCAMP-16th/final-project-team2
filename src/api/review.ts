import { Reviews } from '@/app/lib/reviews.types'
import { createStaticClient } from '@/utils/supabase/static'
import { cacheLife, cacheTag } from 'next/cache'

export async function getProductReviews(productId: string): Promise<Reviews[]> {
  'use cache'

  cacheLife('minutes')

  cacheTag('reviews')
  cacheTag(`reviews-${productId}`)
  cacheTag(`product-${productId}`)

  const supabase = createStaticClient()

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
  'use cache'

  cacheLife('minutes')

  cacheTag('products')
  cacheTag(`product-${productId}`)
  cacheTag(`average-grade-${productId}`)

  const supabase = createStaticClient()

  const { data, error } = await supabase
    .from('products')
    .select('average_grade')
    .eq('id', productId)
    .maybeSingle()

  if (error) {
    console.error('평균 평점 불러오기 실패:', error.message)
    return null
  }

  return data?.average_grade ?? null
}
