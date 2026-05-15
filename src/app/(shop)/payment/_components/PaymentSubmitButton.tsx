'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

export default function PaymentSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full mt-6 py-4 rounded-md font-bold transition-colors flex justify-center items-center gap-2 ${
        pending
          ? 'bg-gray-400 cursor-not-allowed text-white'
          : 'bg-black text-white cursor-pointer hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500'
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          결제 처리 중...
        </>
      ) : (
        '결제하기'
      )}
    </button>
  )
}
