import OrderStatusBadge from '@/app/mypage/consumer/orders/components/OrderStatusBadge'
import { OrderItem } from '@/app/mypage/types/orderItem'
import DeliverStatusButton from './DeliveryStatusButton'

export default function DeliveryProductCard({ order }: { order: OrderItem }) {
  return (
    <div className="mb-2 flex gap-8 border-b border-gray-300 p-4 font-semibold">
      {/* 주문번호 */}
      <div className="flex w-1/9 text-center">
        <h2>{order.orderId}</h2>
      </div>

      <div className="flex w-3/9">
        <h2>{order.name}</h2>
      </div>
      {/* 주문자 */}
      <div className="flex w-1/9">
        <p>{order.userId}</p>
      </div>

      {/* 가격 */}
      <div className="flex w-1/9 items-center justify-center text-center">
        <p>
          {(order.unitPrice * (1 - order.discountRate / 100)).toLocaleString()}
          원
        </p>
      </div>

      {/* 주문 수량 */}
      <div className="flex w-1/9 justify-center text-center">
        <p>{order.quantity}개</p>
      </div>
      {/* 상태 */}
      <div className="flex w-2/9 gap-2">
        <OrderStatusBadge status={order.itemStatus} />
        <DeliverStatusButton />
      </div>
    </div>
  )
}
