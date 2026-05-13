'use client'

import Link from 'next/link'
import { useUser } from '../context/UserContext'
import { StatData, StatCardProps } from '../types/user'
import {
  BadgePercent,
  BookHeart,
  ShoppingBasket,
  Package,
  ClipboardList,
} from 'lucide-react'

const CONSUMER_PATH = '/mypage/consumer'
const SELLER_PATH = '/mypage/seller'

const STATS_CONFIG: Record<'USER' | 'BUSINESS', StatData[]> = {
  USER: [
    {
      label: '총 주문',
      key: 'orders',
      href: `${CONSUMER_PATH}/orders`,
      icon: ShoppingBasket,
    },
    {
      label: '남은 쿠폰 수',
      key: 'coupons',
      href: `${CONSUMER_PATH}/coupons`,
      icon: BadgePercent,
    },
    {
      label: '작성 리뷰 수',
      key: 'reviews',
      href: `${CONSUMER_PATH}/reviews`,
      icon: BookHeart,
    },
  ],
  BUSINESS: [
    {
      label: '주문 현황',
      key: 'orderStatus',
      href: `${SELLER_PATH}/delivery`,
      icon: ClipboardList,
    },
    {
      label: '등록 상품',
      key: 'products',
      href: `${SELLER_PATH}/products`,
      icon: Package,
    },
    {
      label: '상점 리뷰',
      key: 'reviews',
      href: `${SELLER_PATH}/reviews`,
      icon: BookHeart,
    },
  ],
}

const StatCard = ({ label, value, href, icon: Icon }: StatCardProps) => (
  <Link
    href={href}
    className="flex h-[190px] flex-1 cursor-pointer flex-col items-center justify-center gap-6 border-4 border-[#FF6B6B]/50 bg-white transition-colors hover:bg-black/5"
  >
    <span className="text-5xl font-black">{value}</span>
    <span className="flex items-center gap-1 text-base font-black text-[#FF6B6B]">
      {Icon && <Icon size={18} strokeWidth={2.5} />}
      {label}
    </span>
  </Link>
)

export default function SummaryMenu() {
  const { role, isLoading } = useUser()
  // 스켈레톤 추가
  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-4xl animate-pulse gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex h-[190px] flex-1 flex-col items-center justify-center gap-6 border-4 border-gray-100 bg-white"
          >
            <div className="h-12 w-16 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    )
  }

  // TODO. 요약 메뉴 데이터 연동
  const mockData = {
    USER: { orders: 3, coupons: 6, reviews: 10 },
    BUSINESS: { orderStatus: 12, products: 45, reviews: 88 },
  }

  // 데이터 확정 후 렌더링
  if (!role) return null

  const currentStats = STATS_CONFIG[role]
  const currentData = mockData[role]

  return (
    <div className="mx-auto flex w-full max-w-4xl gap-6">
      {currentStats.map((stat) => (
        <StatCard
          key={stat.key}
          label={stat.label}
          value={currentData[stat.key as keyof typeof currentData] || 0}
          href={stat.href}
          icon={stat.icon}
        />
      ))}
    </div>
  )
}
