import { statusLabel } from '@/data/statusLabel'
import { ChangeEvent } from 'react'

const STATUS_LIST = Object.keys(statusLabel) as Array<keyof typeof statusLabel>

interface Props {
  value: string
  statusChange: (status: string) => void
}

export default function OrderStatusFilter({ value, statusChange }: Props) {
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    statusChange(e.target.value)
  }

  return (
    <div className="mb-3 flex flex-row justify-end gap-2 md:justify-center md:px-2 md:py-5">
      <div className="flex items-center gap-2">
        <label
          htmlFor="order-status-filter"
          className="shrink-0 text-sm font-medium text-gray-500"
        >
          배송 상태:
        </label>
        <select
          name="order-status-filter"
          id="order-status-filter"
          onChange={handleStatusChange}
          value={value}
          className="cursor-pointer border-none bg-transparent text-sm font-medium focus:ring-0"
        >
          <option value="all">전체 상태</option>
          {STATUS_LIST.map((status) => (
            <option key={status} value={status}>
              {statusLabel[status].label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
