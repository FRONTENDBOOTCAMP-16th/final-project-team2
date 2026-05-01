"use server"

import z from "zod"

// formData를 받아 에러를 반환
export const ahthAction = async (_: unknown, formData: FormData, schema: z.ZodSchema) => {
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

    return { errors }
  }
  
  return { errors: null }
}