'use client'

import { useUser } from '@/app/mypage/context/UserContext'

export default function ProfileAction() {
  // 전역 Context에서 role을 직접 꺼내옵니다.
  const { role } = useUser()

  return (
    <div className="mt-4 flex flex-col gap-3">
      <button
        type="button"
        className="h-12 w-full max-w-2xl bg-black text-white transition hover:bg-gray-800"
      >
        비밀번호 변경
      </button>
      <button
        type="button"
        className="h-12 w-24 bg-red-700 text-sm text-white transition hover:bg-red-800"
      >
        {/* Context에서 가져온 role에 따라 텍스트가 바뀝니다 */}
        {role === 'BUSINESS' ? '폐점 신청' : '회원 탈퇴'}
      </button>
    </div>
  )
}
