import { Heart } from 'lucide-react';
import Link from 'next/link';
import ProductImage from '../(shop)/products/[mainCategory]/_components/ProductImage';
import { Products } from '../lib/products';

interface ProductCardProps {
  product: Products;
  category: string;
  sort?: string;
  baseUrl: string;
  onImageLoad?: () => void;
}

export default function ProductsCard({ product, category, baseUrl, onImageLoad }: ProductCardProps) {
  if (!product) return null;
  const discountPrice = product.discount_rate > 0 ? Math.floor(product.price * (1 - product.discount_rate / 100)) : product.price;

  const label = `제품명 ${product.name}, 원래 가격은 ${product.price.toLocaleString()}원이고 ${product.discount_rate}퍼센트 할인 중이며 현재 가격은 ${discountPrice.toLocaleString()}원입니다.`;

  const isLike = false;

  return (
    <li className="relative" aria-label={label}>
      <Link href={`${baseUrl}/${category}/${product.id}`} className="block">
        <div className="w-70.5 aspect-square relative overflow-hidden">
          <ProductImage src={product.thumbnail_image} alt={product.name} onLoadComplete={onImageLoad} />

          {product.discount_rate > 0 && (
            <div className="absolute left-0 top-0 w-16 h-8 bg-[#FF6B6B] text-white font-semibold flex items-center justify-center" aria-hidden="true">
              {product.discount_rate}%
            </div>
          )}
        </div>

        <div>
          <dl>
            <dt className="sr-only">제품 타입</dt>
            <dd className="text-gray-700 mt-4">필기구</dd>

            <dt className="sr-only">제품 명</dt>
            <dd className="text-2xl w-60 font-medium mt-2 truncate">{product.name}</dd>
          </dl>

          <dl className="flex gap-3">
            {product.discount_rate > 0 && (
              <>
                <dt className="sr-only">할인율</dt>
                <dd className="text-[#FF6B6B] mt-2 font-bold text-xl">{product.discount_rate}%</dd>
              </>
            )}

            <dt className="sr-only">{product.discount_rate === 0 ? '가격' : '할인된 가격'}</dt>
            <dd className="text-xl font-medium mt-2 ml-2">{discountPrice.toLocaleString()}원</dd>
          </dl>
        </div>
      </Link>

      <button
        className="absolute bottom-17 right-3 rounded-full p-2 aspect-square hover:bg-pink-100 transition"
        type="button"
        aria-label={`${product.name} 좋아요`}
      >
        <Heart className={isLike ? 'fill-red-500 text-red-500' : 'fill-white text-gray-700'} />
      </button>
    </li>
  );
}
