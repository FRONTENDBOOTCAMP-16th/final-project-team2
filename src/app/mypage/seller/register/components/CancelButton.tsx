'use client'

import Modal from '@/app/components/Modal'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  isInputted: boolean
  onConfirm: () => void
}
export default function CancelButton({ isInputted, onConfirm }: Props) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCancel = () => {
    if (isInputted) {
      setIsModalOpen(true)
      return
    }
    router.push('/mypage/seller/products')
  }
  return (
    <>
      <button
        type="button"
        onClick={handleCancel}
        className="flex items-center gap-3 bg-gray-400 p-3 font-semibold whitespace-nowrap text-white hover:bg-red-500"
      >
        <ArrowLeft size={16} className="hidden md:block" />
        취소
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="상품 등록 취소"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border px-4 py-2"
            >
              계속 작성
            </button>
            <button
              onClick={() => {
                onConfirm()
                setIsModalOpen(false)
                router.push('/mypage/seller/products')
              }}
              className="rounded-lg bg-black px-4 py-2 text-white"
            >
              취소하기
            </button>
          </>
        }
      >
        <p>작성 중인 내용이 있습니다. 정말 취소하시겠습니까?</p>
      </Modal>
    </>
  )
}
