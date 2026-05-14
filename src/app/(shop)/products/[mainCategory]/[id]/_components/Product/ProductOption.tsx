import { getProductDetail } from '@/api/productDetailApi'
import ProductOptionClient from './ProductOptionClient'

type ProductOptionProps = {
  productId: string
}

const ProductOption = async ({ productId }: ProductOptionProps) => {
  const product = await getProductDetail(productId)

  if (!product) return null

  return (
    <ProductOptionClient
      productId={product.id}
      price={product.price}
      discount_rate={product.discount_rate}
      maxCount={product.inventory}
      options={product.options}
    />
  )
}

export default ProductOption
