'use client'

import { X } from 'lucide-react'
import { deleteCartItem } from '@/actions/cartAction'

export default function CartDeleteButton({ deleteId }: { deleteId: string }) {

  const handleDeleteAction = async (id: string) => {
    const result = await deleteCartItem({ cartItemId: id })

    if (!result.success) {
      alert(result.message)
    }
  }

  return (
    <button
      className='w-10 h-10 flex justify-center items-center cursor-pointer text-gray-400 hover:text-black transition-colors'
      onClick={() => handleDeleteAction(deleteId)}
      aria-label="상품 삭제"
    >
      <X />
    </button>
  )
}