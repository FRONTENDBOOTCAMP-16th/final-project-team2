'use client';

import Link from 'next/link';
import { MainCategoryType, subCategory } from '../lib/category';
import { useProductFilter } from '@/hooks/useFiltering';

type Props = {
  mainCategory: MainCategoryType;
};

const ACTIVE_CLASS = 'border-b-4 border-primary font-bold text-primary'
const DEFAULT_CLASS = 'text-muted-foreground hover:text-primary transition-colors'

export default function FilterCategory({ mainCategory }: Props) {
  const currentCategories = subCategory[mainCategory];
  const { category, createFilterHref } = useProductFilter();

  return (
    <ul className="flex gap-4">
      {currentCategories.map(({ label, value }, index) => {
        const isActive = category === value || (!category && value === '')

        return (
          <li key={value || 'all'} className="flex items-center">
            <Link
              href={createFilterHref({ category: value })}
              aria-current={isActive ? 'page' : undefined}
              className={isActive ? ACTIVE_CLASS : DEFAULT_CLASS}
            >
              {label}
            </Link>

            {index !== currentCategories.length - 1 && <span className="h-3 border-r ml-4 border-border" aria-hidden />}
          </li>
        )
      })}
    </ul>
  )
}
