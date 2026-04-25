"use client";
import { useState } from "react";
import WishListItemsList from "./components/WishListItemsList";
import TabFilter from "@/app/components/common/tabFilter";

const CATEGORIES = [
  { id: "", label: "전체" },
  { id: "writing", label: "필기구" },
  { id: "paper", label: "노트/메모" },
];

export default function WishlistPage() {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8 sr-only">찜한 상품</h1>
      <div className="flex justify-between mb-16">
        <TabFilter
          items={CATEGORIES}
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
        />
        <label htmlFor="filter" className="sr-only">
          필터
        </label>
        <select name="filter" id="filter" className="border-2 p-1 rounded-2xl">
          <option value="lastProduct">등록순</option>
          <option value="popularProduct">인기순</option>
          <option value="highPriceProduct">가격 높은 순</option>
          <option value="lowPriceProduct">가격 낮은 순</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <WishListItemsList />
      </div>
    </div>
  );
}
