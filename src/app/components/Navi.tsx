'use client'

import Link from 'next/link'
import Header from './Header'
import SubHeader from './SubHeader'

export default function Navi() {
  return (
    <>
      {/* 쿠폰 */}
      {/* 로그인 여부에 따라 해당 쿠폰 표출/비표출 */}
      <Link
        href={'/coupon'}
        className="flex bg-[#FF6B6B] px-8 py-2 text-sm text-white focus:z-30"
      >
        🎉 신규가입 시 5,000원 할인쿠폰 증정!
      </Link>

      <header className="sticky top-0 z-20 w-full border-be border-be-[#2D3142]/9 bg-white">
        {/* 편의 메뉴 */}
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-4">
          {/* 타이틀 */}
          <h1>
            <Link href="/" className="text-2xl font-bold">
              행쇼마켓
            </Link>
          </h1>

          {/* 스킵링크 */}
          <a
            href="#main-content"
            className="sr-only top-0 left-0 bg-black text-white focus:not-sr-only focus:absolute focus:z-30"
          >
            상품 리스트로 바로가기
          </a>

          {/* 메뉴 리스트 */}
          <SubHeader />

          {/* 헤더 */}
          <Header />
        </div>
      </header>
    </>
  )
}
