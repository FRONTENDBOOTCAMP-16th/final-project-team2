'use client'

import Link from 'next/link'
import Header from './Header'
import SubHeader from './SubHeader'
import DarkModeBtn from './darkModeBtn'
import { usePathname } from 'next/navigation'

export default function Navi() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const LogoTag = isHome ? 'h1' : 'div'

  return (
    <>
      {/* 쿠폰 */}
      {/* 로그인 여부에 따라 해당 쿠폰 표출/비표출 */}
      <Link
        href={'/mypage/consumer/coupons'}
        className="flex bg-black px-8 py-2 text-sm text-white focus:z-30"
      >
        🎉 신규가입 시 5,000원 할인쿠폰 증정!
      </Link>

      <header className="sticky top-0 z-20 w-full border-be border-be-[#2D3142]/9 bg-white dark:border-be-black dark:bg-[#1b1b1b]">
        {/* 편의 메뉴 */}
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-4 dark:bg-[#1b1b1b]">
          {/* 타이틀 */}
          <LogoTag>
            <Link href="/" className="text-2xl font-bold">
              행쇼마켓
            </Link>
          </LogoTag>
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
        <div className="absolute">
          {/* 다크모드 테스트 */}
          <DarkModeBtn />
        </div>
      </header>
    </>
  )
}
