"use server"

import { signupSchema } from "@/app/lib/auth"
import { authAction } from "./auth.actions"
import { redirect } from "next/navigation"
import { createClient } from "../../utils/supabase/server"

export type SignupState = {
  errors: Record<string, string[]> | null
  role?: string
  name?: string
  email?: string
  phone?: string
  password?: string
  terms?: string
  confirmPassword?: string
}

export const signupAction = async (_: unknown, formData: FormData): Promise<SignupState> => {
  // 데이터 검증 (zod)
  const result =  await authAction(_, formData, signupSchema)
  
  // 데이터 검증이 실패했을 시 얼리리턴
  if (result.errors) return result

  const { email, password, name, phone, role, confirmPassword } = result.data
  const supabase = await createClient()

  // 아이디/비밀번호 암호화 - 로그인에 필요한 정보
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  // 아이디 중복시 영어노티를 한글로 변환
  if (error) {
    const message = error.message.includes('already registered')
      ? '이미 사용중인 이메일입니다.'
      : error.message
    return {
      errors: { email: [message] },
      name: name,
      email: email,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword,
      role: role
    }
  }

  // 공개 - 프로필 데이터 추가
  // 그 외 created_at: 자동생성, nickname: null 등 기본값 제외
  const { error: dbError } = await supabase.from('users').insert({
    id: data.user?.id,
    email: email,
    name: name,
    phone: phone,
    role: role
  })

  // 데이터 저장 실패시 에러메세지
  if (dbError) return {
    errors: { root: [dbError.message] },
    name: name,
    email: email,
    phone: phone,
    password: password,
    confirmPassword: confirmPassword,
    role: role
  }
  
  redirect('/signup/signup-result')
}
