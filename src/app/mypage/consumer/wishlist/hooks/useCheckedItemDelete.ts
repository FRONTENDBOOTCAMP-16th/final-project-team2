import { createClient } from '@/utils/supabase/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const supabase = createClient()

export const useCheckedItemDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (productIds: string[]) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error()

      await supabase
        .from('product_likes')
        .delete()
        .in('product_id', productIds)
        .eq('user_id', user.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes'],
      })
    },
  })
}
