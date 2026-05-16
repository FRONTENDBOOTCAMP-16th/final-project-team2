'use client'

import { useProductFilter } from '@/hooks/useFiltering';

export default function Sort() {
  const { sort, changeFilter } = useProductFilter();

  return (
    <select
      value={sort}
      onChange={e =>
        changeFilter({
          sort: e.target.value,
        })
      }
      className="border-2 border-border px-4 py-2.5 rounded-xl bg-card text-foreground focus:border-primary focus:outline-none transition-colors"
    >
      <option value="latest">최신순</option>
      {/* 평균 평점 높은 순 */}
      <option value="popular">인기순</option>
      <option value="highPrice">가격 높은 순</option>
      <option value="lowPrice">가격 낮은 순</option>
    </select>
  )
}
