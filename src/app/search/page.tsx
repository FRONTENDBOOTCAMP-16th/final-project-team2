import { getProductsAll } from "@/api/getProductAll"
import Pagination from "../components/Pagination"
import SearchCardWrap from "./_components/SearchCardWrap"

type SearchPageProps = {
  searchParams: Promise<{
    q?: string
    page?: number
    sort?: string
  }>
}

// 정적라우팅이라 params 미사용
// 쿼리스트링만 읽어와서 검색에 사용
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', page = 1, sort = 'latest' } = await searchParams
  const currentPage = Number(page)
  const keyword = q.trim()
  const MAX_PAGE_SIZE = 12

  // 검색어와 함께 getProductsAll 호출
  const data = await getProductsAll({
    search: q,
    page: Number(page),
    pageSize: MAX_PAGE_SIZE,
    sort,
  })

  
  return (
    <div className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* 검색 결과 헤더 */}
      <div className="text-center mt-15">
        <h1 className="mt-3 text-4xl font-bold">{keyword ? keyword : '전체 상품'}</h1>
        <p className="mt-3 text-base font-semibold text-gray-600">
          총 {data.totalCount}개의 상품이 검색되었습니다.
        </p>
      </div>

      <main id="main-content" className="mt-44 flex flex-wrap gap-6 justify-start [&_li]:list-none">
        {/* 카드리스트 읽어옴 */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 [&_a>div]:w-full!">
          <SearchCardWrap
            maxProducts={MAX_PAGE_SIZE}
            page={currentPage}
            keyword={q}
          />
        </div>
        
        {/* 상품이 하나라도 있을때 페이지네이션 */}
        {data.totalCount > 0 && (
          <div className="mt-10 w-full">
            <Pagination pageSize={MAX_PAGE_SIZE} totalCount={data.totalCount} />
          </div>
        )}
      </main>
    </div>
  );
}