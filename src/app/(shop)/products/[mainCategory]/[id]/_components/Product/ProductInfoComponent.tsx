import ProductSummary from './ProductSummary'
import { Products } from '@/app/lib/products.types'
import { Reviews } from '@/app/lib/reviews.types'
import ProductImage from '@/app/(shop)/products/[mainCategory]/_components/ProductImage'
import ProductOption from './ProductOption'

type Props = {
  product: Products
  category: string
  reviews: Reviews[]
  average_grade: number | null
}

const ProductInfoComponent = ({
  product,
  reviews,
  category,
  average_grade,
}: Props) => {
  const product_id = product.id

  return (
    <article className="mx-auto max-w-7xl">
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative mt-10 aspect-square w-148 overflow-hidden">
          <ProductImage src={product.thumbnail_image} priority={true} alt="" />
        </div>

        <section aria-labelledby="product-info-title">
          <h2 id="product-info-title" className="sr-only">
            제품 소개
          </h2>

          <div>
            <ProductSummary
              mainCategory={category}
              reviews={reviews}
              products={product}
              average_grade={average_grade}
            />

            <div className="mt-8">
              <ProductOption productId={product_id} mainCategory={category} />
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}

export default ProductInfoComponent
