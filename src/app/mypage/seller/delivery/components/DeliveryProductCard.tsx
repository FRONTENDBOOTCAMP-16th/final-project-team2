import OrderStatusBadge from '@/app/mypage/consumer/orders/components/OrderStatusBadge'
import { OrderItem } from '@/app/mypage/types/orderItem'
import DeliverStatusButton from './DeliveryStatusButton'
import { TotalPriceFormat } from '@/utils/intl'

export default function DeliveryProductCard({ order }: { order: OrderItem }) {
  const emailPrefix = order.email?.split('@')[0]

  return (
    <div className="mb-2 flex gap-5 border-b border-gray-300 p-4 font-semibold">
      <div className="flex w-1/10 shrink-0">
        <p className="w-32 leading-snug break-all">{order.invoice_number}</p>
      </div>
      <div className="flex w-3/10 shrink-0 justify-center truncate">
        <span>{order.products.name}</span>
      </div>

      <div className="flex w-1/10 shrink-0">
        <p>{emailPrefix}</p>
      </div>

      <div className="flex w-1/10 shrink-0 text-center whitespace-nowrap">
        <p>
          {TotalPriceFormat(
            order.unit_price,
            order.products.discount_rate,
            order.quantity,
          )}
          원
        </p>
      </div>

      <div className="flex w-1/10 shrink-0 justify-center text-center">
        <p>{order.quantity}개</p>
      </div>

      <div className="flex w-3/10 shrink-0 gap-3">
        <OrderStatusBadge status={order.item_status} />
        <DeliverStatusButton
          orderItemId={order.id}
          currentStatus={order.item_status}
          orderId={order.orders.id}
        />
      </div>
    </div>
  )
}
