import LikeToggleButton from '@/app/mypage/consumer/wishlist/components/LikeToggleButton'
import Link from 'next/link'
import Image from 'next/image'
import { ProductLikeWithProduct } from '@/app/lib/productLike.types'
import { CATEGORY_GROUPS } from '../lib/categoryGroup'
import { DiscountPriceFormat, DiscountRateFormat } from '@/utils/intl'
import HeartButton from '@/app/(shop)/products/[mainCategory]/[id]/_components/Product/HeartButton'

interface Props {
  order: ProductLikeWithProduct
  onToggleLike: ({
    productId,
    isLiked,
  }: {
    productId: string
    isLiked: boolean
  }) => void
}
//
export default function WishListItemCard({ order, onToggleLike }: Props) {
  const product = order.products
  console.log(product.product_categories)
  const categoryName = product.product_categories.categories.name

  const categoryId = CATEGORY_GROUPS.find((group) =>
    group.categories.includes(categoryName),
  )?.id

  const productId = product.id

  return (
    <div key={order.id} className="flex flex-col">
      <Link
        href={{
          pathname: `/products/${categoryId}/${productId}`,
        }}
        className="relative flex flex-col shadow-md transition-transform duration-400 hover:scale-105"
      >
        {product.discount_rate > 0 && (
          <div className="absolute top-0 left-0 bg-red-500 px-2 py-1 text-sm font-bold text-white">
            {product.discount_rate}%
          </div>
        )}

        <Image
          width={282}
          height={282}
          className="h-70.5 w-full"
          src={product.thumbnail_image}
          alt=""
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src = '/fallback.png'
          }}
        />
      </Link>
      <div className="flex flex-col pt-4">
        <p className="text-sm text-gray-400">
          {product.product_categories?.categories.name}
        </p>
        <div className="flex justify-between">
          <p className="w-50 self-center truncate font-bold">{product.name}</p>
          {/* <LikeToggleButton
            id={order.product_id}
            isLiked={true}
            onToggleLike={onToggleLike}
          /> */}
          <HeartButton productId={order.product_id} initialLiked={true} />
        </div>

        <div className="flex gap-2">
          {product.discount_rate > 0 && (
            <span className="text-sm font-bold text-red-500">
              {DiscountRateFormat(product.discount_rate)}%
            </span>
          )}
          <span className="text-sm font-bold text-slate-800">
            {DiscountPriceFormat(product.price, product.discount_rate)}원
          </span>
        </div>
      </div>
    </div>
  )
}
