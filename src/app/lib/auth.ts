import { z } from 'zod'

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,}$/

// 조립을 위한 베이스 스키마
const roleSchema = z.enum(
  ['USER', 'BUSINESS', 'ADMIN'],
  '회원 구분을 선택해주세요',
)
const emailSchema = z.email('유효한 이메일이 아닙니다')
const nameSchema = z
  .string('이름은 문자 값이여야 합니다')
  .min(2, '이름은 2글자 이상의 문자열이여야합니다')
const phoneSchema = z
  .string('사용자 번호는 문자여야합니다')
  .regex(
    /^010-\d{4}-\d{4}/,
    '전화번호 형식이 올바르지 않습니다. (예: 010-0000-0000)',
  )
const passwordSchema = z
  .string('유효한 비밀번호가 아닙니다')
  .min(8, '비밀번호는 8자리 이상이여야 합니다')
  .regex(
    PASSWORD_REGEX,
    '영어, 숫자, 특수문자(!@#$%^&*?_)가 포함 8글자가 들어가야 합니다',
  )
const passwordConfirmSchema = z.string().min(1, '비밀번호 확인을 입력해주세요')
const termsSchema = z.literal('on', { error: '이용약관에 동의해주세요' })

// 회원가입 베이스
const baseSignupSchema = z.object({
  role: roleSchema,
  email: emailSchema,
  name: nameSchema,
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: passwordConfirmSchema,
  terms: termsSchema,
})

// 실제 사용되는 회원가입 스키마
export const signupSchema = baseSignupSchema.superRefine((data, context) => {
  // 값이 일치하지 않을때 메세지 출력
  if (data.password !== data.confirmPassword) {
    context.addIssue({
      code: 'custom',
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
    })
  }
})

// 로그인 스키마
export const loginSchema = z.object({
  role: roleSchema,
  email: emailSchema,
  password: passwordSchema,
})

// 아이디 찾기 스키마
export const findIdSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
})

// 비밀번호 재설정 유저 확인
export const resetPasswordSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
})

// 비밀번호 변경 베이스
export const baseChangePassangeSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordConfirmSchema,
})

// 실제 사용되는 비밀번호 변경 스키마
export const resetChangeSchema = baseChangePassangeSchema.superRefine(
  (data, context) => {
    // 값이 일치하지 않을때 메세지 출력
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: 'custom',
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      })
    }
  },
)

type signupSchema = z.infer<typeof signupSchema>
type loginSchema = z.infer<typeof loginSchema>
type findIdSchema = z.infer<typeof findIdSchema>
type resetPasswordSchema = z.infer<typeof resetPasswordSchema>
type resetChangeSchema = z.infer<typeof resetChangeSchema>
