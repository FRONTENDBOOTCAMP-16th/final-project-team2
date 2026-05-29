'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '../context/UserContext'

export default function SideMenu() {
  const pathname = usePathname()
  const { role, isLoading } = useUser()

  const CONSUMER_PATH = '/mypage/consumer'
  const SELLER_PATH = '/mypage/seller'

  const menus = {
    USER: [
      { name: '주문 내역', href: `${CONSUMER_PATH}/orders` },
      { name: '프로필 관리', href: `${CONSUMER_PATH}/profile` },
      { name: '나의 쿠폰', href: `${CONSUMER_PATH}/coupons` },
      { name: '찜한 상품', href: `${CONSUMER_PATH}/wishlist` },
    ],
    BUSINESS: [
      { name: '나의 상품', href: `${SELLER_PATH}/products` },
      { name: '상품 등록', href: `${SELLER_PATH}/register` },
      { name: '상점 정보 관리', href: `${SELLER_PATH}/info` },
      { name: '배송 관리', href: `${SELLER_PATH}/delivery` },
    ],
  }

  // 스켈레톤 추가
  if (isLoading) {
    return (
      <>
        {/* 모바일 전용 */}
        <nav className="fixed bottom-0 left-0 z-50 flex w-full animate-pulse border-t border-gray-200 bg-white md:hidden">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-1 flex-col items-center gap-1 py-3"
            >
              <div className="h-5 w-5 rounded bg-gray-200" />
              <div className="h-3 w-10 rounded bg-gray-200" />
            </div>
          ))}
        </nav>
        {/* 데스크탑 전용 */}
        <aside className="hidden w-full max-w-51 bg-white md:block">
          <nav aria-label="마이페이지 메뉴 로딩 중">
            <ul className="flex animate-pulse flex-col">
              {/* 가짜로 보여줄 리스트 스켈레톤 */}
              {[1, 2, 3, 4].map((i) => (
                <li
                  key={i}
                  className="flex h-14.25 items-center border-b border-gray-300 px-5 last:border-none"
                >
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </>
    )
  }

  const currentMenu = role ? menus[role] : []

  return (
    <>
      {/* 모바일 전용 */}
      <nav
        aria-label="마이페이지 메뉴"
        className="fixed bottom-0 left-0 z-50 flex w-full border-t border-gray-200 bg-white md:hidden"
      >
        {currentMenu.map((menu) => {
          const isActive = pathname.startsWith(menu.href)
          return (
            <Link
              key={menu.name}
              href={menu.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center justify-center py-3 text-[11px] transition-colors ${
                isActive ? 'font-bold text-red-400' : 'text-gray-400'
              }`}
            >
              {/* ✅ [추가] 활성 탭 상단 인디케이터 */}
              {isActive && (
                <div className="absolute top-0 h-0.5 w-full bg-red-400" />
              )}
              <span>{menu.name}</span>
            </Link>
          )
        })}
      </nav>
      {/* 데스크탑 전용 */}
      <aside className="hidden w-full max-w-51 bg-white md:block">
        <nav aria-labelledby="sidemenu-title">
          <h2 id="sidemenu-title" className="sr-only">
            마이페이지 메뉴
          </h2>
          <ul className="flex flex-col">
            {currentMenu.map((menu) => {
              const isActive = pathname.startsWith(menu.href)
              return (
                <li
                  key={menu.name}
                  className={`relative flex h-14.25 cursor-pointer items-center border-b border-gray-300 transition-colors last:border-none ${
                    isActive ? 'bg-gray-50 font-bold' : 'hover:bg-gray-50'
                  } `}
                >
                  {isActive && (
                    <div className="absolute left-0 h-14.25 w-1 bg-red-400" />
                  )}

                  <Link
                    href={menu.href}
                    className="flex h-full w-full items-center px-5 text-sm"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {menu.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
