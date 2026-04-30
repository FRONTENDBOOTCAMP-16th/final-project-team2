import { OrderItem } from "@/app/mypage/types/orderItem";
import OrderItemCard from "./OrderItemCard";
import OrderItemHeader from "./OrderListHeader";

// 마이페이지에서는 3개 정도 주문 내역 보여주고
// 주문 내역 클릭 시 전부 다 보여주기

export default function OrderList({ orders }: { orders: OrderItem[] }) {
  return (
    <>
      <OrderItemHeader />
      <ul className="px-5 py-5">
        {orders.map((order) => (
          <li key={order.id}>
            <OrderItemCard order={order} />
          </li>
        ))}
      </ul>
    </>
  );
}
