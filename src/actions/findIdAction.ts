"use server"

import { findIdSchema } from "@/app/lib/auth"
import { authAction } from "./auth.actions"
import { redirect } from "next/navigation"
import { supabase } from "@/app/lib/supabase"

interface findIdStatus {
  errors: Record<string, string[]> | null
  name?: string
  phone?: string
}

export const findIdAction = async (_: unknown, formData: FormData): Promise<findIdStatus> => {

  // zod 검사
  const result = await authAction(_, formData, findIdSchema)
  
  if (result.errors) return result

  // 사용하기 쉽도록 객체로 변경
  const objectForm = Object.fromEntries(formData) as Record<string, string>

  // email에 맞는 name, phone 꺼내오기
  const { data, error } = await supabase.from('users').select('email').match({ name: objectForm.name, phone: objectForm.phone })
  
  if (error || !data || data.length === 0) {
    return {
      errors: { root: ['사용자의 이메일이 존재하지않습니다'] },
      name: objectForm.name,
      phone: objectForm.phone
    }
  }

  const userEmail = data[0].email
  
  redirect(`/find-id/find-id-result?email=${encodeURIComponent(userEmail)}`)
}
