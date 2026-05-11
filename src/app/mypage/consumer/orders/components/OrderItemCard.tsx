import OrderStatusBadge from "./OrderStatusBadge";
import Image from "next/image";
import Link from "next/link";
import { OrderItemStatus } from "../lib/orderItemStatus";
import { CATEGORY_GROUPS } from "../../wishlist/lib/categoryGroup";
import { OrderItem } from "@/app/lib/Orders";
import { DateFormat } from "../../../../../../utils/supabase/intl";

interface Props {
  order: OrderItem;
  createdAt: string;
  finalPrice: number;
  orderStatus: string;
}

export default function OrderItemCard({
  order,
  createdAt,
  finalPrice,
  orderStatus,
}: Props) {
  const categoryName = order.products.product_categories[0].categories.name;

  const categoryId = CATEGORY_GROUPS.find((group) =>
    group.categories.includes(categoryName),
  )?.id;

  const productId = order.product_id;

  return (
    <div className="flex font-semibold p-4 mb-2 border-b border-gray-300 ">
      {/* 상품 이미지 및 정보 */}
      <div className="flex w-3/6 ">
        <Link
          href={{
            pathname: `/products/${categoryId}/${productId}`,
          }}
          className="flex flex-row gap-4 shrink-0"
        >
          <Image
            width={80}
            height={80}
            className="object-fill shrink-0"
            src={order.products.thumbnail_image}
            alt=""
          />
          <h2 className="self-center truncate  hover:text-red-500 hover:font-extrabold">
            {order.products.name}
          </h2>
        </Link>
      </div>
      {/* 주문 일자 */}
      <div className="flex gap-3 w-1/6 items-center shrink-0 whitespace-nowrap">
        <p>{DateFormat(createdAt)}</p>
      </div>
      {/* 결제 금액 */}
      <div className="flex gap-3 w-1/6 items-center shrink-0 whitespace-nowrap">
        <p>{finalPrice.toLocaleString()}원</p>
      </div>
      {/* 배송 상태  */}
      <div className="flex gap-3 w-1/6 items-center shrink-0 whitespace-nowrap">
        <OrderStatusBadge status={orderStatus as OrderItemStatus} />
      </div>
    </div>
  );
}
