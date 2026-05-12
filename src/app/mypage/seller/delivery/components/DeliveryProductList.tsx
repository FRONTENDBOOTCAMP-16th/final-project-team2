'use client'

import DeliveryProductCard from "./DeliveryProductCard";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "./Pagination";
import TabFilter from "@/app/mypage/consumer/wishlist/components/tabFilter";
import DeliveryProductHeader from "./DeliveryProductHeader";
import useDeliveryOrders from "@/hooks/useDeliveryOrders";
import { useState } from "react";
import MypageDeliverySkeleton from "@/app/mypage/components/MypageDeliverSkeleton";
import { useDeliveryQuery } from "../hooks/useDeliveryQuery";

const CATEGORIES = [
  { id: 'All', label: '전체', sort: 'All' },
  { id: 'latest', label: '주문 날짜 순', sort: 'latest' },
  { id: 'highPrice', label: '금액 높은 순', sort: 'highPrice' },
  { id: 'lowPrice', label: '금액 낮은 순', sort: 'lowPrice' },
] as const

export default function DeliveryProductList() {
  // 3. 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  // 1. 데이터 가져오기
  const { data: items = [], isLoading } = useDeliveryQuery(currentPage, 5);

  // 2. 정렬 + 데이터는 hook에서 처리
  const { sortType, handleTabChange, sortedOrders } = useDeliveryOrders(items);
  const currentItems = sortedOrders;

  const handleTabChangeWithReset = (id: string) => {
    handleTabChange(id, CATEGORIES)
    setCurrentPage(1)
  }

  if (isLoading || !items) {
    return <MypageDeliverySkeleton count={5} />;
  }

  const hasItems = currentItems.length > 0;

  return (
    <div className="flex flex-col">
      {hasItems ? (
        <>
          <div className="flex  flex-col ">
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
        <div className="text-red-500 text-center pt-3">
          <p>주문된 상품이 없습니다.</p>{" "}
        </div>
      )}
    </div>
  )
}
