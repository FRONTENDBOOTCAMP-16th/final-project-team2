'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type ChangeFilterParams = {
  category?: string;
  sort?: string;
  page?: string | number;
};

export function useProductFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') ?? '';
  const sort = searchParams.get('sort') ?? 'latest';
  const page = Number(searchParams.get('page') ?? '1');

  const createFilterHref = ({ category, sort, page }: ChangeFilterParams) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category !== undefined) {
      if (category === '') {
        params.delete('category');
      } else {
        params.set('category', category);
      }

      params.set('page', '1');
    }

    if (sort !== undefined) {
      params.set('sort', sort);
      params.set('page', '1');
    }

    if (page !== undefined) {
      params.set('page', String(page));
    }

    const queryString = params.toString();

    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  const changeFilter = (params: ChangeFilterParams) => {
    router.push(createFilterHref(params));
  };

  return {
    category,
    sort,
    page,
    createFilterHref,
    changeFilter,
  };
}
