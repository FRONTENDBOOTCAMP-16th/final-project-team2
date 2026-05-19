'use client'

import { useAuth } from '@/hooks/useAuth'
import ReviewBtn from './ReviewBtn'
import { addReview } from '@/actions/reviewAction'

type Props = {
  productId: string
}

export default function ReviewBtnWrap({ productId }: Props) {
  const { isLogin } = useAuth()

  if (!isLogin) return null

  return (
    <ReviewBtn
      onSubmit={async ({ title, content, grade }) => {
        await addReview({
          productId,
          title,
          content,
          grade,
        })
      }}
    />
  )
}
