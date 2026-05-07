"use server"

import { loginSchema } from "@/app/lib/auth"
import { authAction } from "./auth.actions"
import { redirect } from "next/navigation"
import { createClient } from "../../utils/supabase/server"

interface LoginStatus {
  errors: Record<string, string[]> | null
  role?: string
  email?: string
  password?: string
}

export const loginAction = async (_: unknown, formData: FormData): Promise<LoginStatus> => {
  console.log("--- [1. loginAction 시작] ---");
  
  // 폼에서 넘어온 데이터 원본 확인
  const rawData = Object.fromEntries(formData.entries());
  console.log("입력 데이터:", rawData);

  // 1. 데이터 검증 (zod)
  console.log("--- [2. Zod 검증 시작 (authAction)] ---");
  const result = await authAction(_, formData, loginSchema)

  // 검증이 실패했을 경우 조기리턴
  if (result.errors) {
    console.error("❌ 검증 실패:", JSON.stringify(result.errors, null, 2));
    return result
  }

  console.log("✅ 검증 통과:", result.data);

  // 객체 변경 및 로그인지속 여부
  const { email, password, role } = result.data
  const supabase = await createClient()

  // 2. 아이디 비밀번호 체크
  console.log("--- [3. Supabase 로그인 시도] ---");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (authError) {
    console.error("❌ Supabase 인증 에러:", authError.status, authError.message);
    return { 
      errors: { root: ['이메일, 비밀번호 또는 회원 구분이 올바르지 않습니다'] },
      email: email,
      password: password,
      role: role
    }
  }
  
  console.log("✅ Supabase 인증 성공:", authData.user?.email);

  // 3. 로그인 시 타입확인 (DB 조회)
  console.log("--- [4. DB 역할(Role) 확인 시작] ---");
  const { data: roleData, error: roleFetchError } = await supabase
    .from('users')
    .select('role')
    .eq('id', authData.user?.id)
    .single()

  if (roleFetchError) {
    console.error("❌ DB 역할 조회 에러:", roleFetchError.message);
  }

  console.log(`🔍 역할 비교: 선택한 역할(${role}) vs DB 데이터(${roleData?.role})`);

  if (roleData?.role !== role) {
    console.warn("⚠️ 역할이 일치하지 않습니다. 로그아웃 처리합니다.");
    // 타입이 다를시 로그아웃
    await supabase.auth.signOut()
    
    return {
      errors: { root: ['선택하신 회원 구분이 일치하지 않습니다'] },
      email: email,
      password: password,
      role: role
    }
  }

  console.log("🎉 모든 검증 성공! 메인 페이지로 이동합니다.");
  redirect('/')
}