"use client";

import OrderItemCard from "./OrderItemCard";
import OrderItemHeader from "./OrderListHeader";
import { usePagination } from "@/hooks/usePagination";

import { dummyOrderItems } from "@/data/dummyOrder";
import TabFilter from "../../wishlist/components/tabFilter";
import OrderStatusFilter from "./OrderStatusFilter";
import Pagination from "@/app/mypage/seller/delivery/components/Pagination";
import { useState } from "react";

// 마이페이지에서는 4개 정도 주문 내역 보여주고
// 주문 내역 클릭 시 전부 다 보여주기

const CATEGORIES = [
  { id: "", label: "전체" },
  { id: "writing", label: "필기구" },
  { id: "paper", label: "노트/메모" },
];

export default function OrderList() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredOrders =
    selectedStatus === ""
      ? dummyOrderItems
      : dummyOrderItems.filter((order) => order.itemStatus === selectedStatus);

  const { currentPage, setCurrentPage, currentItems, totalPages } =
    usePagination(filteredOrders, 5);

  return (
    <>
      <div className="flex justify-between h-9 mb-12.5 pl-4">
        <TabFilter
          items={CATEGORIES}
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
        />
        <OrderStatusFilter
          value={selectedStatus}
          statusChange={setSelectedStatus}
        />
      </div>
      <OrderItemHeader />
      <ul>
        {currentItems.map((order) => (
          <li key={order.id}>
            <OrderItemCard order={order} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
