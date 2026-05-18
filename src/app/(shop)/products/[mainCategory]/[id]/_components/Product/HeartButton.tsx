'use client'

import Modal from '@/app/components/Modal'
import { useToggleWishList } from '@/app/mypage/consumer/wishlist/hooks/useToggleWishList'
import { useAuth } from '@/hooks/useAuth'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { Fragment, useState } from 'react'

type HeartButtonProps = {
  productId: string
  initialLiked?: boolean
}

const HeartButton = ({ productId, initialLiked }: HeartButtonProps) => {
  const { isLogin } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const { mutate, isPending } = useToggleWishList()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const liked = initialLiked === true

  const handleClick = () => {
    if (isPending) return
    if (!isLogin) {
      setIsOpen(true)
      return
    }

    mutate(
      { productId, isLiked: liked },
      {
        onSuccess: () => {
          setToastMessage(
            liked
              ? '찜한 상품을 해제하였습니다.'
              : '찜한 상품을 추가하였습니다.',
          )
          setShowToast(true)
          setTimeout(() => {
            setShowToast(false)
          }, 2500)
        },
      },
    )
  }

  return (
    <Fragment>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-label={liked ? '찜 취소' : '찜 추가'}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Heart
          className={`h-10 w-10 p-2 text-gray-700 transition-transform duration-200 hover:scale-125 ${
            liked ? 'fill-red-500 text-red-500' : 'hover:fill-pink-200'
          } ${isPending ? 'scale-90 opacity-70' : ''}`}
        />
      </button>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 z-20 -translate-x-1/2">
          <div className="rounded-full bg-gray-800 px-6 py-3 text-sm text-white shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}

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
            <Link
              aria-label="로그인페이지로 이동하기"
              href="/login"
              className="flex items-center justify-center rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-gray-400"
            >
              예
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-gray-300 bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              아니요
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

export default HeartButton
