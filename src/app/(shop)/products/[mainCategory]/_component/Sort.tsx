'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { CategoryType } from '../lib/category';

type SortProps = {
  mainCategory: CategoryType;
};

export default function Sort({ mainCategory }: SortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', e.target.value);
    params.set('page', '1');

    router.push(`/products/${mainCategory}?${params.toString()}`);
  };

  return (
    <select id="sort" name="sort" onChange={handleChange} className="border w-50 h-9 px-3">
      <option value="latest">최신순</option>
      <option value="popular">인기순</option>
      <option value="highPrice">가격 높은 순</option>
      <option value="lowPrice">가격 낮은 순</option>
    </select>
  );
}
