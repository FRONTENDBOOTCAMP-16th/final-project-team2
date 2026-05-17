'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Modal from '@/app/components/Modal'

export default function UnauthorizedModal() {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(true)
  }, [pathname])

  const handleClose = () => {
    setIsOpen(false)
    router.push('/inquire')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="권한 없음"
      footer={
        <button
          onClick={handleClose}
          className="rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
        >
          목록으로 가기
        </button>
      }
    >
      <div className="py-6 text-center">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-800">
          이 게시글을 열람할 권한이 없습니다.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          작성자, 상품 판매자, 또는 관리자만 열람할 수 있습니다.
        </p>
      </div>
    </Modal>
  )
}
