'use client'

import { OrderItem } from '@/app/mypage/types/orderItem'
import { useState } from 'react'
import { useDeliveryStatus } from '../hooks/useDeliveryStatus'
import { statusLabel } from '@/data/statusLabel'

const STATUS_OPTIONS: OrderItem['item_status'][] = [
  'PENDING',
  'PAID',
  'SHIPPED',
  'DELIVERED',
  'CANCELED',
]

type Props = {
  orderItemId: string
  currentStatus: OrderItem['item_status']
  orderId: string
}

export default function DeliverStatusButton({
  orderItemId,
  currentStatus,
  orderId,
}: Props) {
  const [isClose, setIsOpen] = useState(false)
  const { mutate } = useDeliveryStatus()
  const handleStatusChange = (status: OrderItem['item_status']) => {
    mutate({ orderItemId, status, orderId })
    setIsOpen(false)
  }

  const filteredStatus = STATUS_OPTIONS.filter(
    (status) => status !== currentStatus,
  )

  return (
    <div className="flex flex-col pr-3">
      <button
        onClick={() => setIsOpen(!isClose)}
        aria-disabled={currentStatus === 'DELIVERED'}
        className={`${currentStatus === 'DELIVERED' ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400 hover:text-white'} mb-2 shrink-0 rounded-md border border-gray-300 px-3 py-1 font-semibold hover:bg-gray-300 hover:text-white`}
      >
        관리
      </button>
      {currentStatus !== 'DELIVERED' && isClose && (
        <ul>
          {filteredStatus.map((status) => {
            const config = statusLabel[status]
            return (
              <li key={status} className="flex flex-col gap-3">
                <button
                  type="button"
                  className={`${config.color} mb-3 cursor-pointer rounded-2xl p-2 text-center transition-all duration-200 hover:scale-[1.02]`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 14px ${config.glow}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  onClick={() => handleStatusChange(status)}
                >
                  {config.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
