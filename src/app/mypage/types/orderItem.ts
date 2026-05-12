export interface OrderItem {
  id: string // uuid
  orderId: string // orders.id
  productId: string // uuid 맞추는게 안전
  userId: string
  name: string
  image: string
  quantity: number
  unitPrice: number
  discountRate: number
  itemStatus: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED'
  orderDate: string
  category: 'writing' | 'paper'
}
