import Image from 'next/image';
import ProductOption from './ProductOption';
import Quantity from './Quantity';
import TotalPrice from './TotalPrice';
import { ShoppingCart } from 'lucide-react';
import HeartButton from './HeartButton';
import ProductSummary from './ProductSummary';

type Product = {
  category: string;
  name: string;
  originalPrice: number;
  discountRate: number;
  salePrice: number;
  shipping: string[];
  returnPolicy: string;
  countryOfOrigin: string;
  description: string;
};
type Props = {
  product: Product;
};

const ProductInfoComponent = ({ product }: Props) => {
  return (
    <article className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 mt-6">
        <div className="mt-10">
          <Image src="/pen_dummy.jpg" alt={`${product.name} 제품 이미지`} width={585} height={585} className="w-full rounded-lg object-cover" />
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
              <TotalPrice />
            </div>
            <div className="mt-6">
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="bg-[#FF6B6B] hover:bg-[#ee6767] w-full flex items-center justify-center gap-3 transition duration-300"
                >
                  <ShoppingCart className="text-white w-5 h-5" /> <span className="text-white">구매하기</span>
                </button>
                <HeartButton />
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default ProductInfoComponent;
