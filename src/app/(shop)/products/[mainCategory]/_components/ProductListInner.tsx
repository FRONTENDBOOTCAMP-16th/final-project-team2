import ProductsCard from '@/app/components/ProductsCard'
import ProductsCardList from '@/app/components/ProductsCardList'
import { Products } from '@/app/lib/products.types'

type Props = {
  products: Products[]
  category: string
  sort?: string
}

export default function ProductListInner({ products, category, sort }: Props) {
  if (products.length === 0) {
    return <p>현재 등록된 상품이 없습니다</p>
  }

  return (
    <div className="relative">
      <ProductsCardList>
        {products.map((product, i) => (
          <ProductsCard
            key={product.id}
            sort={sort}
            category={category}
            product={product}
            isPriority={i < 4}
          />
        ))}
      </ProductsCardList>
    </div>
  )
}
