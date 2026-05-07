import { createClient } from '../../utils/supabase/client'
import type { BoardCard } from '@/types/boards'

export interface NoticeResponse {
  normalData: BoardCard[]
  normalCount: number
}

export const getInquires = async (pages: number): Promise<NoticeResponse> => {
  const ITEMS_PER_PAGE = 10
  const supabase = createClient()

  // 1. 방어로직: qnas 테이블의 전체 데이터 개수만 먼저 빠르게 조회 (head: true)
  const { count: totalCount, error: countError } = await supabase
    .from('qnas')
    .select('*', { count: 'exact', head: true })

  if (countError) throw new Error(countError.message)

  const normalCount = totalCount || 0
  const totalPages = Math.max(1, Math.ceil(normalCount / ITEMS_PER_PAGE))

  // 2. 요청받은 페이지 번호를 유효한 범위 내로 보정 (최소 1, 최대 totalPages)
  const safePage = Math.max(1, Math.min(pages, totalPages))

  // 보정된 안전한 페이지 번호로 범위 계산
  const from = (safePage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  // 3. 실제 데이터 패칭 (보정된 from, to 사용)
  const { data, error } = await supabase
    .from('qnas')
    // 이미 전체 개수를 구했으므로 { count: 'exact' }는 제거하여 성능 최적화
    .select(`
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
    `)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) throw new Error(error.message)

  return {
    normalData: (data as unknown as BoardCard[]) || [],
    normalCount: normalCount // 미리 구해둔 총 개수를 반환
  }
}