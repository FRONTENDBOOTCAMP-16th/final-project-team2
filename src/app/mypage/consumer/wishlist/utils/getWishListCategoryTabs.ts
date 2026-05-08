import { ProductLikeWithProduct } from "@/app/lib/productLike";

type CategoryTab = {
  id: string;
  label: string;
};

export const getWishListCategoryTabs = (
  items: ProductLikeWithProduct[],
): CategoryTab[] => [
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
