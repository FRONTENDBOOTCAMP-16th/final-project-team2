'use client'

import { toggleWishlist } from '@/actions/wishList'
import Modal from '@/app/components/Modal'
import { useAuth } from '@/hooks/useAuth'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { Fragment, useState, useTransition } from 'react'

type HeartButtonProps = {
  productId: string
  initialLiked?: boolean
}

const HeartButton = ({ productId, initialLiked = false }: HeartButtonProps) => {
  const { isLogin } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(initialLiked)

  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (isPending) return

    if (!isLogin) {
      setIsOpen(true)
      return
    }

    startTransition(async () => {
      try {
        const result = await toggleWishlist({
          productId,
        })

        setIsLiked(result.liked)
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <Fragment>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-label={isLiked ? '찜 취소' : '찜 추가'}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Heart
          className={`h-5 w-5 transition duration-200 ${
            isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'
          } ${isPending ? 'scale-90 opacity-70' : ''}`}
        />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="로그인이 필요합니다"
      >
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-base font-semibold text-gray-900">
              찜 기능을 사용하려면 로그인이 필요합니다.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              로그인 페이지로 이동하시겠습니까?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-gray-300 bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              아니요
            </button>

            <Link
              href="/login"
              className="flex items-center justify-center rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              예
            </Link>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

export default HeartButton
