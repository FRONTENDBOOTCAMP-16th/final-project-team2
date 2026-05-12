'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { MainCategoryType } from '../lib/category'

type Props = {
  mainCategory: MainCategoryType
  category?: string
}

export default function Sort({ mainCategory, category }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('sort', e.target.value)
    params.set('page', '1')

    if (category) {
      params.set('category', category)
    }

    router.push(`/products/${mainCategory}?${params.toString()}`)
  }

  return (
    <select
      name="sort"
      defaultValue={searchParams.get('sort') ?? 'latest'}
      onChange={handleChange}
      className="h-9 border px-3"
    >
      <option value="latest">최신순</option>
      <option value="popular">인기순</option>
      <option value="highPrice">가격 높은 순</option>
      <option value="lowPrice">가격 낮은 순</option>
    </select>
  )
}
