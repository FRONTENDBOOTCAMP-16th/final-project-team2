"use client";

import DeliveryProductCard from "./DeliveryProductCard";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "./Pagination";
import TabFilter from "@/app/mypage/consumer/wishlist/components/tabFilter";
import DeliveryProductHeader from "./DeliveryProductHeader";
import useDeliveryOrders from "@/hooks/useDeliveryOrders";

const myProductIds = [
  "prod-1",
  "prod-2",
  "prod-4",
  "prod-5",
  "prod-7",
  "prod-12",
  "prod-13",
  "prod-18",
  "prod-19",
  "prod-25",
  "prod-26",
  "prod-30",
  "prod-32",
];

const CATEGORIES = [
  { id: "All", label: "전체", sort: "All" },
  { id: "latest", label: "주문 날짜 순", sort: "latest" },
  { id: "highPrice", label: "금액 높은 순", sort: "highPrice" },
  { id: "lowPrice", label: "금액 낮은 순", sort: "lowPrice" },
] as const;

export default function DeliveryProductList() {
  // 1. 정렬 + 데이터는 hook에서 처리
  const { sortType, handleTabChange, sortedOrders } =
    useDeliveryOrders(myProductIds);

  // 2. 페이지네이션 (UI 레이어)
  const { currentPage, setCurrentPage, totalPages, currentItems } =
    usePagination(sortedOrders, 5);

  return (
    <div className="flex flex-col pb-12.5">
      {/* TAB = 정렬 스위치 */}
      <TabFilter
        items={CATEGORIES}
        selectedValue={sortType}
        onValueChange={(id) => handleTabChange(id, CATEGORIES)}
      />

      {/* HEADER */}
      <div className="my-12.5">
        <DeliveryProductHeader />
      </div>

      {/* LIST */}
      <ul>
        {currentItems.map((item) => (
          <li key={item.id}>
            <DeliveryProductCard order={item} />
          </li>
        ))}
      </ul>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
