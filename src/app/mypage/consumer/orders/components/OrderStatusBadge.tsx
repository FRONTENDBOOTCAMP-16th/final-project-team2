import { statusLabel } from '@/data/statusLabel'
import { OrderItemStatus } from '../lib/orderItemStatus'

export default function OrderStatusBadge({
  status,
}: {
  status: OrderItemStatus
}) {
  const config = statusLabel[status]

  return (
    <span
      className={`inline-flex h-10 w-20 items-center justify-center rounded text-sm ${config.color}`}
    >
      {config.label}
    </span>
  )
}
