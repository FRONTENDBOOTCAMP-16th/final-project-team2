'use server'

import { redirect } from 'next/navigation'
import { revalidateTag, cacheTag } from 'next/cache'
import { createClient } from '../../utils/supabase/server'
import { createStaticClient } from '../../utils/supabase/static'
import type { BoardCard, FormState } from '@/types/boards'

export const getInquires = async (pages: number) => {
  'use cache'
  cacheTag('inquire')

  // env에 환경설정이랑, 캐시(정적)환경용 supabase 선언
  const ITEMS_PER_PAGE = Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE) || 10 
  const supabase = createStaticClient()

  // 우선 페이지 번호를 위해 총 개수만 검색한다.
  const { count: totalCount, error: countError } = await supabase
    .from('qnas')
    .select('*', { count: 'exact', head: true })
  if (countError) throw new Error(countError.message)

  // 페이지네이션 로직 (유효하지 않은 페이지 접근 방지)
  const normalCount = totalCount || 0
  const totalPages = Math.max(1, Math.ceil(normalCount / ITEMS_PER_PAGE))
  const safePage = Math.max(1, Math.min(pages, totalPages))
  const from = (safePage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1

  // 페이지에 맞는 목록 조회
  const { data, error } = await supabase
    .from('qnas')
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
    normalCount: normalCount
  }
}