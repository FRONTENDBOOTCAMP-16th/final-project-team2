'use client'

import { useState } from 'react'
import Modal from '@/app/components/Modal'
import SearchProducts from './SearchProducts'

export default function InquireFindProdctAction() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center bg-red-500 px-8 py-2 text-white transition-colors hover:bg-red-600"
      >
        문의할 제품 찾기
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="제품 검색"
        footer={
          <div className="flex gap-2">
            <p>문의 사항 한번 당 하나의 제품만 가능합니다.</p>
          </div>
        }
      >
        <div className="">
          <SearchProducts onSelectClose={() => setIsOpen(false)} />
        </div>
      </Modal>
    </>
  )
}
