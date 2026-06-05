import { ProductWithCategory } from '@/api/getProductAll'
import ProductsCard from '@/app/components/ProductsCard'

interface SearchCardWrapProps {
  products: ProductWithCategory[]
}

export default function SearchCardWrap({ products }: SearchCardWrapProps) {
  if (!products || products.length === 0) {
    return (
      <p className="absolute left-1/2 -translate-x-1/2">
        검색하신 상품이 없습니다.
      </p>
    )
  }

  return (
    <>
      {products.map((product, i) => (
        <ProductsCard
          key={product.id}
          product={product}
          category={product.category_path}
          isPriority={i === 0}
        />
      ))}
    </>
  )
}
