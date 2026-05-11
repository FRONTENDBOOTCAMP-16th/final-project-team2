import { Products } from "@/app/lib/products";
export interface ProductWithCategory extends Products {
  category_path: string
}

// 카테고리 테이블의 기본 형태
export type Category = { 
  id: string; 
  name: string; 
  parent_id: string | null;
}

const MAIN_CATEGORY_SLUG: Record<string, string> = {
  '필기구': 'writing',
  '노트/다이어리': 'paper',
  '데코/다꾸': 'deco',
  '사무/데스크용품': 'office',
}

export const categoriesList = (
  categoryId: string | null,
  category: Category | null,
  categoryList: Category[]
): string | null => {
  if (!categoryId || !category) return null

  const mainCategoryName = category.parent_id
    ? categoryList.find((c) => c.id === category.parent_id)?.name
    : category.name

  return (mainCategoryName && MAIN_CATEGORY_SLUG[mainCategoryName]) || null
}