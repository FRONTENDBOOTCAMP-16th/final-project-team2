import { z } from 'zod'

// 조립을 위한 베이스 스키마
const roleSchema = z.enum(['USER', 'BUSINESS', 'ADMIN'], '유저 타입을 선택해주세요')
const emailSchema = z.email('유효한 이메일이 아닙니다')
const nameSchema = z.string('이름은 문자 값이여야 합니다').min(2, '이름은 2글자 이상의 문자열이여야합니다')
const phoneSchema = z.string('사용자 번호는 문자여야합니다').regex(/^010-\d{4}-\d{4}/, '전화번호 형식이 올바르지 않습니다. (예: 010-0000-0000)')
const passwordSchema = z.string('유효한 비밀번호가 아닙니다').min(8, '비밀번호는 8자리 이상이여야 합니다').regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,}$/, '영어, 숫자, 특수문자(!@#$%^&*?_)가 포함 8글자가 들어가야 합니다')


// 회원가입 베이스
const baseSignupSchema = z.object({
  role: roleSchema.refine((val) => !!val, {
    message: '권한을 선택해주세요',
  }),
  email: emailSchema,
  name: nameSchema,
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요')
})

// 실제 사용되는 회원가입 스키마
export const signupSchema = baseSignupSchema.check((checkValue) => {
  // password, confirmPassword를 타입 지정
  const data = checkValue.value as { password: string; confirmPassword: string }

  // 방어코드 + 값이 일치하지 않을때 메세지 출력
  if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
    checkValue.issues.push({
      code: 'custom',
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
      input: data.confirmPassword,
    })
  }
})


// 로그인 스키마
export const loginSchema = z.object({
  role: roleSchema.refine((val) => !!val, {
    message: '권한을 선택해주세요',
  }),
  email: emailSchema,
  password: passwordSchema
})


type loginSchema = z.infer<typeof loginSchema>
type signupSchema = z.infer<typeof signupSchema>
