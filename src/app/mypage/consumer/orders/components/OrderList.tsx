'use client'

import OrderItemCard from './OrderItemCard'
import OrderItemHeader from './OrderListHeader'
import TabFilter from '../../wishlist/components/tabFilter'
import OrderStatusFilter from './OrderStatusFilter'
import Pagination from '@/app/mypage/seller/delivery/components/Pagination'
import { fetchOrders } from '@/app/mypage/api/fetchOrders'
import { useQuery } from '@tanstack/react-query'
import MyPageOrdersSkeleton from '@/app/mypage/components/MypageOrdersSkeleton'
import { OrdersType } from '@/app/lib/orders.types'
import { useRouter, useSearchParams } from 'next/navigation'
import { CATEGORIES } from '../lib/orderTabGroups'
import { SORTTYPE } from '../../wishlist/utils/sortWishListItems'

export default function OrderList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const page = Number(searchParams.get('page') ?? 1)
  const limit = 5
  const sort = (searchParams.get('sort') as SORTTYPE) ?? 'all'
  const status = searchParams.get('status') ?? 'all'

  const { data, isLoading } = useQuery<{
    items: OrdersType[]
    count: number
  }>({
    queryKey: ['order', page, sort, status],
    queryFn: () => fetchOrders(page, limit, sort, status),
    staleTime: 1000 * 60 * 5,
  })

  const safeItems = data?.items ?? []

  const filteredOrders =
    status === 'all'
      ? safeItems
      : safeItems.filter((order) => order.order_status === status)

  const onValueChange = (slug: string) => {
    params.set('sort', slug)
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  const handleStatusFilter = (value: string) => {
    params.set('status', value)
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  const count = data?.count ?? 0
  const totalPages = Math.ceil(count / limit)

  const onChangePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(newPage))
    router.push(`?${params.toString()}`)
  }

  if (isLoading || !data) {
    return <MyPageOrdersSkeleton count={5} />
  }

  if (safeItems.length === 0)
    return (
      <div className="pt-3 text-center text-red-500">
        <p>주문한 상품이 없습니다.</p>
      </div>
    )

  return (
    <>
      <div className="mb-12.5 flex h-9 justify-between pl-4">
        <TabFilter
          items={CATEGORIES}
          selectedValue={sort}
          onValueChange={onValueChange}
        />
        <OrderStatusFilter value={status} statusChange={handleStatusFilter} />
      </div>
      <OrderItemHeader />
      {filteredOrders?.length === 0 ? (
        <p className="mt-5 text-center text-xl text-red-500">
          해당 주문 상태가 존재하지 않습니다.
        </p>
      ) : (
        <>
          <ul>
            {filteredOrders?.map((orders) =>
              orders.order_items.map((item) => (
                <li key={item.id}>
                  <OrderItemCard
                    order={item}
                    createdAt={orders.created_at}
                    finalPrice={orders.final_price}
                    orderStatus={orders.order_status}
                  />
                </li>
              )),
            )}
          </ul>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onChangePage}
          />
        </>
      )}
    </>
  )
}
