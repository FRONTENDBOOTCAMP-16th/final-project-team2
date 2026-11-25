import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'

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
      if (!user) throw new Error('로그인이 필요합니다.')

      // 찜하기 되어있는 상태에 따라서 변이시켜주기
      const { error } = isLiked
        ? await supabase
            .from('product_likes')
            .delete()
            .eq('product_id', productId)
            .eq('user_id', user.id)
        : await supabase.from('product_likes').insert({
            product_id: productId,
            user_id: user.id,
          })

      if (error) throw error
    },

    // 찜하기 버튼 성공 처리
    onSuccess: (_data, { isLiked }) => {
      toast(
        isLiked ? '찜한 상품을 해제하였습니다.' : '찜한 상품을 추가하였습니다.',
      )
    },
    // 찜하기 버튼 실패 처리
    onError: () => {
      toast('찜 처리에 실패했습니다. 다시 시도해 주세요.')
    },

    // 찜하기 버튼 캐시 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
  })
}
