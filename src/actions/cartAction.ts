'use server'
import { createClient } from '../../utils/supabase/server'
import { z } from 'zod'
import { getAuthUserInfo } from './getUser'
import { revalidatePath } from 'next/cache'

const productSchema = z.object({
  name: z.string(),
  price: z.number(),
  thumbnail_image: z.string().nullable().optional(),
  options: z.any().nullable().optional(),
  discount_rate: z.number().nullable().optional(),
})

const cartItemSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  selected_options: z.any().nullable().optional(),
  product: productSchema.nullable().optional(),
})

const getCartsResponseSchema = z.array(cartItemSchema)

const updateCartQuantitySchema = z.object({
  cartItemId: z.string({ message: "장바구니 아이템 ID가 필요합니다." }),
  newQuantity: z.number({ message: "수량이 필요합니다." })
    .int("수량은 정수여야 합니다.")
    .min(1, "수량은 1 이상이어야 합니다."),
})

export type UpdateCartQuantity = z.infer<typeof updateCartQuantitySchema>

export async function getCarts() {
  // 'use cache'
  // cacheTag('cart', 'max')

  const auth = await getAuthUserInfo()

  if (!auth) {
    console.log("로그인된 사용자가 없습니다.")
    return { success: false, message: '세션이 만료되었습니다.' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
        *,
        product:product_id (
        name,
        thumbnail_image,
        price,
        options,
        discount_rate
      )
      `)
    .eq('user_id', auth.id)
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error.message)
    throw new Error(error.message)
  }

  // Zod를 통한 데이터 검증
  const parsedData = getCartsResponseSchema.safeParse(data)
  if (!parsedData.success) {
    console.error("데이터 검증 실패:", parsedData.error)
    // 에러 시 빈 배열을 반환하거나 적절하게 처리
    return []
  }

  return parsedData.data
}

export async function updateCartQuantity(input: UpdateCartQuantity) {
  const auth = await getAuthUserInfo()

  if (!auth) {
    return { success: false, message: '인증이 필요합니다.' }
  }

  // Zod를 통한 입력 파라미터 검증
  const parsedInput = updateCartQuantitySchema.safeParse(input)
  if (!parsedInput.success) {
    const errorMessage = parsedInput.error.issues[0]?.message || '잘못된 입력값입니다.'
    return { success: false, message: errorMessage }
  }

  const { cartItemId, newQuantity } = parsedInput.data

  const supabase = await createClient()
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity: newQuantity })
    .eq('id', cartItemId)
    .eq('user_id', auth.id)

  if (error) {
    console.error(error.message)
    return { success: false, message: '수량 업데이트에 실패했습니다.' }
  }
  revalidatePath('/cart')
  
  return { success: true }
}
