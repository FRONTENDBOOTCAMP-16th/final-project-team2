'use client';

import Link from 'next/link';
import { CategoryType } from '../lib/category';

interface Props {
  mainCategory: CategoryType;
  category?: string;
  sort?: string;
}

const ACTIVE_CLASS = 'border-b-4 border-[#FF6B6B] font-bold';

const categories: Record<CategoryType, { label: string; value: string }[]> = {
  writing: [
    { label: '전체', value: '' },
    { label: '볼펜', value: '볼펜' },
    { label: '만년필', value: '만년필' },
  ],
  paper: [
    { label: '전체', value: '' },
    { label: '메모지', value: '메모지' },
    { label: '노트', value: '노트' },
  ],
  deco: [
    { label: '전체', value: '' },
    { label: '스티커', value: '스티커' },
    { label: '마스킹테이프', value: '마스킹테이프' },
  ],
  accessory: [
    { label: '전체', value: '' },
    { label: '키링', value: '키링' },
    { label: '파우치', value: '파우치' },
  ],
};

const FilterCategory = ({ mainCategory, sort, category }: Props) => {
  const currentCategories = categories[mainCategory] ?? [];

  return (
    <ul className="flex gap-2">
      {currentCategories.map(({ label, value }, index) => {
        const isActive = value === '' ? !category : category === value;

        const params = new URLSearchParams({
          ...(value ? { category: value } : {}),
          ...(sort ? { sort } : {}),
          page: '1',
        });

        return (
          <li key={value || 'all'}>
            <Link href={`/products/${mainCategory}?${params.toString()}`} className={isActive ? ACTIVE_CLASS : ''}>
              {label}
            </Link>
            {index !== currentCategories.length - 1 && <span className="m-4">|</span>}
          </li>
        );
      })}
    </ul>
  );
};

export default FilterCategory;
