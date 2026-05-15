'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'

interface Props {
  id: string
  isLiked: boolean
  onToggleLike: ({
    productId,
    isLiked,
  }: {
    productId: string
    isLiked: boolean
  }) => void
}

export default function LikeToggleButton({ id, onToggleLike, isLiked }: Props) {
  const [showToast, setShowToast] = useState(false)

  const handleClick = () => {
    onToggleLike({ productId: id, isLiked })

    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 2000)
  }

  return (
    <>
      <button
        onClick={handleClick}
        aria-label={isLiked ? '좋아요 해제' : '좋아요 추가'}
      >
        {isLiked ? (
          <Heart className="h-10 w-10 fill-red-500 p-2 text-red-500 transition-transform duration-200 hover:scale-130" />
        ) : (
          <Heart className="h-10 w-10 p-2" />
        )}
      </button>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 z-20 -translate-x-1/2">
          <div className="rounded-full bg-gray-800 px-6 py-3 text-sm text-white shadow-lg">
            {isLiked
              ? '찜한 상품을 추가하였습니다.'
              : '찜한 상품을 해제하였습니다.'}
          </div>
        </div>
      )}
    </>
  )
}
