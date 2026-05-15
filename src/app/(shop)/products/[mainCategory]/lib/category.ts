import { notFound } from 'next/navigation'

export type MainCategoryType = 'writing' | 'paper' | 'deco' | 'office'

export type CategoryItem = {
  label: string
  value: string
}

export const mainCategories = ['writing', 'paper', 'deco', 'office'] as const

export const isMainCategory = (value: string): value is MainCategoryType => {
  return mainCategories.includes(value as MainCategoryType)
}

export const subCategory: Record<MainCategoryType, CategoryItem[]> = {
  writing: [
    { label: '전체', value: '' },
    { label: '볼펜', value: 'ballpen' },
    { label: '만년필', value: 'fountainpen' },
    { label: '샤프', value: 'sharp' },
  ],

  paper: [
    { label: '전체', value: '' },
    { label: '다이어리', value: 'diary' },
    { label: '플래너', value: 'planner' },
  ],

  office: [
    { label: '전체', value: '' },
    { label: '데스크 수납/정리', value: 'desk-organizer' },
    { label: '파일/서류보관', value: 'file-storage' },
  ],

  deco: [
    { label: '전체', value: '' },
    { label: '마스킹테이프', value: 'masking-tape' },
    { label: '스티커', value: 'sticker' },
  ],
}

export const mainCategoryConvert: Record<MainCategoryType, string> = {
  writing: '필기구',
  paper: '노트/다이어리',
  deco: '데코/다꾸',
  office: '사무/데스크용품',
}

export function getMainCategoryName(mainCategory: string) {
  if (!isMainCategory(mainCategory)) {
    notFound()
  }

  return mainCategoryConvert[mainCategory]
}

export function getSubCategoryName(
  mainCategory: MainCategoryType,
  category?: string,
) {
  if (!category) return ''

  const found = subCategory[mainCategory].find(
    (item) => item.value === category,
  )

  if (!found) {
    notFound()
  }

  return found.label
}
