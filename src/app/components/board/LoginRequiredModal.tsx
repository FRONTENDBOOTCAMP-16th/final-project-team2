'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Modal from '@/app/components/Modal'

export default function LoginRequiredModal() {
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

  const handleLogin = () => {
    setIsOpen(false)
    router.push('/login')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="로그인 필요"
      footer={
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={handleClose}
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
          >
            목록으로 가기
          </button>
          <button
            onClick={handleLogin}
            className="rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
          >
            로그인하기
          </button>
        </div>
      }
    >
      <div className="py-6 text-center">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-800">
          로그인이 필요합니다.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          이 게시글을 열람하려면 먼저 로그인해 주세요.
        </p>
      </div>
    </Modal>
  )
}
