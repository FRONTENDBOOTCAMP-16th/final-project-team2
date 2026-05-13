import LikeToggleButton from '@/app/mypage/consumer/wishlist/components/LikeToggleButton'
import Link from 'next/link'
import Image from 'next/image'
import { ProductLikeWithProduct } from '@/app/lib/productLike'
import { CATEGORY_GROUPS } from '../lib/categoryGroup'
import { DiscountPriceFormat, DiscountRateFormat } from '@/utils/intl'

interface Props {
  order: ProductLikeWithProduct
  onRemove: (id: string) => void
}
//
export default function WishListItemCard({ order, onRemove }: Props) {
  const product = order.products
  const categoryName = product.product_categories[0]?.categories.name ?? ''

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
        className="relative flex flex-col transition-transform duration-400 hover:scale-105"
      >
        {product.discount_rate > 0 && (
          <div className="absolute top-0 left-0 bg-red-500 px-2 py-1 text-sm font-bold text-white">
            {product.discount_rate}%
          </div>
        )}

        <Image
          width={282}
          height={282}
          className="object-fill"
          src={product.thumbnail_image}
          alt=""
        />
      </Link>
      <div className="flex flex-col pt-4">
        <p className="text-sm text-gray-400">
          {product.product_categories[0]?.categories.name}
        </p>
        <div className="flex justify-between">
          <p className="w-50 self-center truncate font-bold">{product.name}</p>
          <LikeToggleButton id={order.id} onRemove={onRemove} />
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
