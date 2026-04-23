import { OrderItem } from "@/types/orderItem";

export default function OrderStatusBadge({
  status,
}: {
  status: OrderItem["status"];
}) {
  const statusStyle = {
    결제대기: "text-yellow-500 bg-yellow-100",
    결제완료: "text-green-500 bg-green-100",
    배송중: "text-blue-500 bg-blue-100",
    배송완료: "text-gray-700 bg-gray-100",
    취소됨: "text-red-500 bg-red-100",
  } as const;

  return (
    <span
      className={`inline-flex items-center justify-center w-20 py-1 rounded text-sm  ${statusStyle[status]}`}
    >
      {status}
    </span>
  );
}
