import OrderStatusBadge from '@/app/mypage/consumer/orders/components/OrderStatusBadge'
import { OrderItem } from '@/app/mypage/types/orderItem'
import DeliverStatusButton from './DeliveryStatusButton'
import { TotalPriceFormat } from '@/utils/intl'

export default function DeliveryProductCard({ order }: { order: OrderItem }) {
  const emailPrefix = order.email?.split('@')[0]

  return (
    <>
      {/* 모바일 */}
      <div className="flex flex-col gap-2 border-b border-gray-300 p-4 font-semibold lg:hidden">
        <p>
          <span className="text-gray-500">주문 번호: </span>
          {order.invoice_number}
        </p>
        <p className="truncate">
          <span className="text-gray-500">상품명: </span>
          {order.products.name}
        </p>
        <p>
          <span className="text-gray-500">주문자: </span>
          {emailPrefix}
        </p>
        <p>
          <span className="text-gray-500">결제 금액: </span>
          {TotalPriceFormat(
            order.unit_price,
            order.products.discount_rate,
            order.quantity,
          )}
          원
        </p>
        <p>
          <span className="text-gray-500">수량: </span>
          {order.quantity}개
        </p>
        <div className="flex gap-3">
          <OrderStatusBadge status={order.item_status} />
          <DeliverStatusButton
            orderItemId={order.id}
            currentStatus={order.item_status}
            orderId={order.orders.id}
          />
        </div>
      </div>

      {/* 데스크탑 */}
      <div className="hidden grid-cols-[2fr_2fr_1fr_1fr_1fr_2fr] gap-5 border-b border-gray-300 p-4 font-semibold lg:grid">
        <p className="min-w-0">{order.invoice_number}</p>
        <p className="min-w-0 truncate">{order.products.name}</p>
        <p className="min-w-0">{emailPrefix}</p>
        <p className="min-w-0 text-center whitespace-nowrap">
          {TotalPriceFormat(
            order.unit_price,
            order.products.discount_rate,
            order.quantity,
          )}
          원
        </p>
        <p className="min-w-0 text-center">{order.quantity}개</p>
        <div className="flex gap-3 whitespace-nowrap">
          <OrderStatusBadge status={order.item_status} />
          <DeliverStatusButton
            orderItemId={order.id}
            currentStatus={order.item_status}
            orderId={order.orders.id}
          />
        </div>
      </div>
    </>
  )
}
