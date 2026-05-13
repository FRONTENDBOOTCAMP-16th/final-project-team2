import { fetchDelivery } from '@/app/mypage/api/fetchDelivery'
import { useQuery } from '@tanstack/react-query'

export const useDeliveryQuery = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['delivery', page, limit],
    queryFn: () => fetchDelivery(page, limit),
  })
}
