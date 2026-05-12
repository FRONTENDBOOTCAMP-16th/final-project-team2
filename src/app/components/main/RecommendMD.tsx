import { getProductsAll } from '@/api/getProductAll'
import RecommendMDClient from './RecommendMDClient'

interface RecommendMDProps {
  maxProducts: number
}

export default async function RecommendMD({ maxProducts }: RecommendMDProps) {
  const { products } = await getProductsAll({
    sort: 'average_grade',
    page: 1,
    pageSize: 8,
  })

  if (!products || products.length === 0) {
    return <p>추천 상품이 없습니다.</p>
  }

  return <RecommendMDClient products={products} maxProducts={maxProducts} />
}
