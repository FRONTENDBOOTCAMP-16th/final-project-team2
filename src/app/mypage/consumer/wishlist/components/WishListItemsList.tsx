"use client";

import WishListItemCard from "./WishListItemsCard";
import { useState } from "react";
import TabFilter from "./tabFilter";
import Pagination from "@/app/mypage/seller/delivery/components/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { dummyOrderItems } from "@/data/dummyOrder";

const CATEGORIES = [
  { id: "", label: "전체" },
  { id: "writing", label: "필기구" },
  { id: "paper", label: "노트/메모" },
];

export default function WishListItemsList() {
  const [selectedValue, setSelectedValue] = useState("");
  const [filterValue, setFilterValue] = useState([...dummyOrderItems]);

  const { currentItems, currentPage, setCurrentPage, totalPages } =
    usePagination(filterValue, 9);

  const onRemove = (id: string) => {
    const newFilterValue = filterValue.filter((item) => item.id !== id);
    setFilterValue(newFilterValue);
  };

  return (
    <>
      <div className="flex justify-between ">
        <TabFilter
          items={CATEGORIES}
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
        />
        <label htmlFor="filter" className="sr-only">
          필터
        </label>
        <select
          name="filter"
          id="filter"
          className="border border-gray-400 h-9 "
        >
          <option value="lastProduct">등록순</option>
          <option value="popularProduct">인기순</option>
          <option value="highPriceProduct">가격 높은 순</option>
          <option value="lowPriceProduct">가격 낮은 순</option>
        </select>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6  gap-y-15 ">
        {currentItems.map((item) => (
          <li key={item.id}>
            <WishListItemCard order={item} onRemove={onRemove} />
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
