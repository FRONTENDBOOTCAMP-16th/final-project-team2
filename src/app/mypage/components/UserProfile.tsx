'use client'

import { useUser } from '../context/UserContext'

const GradeTooltip = () => (
  <div className="group relative flex items-center">
    <button
      type="button"
      aria-label="등급 산정 조건 보기"
      className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-gray-400 text-[10px] text-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none"
    >
      ?
    </button>
    <div className="absolute left-7 z-10 hidden w-64 border border-gray-200 bg-white p-3 text-xs text-gray-700 shadow-md group-focus-within:block group-hover:block">
      <p className="mb-2 border-b border-gray-100 pb-1 font-bold">
        등급 산정 조건
      </p>
      <ul className="space-y-1">
        <li>
          • <span className="font-semibold text-orange-900">BRONZE</span>: 0 ~
          50,000원 미만
        </li>
        <li>
          • <span className="font-semibold text-gray-500">SILVER</span>: 50,000
          ~ 100,000원 미만
        </li>
        <li>
          • <span className="font-semibold text-yellow-500">GOLD</span>:
          100,000원 이상
        </li>
      </ul>
    </div>
  </div>
)

export default function UserProfile() {
  // 전역 Context에서 role을 가져옵니다.
  const { role } = useUser()

  // TODO: 실제 로그인 연동 시 서버에서 받은 정보로 교체 예정
  const userGrade = 'BRONZE'
  const userName = '사용자'

  return (
    <div className="mb-10 flex flex-col">
      <div className="flex w-[204px] flex-col items-center bg-white pb-6">
        {/* 이미지 영역 */}
        <div className="aspect-square w-[204px] shrink-0 border bg-white" />

        <div className="flex items-center justify-center gap-2 pt-5 pb-2">
          {/* 2. role이 seller면 STORE MANAGER를, 아니면 원래 등급을 보여줍니다 */}
          <div className="inline-block bg-black px-2 py-0.5 text-xs font-bold tracking-tight text-white">
            {role === 'seller' ? 'STORE MANAGER' : userGrade}
          </div>

          {/* 판매자가 아닐 때만 등급 툴팁을 보여줍니다 */}
          {role !== 'seller' && <GradeTooltip />}
        </div>

        <p className="w-full text-center text-lg">
          <strong className="font-bold text-black">{userName}</strong>님
          반갑습니다.
        </p>
      </div>
    </div>
  )
}
