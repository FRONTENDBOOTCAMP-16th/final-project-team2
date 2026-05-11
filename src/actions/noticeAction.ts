'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { updateTag } from 'next/cache';
import checkAdmin from '@/actions/checkAdminAction';

export type FormState = { success: boolean; message: string };


export async function handleNoticeAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const deleteId = formData.get('deleteId') as string;
  const updateId = formData.get('updateId') as string;

  // 관리자 체크 및 세션 확인
  await checkAdmin('/notice');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, message: '세션이 만료되었습니다.' };

  try {
    let error;

    // --- 삭제 모드 ---
    if (deleteId) {
      const { error: deleteError } = await supabase
        .from('notices')
        .delete()
        .eq('id', deleteId);
      error = deleteError;
    }
    // --- 생성/수정 모드 ---
    else {
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const isImportant = formData.get('important') === 'on';

      if (!title?.trim()) return { success: false, message: '제목을 입력해주세요.' };

      if (updateId) {
        const { error: updateError } = await supabase
          .from('notices')
          .update({ title, content, important: isImportant })
          .eq('id', updateId);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('notices')
          .insert({ title, content, important: isImportant, writer_id: user.id });
        error = insertError;
      }
    }

    if (error) throw new Error(error.message);
    updateTag('notices');

    if (deleteId) {
    } else {
      return { success: true, message: '작업이 완료되었습니다.' };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }

  // 성공 시 목록으로 이동
  redirect('/notice');
}