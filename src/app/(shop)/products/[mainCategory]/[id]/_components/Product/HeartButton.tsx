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

  const liked = initialLiked ?? false

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
          className={`h-10 w-10 p-2 text-muted-foreground transition-transform duration-200 hover:scale-125 ${
            liked ? 'fill-primary text-primary' : 'hover:fill-primary-light'
          } ${isPending ? 'scale-90 opacity-70' : ''}`}
        />
      </button>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 z-20 -translate-x-1/2">
          <div className="rounded-full bg-foreground px-6 py-3 text-sm text-card shadow-lg">
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
            <p className="text-base font-semibold text-foreground">
              찜 기능을 사용하려면 로그인이 필요합니다.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              로그인 페이지로 이동하시겠습니까?
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border-2 border-border bg-card py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              아니요
            </button>
            <Link
              href="/login"
              className="flex items-center justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
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
