'use server'

import { authAction } from './auth.actions'
import { redirect } from 'next/navigation'
import { resetPasswordSchema } from '@/app/lib/auth'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
interface ResetPasswordCheckProps {
  errors: Record<string, string[]> | null
  name?: string
  email?: string
  phone?: string
}

export const resetPasswordAction = async (
  _: unknown,
  formData: FormData,
): Promise<ResetPasswordCheckProps> => {
  // zod 검사
  const result = await authAction(_, formData, resetPasswordSchema)

  if (result.errors) return result

  // 사용하기 쉽도록 객체로 변경
  const { email, phone, name } = result.data
  // 개발 환경에 따라 url변경 - NEXT_PUBLIC_SITE_URL 임시
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const adminSupabase = createAdminClient()
  const { data: user } = await adminSupabase
    .from('users')
    .select('id')
    .match({ name, email, phone })
    .single()
  
  // 데이터가 맞으면 메일 전송, 데이터가 있건 없건 결과 페이지로 이동
  if (user) {
    const supabase = await createClient()
    const { error: emailError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${siteUrl}/reset-password/password-change` }
    )

    if (emailError && emailError.status !== 429) {
       console.error("Supabase Error:", emailError.message)
    }
  }

  redirect('/reset-password/reset-password-result')
}