import { createClient } from '../../utils/supabase/client'
import type { BoardCard } from '@/types/notice'

export interface NoticeResponse {
  importantData: BoardCard[]
  normalData: BoardCard[]
  normalCount: number
}

export const getNotices = async (pages: number): Promise<NoticeResponse> => {
  const ITEMS_PER_PAGE = 10
  const supabase = createClient()

  const from = (pages - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const [importantResult, normalResult] = await Promise.all([
    supabase
      .from('notices')
      .select('*, users (nickname)')
      .eq('important', true)
      .order('created_at', { ascending: false }),
    supabase
      .from('notices')
      .select('*, users (nickname)', { count: 'exact' })
      .eq('important', false)
      .order('created_at', { ascending: false })
      .range(from, to)
  ])

  if (importantResult.error) throw new Error(importantResult.error.message)
  if (normalResult.error) throw new Error(normalResult.error.message)

  return {
    importantData: (importantResult.data as unknown as BoardCard[]) || [],
    normalData: (normalResult.data as unknown as BoardCard[]) || [],
    normalCount: normalResult.count || 0
  }
}