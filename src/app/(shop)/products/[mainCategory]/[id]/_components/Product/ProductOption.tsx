import ProductOptionClient from './ProductOptionClient'
import { ProductOptionType } from '@/app/lib/products.types'

type ProductOptionProps = {
  productId: string
  price: number
  discount_rate: number
  maxCount: number
  options: ProductOptionType[] | null
  name: string
}

const ProductOption = ({
  productId,
  price,
  discount_rate,
  maxCount,
  options,
  name,
}: ProductOptionProps) => {
  return (
    <ProductOptionClient
      productId={productId}
      product_name={name}
      price={price}
      discount_rate={discount_rate}
      maxCount={maxCount}
      options={options}
    />
  )
}

export default ProductOption
