import { notFound } from 'next/navigation'
import { isMainCategory, mainCategoryConvert } from './lib/category'
import BreadCrumble from './_components/BreadCrumble'
import Sort from './_components/Sort'
import ProductListFetcher from './_components/ProductListFetcher'
import FilterCategory from './_components/filterCategory'

type Product = {
  params: Promise<{
    mainCategory: string
  }>
  searchParams: Promise<{
    category?: string
    page?: number
    sort?: string
  }>
}

export default async function ProductListPage({
  params,
  searchParams,
}: Product) {
  const { mainCategory } = await params
  const { category, page = 1, sort = 'latest' } = await searchParams
  const MAX_PAGE_SIZE = 12
  if (!isMainCategory(mainCategory)) {
    notFound()
  }

  const categoryLabel = mainCategoryConvert[mainCategory]

  return (
    <div className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8 dark:bg-[#25292D]">
      <BreadCrumble category={categoryLabel} />

      <div className="text-center">
        <h1 className="mt-3 text-4xl font-bold dark:text-white">
          {categoryLabel}
        </h1>
        <p className="mt-3 text-base font-semibold text-gray-600 dark:text-white">
          나만의 개성있는 문구류를 찾아보세요
        </p>
      </div>
      <div className="mt-18 mb-16 flex justify-between">
        <FilterCategory mainCategory={mainCategory} />
        <Sort />
      </div>
      <section aria-labelledby="product_list">
        <h2 id="product_list" className="sr-only">
          상품 목록
        </h2>
        <ProductListFetcher
          page={page}
          pageSize={MAX_PAGE_SIZE}
          mainCategory={mainCategory}
          category={category}
          sort={sort}
          pagination={true}
        />
      </section>
    </div>
  )
}
