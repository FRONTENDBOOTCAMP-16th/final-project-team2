"use server"

import { loginSchema } from "@/app/lib/auth"
import { authAction } from "./auth.actions"
import { redirect } from "next/navigation"
import { supabase } from "@/app/lib/supabase"

interface LoginStatus {
  errors: Record<string, string[]> | null
  role?: string
  email?: string
  password?: string
  keeplogin?: string
}

export const loginAction = async (_: unknown, formData: FormData): Promise<LoginStatus> => {
  // 데이터 검증 (zod)
  const result = await authAction(_, formData, loginSchema)

  // 검증이 실패했을 경우 조기리턴
  if (result.errors) return result

  // 객체 변경 및 로그인지속 여부
  const objectForm = Object.fromEntries(formData) as Record<string, string>
  const keepLogin = objectForm.keeplogin === 'on'


  // 아이디 비밀번호 체크
  const { error } = await supabase.auth.signInWithPassword({
    email: objectForm.email,
    password: objectForm.password
  })

  if (error) return { errors: { root: ['이메일 또는 비밀번호가 올바르지 않습니다'] } }
  
  redirect('/')
}
