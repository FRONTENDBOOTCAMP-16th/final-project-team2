'use client'

import { MainCategoryType, subCategory } from '../lib/category'
import { useProductFilter } from '@/hooks/useFiltering'

type Props = {
  mainCategory: MainCategoryType
}

const ACTIVE_CLASS =
  'border-b-4 border-black font-bold text-black dark:border-white dark:text-white'
const DEFAULT_CLASS =
  'text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white'

export default function FilterCategory({ mainCategory }: Props) {
  const currentCategories = subCategory[mainCategory]
  const { category, changeFilter, isPending } = useProductFilter()

  return (
    <ul className="flex gap-4">
      {currentCategories.map(({ label, value }, index) => {
        const isActive = category === value || (!category && value === '')

        return (
          <li key={value || 'all'} className="flex items-center">
            <button
              type="button"
              disabled={isActive || isPending}
              onClick={() => changeFilter({ category: value })}
              aria-current={isActive ? 'page' : undefined}
              className={`${isActive ? ACTIVE_CLASS : DEFAULT_CLASS} ${
                isPending ? 'cursor-wait opacity-70' : ''
              }`}
            >
              {label}
            </button>

            {index !== currentCategories.length - 1 && (
              <span
                className="ml-4 h-3 border-r border-gray-300 text-slate-300"
                aria-hidden
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}
