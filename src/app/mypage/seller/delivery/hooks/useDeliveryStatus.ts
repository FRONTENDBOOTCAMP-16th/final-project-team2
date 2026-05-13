// 배송 상태 변경해주는 훅

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { OrderItem } from '@/app/mypage/types/orderItem'
import { updateDeliveryStatus } from '@/app/mypage/api/updateDeliveryStatus'

export const useDeliveryStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      orderItemId,
      status,
      orderId,
    }: {
      orderItemId: string
      status: OrderItem['item_status']
      orderId: string
    }) => updateDeliveryStatus(orderItemId, status, orderId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['delivery'],
        refetchType: 'all',
      })
    },
  })
}
