'use client'

import { X, Loader2 } from 'lucide-react'
import { deleteCartItem } from '@/actions/cartAction'
import { useTransition } from 'react'

export default function CartDeleteButton({ deleteId }: { deleteId: string }) {

  const [isPending, startTransition] = useTransition()

  const handleDeleteAction = (id: string) => {
    startTransition(async () => {
      const result = await deleteCartItem({ cartItemId: id })
      if (!result.success) {
        alert(result.message)
      }
    })
  }

  return (
    <button
      className='w-10 h-10 flex justify-center items-center cursor-pointer text-gray-400 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      onClick={() => handleDeleteAction(deleteId)}
      disabled={isPending}
      aria-label="상품 삭제"
    >
      {isPending ? <Loader2 className="animate-spin" size={20} /> : <X />}
    </button>
  )
}