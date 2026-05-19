'use client'

import { Pen } from 'lucide-react'

interface Props {
  isPending: boolean
}

export default function SubmitButton({ isPending }: Props) {
  return (
    <button
      type="submit"
      aria-disabled={isPending}
      className={`flex flex-row self-end p-3 hover:bg-red-500 ${isPending ? 'cursor-not-allowed border border-gray-200 opacity-50' : 'bg-black font-semibold text-white'} cursor-pointer`}
    >
      <Pen className="mr-2" />
      {isPending ? '등록 중...' : '상품 등록'}
    </button>
  )
}
