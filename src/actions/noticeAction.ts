'use server'

import { redirect } from 'next/navigation'
import { revalidateTag, cacheTag } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/utils/supabase/server'
import { createStaticClient } from '@/utils/supabase/static'
import type { BoardCard, NoticeResponse, FormState } from '@/types/boards'
import checkAdmin from '@/actions/checkAdminAction'

// 신규 zod 스키마
const NoticeFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: '제목을 입력해주세요.' })
    .max(100, { message: '제목은 100자 이내로 작성해주세요.' }),
  content: z
    .string()
    .trim()
    .min(1, { message: '내용을 입력해주세요.' }),
  // 체크박스는 체크 시 'on', 미체크 시 undefined로 넘어옵니다.
  // undefined로 하면 없음으로 false로 처리.
  important: z
    .preprocess((val) => val === 'on', z.boolean()),
  updateId: z.string().nullable().optional(),
})

/**
 * 공지사항 조회 액션 (Static Action)
 * 
 * @param pages 조회하는 페이지 (?page= number)
 * @returns data 배열로 조회결과 생성, 필독 / 일반 공지사항
 */
export const getNotices = async (pages: number): Promise<NoticeResponse> => {

  // revalidate (주기적 갱신)
  // ISR (Incremental Static Regeneration) 점진적으로 시간이거나, 뭘할때 재생성해주는 전략.
  'use cache'
  cacheTag('notice')


  // env에 환경설정이랑, 캐시(정적)환경용 supabase 선언
  const ITEMS_PER_PAGE = Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE) || 10
  const supabase = await createStaticClient()

  const { count: totalCount, error: countError } = await supabase
    .from('notices')
    .select('*', { count: 'exact', head: true })
    .eq('important', false)
  if (countError) throw new Error(countError.message)

  // 페이지네이션 로직 (유효하지 않은 페이지 접근 방지)
  const normalCount = totalCount || 0
  const totalPages = Math.max(1, Math.ceil(normalCount / ITEMS_PER_PAGE))
  const safePage = Math.max(1, Math.min(pages, totalPages))
  const from = (safePage - 1) * ITEMS_PER_PAGE
  const to = from + ITEMS_PER_PAGE - 1


  // 중요한것과 일반 공지사항은 따로 분리
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
      .range(from, to)
  ])

  // 조회 중 에러 발생 시 예외 처리
  if (importantResult.error) throw new Error(importantResult.error.message)
  if (normalResult.error) throw new Error(normalResult.error.message)

  return {
    importantData: (importantResult.data as unknown as BoardCard[]) || [],
    normalData: (normalResult.data as unknown as BoardCard[]) || [],
    normalCount: normalCount
  }
}

/**
 * 공지사항 생성/수정/삭제 액션 (Server Action)
 * 클라이언트 폼(useActionState)에서 호출되는 폼 제출 핸들러입니다.
 * 
 * @param prevState 이전 폼 상태 (useActionState 연동용)
 * @param formData 클라이언트에서 제출된 폼 데이터
 * @returns 폼 제출 결과 (성공 여부 및 메시지)
 */
export async function handleNoticeAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  // 관리자 입증에 실패하면 작동 취소 후 공지사항으로 되돌아가기
  await checkAdmin('/notice')

  // supabase 리셋, 글쓴이 검증을 위한 회원 찾기 로직
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 오류가 났을때 대응.
  if (!user) return { success: false, message: '세션이 만료되었습니다.' }

  // 수정이냐 삭제 요청이냐 get으로 받아온다.
  // FormData를 일반 객체로 변환
  const rawData = Object.fromEntries(formData.entries())
  const deleteId = rawData.deleteId as string | undefined

  try {
    // 삭제 로직 (삭제는 ID만 있으면 되므로 우선 처리, 향후에 is_delete로 업데이트 해서 유지보수 기능 추가 예정)
    if (deleteId) {
      // 공지 삭제 쿼리문
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', deleteId)
        .eq('writer_id', user.id)
      if (error) throw error
    } else {
      const validatedFields = NoticeFormSchema.safeParse(rawData)

      if (!validatedFields.success) {
        return {
          success: false,
          message: validatedFields.error.issues[0].message
        }
      }

      // 검증이 완료된 안전한 데이터 추출
      const { title, content, important, updateId } = validatedFields.data

      if (updateId) {
        // 공지사항 수정
        const { error } = await supabase
          .from('notices')
          .update({ title, content, important })
          .eq('id', updateId)
          .eq('writer_id', user.id)
        if (error) throw error
      } else {
        // 새 공지사항 작성
        const { error } = await supabase
          .from('notices')
          .insert({ title, content, important, writer_id: user.id })
        if (error) throw error
      }
    }

    revalidateTag('notice', { expire: 3600 })

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '등록 중 알 수 없는 오류가 발생했습니다.'
    return { success: false, message: errorMessage }
  }

  redirect('/notice')
}

/**
 * 공지사항 상세 조회 액션 (Server Action)
 * 
 * @param id 상세 조회할 게시물 아이디 (/notice/id)
 * @returns data 배열로 조회결과 생성
 */
export const getNoticeDetail = async (id: string): Promise<BoardCard> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}