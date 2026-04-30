'use client';

import Link from 'next/link';

interface Props {
  mainCategory: string;
  category?: string;
  sort?: string;
}

const categories = [
  { label: '전체', value: undefined },
  { label: '볼펜', value: 'ballpen' },
  { label: '만년필', value: 'fountainpen' },
  { label: '노트', value: 'note' },
];

const ACTIVE_CLASS = 'border-b-4 border-[#FF6B6B] font-bold';

const FilterCategory = ({ mainCategory, sort, category }: Props) => {
  return (
    <ul className="flex gap-1.5">
      {categories.map(({ label, value }, index) => {
        const isActive = category === value;

        const params = new URLSearchParams();

        if (value) params.set('category', value);
        if (sort) params.set('sort', sort);

        params.set('page', '1');

        return (
          <li key={label} className="flex items-center gap-1.5">
            <Link href={`/products/${mainCategory}?${params.toString()}`} className={isActive ? ACTIVE_CLASS : ''}>
              {label}
            </Link>

            {index !== categories.length - 1 && <span aria-hidden>/</span>}
          </li>
        );
      })}
    </ul>
  );
};

export default FilterCategory;
