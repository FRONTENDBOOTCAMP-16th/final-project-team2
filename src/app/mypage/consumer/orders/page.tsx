"use client";

import { dummyOrders } from "@/data/dummyOrder";
import OrderList from "./components/OrderList";
import OrderStatusFilter from "./components/OrderStatusFilter";
import { useState } from "react";
import TabFilter from "@/app/mypage/consumer/wishlist/components/tabFilter";

const CATEGORIES = [
  { id: "", label: "전체" },
  { id: "writing", label: "필기구" },
  { id: "paper", label: "노트/메모" },
];

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredOrders =
    selectedStatus === ""
      ? dummyOrders
      : dummyOrders.filter((order) => order.status === selectedStatus);

  return (
     <div className="flex flex-col px-5 py-2 w-full bg-white">
      <h1 className="sr-only">주문 내역 조회</h1>
      <div className="flex justify-between px-5">
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
      <OrderList orders={filteredOrders} />
    </div>
  );
}
