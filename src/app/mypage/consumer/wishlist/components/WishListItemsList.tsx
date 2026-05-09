"use client";

import WishListItemCard from "./WishListItemsCard";
import TabFilter from "./tabFilter";
import Pagination from "@/app/mypage/seller/delivery/components/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { createClient } from "../../../../../../utils/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLikes } from "@/app/mypage/api/fetchLikes";
import { ProductLikeWithProduct } from "@/app/lib/productLike";
import { useRouter, useSearchParams } from "next/navigation";
import EmptyWishlist from "./EmptyWishlist";

const supabase = createClient();

export default function WishListItemsList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "latest";
  const page = Number(searchParams.get("page") ?? 1);
  const queryClient = useQueryClient();

  const onChangeCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("category", slug);
    params.set("page", "1"); // 필터 바꾸면 페이지 초기화

    router.push(`?${params.toString()}`);
  };

  const onChangeSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const onChangePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    router.push(`?${params.toString()}`);
  };

  // 데이터 가져오기 useQuery
  const { data: items = [] } = useQuery<ProductLikeWithProduct[]>({
    queryKey: ["likes"],
    queryFn: fetchLikes,
  });
  const hasItems = items.length > 0;

  // 아이템의 찜하기 버튼 해체 시 해당 아이템 카드 사라지게 하기
  const onRemove = async (id: string) => {
    await supabase.from("product_likes").delete().eq("id", id);

    queryClient.invalidateQueries({ queryKey: ["likes"] });
  };

  // 데이터에서 카테고리 네임 자동 탭 설정
  const categoryTabs = [
    { id: "all", label: "전체" },

    //  items → product_categories → categories.name 전부 추출
    ...Array.from(
      new Set(
        items.flatMap((item) =>
          item.products.product_categories.map((pc) => pc.categories.name),
        ),
      ),
    ).map((name) => ({
      // id = 실제 필터 기준값 (DB name 그대로 사용)
      // label = 화면에 보여질 값
      id: name,
      label: name,
    })),
  ];

  const filteredItems = items.filter((item) => {
    if (category === "all") return true;

    return item.products.product_categories.some(
      (pc) => pc.categories.name === category,
    );
  });

  // 정렬할 아이템
  const sortedItems = filteredItems.toSorted((a, b) => {
    switch (sort) {
      case "price-high":
        return b.products.price - a.products.price;

      case "price-low":
        return a.products.price - b.products.price;

      case "latest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

      default:
        return 0;
    }
  });

  // 페이지네이션 로직
  const { currentItems, totalPages } = usePagination(sortedItems, 9, page);

  return (
    <>
      <div className="flex justify-between ">
        <TabFilter
          items={categoryTabs}
          selectedValue={category}
          onValueChange={onChangeCategory}
        />
        <label htmlFor="filter" className="sr-only">
          필터
        </label>
        <select
          name="filter"
          id="filter"
          className="border border-gray-400 h-9 px-2 "
          value={sort}
          onChange={(e) => onChangeSort(e.target.value)}
        >
          <option value="latest">최신순</option>
          <option value="price-high">가격 높은 순</option>
          <option value="price-low">가격 낮은 순</option>
        </select>
      </div>
      {hasItems ? (
        <>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-15">
            {currentItems.map((item) => (
              <li key={item.id}>
                <WishListItemCard order={item} onRemove={onRemove} />
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onChangePage}
          />
        </>
      ) : (
        <EmptyWishlist />
      )}
    </>
  );
}
