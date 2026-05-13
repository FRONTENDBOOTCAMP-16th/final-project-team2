export const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'latest', label: '최신순' },
  { id: 'high-price', label: '가격 높은순' },
  { id: 'low-price', label: '가격 낮은순' },
]

export type CategoryId = (typeof CATEGORIES)[number]['id']
