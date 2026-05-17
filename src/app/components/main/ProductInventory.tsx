import { getProductsAll } from '@/api/getProductAll'
import ProductsCard from '../ProductsCard'
import { mainCategories } from '@/app/(shop)/products/[mainCategory]/lib/category'

interface ProductInventoryProps {
  maxProducts: number
}

export default async function ProductInventory({
  maxProducts,
}: ProductInventoryProps) {
  const { products } = await getProductsAll({
    sort: 'inventory',
    page: 1,
    pageSize: maxProducts,
  })

  if (!products || products.length === 0) {
    return <p>추천 상품이 없습니다.</p>
  }

  return (
    <>
      {products.map((product, i) => (
        <ProductsCard
          key={product.id}
          product={product}
          category={mainCategories[i]}
          inventoryTag
          preload={i === 0}
        />
      ))}
    </>
  )
}
