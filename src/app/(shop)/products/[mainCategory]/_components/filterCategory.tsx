import Link from 'next/link'
import { MainCategoryType, subCategory } from '../lib/category'

type Props = {
  mainCategory: MainCategoryType
  category?: string
  sort?: string
  page?: number
}

const ACTIVE_CLASS = 'border-b-4 border-[#FF6B6B] font-bold text-[#FF6B6B]'
const DEFAULT_CLASS = 'text-gray-500'

export default function FilterCategory({
  mainCategory,
  category,
  sort = 'latest',
  page = 1,
}: Props) {
  const currentCategories = subCategory[mainCategory]

  return (
    <ul className="flex gap-4">
      {currentCategories.map(({ label, value }, index) => {
        const isActive = category === value || (!category && value === '')

        const href = value
          ? `/products/${mainCategory}?category=${value}&sort=${sort}&page=${page}`
          : `/products/${mainCategory}?sort=${sort}&page=${page}`

        return (
          <li key={value || 'all'}>
            <Link
              href={href}
              aria-selected={isActive}
              className={isActive ? ACTIVE_CLASS : DEFAULT_CLASS}
            >
              {label}
            </Link>
            {index !== currentCategories.length - 1 && (
              <span
                className="ml-4 h-3 border-r border-gray-300 text-slate-300"
                aria-hidden
              ></span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
