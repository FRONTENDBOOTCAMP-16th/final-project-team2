import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export const useToggleWishList = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      productId,
      isLiked,
    }: {
      productId: string
      isLiked: boolean
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error()

      // 찜하기 되어있는 상태에 따라서 변이시켜주기
      if (isLiked) {
        await supabase
          .from('product_likes')
          .delete()
          .eq('product_id', productId)
          .eq('user_id', user.id)
      } else {
        await supabase.from('product_likes').insert({
          product_id: productId,
          user_id: user.id,
        })
      }
    },

    //mutate 가 성공했을 때 실행되는 함수
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes'],
      })
    },
  })
}
