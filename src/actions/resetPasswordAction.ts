"use server"

import { authAction } from "./auth.actions"
import { redirect } from "next/navigation"
import { createAdminClient } from "@/utils/supabase/admin"
import { resetPasswordSchema } from "@/app/lib/Auth"
interface ResetPasswordCheckProps {
  errors: Record<string, string[]> | null
  name?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
}

export const resetPasswordAction = async (_: unknown, formData: FormData): Promise<ResetPasswordCheckProps> => {
  // zod 검사
  const result = await authAction(_, formData, resetPasswordSchema)

  if (result.errors) return result

  // 사용하기 쉽도록 객체로 변경
  const { name, email, phone, password, confirmPassword } = result.data

  // supabase 마스터 권한
  // 비로그인시 일반 권한으로는 비밀번호 변경을 할 수 없어 마스터 권한으로 설정
  const supabase = createAdminClient()
  
  // id에 맞는 name, email, phone 일치 여부 확인
  const { data, error } = await supabase.from('users').select('id').match({ name: name, email: email, phone: phone }).single()
  
  if (error || !data) {
    return {
      errors: { root: ['일치하는 아이디가 없습니다'] },
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
  }

  // 마스터 권한으로 password 업데이트
  const { error: updateError } = await supabase.auth.admin.updateUserById(
    data.id,
    { password: password }
  )

  if (updateError) {
    return { errors: { root: ['비밀번호 변경에 실패했습니다.'] } }
  }

  redirect('/reset-password/reset-password-result')
}
