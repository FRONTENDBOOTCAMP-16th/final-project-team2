'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getCarts } from './cartAction'
import { z } from 'zod'

const paymentFormDataSchema = z.object({
  zipCode: z.string().min(1, "우편번호를 입력해주세요."),
  streetAdr: z.string().min(1, "도로명 주소를 입력해주세요."),
  detailAdr: z.string().optional(),
  phone: z.string().regex(/^\d+$/, "전화번호는 숫자만 입력해주세요.").min(1, "전화번호를 입력해주세요."),
})

// 유저 정보 불러오기
export async function getLocationUserInfo() {
  const supabase = await createClient()
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: userData } = await supabase.from('users').select('phone, address, name, id').eq('id', user.id).single()

    return {
      phone: userData?.phone,
      address: userData?.address,
      name: userData?.name,
      id: userData?.id,
    }
  } catch (e) {
    console.error("유저 정보 로드 실패:", e)
    return null
  }
}

// 결제(주문) 처리하기 내부 로직 분리 (redirect 에러 방지)
async function processPayment(formData: FormData) {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('로그인이 필요합니다.')

    const zipCode = formData.get('zipCode') as string || ''
    const streetAdr = formData.get('streetAdr') as string || ''
    const detailAdr = formData.get('detailAdr') as string || ''
    const phone = formData.get('phone') as string || ''

    if (!streetAdr || !phone) {
      throw new Error('필수 배송지 정보가 누락되었습니다.')
    }

    // 배송지 주소 없을 시 : 기존에 저장된 배송지 정보를 가져와 사용
    const totalAdr = zipCode ? `[${zipCode}] ${streetAdr} || ${detailAdr}` : streetAdr

    const productList = await getCarts()
    if (!Array.isArray(productList) || productList.length === 0) {
      throw new Error('결제할 장바구니 내역이 없습니다.')
    }


    let total_price = 0
    let discount_amount = 0

    const orderItemsArray = productList.map((item) => {
      const itemQuantity = item.quantity || 0
      const itemPrice = item.product?.price || 0
      const itemDiscountRate = item.product?.discount_rate || 0

      const originalPrice = itemPrice * itemQuantity
      const discountedPrice = Math.round((itemPrice * (100 - itemDiscountRate) / 100) * itemQuantity)
      const itemDiscountAmount = originalPrice - discountedPrice

      total_price += originalPrice
      discount_amount += itemDiscountAmount

      return {
        product_id: item.product_id,
        quantity: itemQuantity,
        unit_price: itemPrice,
        item_status: 'PENDING',
      }
    })

    const orderData = {
      user_id: user.id,
      order_status: 'PENDING',
      total_price: Math.round(total_price),
      discount_amount: Math.round(discount_amount),
      final_price: Math.round(total_price - discount_amount),
      shipping_address: totalAdr,
      shipping_phone: phone,
    }


    const { data: createdOrder, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select('id')
      .single()

    if (orderError || !createdOrder) {
      console.error("Order Create Error:", orderError)
      throw new Error('주문서 생성에 실패했습니다. 잠시 후 다시 시도해주세요.')
    }

    const finalOrderItemsArray = orderItemsArray.map(item => ({
      ...item,
      order_id: createdOrder.id
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(finalOrderItemsArray)

    if (itemsError) {
      console.error("Order Items Create Error:", itemsError)
      await supabase.from('orders').delete().eq('id', createdOrder.id)
      throw new Error('주문 상세 정보 저장에 실패했습니다.')
    }

    const { error: cartError } = await supabase.from('cart_items').delete().eq('user_id', user.id)
    if (cartError) {
      console.error("Cart Delete Error after Order:", cartError)
    }

    return createdOrder.id // 성공 시 orderId 반환 (try 블록 밖에서 redirect 하기 위함)

  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}

export async function submitPayment(formData: FormData) {
  let orderId: string | null = null

  try {
    const result = await processPayment(formData)

    if (typeof result === 'string') {
      orderId = result
    } else {
      return result
    }
  } catch (error) {
    return { success: false, message: (error as Error).message }
  }

  if (orderId) {
    redirect(`/payment/finish/${orderId}`)
  }
}