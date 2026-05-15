export const statusLabel = {
  PENDING: {
    label: '배송준비중',
    color: 'text-yellow-500 bg-yellow-100',
    glow: 'rgba(234,179,8,0.35)',
  },
  PAID: {
    label: '결제 완료',
    color: 'text-pink-500 bg-pink-100',
    glow: 'rgba(236,72,153,0.35)',
  },
  SHIPPED: {
    label: '배송 중',
    color: 'text-blue-500 bg-blue-100',
    glow: 'rgba(59,130,246,0.35)',
  },
  DELIVERED: {
    label: '배송완료',
    color: 'text-green-700 bg-green-100',
    glow: 'rgba(34,197,94,0.35)',
  },
  CANCELED: {
    label: '취소됨',
    color: 'text-red-500 bg-red-100',
    glow: 'rgba(239,68,68,0.35)',
  },
}
