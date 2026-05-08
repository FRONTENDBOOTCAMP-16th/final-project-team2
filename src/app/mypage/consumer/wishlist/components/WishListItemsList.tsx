"use client";

import WishListItemCard from "./WishListItemsCard";
import TabFilter from "./tabFilter";
import Pagination from "@/app/mypage/seller/delivery/components/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useQuery } from "@tanstack/react-query";
import { fetchLikes } from "@/app/mypage/api/fetchLikes";
import { ProductLikeWithProduct } from "@/app/lib/productLike";
import { useRouter, useSearchParams } from "next/navigation";
import EmptyWishlist from "./EmptyWishlist";
import MyPageProductSkeleton from "@/app/mypage/components/MypageProductSkeleton";
import { filterWishListItems } from "../utils/filterWishListItems";
import { SORTTYPE, sortWishListItems } from "../utils/sortWishListItems";
import { getWishListCategoryTabs } from "../utils/getWishListCategoryTabs";
import { useRemoveWishList } from "../hooks/useRemoveWishList";

export default function WishListItemsList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const sort = (searchParams.get("sort") as SORTTYPE) ?? "latest";
  const page = Number(searchParams.get("page") ?? 1);

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
  const { data: items, isLoading } = useQuery<ProductLikeWithProduct[]>({
    queryKey: ["likes"],
    queryFn: fetchLikes,
  });

  const safeItems = items ?? [];

  // 아이템의 찜하기 버튼 해체 시 해당 아이템 카드 사라지게 하기
  const { mutate: removeWishlist } = useRemoveWishList();

  // 데이터에서 카테고리 네임 탭 설정
  const categoryTabs = getWishListCategoryTabs();

  // 선택된 카테고리 기준으로 찜한 상품 필터링
  const filteredItems = filterWishListItems(safeItems, category);

  // 정렬할 아이템
  const sortedItems = sortWishListItems(filteredItems, sort);

  // 페이지네이션 로직
  const { currentItems, totalPages } = usePagination(sortedItems, 9, page);

  // 로딩 상태일 때 빈 페이지 방지
  if (isLoading || !items) {
    return <MyPageProductSkeleton count={9} />;
  }
  const hasItems = filteredItems.length > 0;
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
                <WishListItemCard order={item} onRemove={removeWishlist} />
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
