'use client'

import { useRouter } from 'next/navigation'

export default function ProfileAction() {
  const router = useRouter()

  const handlePasswordChange = () => {
    if (confirm('비밀번호 재설정을 위해 본인 인증 페이지로 이동하시겠습니까? '))
      router.push('/reset-password')
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      <button
        type="button"
        onClick={handlePasswordChange}
        className="h-12 w-full max-w-2xl bg-black text-white transition hover:bg-gray-800"
      >
        비밀번호 재설정
      </button>
    </div>
  )
}
