import { getProductsAll } from '@/api/getProductAll'
import ProductsCard from '../ProductsCard'

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
      {products.map((product) => (
        <ProductsCard
          baseUrl="/products"
          key={product.id}
          product={product}
          category={product.category_path}
          inventoryTag
        />
      ))}
    </>
  )
}
