import { createClient } from '@/utils/supabase/server'
import type { BoardCard } from '@/types/boards'

export const getInquireDetail = async (id: string): Promise<BoardCard> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('qnas')
    .select(
      `*,
      writer:writer_id (
        id,
        nickname,
        profile_image
      ),
      product:product_id (
        id,
        name,
        thumbnail_image,
        price
      )
      `,
    )
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
