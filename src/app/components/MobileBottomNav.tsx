'use client'

import { House, Search, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import LogoSection from './LogoSection'
import SubHeader from './SubHeader'
import DarkModeBtn from './darkModeBtn'
import Header from './Header'
import { useAuth } from '@/hooks/useAuth'

export default function MobileBottomNav() {
  const { role } = useAuth()
  return (
    <>
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
        {role !== 'BUSINESS' && (
          <Link href="/cart">
            <ShoppingCart />
          </Link>
        )}
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
    </>
  )
}
