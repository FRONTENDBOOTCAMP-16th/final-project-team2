'use client'

import DeliveryProductCard from './DeliveryProductCard'
import Pagination from './Pagination'
import TabFilter from '@/app/mypage/consumer/wishlist/components/tabFilter'
import DeliveryProductHeader from './DeliveryProductHeader'
import useDeliveryOrders from '@/hooks/useDeliveryOrders'
import { useState } from 'react'
import MypageDeliverySkeleton from '@/app/mypage/components/MypageDeliverSkeleton'
import { useDeliveryQuery } from '../hooks/useDeliveryQuery'
import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORIES = [
  { id: 'All', label: '전체', sort: 'All' },
  { id: 'latest', label: '주문 최신순', sort: 'latest' },
  { id: 'highPrice', label: '금액 높은 순', sort: 'highPrice' },
  { id: 'lowPrice', label: '금액 낮은 순', sort: 'lowPrice' },
] as const

export default function DeliveryProductList() {
  // 1. 페이지네이션, 데이터 페칭, 서치파람스
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()
  const router = useRouter()
  const category = searchParams.get('category') ?? 'All'
  const { data, isLoading } = useDeliveryQuery(currentPage, 5)
  const items = data?.items ?? []
  const count = data?.count ?? 0
  const totalPages = Math.ceil(count / 5)

  // 2. 정렬 + 데이터는 커스텀 hook에서 처리
  const { sortType, handleTabChange, sortedOrders } = useDeliveryOrders(
    items,
    category,
  )
  const currentItems = sortedOrders

  const handleTabChangeWithReset = (id: string) => {
    handleTabChange(id, CATEGORIES)
    setCurrentPage(1)
    router.push(`?category=${id}`)
  }

  if (isLoading || !items) {
    return <MypageDeliverySkeleton count={5} />
  }

  const hasItems = currentItems.length > 0

  return (
    <div className="flex flex-col">
      {hasItems ? (
        <>
          <div className="flex flex-col px-5">
            <TabFilter
              items={CATEGORIES}
              selectedValue={sortType}
              onValueChange={(id) => handleTabChangeWithReset(id)}
            />
            <div>
              <DeliveryProductHeader />
              <ul>
                {currentItems.map((item) => (
                  <li key={item.id}>
                    <DeliveryProductCard order={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="pt-3 text-center text-red-500">
          <p>주문된 상품이 없습니다.</p>{' '}
        </div>
      )}
    </div>
  )
}
