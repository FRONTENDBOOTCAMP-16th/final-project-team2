'use server'

import { redirect } from 'next/navigation'
import { revalidateTag, cacheTag } from 'next/cache'
import { createClient } from '../../utils/supabase/server'
import { createStaticClient } from '../../utils/supabase/static'
import {z} from 'zod'
import type { BoardCard, FormState } from '@/types/boards'
import checkAdmin from '@/actions/checkAdminAction'

/**
 * Zod 스키마 정의
 */

// 작성 시 조드 검증
const InquireFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: '제목을 입력해주세요.' })
    .max(100, { message: '제목은 100자 이내로 작성해주세요.' }),
  content: z
    .string()
    .trim()
    .min(1, { message: '질문 내용을 입력해주세요.' }),
  product: z.string().nullable().optional(), // 상품 ID는 없을 수도 있음
  updateId: z.string().nullable().optional(),
})

// 답변시 조드 검증
const InquireReplySchema = z.object({
  replyId: z
    .string()
    .trim()
    .min(1, { message: '잘못된 접근입니다. (답변할 질문 ID 누락)' }),
  content: z
    .string()
    .trim()
    .min(1, { message: '답변 내용을 입력해주세요.' }),
})


/**
 * 게시판에서의 조회 액션 (Static Action)
 * 
 * @param pages 조회하는 페이지 (?page= number)
 * @returns data 배열로 조회결과 생성, 필독 / 일반 공지사항
 */
export const getInquires = async (pages: number) => {

  'use cache'
  cacheTag('inquire')

  // 페이지 당 게시물은 env로 제어하므로 이렇게 합니다.
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

/**
 * CRUD 액션 (Static Action)
 * 
 * 답변 기능은 UPDATE로 되니, 이 부분은 추후에 추가할 예정
 */
export async function handleInquireAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 오류가 났을때 대응.
  if (!user) return { success: false, message: '세션이 만료되었습니다.' }

  const rawData = Object.fromEntries(formData.entries())
  const deleteId = rawData.deleteId as string | undefined

  try {
    if (deleteId) {
      // 삭제 권한 검증 및 실행
      await checkAdmin('/inquire')

      // 수정 포인트 1: 테이블명 오타 수정 (qna -> qnas)
      const { error } = await supabase
        .from('qnas')
        .delete()
        .eq('id', deleteId)
      if (error) throw error

    } else {
      // zod로 데이터 검증
      const validatedFields = InquireFormSchema.safeParse(rawData)

      if (!validatedFields.success) {
        return { 
          success: false, 
          message: validatedFields.error.issues[0].message 
        }
      }

      // 조드로 검증된 데이터를 구조분해할당하기.
      const { title, content, product, updateId } = validatedFields.data

      if (updateId) {
        // 업데이트
        const { error } = await supabase
          .from('qnas')
          .update({ title, question_content: content })
          .eq('id', updateId)
        if (error) throw error
      } else {
        // 새 질문글 작성
        const { error } = await supabase
          .from('qnas')
          .insert({ 
            title, 
            question_content: content, 
            writer_id: user.id, 
            product_id: product || null 
          })
        if (error) throw error
      }
    }

    revalidateTag('inquire', { expire: 3600 })


  } catch (error: unknown) {
    console.error('오류 코드:', error)
    let errorMessage = '알 수 없는 에러가 발생했습니다.'

    if (error instanceof Error) {
      errorMessage = error.message
    } else if (error && typeof error === 'object' && 'message' in error) {
      const supaError = error as { code?: string; message: string; details?: string }
      errorMessage = supaError.code 
        ? `오류 코드: ${supaError.code}, ${supaError.message}` 
        : supaError.message
    } else {
      errorMessage = String(error)
    }

    return {
      success: false,
      message: errorMessage
    }
  }

  redirect('/inquire')
}

/**
 * 질문 답변 액션 (Static Action)
 * 
 * ID를 찾아 그에 맞는 컬럼에 작성
 * 프론트에서도 스토어나 어드민 답변자만 노출이 되지만
 * 예기치 못한 오류로 넣을 수 있으니 방어로직도 추가할 예정.
 */
export async function handleInquireReplyAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, message: '세션이 만료되었습니다.' }
const rawData = Object.fromEntries(formData.entries())

  // zod로 유효성 검사
  const validatedFields = InquireReplySchema.safeParse(rawData)

  // 실패하면 출력
  if (!validatedFields.success) {
    return { 
      success: false, 
      message: validatedFields.error.issues[0].message 
    }
  }

  // 검증된 데이터 추출
  const { replyId, content: answerContent } = validatedFields.data

  try {
    // 권한 검증 로직 (판매자 또는 어드민)
    const { data: qnaData, error: qnaError } = await supabase
      .from('qnas')
      .select(`
        product_id, 
        product:product_id (store_id)
      `)
      .eq('id', replyId)
      .single()

    if (qnaError || !qnaData) {
      throw new Error('해당 질문을 찾을 수 없습니다.')
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const isAdmin = userData?.role === 'ADMIN'

    const productInfo = Array.isArray(qnaData.product) ? qnaData.product[0] : qnaData.product
    const isSeller = productInfo?.store_id === user.id

    if (!isAdmin && !isSeller) {
      return { success: false, message: '권한이 없습니다. (상품 판매자 또는 관리자만 답변 가능합니다.)' }
    }

    // 권한 검증 통과 시 답변 데이터 업데이트
    const { error: updateError } = await supabase
      .from('qnas')
      .update({
        answer_content: answerContent,
        is_answered: true,
        answered_at: new Date().toISOString(),
        answerer_id: user.id
      })
      .eq('id', replyId)

    if (updateError) throw updateError

    revalidateTag('inquire', { expire: 3600 })

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '답변 등록 중 알 수 없는 오류가 발생했습니다.'
    return { success: false, message: errorMessage }
  }

  // 성공 시 페이지 리다이렉트
  redirect(`/inquire/${replyId}`)
}

/**
 * 1대1 상세 조회 액션 (Server Action)
 * 
 * @param id 상세 조회할 게시물 아이디 (/notice/id)
 * @returns data 배열로 조회결과 생성
 */
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
        price,
        store_id
      )
      `)
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}