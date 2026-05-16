'use client'
import Link from 'next/link'
import ProductImage from '../(shop)/products/[mainCategory]/_components/ProductImage'
import { Products } from '../lib/products.types'
import {
  DiscountPriceFormat,
  DiscountRateFormat,
  PriceFormat,
} from '@/utils/intl'
import HeartButton from '../(shop)/products/[mainCategory]/[id]/_components/Product/HeartButton'
import { useQuery } from '@tanstack/react-query'
import { fetchLikes } from '../mypage/api/fetchLikes'

interface ProductCardProps {
  product: Products
  category: string
  sort?: string
  onImageLoad?: () => void
  inventoryTag?: boolean
}

export default function ProductsCard({
  product,
  category,
  onImageLoad,
  inventoryTag,
}: ProductCardProps) {
  const { data } = useQuery({
    queryKey: ['likes'],
    queryFn: () => fetchLikes(1, 1000, 'all'),
    staleTime: 0,
  })
  if (!product) return null
  const isLiked = data?.items.some((l) => l.product_id === product.id)
  const inventoryLabel =
    product.inventory <= 10 ? '곧 품절이에요!' : `${product.inventory}개`

  const price = product.price
  const discount_rate = product.discount_rate
  const product_name = product.name
  const baseUrl = '/products'

  const label = `제품명 ${product.name}, 원래 가격은 ${PriceFormat(price)}원이고 ${DiscountRateFormat(discount_rate)}퍼센트 할인 중이며 현재 가격은 ${DiscountPriceFormat(price, discount_rate)}원입니다.`

  return (
    <li className="relative group" aria-label={label}>
      <Link href={`${baseUrl}/${category}/${product.id}`} className="block">
        <div className="relative aspect-square w-70.5 overflow-hidden rounded-3xl border-2 border-border bg-card product-card-hover">
          <ProductImage
            src={product.thumbnail_image}
            alt={product_name}
            onLoadComplete={onImageLoad}
          />

          {/* 호버 시 나타나는 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="text-white font-semibold bg-primary/90 px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              자세히 보기
            </span>
          </div>

          {(inventoryTag || product.discount_rate > 0) && (
            <div
              className="absolute top-3 left-3 flex h-8 min-w-16 items-center justify-center rounded-full bg-primary px-4 font-semibold text-white shadow-md animate-pulse-soft"
              aria-hidden="true"
            >
              {inventoryTag ? inventoryLabel : `${product.discount_rate}%`}
            </div>
          )}

          {/* NEW 뱃지 - 최신 상품일 경우 */}
          {!inventoryTag && product.discount_rate === 0 && (
            <div className="absolute top-3 right-3 bg-secondary text-foreground px-3 py-1 rounded-full text-xs font-bold">
              NEW
            </div>
          )}
        </div>

        <div className="mt-4">
          <dl className="flex items-baseline gap-3">
            <dt className="sr-only">제품 타입</dt>
            <dd className="text-muted-foreground text-sm font-medium">필기구</dd>
            <dt className="sr-only">평점</dt>
            <dd className="text-primary-dark font-medium flex items-center gap-1">
              <span className="text-warning">★</span>
              {product.average_grade ? product.average_grade : 0}점
            </dd>
          </dl>
          <dl>
            <dt className="sr-only">제품 명</dt>
            <dd className="mt-2 w-60 truncate text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {product_name}
            </dd>
          </dl>

          <dl className="flex gap-3 items-center mt-2">
            {product.discount_rate > 0 && (
              <>
                <dt className="sr-only">할인율</dt>
                <dd className="text-lg font-bold text-primary animate-bounce-soft">
                  {DiscountRateFormat(discount_rate)}%
                </dd>
              </>
            )}

            <dt className="sr-only">
              {product.discount_rate === 0 ? '가격' : '할인된 가격'}
            </dt>
            <dd className="text-lg font-semibold text-foreground">
              {DiscountPriceFormat(price, discount_rate)}원
            </dd>
          </dl>
        </div>
      </Link>

      <div
        className="absolute right-3 bottom-20 flex aspect-square opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={`${product_name} 찜하기`}
      >
        <HeartButton productId={product.id} initialLiked={isLiked} />
      </div>
    </li>
  )
}
