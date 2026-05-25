import OrderStatusBadge from '@/app/mypage/consumer/orders/components/OrderStatusBadge'
import { OrderItem } from '@/app/mypage/types/orderItem'
import DeliverStatusButton from './DeliveryStatusButton'
import { TotalPriceFormat } from '@/utils/intl'

export default function DeliveryProductCard({ order }: { order: OrderItem }) {
  const emailPrefix = order.email?.split('@')[0]

  return (
    <div className="overflow-x-auto">
      <div className="mb-2 grid min-w-175 grid-cols-[2fr_2fr_1fr_1fr_1fr_2fr] gap-5 border-b border-gray-300 p-4 font-semibold">
        <div>
          <p className="w-32 leading-snug break-all">{order.invoice_number}</p>
        </div>
        <div className="min-w-0 justify-center">
          <span className="block truncate">{order.products.name}</span>
        </div>

        <div>
          <p>{emailPrefix}</p>
        </div>

        <div className="text-center whitespace-nowrap">
          <p>
            {TotalPriceFormat(
              order.unit_price,
              order.products.discount_rate,
              order.quantity,
            )}
            원
          </p>
        </div>

        <div className="justify-center text-center">
          <p>{order.quantity}개</p>
        </div>

        <div className="flex gap-3 whitespace-nowrap">
          <OrderStatusBadge status={order.item_status} />
          <DeliverStatusButton
            orderItemId={order.id}
            currentStatus={order.item_status}
            orderId={order.orders.id}
          />
        </div>
      </div>
    </div>
  )
}
