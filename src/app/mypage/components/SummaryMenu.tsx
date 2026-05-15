'use client'

import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { getSummaryData } from '../actions/summaryAction'
import StatCard from './StatCard'
import {
  BadgePercent,
  BookHeart,
  ShoppingBasket,
  Package,
  ClipboardList,
} from 'lucide-react'
import { StatData } from '../types/user'

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
      label: '찜한 상품',
      key: 'wishlist',
      href: `${CONSUMER_PATH}/wishlist`,
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
      label: '상점 정보',
      key: 'profile',
      href: `${SELLER_PATH}/info`,
      icon: BookHeart,
    },
  ],
}

export default function SummaryMenu() {
  const { role, user, isLoading: isUserLoading } = useUser()
  const [data, setData] = useState({ count1: 0, count2: 0, text3: '' })
  const [isDataLoading, setIsDataLoading] = useState(true)

  const userId = user?.id

  useEffect(() => {
    // 초기 로딩 중이거나 필수 정보가 없으면 실행 중단
    if (isUserLoading || !userId || !role) return

    let isMounted = true

    async function loadData() {
      setIsDataLoading(true)
      try {
        // 여기서 userId가 string임을 한 번 더 확실히 체크합니다.
        // 이렇게 하면 getSummaryData에 들어가는 인자가 절대 undefined일 수 없음을 TS가 인지합니다.
        // undefined 에러가 계속 나서 방어 코드를 2차적으로 넣었습니다.
        if (typeof userId === 'string') {
          const result = await getSummaryData(
            userId,
            role as 'USER' | 'BUSINESS',
          )
          if (isMounted && result) {
            setData(result)
          }
        }
      } catch (error) {
        console.error('데이터 연동 실패:', error)
      } finally {
        if (isMounted) {
          setIsDataLoading(false)
        }
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [userId, role, isUserLoading])

  // 데이터가 이미 존재한다면 스켈레톤을 보여주지 않도록 순서 제어
  const hasData = data.count1 !== 0 || data.count2 !== 0 || data.text3 !== ''

  if ((isUserLoading || isDataLoading) && !hasData) {
    return (
      <div className="mx-auto flex w-full max-w-4xl animate-pulse gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex h-47.5 flex-1 flex-col items-center justify-center gap-6 border-4 border-gray-100 bg-white"
          >
            <div className="h-12 w-16 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    )
  }

  if (!role) return null

  const getMappedValue = (key: string) => {
    switch (key) {
      case 'orders':
      case 'orderStatus':
        return data.count1
      case 'coupons':
      case 'products':
        return data.count2
      case 'wishlist':
      case 'profile':
        return data.text3
      default:
        return 0
    }
  }

  const currentStats = STATS_CONFIG[role]

  return (
    <div className="mx-auto flex w-full max-w-4xl gap-6">
      {currentStats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={getMappedValue(stat.key)}
          href={stat.href}
          icon={stat.icon}
        />
      ))}
    </div>
  )
}
