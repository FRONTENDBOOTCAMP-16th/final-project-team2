export const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'latest', label: '최신순' },
  { id: 'high-price', label: '금액 높은순' },
  { id: 'low-price', label: '금액 낮은순' },
]

export type CategoryId = (typeof CATEGORIES)[number]['id']
