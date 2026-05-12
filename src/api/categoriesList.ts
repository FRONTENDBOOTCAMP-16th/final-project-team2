export type Category = {
  id: string
  name: string
  parent_id: string | null
}

// 영어로 변환할 리스트
const MAIN_CATEGORY_SLUG: Record<string, string> = {
  필기구: 'writing',
  '노트/다이어리': 'paper',
  '데코/다꾸': 'deco',
  '사무/데스크용품': 'office',
}

export const categoriesList = (
  categoryId: string | null,
  category: Category | null,
  categoryList: Category[],
): string | null => {
  if (!categoryId || !category) return null

  // 받아온 데이터가 대분류만 있는지 소분류가 있는지 구분하여 데이터 반환
  const mainCategoryName = category.parent_id
    ? categoryList.find((c) => c.id === category.parent_id)?.name
    : category.name

  return (mainCategoryName && MAIN_CATEGORY_SLUG[mainCategoryName]) || null
}
