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
      <aside className="w-full max-w-[204px] bg-white">
        <nav aria-label="마이페이지 메뉴 로딩 중">
          <ul className="flex animate-pulse flex-col">
            {/* 가짜로 보여줄 리스트 스켈레톤 */}
            {[1, 2, 3, 4].map((i) => (
              <li
                key={i}
                className="flex h-[57px] items-center border-b border-gray-300 px-5 last:border-none"
              >
                <div className="h-4 w-24 rounded bg-gray-200" />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    )
  }

  const currentMenu = role ? menus[role] : []

  return (
    <aside className="w-full max-w-[204px] bg-white">
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
                className={`relative flex h-[57px] cursor-pointer items-center border-b border-gray-300 transition-colors last:border-none ${
                  isActive ? 'bg-gray-50 font-bold' : 'hover:bg-gray-50'
                } `}
              >
                {isActive && (
                  <div className="absolute left-0 h-[57px] w-1 bg-red-400" />
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
  )
}
