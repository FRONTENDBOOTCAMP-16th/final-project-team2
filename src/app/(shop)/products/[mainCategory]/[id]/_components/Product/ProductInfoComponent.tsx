import ProductSummary from './ProductSummary'
import { ProductOptionType, Products } from '@/app/lib/products.types'
import { Reviews } from '@/app/lib/reviews.types'
import ProductImage from '@/app/(shop)/products/[mainCategory]/_components/ProductImage'
import ProductOption from './ProductOption'

type Props = {
  product: Products
  category: string
  reviews: Reviews[]
  average_grade: number | null
  options: ProductOptionType[] | null
}

const ProductInfoComponent = ({
  product,
  reviews,
  category,
  average_grade,
}: Props) => {
  return (
    <article aria-labelledby="product-info-title" className="mx-auto max-w-7xl">
      <h2 id="product-info-title" className="sr-only">
        상품 영역
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative mt-10 aspect-square w-full max-w-148 overflow-hidden bg-gray-100">
          <ProductImage
            preload
            src={product.thumbnail_image}
            alt={product.name ?? '제품 상세 이미지를 불러올 수 없습니다'}
            sizes="(max-width: 1024px) 100vw, 592px"
          />
        </div>

        <section aria-labelledby="product_intro">
          <h2 id="product_intro" className="sr-only">
            상품 소개
          </h2>
          <ProductSummary
            mainCategory={category}
            reviews={reviews}
            products={product}
            average_grade={average_grade}
          />

          <div className="mt-8 min-h-60">
            <ProductOption
              productId={product.id}
              price={product.price}
              discount_rate={product.discount_rate}
              maxCount={product.inventory}
              options={product.options}
            />
          </div>
        </section>
      </div>
    </article>
  )
}

export default ProductInfoComponent
