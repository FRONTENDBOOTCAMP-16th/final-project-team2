'use client'

import { Pen } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pending) e.preventDefault()
  }

  return (
    <button
      type="submit"
      aria-disabled={pending}
      onClick={handleClick}
      className={`flex flex-row self-end p-3 ${pending ? 'cursor-not-allowed opacity-50' : 'bg-black font-semibold text-white'} cursor-pointer`}
    >
      <Pen className="mr-2" />
      {pending ? '등록 중...' : '상품 등록'}
    </button>
  )
}
