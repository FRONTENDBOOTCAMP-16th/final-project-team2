import Link from 'next/link'
import Header from './Header'
import SubHeader from './SubHeader'
import DarkModeBtn from './darkModeBtn'
import LogoSection from './LogoSection'
import { House, Search, ShoppingCart, User } from 'lucide-react'

export default function Navi() {
  return (
    <>
      {/* 쿠폰 */}
      {/* 로그인 여부에 따라 해당 쿠폰 표출/비표출 */}
      <Link
        href={'/mypage/consumer/coupons'}
        className="flex items-center justify-center bg-black px-4 py-2 text-center text-xs text-white sm:text-sm"
      >
        🎉 신규가입 시 5,000원 할인쿠폰 증정!
      </Link>
      {/* 모바일 전용 */}
      <nav className="fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 bg-white md:hidden dark:bg-[#25292D]">
        <Link href="/" aria-label="홈으로 가기">
          <House />
        </Link>
        <Link href="/search" aria-label="검색하러 가기">
          <Search />
        </Link>
        <Link href="/mypage" aria-label="마이페이지 가기">
          <User />
        </Link>
        <Link href="/cart" aria-label="장바구니로 가기">
          <ShoppingCart />
        </Link>
      </nav>
      <header className="sticky top-0 z-40 overflow-x-auto border-b bg-white md:hidden dark:bg-[#1b1b1b]">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="shrink-0">
            <LogoSection />
          </div>

          <div className="flex flex-1 justify-center px-2">
            <SubHeader />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <DarkModeBtn />
            <Header />
          </div>
        </div>
      </header>
      {/* 데스크탑 전용 */}
      <header className="sticky top-0 z-20 hidden w-full border-be border-be-[#2D3142]/9 bg-white md:block dark:border-be-black dark:bg-[#1b1b1b]">
        {/* 편의 메뉴 */}
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:flex-nowrap md:px-4 dark:bg-[#1b1b1b]">
          {/* 타이틀 */}
          <LogoSection />
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
