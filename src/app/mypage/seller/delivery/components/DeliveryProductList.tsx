'use client'

import DeliveryProductCard from './DeliveryProductCard'
import Pagination from './Pagination'
import DeliveryProductHeader from './DeliveryProductHeader'
import { useState } from 'react'
import MypageDeliverySkeleton from '@/app/mypage/components/MypageDeliverSkeleton'
import { useDeliveryQuery } from '../hooks/useDeliveryQuery'
import { useRouter, useSearchParams } from 'next/navigation'
import OrderStatusFilter from '@/app/mypage/consumer/orders/components/OrderStatusFilter'

export default function DeliveryProductList() {
  // 1. , 서치파람스, 페이지네이션, 데이터 페칭
  const searchParams = useSearchParams()
  const router = useRouter()
  const status = searchParams.get('status') ?? 'all'
  const params = new URLSearchParams(searchParams.toString())
  const pageParam = Number(searchParams.get('page') ?? 1) // 현재 페이지 번호. URL 쿼리스트링 ?page=N 기반, 기본값: 1
  const { data, isLoading } = useDeliveryQuery(pageParam, 5, status)
  const items = data?.items ?? []
  const count = data?.count ?? 0
  const totalPages = Math.ceil(count / 5)

  const handleOptionChange = (value: string) => {
    router.push(`?status=${value}&page=1`)
  }

  const handlePageChange = (page: number) => {
    router.push(`?status=${status}&page=${page}`)
  }

  if (isLoading || !items) {
    return <MypageDeliverySkeleton count={5} />
  }

  const hasItems = items.length > 0

  return (
    <div className="flex flex-col">
      {hasItems ? (
        <>
          <div className="flex flex-col px-5">
            <OrderStatusFilter
              value={status}
              statusChange={handleOptionChange}
            />
            <div>
              <DeliveryProductHeader />
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <DeliveryProductCard order={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Pagination
            currentPage={pageParam}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div>
          <OrderStatusFilter value={status} statusChange={handleOptionChange} />
          <p className="pt-3 text-center text-red-500">
            주문된 상품이 없습니다.
          </p>{' '}
        </div>
      )}
    </div>
  )
}
