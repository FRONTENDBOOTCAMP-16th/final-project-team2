'use client'

import OrderItemCard from './OrderItemCard'
import OrderItemHeader from './OrderListHeader'
import { usePagination } from '@/hooks/usePagination'

import TabFilter from '../../wishlist/components/tabFilter'
import OrderStatusFilter from './OrderStatusFilter'
import Pagination from '@/app/mypage/seller/delivery/components/Pagination'
import { fetchOrders } from '@/app/mypage/api/fetchOrders'
import { useQuery } from '@tanstack/react-query'
import MyPageOrdersSkeleton from '@/app/mypage/components/MypageOrdersSkeleton'
import { OrdersType } from '@/app/lib/orders'
import { useRouter, useSearchParams } from 'next/navigation'
import { sortOrders } from '../lib/sortOrders'
import { CATEGORIES } from '../lib/orderTabGroups'

export default function OrderList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: items = [], isLoading } = useQuery<OrdersType[]>({
    queryKey: ['order'],
    queryFn: fetchOrders,
  })

  const selectedCategory = searchParams.get('category') ?? 'all'
  const selectedStatus = searchParams.get('status') ?? 'all'

  const filteredOrders = sortOrders(
    selectedStatus === 'all'
      ? items
      : items.filter((order) => order.order_status === selectedStatus),
    selectedCategory,
  )

  const { currentPage, setCurrentPage, totalPages } = usePagination(
    filteredOrders ?? [],
    5,
  )

  const onValueChange = (slug: string) => {
    router.push(`?category=${slug}`)
  }

  const handleStatusFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('status', value)
    router.push(`?${params.toString()}`)
  }
  if (isLoading || !items) {
    return <MyPageOrdersSkeleton count={6} />
  }
  if (items.length === 0)
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
          selectedValue={selectedCategory}
          onValueChange={onValueChange}
        />
        <OrderStatusFilter
          value={selectedStatus}
          statusChange={handleStatusFilter}
        />
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
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </>
  )
}
