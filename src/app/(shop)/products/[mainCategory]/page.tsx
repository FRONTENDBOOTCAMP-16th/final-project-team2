import { notFound } from 'next/navigation';
import { isMainCategory, mainCategoryConvert } from './lib/category';
import BreadCrumble from './_components/BreadCrumble';
import Sort from './_components/Sort';
import FilterCategory from './_components/filterCategory';
import { Suspense } from 'react';
import ProductListSkeleton from './_components/ProductListSkeleton';
import ProductListFetcher from './_components/ProductListFetcher';

type Product = {
  params: Promise<{
    mainCategory: string;
  }>;
  searchParams: Promise<{
    category?: string;
    page?: number;
    sort?: string;
  }>;
};

export default async function ProductListPage({ params, searchParams }: Product) {
  const { mainCategory } = await params;
  const { category, page = 1, sort = 'latest' } = await searchParams;
  const MAX_PAGE_SIZE = 12;
  if (!isMainCategory(mainCategory)) {
    notFound();
  }

  const categoryLabel = mainCategoryConvert[mainCategory];

  return (
    <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <BreadCrumble category={categoryLabel} />

      <div className="text-center">
        <h1 className="text-4xl font-bold mt-3">{categoryLabel}</h1>
        <p className="text-base mt-3 font-semibold text-gray-600">장인은 도구탓을 합니다</p>
      </div>
      <div className="flex justify-between mb-16 mt-18">
        <FilterCategory mainCategory={mainCategory} category={category} sort={sort} page={page} />
        <Sort mainCategory={mainCategory} />
      </div>
      <main>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductListFetcher page={page} pageSize={MAX_PAGE_SIZE} mainCategory={mainCategory} category={category} sort={sort} />
        </Suspense>
      </main>
    </div>
  );
}
