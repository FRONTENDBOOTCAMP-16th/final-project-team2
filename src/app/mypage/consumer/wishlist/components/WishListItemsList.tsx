"use client";

import WishListItemCard from "./WishListItemsCard";
import { useEffect, useState } from "react";
import TabFilter from "./tabFilter";
import Pagination from "@/app/mypage/seller/delivery/components/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { createClient } from "../../../../../../utils/supabase/client";
import { ProductLike } from "@/app/lib/productLike";

// 카드 미리보기 용 타입
type ProductPreview = {
  id: string;
  name: string;
  thumbnail_image: string;
  price: number;
  discount_rate: number;

  product_categories: {
    categories: {
      id: string;
      name: string;
    };
  }[];
};

// 기본 찜한 상품 타입 & join 용 타입 추가
export type ProductLikeWithProduct = ProductLike & {
  products: ProductPreview;
};

const CATEGORIES = [
  { id: "", label: "전체" },
  { id: "필기구", label: "필기구" },
  { id: "노트/메모", label: "노트/메모" },
];

const supabase = createClient();

export default function WishListItemsList() {
  const [items, setItems] = useState<ProductLikeWithProduct[]>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [sortValue, setSortValue] = useState("lastProduct");

  const filteredItems = items.filter((item) => {
    if (!selectedValue) return true;

    // 여러 카테고리를 찾아주기
    return item.products.product_categories.some(
      (pc) => pc.categories.name === selectedValue,
    );
  });

  // 데이터 가져오기
  useEffect(() => {
    const fetchLikes = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError);
        return;
      }

      if (!user) {
        console.log("로그인된 유저 없음");
        return;
      }

      const { data, error } = await supabase
        .from("product_likes")
        .select(
          `
        id,
        created_at,
        user_id,
        product_id,
        products (
          id,
          name,
          thumbnail_image,
          price,
          discount_rate,
          product_categories (
            categories (
              id,
              name
            )
          )
        )
      `,
        )

        .returns<ProductLikeWithProduct[]>();

      console.log(data);

      if (error) {
        console.error(error);
        return;
      }

      setItems(data ?? []);
    };

    fetchLikes();
  }, []);

  // 정렬할 아이템
  const sortedItems = filteredItems.toSorted((a, b) => {
    switch (sortValue) {
      case "highPriceProduct":
        return b.products.price - a.products.price;

      case "lowPriceProduct":
        return a.products.price - b.products.price;

      case "lastProduct":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

      default:
        return 0;
    }
  });

  // 페이지네이션 로직
  const { currentItems, currentPage, setCurrentPage, totalPages } =
    usePagination(sortedItems, 9);

  // 아이템의 찜하기 버튼 해체 시 해당 아이템 카드 사라지게 하기
  const onRemove = (id: string) => {
    const newFilterValue = items.filter((item) => item.id !== id);
    setItems(newFilterValue);

    // 다 삭제한 후에 페이지를 보정해주기
    setCurrentPage(1);
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
          className="border border-gray-400 h-9 px-2 "
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        >
          <option value="lastProduct">등록순</option>
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
