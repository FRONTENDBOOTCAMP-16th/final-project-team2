'use server'

import { createClient } from '@/utils/supabase/server'
import { getAuthUserInfo } from './getUser'

type ToggleWishlistParams = {
  productId: string
}

export async function toggleWishlist({ productId }: ToggleWishlistParams) {
  const auth = await getAuthUserInfo()

  if (!auth?.id) {
    throw new Error('로그인이 필요합니다.')
  }

  const supabase = await createClient()

  const { data: existingItem, error: selectError } = await supabase
    .from('wishlists')
    .select('id')
    .eq('user_id', auth.id)
    .eq('product_id', productId)
    .maybeSingle()

  if (selectError) {
    throw new Error(selectError.message)
  }

  if (existingItem) {
    const { error: deleteError } = await supabase
      .from('wishlists')
      .delete()
      .eq('id', existingItem.id)

    if (deleteError) {
      throw new Error(deleteError.message)
    }

    return { liked: false }
  }

  const { error: insertError } = await supabase.from('wishlists').insert({
    user_id: auth.id,
    product_id: productId,
  })

  if (insertError) {
    throw new Error(insertError.message)
  }

  return { liked: true }
}
