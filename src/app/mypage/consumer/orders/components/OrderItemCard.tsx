import OrderStatusBadge from './OrderStatusBadge'
import Image from 'next/image'
import Link from 'next/link'
import { OrderItemStatus } from '../lib/orderItemStatus'
import { CATEGORY_GROUPS } from '../../wishlist/lib/categoryGroup'
import { OrderItem } from '@/app/lib/orders.types'
import { DateFormat } from '@/utils/intl'

interface Props {
  order: OrderItem
  createdAt: string
  finalPrice: number
  orderStatus: string
}

export default function OrderItemCard({
  order,
  createdAt,
  finalPrice,
  orderStatus,
}: Props) {
  const categoryName = order.products.product_categories.categories.name

  const categoryId = CATEGORY_GROUPS.find((group) =>
    group.categories.includes(categoryName ?? ''),
  )?.id
  const productId = order.product_id

  return (
    <div className="border-b border-gray-300 px-3 py-3 font-semibold hover:bg-gray-100 md:h-25">
      <Link
        href={{
          pathname: `/products/${categoryId}/${productId}`,
        }}
        className="flex flex-row gap-3 md:grid md:h-24 md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center md:gap-6 md:pb-5"
      >
        <div className="flex h-full w-full min-w-0 items-center justify-center gap-4">
          <div className="aspect-square h-16 w-16 shrink-0 overflow-hidden md:h-20 md:w-20">
            <Image
              width={80}
              height={80}
              sizes="80px"
              quality={60}
              className="w-ful h-full object-cover"
              src={order.products.thumbnail_image}
              alt={`${order.products.name} 상품 이미지`}
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).src = '/fallback.png'
              }}
            />
          </div>
          <span className="min-w-0 flex-1 truncate text-sm hover:font-extrabold hover:text-red-500 md:text-base">
            {order.products.name}
          </span>
        </div>
        <div className="flex flex-col gap-3 md:contents">
          <p className="self-end text-left text-xs whitespace-nowrap tabular-nums md:self-center md:text-base">
            {DateFormat(createdAt)}
          </p>
          <p className="self-end text-left text-xs whitespace-nowrap tabular-nums md:self-center md:text-center md:text-base">
            {finalPrice.toLocaleString()}원
          </p>

          <div className="flex justify-center self-end md:self-center">
            <OrderStatusBadge status={orderStatus as OrderItemStatus} />
          </div>
        </div>
      </Link>
    </div>
  )
}
