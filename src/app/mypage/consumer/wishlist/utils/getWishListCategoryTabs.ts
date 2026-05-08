import { CATEGORY_GROUPS } from "../lib/categoryGroup";

type CategoryTab = {
  id: string;
  label: string;
};

export const getWishListCategoryTabs = (): CategoryTab[] => [
  { id: "all", label: "전체" },

  // CATEGORY_GROUPS 기준 고정 생성 방식
  ...CATEGORY_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
  })),
];
