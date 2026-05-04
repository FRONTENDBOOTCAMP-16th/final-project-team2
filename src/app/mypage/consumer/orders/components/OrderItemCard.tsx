import { OrderItem } from "@/app/mypage/types/orderItem";
import OrderStatusBadge from "./OrderStatusBadge";
import Image from "next/image";
import Link from "next/link";

export default function OrderItemCard({ order }: { order: OrderItem }) {
  return (
<<<<<<< HEAD
    <div className="flex  font-semibold  p-4 mb-2 border-b border-gray-300 ">
=======
    <div className="flex font-semibold p-4 mb-2 border-b border-gray-300 ">
>>>>>>> dev
      {/* 상품 이미지 및 정보 */}
      <div className="flex w-3/6 ">
        <Link
          href={`/products/pen/${order.id}`}
          className="flex flex-row gap-4"
        >
          <Image
            width={80}
            height={80}
            className="object-fill"
            src={order.image}
            alt=""
          />
          <h2 className="self-center">{order.name}</h2>
        </Link>
      </div>
      {/* 주문 일자 */}
      <div className="flex gap-3 w-1/6">
        <p>{order.orderDate}</p>
      </div>
      {/* 결제 금액 */}
      <div className="flex gap-3 w-1/6">
        <p>{order.unitPrice.toLocaleString()}원</p>
      </div>
      {/* 배송 상태  */}
      <div className="flex gap-3 w-1/6">
        <OrderStatusBadge status={order.itemStatus} />
      </div>
    </div>
  );
}
