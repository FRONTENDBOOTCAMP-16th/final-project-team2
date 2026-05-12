import { CATEGORY_GROUPS } from '@/app/mypage/consumer/wishlist/lib/categoryGroup'
import { CATEGORY_NAME_TO_ID } from '@/app/mypage/consumer/wishlist/lib/categoryNameToId'
import { ChevronDown } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

type Props = {
  error?: string
  onChange: (value: string) => void
}

export default function CategorySelector({ error, onChange }: Props) {
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const currentGroup = CATEGORY_GROUPS.find(
    (group) => group.label === selectedGroup,
  )

  const handleGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(e.target.value)
    setSelectedCategory('')
    onChange('')
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value
    setSelectedCategory(name)
    onChange(name)
  }
  return (
    <div className="flex gap-2">
      <div className="relative flex gap-2">
        <label htmlFor="categoryGroup" className="self-center text-sm">
          카테고리
        </label>
        {/* 대분류 */}
        <select
          id="categoryGroup"
          value={selectedGroup}
          onChange={handleGroupChange}
          className="cursor-pointer appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">대분류 선택</option>
          {CATEGORY_GROUPS.map((g) => (
            <option key={g.id} value={g.label}>
              {g.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>

      {/* 소분류 */}
      {currentGroup && (
        <select
          name="productCategoryId"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">소분류 선택</option>
          {currentGroup.categories
            .filter((c) => c !== selectedGroup)
            .map((c) => (
              <option key={c} value={CATEGORY_NAME_TO_ID[c]}>
                {c}
              </option>
            ))}
        </select>
      )}
      {error && <p className="self-center text-red-500">{error}</p>}
    </div>
  )
}
