"use client";

import { useState } from "react";
import TabFilter from "../../consumer/wishlist/components/tabFilter";
import DeliveryProductHeader from "./components/DeliveryProductHeader";

const CATEGORIES = [
  { id: "", label: "전체" },
  { id: "purchaseDay", label: "주문날짜 순" },
  { id: "price", label: "가격순" },
];

export default function SellerDeliveryStatusPage() {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <section className="flex flex-col gap-4 px-6 py-12.5 m-auto w-full lg:w-243 bg-white">
      <TabFilter
        items={CATEGORIES}
        selectedValue={selectedValue}
        onValueChange={setSelectedValue}
      />
      <DeliveryProductHeader />
    </section>
  );
}
