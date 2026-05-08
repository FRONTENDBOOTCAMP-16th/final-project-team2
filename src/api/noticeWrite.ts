'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import { revalidateTag } from 'next/cache'; 
import checkAdmin from '@/actions/checkAdminAction';

export type FormState = {
  success: boolean;
  message: string;
}

export async function createNotice(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const isImportant = formData.get('important') === 'on'
  const updateId = formData.get('updateId') as string

  await checkAdmin('/notice')

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, message: '로그인 세션이 만료되었거나 유효하지 않습니다.' }
  }

  const writerId = user.id;

  try {
    let dbError;
    if (updateId && updateId !== 'null' && updateId !== 'undefined' && updateId !== '') {
      const { error } = await supabase
        .from('notices')
        .update({
          title: title.trim(),
          content: content.trim(),
          important: isImportant,
        })
        .eq('id', updateId)
      
      dbError = error;
    } else {
      // [생성 모드] - 여기서 writer_id (UUID)가 정상적으로 들어갑니다.
      const { error } = await supabase
        .from('notices')
        .insert({
          title: title.trim(),
          content: content.trim(),
          important: isImportant,
          writer_id: writerId, 
          created_at: new Date().toISOString(),
        })
        
      dbError = error;

    }

    if (dbError) {
      console.error('Supabase Error:', dbError.message)
      return { success: false, message: 'DB 저장 중 오류가 발생했습니다: ' + dbError.message }
    }


  } catch (error) {
    console.error('Server Action Error:', error)
    return { success: false, message: '서버 에러가 발생했습니다. 다시 시도해주세요.' }
  }

  revalidateTag('notices');
  redirect('/notice')
}