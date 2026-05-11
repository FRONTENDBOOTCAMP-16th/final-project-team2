'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { updateTag } from 'next/cache';


export type FormState = {
  success: boolean;
  message: string;
}

export async function createInquire(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  // 임시 아이디
  const writerId = '535d2a59-ad91-4c29-8aaf-99621faae239'

  if (!title || !title.trim()) {
    return { success: false, message: '제목을 입력해주세요.' }
  }
  if (!content || !content.trim() || content === '<p><br></p>') {
    return { success: false, message: '본문 내용을 작성해주세요.' }
  }

  const updateId = formData.get('updateId') as string

  try {
    let error;

    if (updateId) {
      // 수정 모드 (Update)
      const { error: updateError } = await supabase
        .from('qnas')
        .update({
          title: title.trim(),
          question_content: content.trim(),
        })
        .eq('id', updateId)
      error = updateError;
    } else {
      // 생성 모드 (Insert)
      const { error: insertError } = await supabase
        .from('qnas')
        .insert({
          title: title.trim(),
          question_content: content.trim(),
          writer_id: writerId,
          created_at: new Date().toISOString(), // 현재 시간
        })
      error = insertError;
    }

    if (error) {
      console.error('Supabase Error:', error.message)
      return { success: false, message: 'DB 저장 중 오류가 발생했습니다: ' + error.message }
    }

    updateTag('inquire');

  } catch (error) {
    console.error('Server Action Error:', error)
    return { success: false, message: '서버 에러가 발생했습니다. 다시 시도해주세요.' }
  }

  redirect('/inquire')
}