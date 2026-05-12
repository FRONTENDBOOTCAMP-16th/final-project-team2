import { createClient } from '@/utils/supabase/client'
import type { BoardCard } from '@/types/boards'

export interface NoticeResponse {
  normalData: BoardCard[]
  normalCount: number
}

export const getInquires = async (pages: number): Promise<NoticeResponse> => {
  const ITEMS_PER_PAGE = 10
  const supabase = createClient()

  const { count: totalCount, error: countError } = await supabase
    .from('qnas')
    .select('*', { count: 'exact', head: true })

  if (countError) throw new Error(countError.message)

  const normalCount = totalCount || 0
  const totalPages = Math.max(1, Math.ceil(normalCount / ITEMS_PER_PAGE))
  const safePage = Math.max(1, Math.min(pages, totalPages))
  const from = (safePage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const { data, error } = await supabase
    .from('qnas')
    .select(
      `
      *,
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
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) throw new Error(error.message)

  return {
    normalData: (data as unknown as BoardCard[]) || [],
    normalCount: normalCount, // 미리 구해둔 총 개수를 반환
  }
}
