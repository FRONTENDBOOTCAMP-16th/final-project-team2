<<<<<<< HEAD
import { createClient } from '../../utils/supabase/client';
import type { BoardCard } from '@/types/boards';
import { cacheTag } from 'next/cache';
=======
import { createClient } from '@/utils/supabase/client'
import type { BoardCard } from '@/types/boards'
import { cacheTag } from 'next/cache'
>>>>>>> 8f082f3 (refactoy: utils 파일 이동)

export interface NoticeResponse {
  importantData: BoardCard[]
  normalData: BoardCard[]
  normalCount: number
}

export const getNotices = async (pages: number): Promise<NoticeResponse> => {
  // 'use cache';
  cacheTag('notices')

  const ITEMS_PER_PAGE = 10
  const supabase = createClient()

  const { count: totalCount, error: countError } = await supabase
    .from('notices')
    .select('*', { count: 'exact', head: true })
    .eq('important', false)

  if (countError) throw new Error(countError.message)

  const normalCount = totalCount || 0
  const totalPages = Math.max(1, Math.ceil(normalCount / ITEMS_PER_PAGE))

  const safePage = Math.max(1, Math.min(pages, totalPages))

  const from = (safePage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  const [importantResult, normalResult] = await Promise.all([
    supabase
      .from('notices')
      .select('*, writer:writer_id (nickname)')
      .eq('important', true)
      .order('created_at', { ascending: false }),
    supabase
      .from('notices')
      .select('*, writer:writer_id (nickname)')
      .eq('important', false)
      .order('created_at', { ascending: false })
      .range(from, to),
  ])

  if (importantResult.error) throw new Error(importantResult.error.message)
  if (normalResult.error) throw new Error(normalResult.error.message)

  return {
    importantData: (importantResult.data as unknown as BoardCard[]) || [],
    normalData: (normalResult.data as unknown as BoardCard[]) || [],
    normalCount: normalCount,
  }
}
