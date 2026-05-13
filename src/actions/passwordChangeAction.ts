'use server'

import { authAction } from './auth.actions'
import { redirect } from 'next/navigation'
import { resetChangeSchema } from '@/app/lib/auth'
import { createClient } from '@/utils/supabase/server'
interface PasswordChangeProps {
  errors: Record<string, string[]> | null
  password?: string
  confirmPassword?: string
}

export const passwordChangeAction = async (
  _: unknown,
  formData: FormData,
): Promise<PasswordChangeProps> => {
  // zod 검사
  const result = await authAction(_, formData, resetChangeSchema)

  if (result.errors) return result

  // 사용하기 쉽도록 객체로 변경
  const { password, confirmPassword } = result.data

  const supabase = await createClient()

  // 사용자 비밀번호 변경
  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    return {
      errors: { root: ['비밀번호 변경에 실패했습니다. 링크가 만료되었거나 다시 시도해 주세요.'] },
      password: password,
      confirmPassword: confirmPassword,
    }
  }

  redirect('/reset-password/password-change-result')
}
