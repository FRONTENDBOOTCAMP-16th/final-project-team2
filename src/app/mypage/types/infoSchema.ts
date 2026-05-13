import z from 'zod'

export const sellerInfoSchema = z.object({
  phone: z
    .string()
    .min(1, '전화번호를 입력해주세요.')
    .min(10, '전화번호가 너무 짧습니다.'),
  location: z.string().min(1, '가게 주소를 입력해주세요.'),
  intro: z.string().min(1, '소개글을 입력해주세요.'),
  profileImage: z.string().optional(),
  email: z.string().optional(),
  name: z.string().min(1, '가게명을 작성해주세요.'),
})
export type SellerInfoData = z.infer<typeof sellerInfoSchema>

export const profileSchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
  phone: z
    .string()
    .min(1, '전화번호를 입력해주세요.')
    .min(10, '전화번호가 너무 짧습니다.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
  profileImage: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  birthday: z.string().optional(),
})

export type ConsumerInfoData = z.infer<typeof profileSchema>
