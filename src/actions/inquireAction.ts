'use server'

import { redirect } from 'next/navigation'
import { revalidateTag, cacheTag } from 'next/cache'
import { createClient } from '../../utils/supabase/server'
import { createStaticClient } from '../../utils/supabase/static'
import type { BoardCard, FormState } from '@/types/boards'
import checkAdmin from '@/actions/checkAdminAction'

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

export async function handleInquireAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 오류가 났을때 대응.
  if (!user) return { success: false, message: '세션이 만료되었습니다.' }

  // 수정이냐 삭제 요청이냐 get으로 받아온다.
  const deleteId = formData.get('deleteId') as string
  const updateId = formData.get('updateId') as string

  // 1:1의 경우 관리자만 삭제할 수 있어야한다.
  // 그러므로 checkAdmin으로 방어.
  try {
    if (deleteId) {

      await checkAdmin('/inquire')

      // 공지사항 삭제 쿼리문
      const { error } = await supabase
        .from('qna')
        .delete()
        .eq('id', deleteId)
      if (error) throw error

    } else {

      // 수정이라면 수정된 내용 제목, 필수사항, 내용
      const title = formData.get('title') as string
      const content = formData.get('content') as string
      const isImportant = formData.get('important') === 'on'

      // 유효성 검사 (제목 필수)
      if (!title?.trim()) return { success: false, message: '제목을 입력해주세요.' }

      if (updateId) {
        // 업데이트 수정
        const { error } = await supabase
          .from('qnas')
          .update({ title, content, important: isImportant })
          .eq('id', updateId)
        if (error) throw error
      } else {
        // 아무것도 없다면 새 질문글 작성
        const { error } = await supabase
          .from('qnas')
          .insert({ title, content, important: isImportant, writer_id: user.id })
        if (error) throw error
      }
    }

    revalidateTag('inquire')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.'
    return { 
      success: false, 
      message: errorMessage 
    }
  }

  redirect('/inquire')
}

export const getInquireDetail = async (id: string): Promise<BoardCard> => {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('qnas')
    .select(`*,
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
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}