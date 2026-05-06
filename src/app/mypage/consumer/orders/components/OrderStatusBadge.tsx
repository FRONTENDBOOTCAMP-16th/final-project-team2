import { statusLabel } from "@/data/statusLabel";
import { OrderItem } from "@/app/mypage/types/orderItem";

export default function OrderStatusBadge({
  status,
}: {
  status: OrderItem["itemStatus"];
}) {
  const config = statusLabel[status];

  return (
    <span
      className={`inline-flex items-center justify-center w-20 h-10 rounded text-sm  ${config.color}`}
    >
      {config.label}
    </span>
  );
}
