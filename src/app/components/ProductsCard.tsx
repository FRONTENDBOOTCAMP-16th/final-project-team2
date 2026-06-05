'use client'

import Link from 'next/link'
import Image from 'next/image'
import { memo, useRef, useState } from 'react'
import { Products } from '../lib/products.types'
import {
  DiscountPriceFormat,
  DiscountRateFormat,
  PriceFormat,
} from '@/utils/intl'
import HeartButton from '../(shop)/products/[mainCategory]/[id]/_components/Product/HeartButton'
import { getMainCategoryName } from '../(shop)/products/[mainCategory]/lib/category'
import { useIsLikedQuery } from '../mypage/consumer/wishlist/hooks/useIsLikedQuery'

interface ProductCardProps {
  product: Products
  category: string
  sort?: string
  inventoryTag?: boolean
  isPriority?: boolean
}

function ProductsCard({
  product,
  isPriority = false,
  category,
  inventoryTag,
}: ProductCardProps) {
  const { data: isLiked } = useIsLikedQuery(product.id)

  const fallback = '/fallback.png'
  const [imgSrc, setImgSrc] = useState(product.thumbnail_image || fallback)
  const [isLoaded, setIsLoaded] = useState(false)
  const isReportedRef = useRef(false)

  if (!product) return null

  const reportLoaded = () => {
    if (isReportedRef.current) return

    isReportedRef.current = true
    setIsLoaded(true)
  }

  const inventoryLabel =
    product.inventory <= 10 ? '곧 품절이에요!' : `${product.inventory}개`

  const price = product.price
  const discountRate = product.discount_rate
  const productName = product.name
  const baseUrl = '/products'

  const label = `제품명 ${product.name}, 원래 가격은 ${PriceFormat(price)}원이고 ${DiscountRateFormat(discountRate)}퍼센트 할인 중이며 현재 가격은 ${DiscountPriceFormat(price, discountRate)}원입니다.`

  return (
    <li className="relative" aria-label={label}>
      <Link href={`${baseUrl}/${category}/${product.id}`} className="block">
        <div className="relative aspect-square w-70.5 overflow-hidden border-2 border-gray-200 bg-gray-100 transition-transform duration-300 hover:scale-103">
          <Image
            src={imgSrc}
            alt={productName}
            fill
            sizes="(max-width: 768px) 50vw, 282px"
            quality={75}
            preload={isPriority}
            fetchPriority={isPriority ? 'high' : 'auto'}
            loading={isPriority ? 'eager' : 'lazy'}
            className={`object-cover`}
            onLoad={reportLoaded}
            onError={() => {
              reportLoaded()

              if (imgSrc !== fallback) {
                setImgSrc(fallback)
              }
            }}
          />

          {(inventoryTag || product.discount_rate > 0) && (
            <div
              className="absolute top-0 left-0 z-10 flex h-8 min-w-16 items-center justify-center rounded-br-md bg-rose-700 px-4 text-sm font-semibold tracking-wide text-white"
              aria-hidden="true"
            >
              {inventoryTag ? inventoryLabel : `${product.discount_rate}%`}
            </div>
          )}
        </div>

        <div>
          <dl className="flex items-baseline gap-3">
            <dt className="sr-only">제품 타입</dt>
            <dd className="mt-4 text-gray-700 dark:text-white">
              {getMainCategoryName(category)}
            </dd>

            <dt className="sr-only">평점</dt>
            <dd>{product.average_grade ? product.average_grade : 0}점</dd>
          </dl>

          <dl>
            <dt className="sr-only">제품 명</dt>
            <dd className="mt-2 w-60 truncate text-2xl font-medium">
              {productName}
            </dd>
          </dl>

          <dl className="flex gap-3">
            {product.discount_rate > 0 && (
              <>
                <dt className="sr-only">할인율</dt>
                <dd className="mt-2 text-xl font-bold text-red-500">
                  {DiscountRateFormat(discountRate)}%
                </dd>
              </>
            )}

            <dt className="sr-only">
              {product.discount_rate === 0 ? '가격' : '할인된 가격'}
            </dt>
            <dd className="mt-2 ml-2 text-xl font-medium">
              {DiscountPriceFormat(price, discountRate)}원
            </dd>
          </dl>
        </div>
      </Link>

      <div className="absolute right-3 bottom-17 flex aspect-square">
        <HeartButton
          aria-hidden="true"
          productId={product.id}
          initialLiked={isLiked}
          product_name={productName}
        />
      </div>
    </li>
  )
}

export default memo(ProductsCard)
