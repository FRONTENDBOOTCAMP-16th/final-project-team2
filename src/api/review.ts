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
        name,
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

  cacheTag('reviews')
  cacheTag(`reviews-${productId}`)
  cacheTag(`product-${productId}`)
  cacheTag(`average-grade-${productId}`)

  const supabase = createStaticClient()

  const { data, error } = await supabase
    .from('reviews')
    .select('grade')
    .eq('product_id', productId)

  if (error) {
    console.error('평균 평점 불러오기 실패:', error.message)
    return null
  }

  if (!data || data.length === 0) {
    return null
  }

  const total = data.reduce((acc, review) => acc + review.grade, 0)

  const average = total / data.length

  return Number(average.toFixed(1))
}
