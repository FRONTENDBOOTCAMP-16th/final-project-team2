'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '../context/UserContext'

export default function SideMenu() {
  const pathname = usePathname()
  const { role } = useUser()

  const CONSUMER_PATH = '/mypage/consumer'
  const SELLER_PATH = '/mypage/seller'

  const menus = {
    consumer: [
      { name: '주문 내역', href: `${CONSUMER_PATH}/orders` },
      { name: '프로필 관리', href: `${CONSUMER_PATH}/profile` },
      { name: '나의 쿠폰', href: `${CONSUMER_PATH}/coupons` },
      { name: '찜한 상품', href: `${CONSUMER_PATH}/wishlist` },
    ],
    seller: [
      { name: "나의 상품", href: `${SELLER_PATH}/products` },
      { name: "상품 등록", href: `${SELLER_PATH}/register` },
      { name: "상점 정보 관리", href: `${SELLER_PATH}/info` },
      { name: "배송 관리", href: `${SELLER_PATH}/delivery` },
    ],
  }

  const currentMenu = menus[role]

  return (
    <aside className="w-full max-w-[204px] bg-white">
      <nav aria-label="마이페이지 메뉴">
        <ul className="flex flex-col">
          {currentMenu.map((menu) => {
            const isActive = pathname === menu.href
            return (
              <li
                key={menu.name}
                className={`relative flex h-[57px] cursor-pointer items-center border-b border-gray-300 transition-colors last:border-none ${isActive ? 'bg-gray-50 font-bold' : 'hover:bg-gray-50'} `}
              >
                {/* 활성화 시 왼쪽 빨간색 바 */}
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
