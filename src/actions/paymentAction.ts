'use server';

import { createClient } from '@/utils/supabase/server'
import { getCarts } from './cartAction'

// 유저 정보 불러오기
export async function getLocationUserInfo() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null;

    const { data: userData } = await supabase.from('users').select('phone, address, name, id').eq('id', user.id).single();

    return {
      phone: userData?.phone,
      address: userData?.address,
      name: userData?.name,
      id: userData?.id,
    }
  } catch (e) {
    console.error("유저 정보 로드 실패:", e);
    return null;
  }
}

// 결제(주문) 처리하기
export async function submitPayment(formData: FormData) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('로그인이 필요합니다.')

    const zipCode = formData.get('zipCode') as string
    const streetAdr = formData.get('streetAdr') as string
    const detailAdr = formData.get('detailAdr') as string
    const phone = formData.get('userPhone') as string
    const totalAdr = `[${zipCode}] ${streetAdr} || ${detailAdr}`

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
      const discountedPrice = (itemPrice * (1 - itemDiscountRate / 100)) * itemQuantity
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
      total_price: total_price,
      discount_amount: discount_amount,
      final_price: total_price - discount_amount,
      shipping_address: totalAdr,
      shipping_phone: phone,
    }

    
    const { data: createdOrder, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select('id')
      .single()

    if (orderError) {
      throw new Error(`주문서 생성 에러: ${orderError.message}`)
    }
    if (!createdOrder) {
      throw new Error('주문서 생성에 실패했습니다. (데이터 반환 없음)')
    }

    const finalOrderItemsArray = orderItemsArray.map(item => ({
      ...item,
      order_id: createdOrder.id
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(finalOrderItemsArray)

    if (itemsError) {
      await supabase.from('orders').delete().eq('id', createdOrder.id)
      throw new Error(`주문 상세 정보 저장 에러: ${itemsError.message}`)
    }

    await supabase.from('cart_items').delete().eq('user_id', user.id)
    return { success: true, orderId: createdOrder.id }

  } catch (error) {
    return { success: false, message: (error as Error).message }
  }
}