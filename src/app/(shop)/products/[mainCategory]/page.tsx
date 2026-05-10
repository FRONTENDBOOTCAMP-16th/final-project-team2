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
        <Sort mainCategory={mainCategory} category={category} />
      </div>
      <main>
        {/* 페이지 목록 영역 입니다 Suspense로 감싸고 안에 상품에 데이터를 전달 할 수 있도록 컴포넌트를 불러와 작성해줍니다 */}
        <Suspense fallback={<ProductListSkeleton />}>
          {/*
           * baseurl: 초기 경로
           * page: 현재 페이지
           * pageSize: 페이지에 들어갈 상품의 수
           *
           * 아래 3개는 searchParams로 가져오는 것이 좋습니다
           * mainCategory: 메인 카테고리
           * category: 서브 카테고리
           * sort: 정렬
           *
           * pagination : boolean (켜고 끄기) 기본값 false
           *
           * pagination true 시에 백엔드에서 totalCount를 반드시 작성해주어야 합니다.
           * 참고 파일은 api의 getProducts.ts를 참고해주세요
           */}
          <ProductListFetcher
            baseUrl="/products"
            page={page}
            pageSize={MAX_PAGE_SIZE}
            mainCategory={mainCategory}
            category={category}
            sort={sort}
            pagination={true}
          />
        </Suspense>
      </main>
    </div>
  );
}
