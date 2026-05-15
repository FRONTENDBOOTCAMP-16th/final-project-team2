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
    <div className="h-25 border-b border-gray-300 px-3 py-3 font-semibold hover:bg-gray-100">
      <Link
        href={{
          pathname: `/products/${categoryId}/${productId}`,
        }}
        className="grid h-24 grid-cols-[2fr_1fr_1fr_1fr] items-center gap-6 pb-5"
      >
        <div className="flex items-center gap-4">
          <Image
            width={80}
            height={80}
            className="shrink-0 object-cover"
            src={order.products.thumbnail_image}
            alt=""
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = '/fallback.png'
            }}
          />
          <h2 className="min-w-0 truncate hover:font-extrabold hover:text-red-500">
            {order.products.name}
          </h2>
        </div>
        <p className="text-left whitespace-nowrap tabular-nums">
          {DateFormat(createdAt)}
        </p>
        <p className="text-center whitespace-nowrap tabular-nums">
          {finalPrice.toLocaleString()}원
        </p>
        <div className="flex justify-center">
          <OrderStatusBadge status={orderStatus as OrderItemStatus} />
        </div>
      </Link>
    </div>
  )
}
