import { fetchDelivery } from '@/app/mypage/api/fetchDelivery'
import { useQuery } from '@tanstack/react-query'

export const useDeliveryQuery = (
  page: number,
  limit: number,
  status: string,
) => {
  return useQuery({
    queryKey: ['delivery', page, status],
    queryFn: () => fetchDelivery(page, limit, status),
    staleTime: 1000 * 60 * 5,
  })
}
