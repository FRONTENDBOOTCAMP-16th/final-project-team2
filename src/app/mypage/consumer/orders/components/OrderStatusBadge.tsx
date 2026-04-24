import { statusLabel } from "@/data/statusLabel";
import { OrderItem } from "@/types/orderItem";


export default function OrderStatusBadge({
  status
}: {
  status: OrderItem["status"];
}) {
  const config = statusLabel[status];

  return (
    <span
      className={`inline-flex items-center justify-center w-20 py-1 rounded text-sm  ${config.color}`}
    >
      {config.label}
    </span>
  );
}
