import { OrderProducts } from './categories'

export type Orders = {
  id: string
  user_id: string
  order_status: string
  total_price: number
  used_coupon_id: string
  discount_amount: number
  final_price: number
  shipping_address: string // 배송지
  shipping_phone: string // 받는사람 전화번호
  created_at: string
  update_at: string
}

export type Order_items = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  invoice_number: string
  item_status: string
}

// 확장 타입
export type OrderItem = {
  id: string
  product_id: string
  quantity: number
  unit_price: number
  item_status: string
  products: OrderProducts
}

export type OrdersType = {
  id: string
  order_status: string
  final_price: number
  created_at: string
  order_items: OrderItem[]
}
