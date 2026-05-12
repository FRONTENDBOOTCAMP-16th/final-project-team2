import ProductOption from './ProductOption'
import Quantity from './Quantity'
import TotalPrice from './TotalPrice'
import { ShoppingCart } from 'lucide-react'
import HeartButton from './HeartButton'
import ProductSummary from './ProductSummary'
import ProductImage from '../../../_components/ProductImage'
import { Products } from '@/app/lib/products'
import { DiscountPriceFormat } from '@/utils/supabase/intl'

type Props = {
  product: Products
}

const ProductInfoComponent = ({ product }: Props) => {
  const price = product.price
  const discount_rate = product.discount_rate
  return (
    <article className="mx-auto max-w-7xl">
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-148 overflow-hidden">
          <ProductImage src={product.thumbnail_image} alt="" />
        </div>

        <section aria-labelledby="product-info-title">
          <h2 id="product-info-title" className="sr-only">
            제품 소개
          </h2>

          <div>
            <ProductSummary products={product} />
            <div className="mt-8">
              <ProductOption />
            </div>
            <div className="mt-4">
              <Quantity />
            </div>
            <div className="mt-4">
              <TotalPrice
                price={Number(DiscountPriceFormat(price, discount_rate))}
                quantity={2}
              />
            </div>
            <div className="mt-6">
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 border-2 bg-white transition duration-300 hover:bg-[#f8ddddfa]"
                >
                  <ShoppingCart className="h-5 w-5" /> <span>장바구니</span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 bg-[#FF6B6B] transition duration-300 hover:bg-[#ee6767]"
                >
                  <ShoppingCart className="h-5 w-5 text-white" />{' '}
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
