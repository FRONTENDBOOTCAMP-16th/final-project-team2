export const ORDER_ITEM_STATUS = {
  PENDING: "배송준비중",
  SHIPPED: "배송중",
  DELIVERED: "배송완료",
  CANCELED: "취소됨",
} as const;

export type OrderItemStatus = keyof typeof ORDER_ITEM_STATUS;
