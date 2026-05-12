import ProductListInner from './ProductListInner'
import { Products } from '@/app/lib/products'

type Props = {
  products: Products[]
  sort?: string
  baseUrl: string
  category: string
}

export default function ProductList({
  category,
  products,
  sort,
  baseUrl,
}: Props) {
  return (
    <ProductListInner
      category={category}
      baseUrl={baseUrl}
      products={products}
      sort={sort}
    />
  )
}
