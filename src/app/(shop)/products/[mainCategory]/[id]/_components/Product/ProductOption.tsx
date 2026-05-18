import ProductOptionClient from './ProductOptionClient'
import { ProductOptionType } from '@/app/lib/products.types'

type ProductOptionProps = {
  productId: string
  price: number
  discount_rate: number
  maxCount: number
  options: ProductOptionType[] | null
}

const ProductOption = ({
  productId,
  price,
  discount_rate,
  maxCount,
  options,
}: ProductOptionProps) => {
  return (
    <ProductOptionClient
      productId={productId}
      price={price}
      discount_rate={discount_rate}
      maxCount={maxCount}
      options={options}
    />
  )
}

export default ProductOption
