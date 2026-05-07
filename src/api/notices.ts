import { createClient } from '../../utils/supabase/client'
import type { BoardCard } from '@/types/boards'
import { cacheTag } from 'next/cache'

export interface NoticeResponse {
  importantData: BoardCard[]
  normalData: BoardCard[]
  normalCount: number
}

export const getNotices = async (pages: number): Promise<NoticeResponse> => {
  'use cache';
  cacheTag('notices');

  const ITEMS_PER_PAGE = 10
  const supabase = createClient()

  // 1. 방어로직: 데이터의 전체 개수만 먼저 빠르게 가져옵니다 (head: true 옵션으로 네트워크 비용 최소화)
  const { count: totalCount, error: countError } = await supabase
    .from('notices')
    .select('*', { count: 'exact', head: true })
    .eq('important', false)

  if (countError) throw new Error(countError.message)

  const normalCount = totalCount || 0
  const totalPages = Math.max(1, Math.ceil(normalCount / ITEMS_PER_PAGE))

  // 2. 요청받은 페이지 번호를 유효한 범위 내로 보정합니다 (최소 1, 최대 totalPages)
  const safePage = Math.max(1, Math.min(pages, totalPages))

  // 보정된 안전한 페이지 번호로 범위를 계산합니다.
  const from = (safePage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  // 3. 실제 데이터 패칭
  const [importantResult, normalResult] = await Promise.all([
    supabase
      .from('notices')
      .select('*, writer:writer_id (nickname)')
      .eq('important', true)
      .order('created_at', { ascending: false }),
    supabase
      .from('notices')
      // 💡 포인트: count는 위에서 이미 구했으므로 여기서는 제거하여 성능을 높입니다.
      .select('*, writer:writer_id (nickname)')
      .eq('important', false)
      .order('created_at', { ascending: false })
      .range(from, to) // 이제 범위를 초과할 일이 절대 없습니다!
  ])

  if (importantResult.error) throw new Error(importantResult.error.message)
  if (normalResult.error) throw new Error(normalResult.error.message)

  return {
    importantData: (importantResult.data as unknown as BoardCard[]) || [],
    normalData: (normalResult.data as unknown as BoardCard[]) || [],
    normalCount: normalCount // 미리 구해둔 총 개수를 반환합니다.
  }
}