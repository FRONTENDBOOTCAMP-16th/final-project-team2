import { statusLabel } from "@/data/statusLabel";
import { OrderItemStatus } from "../lib/orderItemStatus";

export default function OrderStatusBadge({
  status,
}: {
  status: OrderItemStatus;
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
