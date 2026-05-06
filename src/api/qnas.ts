import { createClient } from '../../utils/supabase/client'
import type { BoardCard } from '@/types/notice'

export interface NoticeResponse {
  normalData: BoardCard[]
  normalCount: number
}

export const getQnas = async (pages: number): Promise<NoticeResponse> => {
  const ITEMS_PER_PAGE = 10
  const supabase = createClient()

  const from = (pages - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const [normalResult] = await Promise.all([
    supabase
      .from('notices')
      .select('*, users (nickname)', { count: 'exact' })
      .eq('important', false)
      .order('created_at', { ascending: false })
      .range(from, to)
  ])

  if (normalResult.error) throw new Error(normalResult.error.message)

  return {
    normalData: (normalResult.data as unknown as BoardCard[]) || [],
    normalCount: normalResult.count || 0
  }
}