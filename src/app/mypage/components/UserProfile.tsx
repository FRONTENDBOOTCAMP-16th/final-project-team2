'use client'

import { useUser } from '../context/UserContext'
import NextImage from 'next/image'

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
  const { user, role, isLoading } = useUser()

  // 스켈레톤 추가
  if (isLoading) {
    return (
      <div className="mb-10 flex animate-pulse flex-col">
        <div className="flex w-[204px] flex-col items-center bg-white pb-6">
          <div className="aspect-square w-[204px] shrink-0 border bg-gray-200" />
          <div className="flex items-center justify-center gap-2 pt-5 pb-2">
            <div className="h-5 w-24 rounded bg-gray-200" />
          </div>
          <div className="mt-1 h-6 w-32 rounded bg-gray-200" />
        </div>
      </div>
    )
  }

  const isBusiness = role === 'BUSINESS'

  // 판매자일 때는 스토어 이미지, 소비자일 때는 프로필 이미지를 우선순위로 둡니다.
  const displayImage = isBusiness
    ? user?.store_image // 판매자 상점 썸네일
    : user?.profile_image // 소비자 프로필 이미지

  const userGrade = user?.grade || 'BRONZE'
  const userName = user?.name || '사용자'

  return (
    <div className="mb-10 flex flex-col">
      <div className="flex w-[204px] flex-col items-center bg-white pb-6">
        <div className="relative aspect-square w-[204px] shrink-0 overflow-hidden border border-gray-100 bg-white">
          {displayImage ? (
            <NextImage
              src={displayImage}
              alt={isBusiness ? '상점 썸네일' : '프로필 이미지'}
              fill
              sizes="204px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-white" />
          )}
        </div>

        {/* 등급 표시 영역 (판매자는 STORE MANAGER 고정) */}
        <div className="flex items-center justify-center gap-2 pt-5 pb-2">
          <div className="inline-block bg-black px-2 py-0.5 text-xs font-bold tracking-tight text-white">
            {isBusiness ? 'STORE MANAGER' : userGrade}
          </div>
          {/* 소비자인 경우에만 등급 툴팁을 보여줍니다. */}
          {!isBusiness && <GradeTooltip />}
        </div>
        <h2 className="sr-only">프로필 정보</h2>
        <p className="w-full text-center text-lg">
          <strong className="font-bold text-black">{userName}</strong>님
          반갑습니다.
        </p>
      </div>
    </div>
  )
}
