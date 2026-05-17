import { getProductsCategory } from '@/api/products'
import ProductListInner from './ProductListInner'
import Pagination from '@/app/components/Pagination'

type Props = {
  page?: number
  pageSize: number
  mainCategory: string
  category?: string
  sort: string
  pagination?: boolean
}

export default async function ProductListFetcher({
  page,
  pageSize,
  mainCategory,
  category,
  sort,
  pagination = false,
}: Props) {
  const data = await getProductsCategory({
    page,
    pageSize,
    mainCategory,
    category,
    sort,
  })

  return (
    <div>
      {/* 페이지 네이션은 필요 시 넣어주시고 */}
      {/* ProductListInner를 통해 상품에 대한 정보를 넘겨주고 없다면 빈 배열을 반환합니다 */}
      <ProductListInner
        products={data.products ?? []}
        category={mainCategory}
        sort={sort}
      />

      {pagination && (
        <Pagination pageSize={pageSize} totalCount={data.totalCount} />
      )}
    </div>
  )
}
