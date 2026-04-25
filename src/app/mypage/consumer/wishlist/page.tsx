"use client";
import { useState } from "react";
import WishListItemsList from "./components/WishListItemsList";
import TabFilter from "@/app/components/common/tabFilter";
import { dummyOrders } from "@/data/dummyOrder";

const CATEGORIES = [
  { id: "", label: "전체" },
  { id: "writing", label: "필기구" },
  { id: "paper", label: "노트/메모" },
];

const HAS_WISH_PRODUCTS = dummyOrders.length > 0

export default function WishlistPage() {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <div className="max-w-4xl m-auto mt-6 bg-white pt-6 px-6 pb-11.25 ">
      <h1 className="text-2xl font-bold mb-8 sr-only">찜한 상품</h1>
      <div className="flex justify-between py-6">
        <TabFilter
          items={CATEGORIES}
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
        />
        <label htmlFor="filter" className="sr-only">
          필터
        </label>
        <select name="filter" id="filter" className="border py-1 ">
          <option value="lastProduct">등록순</option>
          <option value="popularProduct">인기순</option>
          <option value="highPriceProduct">가격 높은 순</option>
          <option value="lowPriceProduct">가격 낮은 순</option>
        </select>
      </div>
      {HAS_WISH_PRODUCTS ?  (<div className="grid grid-cols-2 md:grid-cols-3 gap-x-6  gap-y-15 ">
        <WishListItemsList />
      </div>) : ( <div className="text-red-500 text-center pt-3">
      <p>찜한 상품이 없습니다.</p> </div>)}
     
    </div>
  );
}
