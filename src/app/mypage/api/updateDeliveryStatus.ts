import { createClient } from '@/utils/supabase/client'
import { OrderItem } from '../types/orderItem'

export const updateDeliveryStatus = async (
  orderItemId: string,
  status: OrderItem['item_status'],
  orderId: string,
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('order_items')
    .update({
      item_status: status,
    })
    .eq('id', orderItemId)

  if (error) throw error

  const { error: orderError } = await supabase
    .from('orders')
    .update({ order_status: status })
    .eq('id', orderId)

  if (orderError) throw orderError
}
