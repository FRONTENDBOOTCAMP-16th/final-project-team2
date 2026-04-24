"use client";

import { dummyOrders } from "@/data/dummyOrder";
import OrderList from "./components/OrderList";
import OrderStatusFilter from "./components/OrderStatusFilter";
import { useState } from "react";

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredOrders =
    selectedStatus === ""
      ? dummyOrders
      : dummyOrders.filter((order) => order.status === selectedStatus);
      
  return (
    <div className="flex flex-col px-5 py-2">
      <h1 className="sr-only">주문 내역 조회</h1>
      <div className="self-end">
        <OrderStatusFilter
          value={selectedStatus}
          statusChange={setSelectedStatus}
        />
      </div>
      <OrderList orders={filteredOrders} />
    </div>
  );
}
