import { Heart } from 'lucide-react'
import Link from 'next/link'
import ProductImage from '../(shop)/products/[mainCategory]/_components/ProductImage'
import { Products } from '../lib/products'
import {
  DiscountPriceFormat,
  DiscountRateFormat,
  PriceFormat,
} from '@/utils/intl'

interface ProductCardProps {
  product: Products;
  category: string;
  sort?: string;
  onImageLoad?: () => void;
  inventoryTag?: boolean;
}

export default function ProductsCard({ product, category, onImageLoad, inventoryTag }: ProductCardProps) {
  if (!product) return null;
  const price = product.price;
  const discount_rate = product.discount_rate;
  const product_name = product.name;
  const baseUrl = '/products';
  const label = `제품명 ${product.name}, 원래 가격은 ${PriceFormat(price)}원이고 ${DiscountRateFormat(discount_rate)}퍼센트 할인 중이며 현재 가격은 ${DiscountPriceFormat(price, discount_rate)}원입니다.`;
  const isLike = false;

  const inventoryLabel = product.inventory <= 10 ? '상품이 곧 품절이에요' : `${product.inventory}`
  return (
    <li className="relative" aria-label={label}>
      <Link href={`${baseUrl}/${category}/${product.id}`} className="block">
        <div className="relative aspect-square w-70.5 overflow-hidden border-2 border-gray-200">
          <ProductImage
            src={product.thumbnail_image}
            alt={product_name}
            onLoadComplete={onImageLoad}
          />

          {(inventoryTag || product.discount_rate > 0) && (
            <div
              className="absolute top-0 left-0 flex h-8 min-w-16 items-center justify-center bg-red-500 px-4 font-semibold text-white"
              aria-hidden="true"
            >
              {inventoryTag ? inventoryLabel : `${product.discount_rate}%`}
            </div>
          )}
        </div>

        <div>
          <dl className='flex items-baseline gap-3'>
            <dt className="sr-only">제품 타입</dt>
            <dd className="mt-4 text-gray-700">필기구</dd>
            <dt className="sr-only">평점</dt>
            <dd>{ product.average_grade?product.average_grade:0 }점</dd>
          </dl>
          <dl >
            <dt className="sr-only">제품 명</dt>
            <dd className="mt-2 w-60 truncate text-2xl font-medium">
              {product_name}
            </dd>
          </dl>

          <dl className="flex gap-3">
            {product.discount_rate > 0 && (
              <>
                <dt className="sr-only">할인율</dt>
                <dd className="mt-2 text-xl font-bold text-red-500">
                  {DiscountRateFormat(discount_rate)}%
                </dd>
              </>
            )}

            <dt className="sr-only">
              {product.discount_rate === 0 ? '가격' : '할인된 가격'}
            </dt>
            <dd className="mt-2 ml-2 text-xl font-medium">
              {DiscountPriceFormat(price, discount_rate)}원
            </dd>
          </dl>
        </div>
      </Link>

      <button
        className="absolute right-3 bottom-17 aspect-square rounded-full p-2 transition hover:bg-pink-100"
        type="button"
        aria-label={`${product_name} 좋아요`}
      >
        <Heart
          className={
            isLike ? 'fill-red-500 text-red-500' : 'fill-white text-gray-700'
          }
        />
      </button>
    </li>
  )
}
