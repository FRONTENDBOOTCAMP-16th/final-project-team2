import OrderStatusBadge from './OrderStatusBadge'
import Image from 'next/image'
import Link from 'next/link'
import { OrderItemStatus } from '../lib/orderItemStatus'
import { CATEGORY_GROUPS } from '../../wishlist/lib/categoryGroup'
import { OrderItem } from '@/app/lib/orderss'
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
  const categoryName = order.products.product_categories[0].categories.name

  const categoryId = CATEGORY_GROUPS.find((group) =>
    group.categories.includes(categoryName),
  )?.id

  const productId = order.product_id

  return (
    <div className="mb-2 flex border-b border-gray-300 p-4 font-semibold">
      <div className="flex w-3/6">
        <Link
          href={{
            pathname: `/products/${categoryId}/${productId}`,
          }}
          className="flex shrink-0 flex-row gap-4"
        >
          <Image
            width={80}
            height={80}
            className="shrink-0 object-fill"
            src={order.products.thumbnail_image}
            alt=""
          />
          <h2 className="self-center truncate hover:font-extrabold hover:text-red-500">
            {order.products.name}
          </h2>
        </Link>
      </div>
      <div className="flex w-1/6 shrink-0 items-center gap-3 whitespace-nowrap">
        <p>{DateFormat(createdAt)}</p>
      </div>
      <div className="flex w-1/6 shrink-0 items-center gap-3 whitespace-nowrap">
        <p>{finalPrice.toLocaleString()}원</p>
      </div>
      {/* 배송 상태  */}
      <div className="flex w-1/6 shrink-0 items-center gap-3 whitespace-nowrap">
        <OrderStatusBadge status={orderStatus as OrderItemStatus} />
      </div>
    </div>
  )
}
