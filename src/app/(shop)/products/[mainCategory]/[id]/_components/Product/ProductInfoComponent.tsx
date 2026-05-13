import ProductOption from './ProductOption'
import { Coins } from 'lucide-react'
import HeartButton from './HeartButton'
import ProductSummary from './ProductSummary'
import { Products } from '@/app/lib/products'
import { Reviews } from '@/app/lib/Reviews'
import ProductImage from '@/app/(shop)/products/[mainCategory]/_components/ProductImage'
import CartButton from './CartButton'

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
          <ProductImage src={product.thumbnail_image} alt="" />
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
              <ProductOption productId={product_id} />
            </div>
            <div className="mt-6">
              <div className="mt-4 flex gap-3">
                <CartButton />
                <button
                  type="button"
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-center gap-3 bg-gray-700"
                  title="현재 사이트에서 구매가 불가합니다"
                >
                  <Coins className="h-5 w-5 text-white" />
                  <span className="text-white">구매하기</span>
                </button>
                <HeartButton />
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}

export default ProductInfoComponent
