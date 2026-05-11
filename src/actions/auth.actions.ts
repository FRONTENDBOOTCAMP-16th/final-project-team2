"use server"

import z from "zod"

// formData를 받아 에러를 반환
export async function authAction<T extends z.ZodSchema>(
  _: unknown,
  formData: FormData,
  schema: T
) {
  // form을 일반 객체로 변환
  const objectTransform = Object.fromEntries(formData)
  const result = schema.safeParse(objectTransform)

  if (!result.success) {
    // 에러를 담을 객체
    const errors: Record<string, string[]> = {}

    // 에러 목록을 필드별로 분류
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      // 필드에 배열이 없으면 초기화 (undefined 에러방지)
      if (!errors[field]) errors[field] = []
      errors[field].push(issue.message)
    }

    return {
      errors,
      // 사용자 입력 정보 브라우저(클라이언트)에 다시 보내기
      role: formData.get('role')?.toString(),
      name: formData.get('name')?.toString(),
      email: formData.get('email')?.toString(),
      phone: formData.get('phone')?.toString(),
      password: formData.get('password')?.toString(),
      confirmPassword: formData.get('confirmPassword')?.toString(),
      terms: formData.get('terms')?.toString(),
    }
  }

  return {
    errors: null,
    data: result.data as z.infer<T>
  }
}