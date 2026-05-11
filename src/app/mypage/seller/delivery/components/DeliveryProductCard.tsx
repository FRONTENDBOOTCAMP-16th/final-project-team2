import OrderStatusBadge from "@/app/mypage/consumer/orders/components/OrderStatusBadge";
import { OrderItem } from "@/app/mypage/types/orderItem";
import DeliverStatusButton from "./DeliveryStatusButton";

export default function DeliveryProductCard({ order }: { order: OrderItem }) {
  return (
    <div className="flex font-semibold p-4 mb-2 border-b border-gray-300 gap-8 ">
      {/* 주문번호 */}
      <div className="flex w-1/9 text-center truncate">
        <h2>{order.order_id}</h2>
      </div>

      <div className="flex w-3/9">
        <h2>{order.products.name}</h2>
      </div>
      {/* 주문자 */}
      <div className="flex w-1/9 ">
        <p>{order.orders.user_id}</p>
      </div>

      {/* 가격 */}
      <div className="flex w-1/9 text-center justify-center items-center">
        <p>{order.unit_price.toLocaleString()}원</p>
      </div>

      {/* 주문 수량 */}
      <div className="flex text-center justify-center  w-1/9">
        <p>{order.quantity}개</p>
      </div>
      {/* 상태 */}
      <div className="flex w-2/9 gap-2">
        <OrderStatusBadge status={order.item_status} />
        <DeliverStatusButton />
      </div>
    </div>
  );
}
