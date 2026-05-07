'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import { updateTag } from 'next/cache';


export type FormState = {
  success: boolean;
  message: string;
}



export async function createNotice(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const isImportant = formData.get('important') === 'on'
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
        .from('notices')
        .update({
          title: title.trim(),
          content: content.trim(),
          important: isImportant,
        })
        .eq('id', updateId)
      error = updateError;
    } else {
      // 생성 모드 (Insert)
      const { error: insertError } = await supabase
        .from('notices')
        .insert({
          title: title.trim(),
          content: content.trim(),
          important: isImportant,
          writer_id: writerId,
          created_at: new Date().toISOString(), // 현재 시간
        })
      error = insertError;
    }

    if (error) {
      console.error('Supabase Error:', error.message)
      return { success: false, message: 'DB 저장 중 오류가 발생했습니다: ' + error.message }
    }

    updateTag('notices');

  } catch (error) {
    console.error('Server Action Error:', error)
    return { success: false, message: '서버 에러가 발생했습니다. 다시 시도해주세요.' }
  }

<<<<<<< HEAD
<<<<<<< HEAD
  redirect('/notice')
=======
  redirect('/notice') 
>>>>>>> aa915c9 (feat: 공지사항 서버 액션 추가)
=======
  redirect('/notice')
>>>>>>> ef88a54 (feat: QNA 부분 서버 액션 추가)
}