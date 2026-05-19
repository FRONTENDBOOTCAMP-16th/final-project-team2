'use client'

import { useProductFilter } from '@/hooks/useFiltering'
import { useId } from 'react'

export default function Sort() {
  const { sort, changeFilter } = useProductFilter()
  const sortId = useId()
  return (
    <>
      <label htmlFor={sortId} className="sr-only">
        정렬
      </label>
      <select
        id={sortId}
        value={sort}
        onChange={(e) =>
          changeFilter({
            sort: e.target.value,
          })
        }
        className="border px-3 py-2"
      >
        <option className="dark:bg-[#25292D] dark:text-white" value="latest">
          최신순
        </option>
        {/* 평균 평점 높은 순 */}
        <option className="dark:bg-[#25292D] dark:text-white" value="popular">
          인기순
        </option>
        <option className="dark:bg-[#25292D] dark:text-white" value="highPrice">
          가격 높은 순
        </option>
        <option className="dark:bg-[#25292D] dark:text-white" value="lowPrice">
          가격 낮은 순
        </option>
      </select>
    </>
  )
}
