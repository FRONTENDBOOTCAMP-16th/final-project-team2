import ProductOption from './ProductOption';
import TotalPrice from './TotalPrice';
import { ShoppingCart } from 'lucide-react';
import HeartButton from './HeartButton';
import ProductSummary from './ProductSummary';
import { Products } from '@/app/lib/products';
import { Reviews } from '@/app/lib/Reviews';
import ProductImage from '@/app/(shop)/products/[mainCategory]/_components/ProductImage';

type Props = {
  product: Products;
  category: string;
  average_grade: number|null;
  reviews: Reviews[];
};

const ProductInfoComponent = ({ product, reviews, category, average_grade }: Props) => {
  const price = product.price;
  const discount_rate = product.discount_rate;
  const product_id = product.id
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
            <ProductSummary mainCategory={category} reviews={reviews} products={product} average_grade={average_grade} />
            <div className="mt-8">
              <ProductOption productId={product_id}/>
            </div>
        
            <div className="mt-4">
              <TotalPrice price={price} discount_rate={discount_rate} quantity={2} />
            </div>
            <div className="mt-6">
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="bg-white hover:bg-[#dfdfdffa] border-2 w-full flex items-center justify-center gap-3 transition duration-300"
                >
                  <ShoppingCart className="h-5 w-5" /> <span>장바구니</span>
                </button>
                <button
                  type="button"
                  disabled
                  className="bg-gray-700 w-full flex items-center justify-center gap-3 cursor-not-allowed"
                  title="현재 사이트에서 구매가 불가합니다"
                >
                  <ShoppingCart className="text-white w-5 h-5" />
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
