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
  const [isOpen, setIsOpen] = useState(false)
  const { mutate } = useDeliveryStatus()
  const handleStatusChange = (status: OrderItem['item_status']) => {
    mutate({ orderItemId, status, orderId })
    setIsOpen(false)
  }

  const filteredStatus = STATUS_OPTIONS.filter(
    (status) => status !== currentStatus,
  )

  return (
    <div className="relative flex flex-col pr-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-disabled={currentStatus === 'DELIVERED'}
        className={`${currentStatus === 'DELIVERED' ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400 hover:text-white'} shrink-0 rounded-md border border-gray-300 px-3 py-1 font-semibold hover:bg-gray-300 hover:text-white`}
      >
        관리
      </button>
      {currentStatus !== 'DELIVERED' && isOpen && (
        <ul className="absolute top-full -left-5 z-10 w-25 rounded-2xl bg-white/70 p-2 shadow-xl backdrop-blur-md">
          {filteredStatus.map((status) => {
            const config = statusLabel[status]
            return (
              <li key={status} className="flex flex-col items-center">
                <button
                  type="button"
                  className={`${config.color} mt-3 w-20 cursor-pointer rounded-2xl p-2 text-center whitespace-nowrap transition-all duration-200 hover:scale-[1.02]`}
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
