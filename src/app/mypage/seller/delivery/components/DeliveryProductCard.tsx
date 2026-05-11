import OrderStatusBadge from "@/app/mypage/consumer/orders/components/OrderStatusBadge";
import { OrderItem } from "@/app/mypage/types/orderItem";
import DeliverStatusButton from "./DeliveryStatusButton";
import { TotalPriceFormat } from "../../../../../../utils/supabase/intl";

export default function DeliveryProductCard({ order }: { order: OrderItem }) {
  const emailPrefix = order.email?.split("@")[0];
  console.log(order.unit_price, order.products.discount_rate);
  return (
    <div className="flex font-semibold p-4 mb-2 border-b border-gray-300 gap-5 ">
      <div className="flex w-1/10 shrink-0">
        <h2>{order.order_id.slice(-8)}</h2>
      </div>
      <div className="flex w-3/10  truncate shrink-0 justify-center ">
        <h2>{order.products.name}</h2>
      </div>

      <div className="flex w-1/10  shrink-0">
        <p>{emailPrefix}</p>
      </div>

      <div className="flex w-1/10 text-center whitespace-nowrap shrink-0">
        <p>
          {TotalPriceFormat(
            order.unit_price,
            order.products.discount_rate,
            order.quantity,
          )}
          원
        </p>
      </div>

      <div className="flex text-center justify-center  w-1/10 shrink-0">
        <p>{order.quantity}개</p>
      </div>

      <div className="flex w-3/10 gap-3 shrink-0">
        <OrderStatusBadge status={order.item_status} />
        <DeliverStatusButton />
      </div>
    </div>
  );
}
