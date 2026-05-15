import { getProductDetail } from '@/api/productDetailApi'
import ProductOptionClient from './ProductOptionClient'

type ProductOptionProps = {
  productId: string
  mainCategory: string
}

const ProductOption = async ({
  productId,
  mainCategory,
}: ProductOptionProps) => {
  const product = await getProductDetail({
    id: productId,
    mainCategory,
  })

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
