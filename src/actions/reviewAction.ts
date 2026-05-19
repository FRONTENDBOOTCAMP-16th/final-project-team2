'use server'

import { revalidateTag } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { getAuthUserInfo } from './getUser'

type AddReviewParams = {
  productId: string
  title: string
  content: string
  grade: number
}

export async function addReview({
  productId,
  title,
  content,
  grade,
}: AddReviewParams) {
  const auth = await getAuthUserInfo()

  if (!auth?.id) {
    throw new Error('로그인이 필요합니다.')
  }

  if (!title.trim()) {
    throw new Error('리뷰 제목을 입력해주세요.')
  }

  if (!content.trim()) {
    throw new Error('리뷰 내용을 입력해주세요.')
  }

  if (grade < 1 || grade > 5) {
    throw new Error('평점은 1~5점까지 가능합니다.')
  }

  const supabase = await createClient()

  const { error } = await supabase.from('reviews').insert({
    user_id: auth.id,
    product_id: productId,
    title,
    content,
    grade,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidateTag('reviews', 'max')
  revalidateTag(`reviews-${productId}`, 'max')
  revalidateTag(`product-${productId}`, 'max')
  revalidateTag(`average-grade-${productId}`, 'max')

  return {
    success: true,
  }
}
