import { getProductsAll } from '@/api/getProductAll'
import ProductsTodaySale from './ProductTodaySale'

interface TodaySaleProps {
  maxProducts: number
}

export default async function TodaySale({ maxProducts }: TodaySaleProps) {
  const { products } = await getProductsAll({
    sort: 'discount_rate',
    pageSize: maxProducts,
  })

  if (!products || products.length === 0) {
    return <p>추천 상품이 없습니다.</p>
  }

  return <ProductsTodaySale products={products} />
}
