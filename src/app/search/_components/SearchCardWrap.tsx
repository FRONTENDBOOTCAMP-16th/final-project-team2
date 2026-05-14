import { getProductsAll } from '@/api/getProductAll'
import ProductsCard from '@/app/components/ProductsCard'

interface SearchCardWrapProps {
  maxProducts: number
  page: number
  keyword?: string
}

export default async function SearchCardWrap({
  maxProducts,
  page,
  keyword
}: SearchCardWrapProps) {
  // 검색한 키워드를 받아서 필터링
  const { products } = await getProductsAll({
    search: keyword,
    page,
    pageSize: maxProducts,
  })

  if (!products || products.length === 0) {
    return <p className='absolute left-1/2 -translate-x-1/2'>검색하신 상품이 없습니다.</p>
  }

  return (
    <>
      {products.map((product) => (
        <ProductsCard
          key={product.id}
          product={product}
          category={product.category_path}
        />
      ))}
    </>
  )
}
