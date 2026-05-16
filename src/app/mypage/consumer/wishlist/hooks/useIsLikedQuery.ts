import { fetchIsLiked } from '@/app/mypage/api/fetchLikes'
import { useQuery } from '@tanstack/react-query'

export const useIsLikedQuery = (productId: string) => {
  return useQuery({
    queryKey: ['likes', productId],
    queryFn: () => fetchIsLiked(productId),
  })
}
