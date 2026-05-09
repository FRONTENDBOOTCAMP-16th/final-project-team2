"use client";

import OrderItemCard from "./OrderItemCard";
import OrderItemHeader from "./OrderListHeader";
import { usePagination } from "@/hooks/usePagination";

import { dummyOrderItems } from "@/data/dummyOrder";
import TabFilter from "../../wishlist/components/tabFilter";
import OrderStatusFilter from "./OrderStatusFilter";
import Pagination from "@/app/mypage/seller/delivery/components/Pagination";
import { useState } from "react";
import { CATEGORIES } from "../lib/orderTabGroups";
import { fetchOrders } from "@/app/mypage/api/fetchOrders";
import { useQuery } from "@tanstack/react-query";
import MyPageOrdersSkeleton from "@/app/mypage/components/MypageOrdersSkeleton";
import { OrdersType } from "@/app/lib/Orders";

export default function OrderList() {
  const { data: items, isLoading } = useQuery<OrdersType[]>({
    queryKey: ["order"],
    queryFn: fetchOrders,
  });

  console.log(items);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredOrders =
    selectedStatus === ""
      ? dummyOrderItems
      : dummyOrderItems.filter((order) => order.itemStatus === selectedStatus);

  const { currentPage, setCurrentPage, currentItems, totalPages } =
    usePagination(filteredOrders, 5);

  // 로딩 상태일 때 빈 페이지 방지
  if (isLoading || !items) {
    return <MyPageOrdersSkeleton count={6} />;
  }

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
        {items.map((orders) =>
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
  );
}
