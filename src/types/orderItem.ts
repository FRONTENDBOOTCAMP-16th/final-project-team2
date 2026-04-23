export type OrderItem = {
  id: number;
  name: string;
  orderDate: string;
  price: number;
  image: string;
  status: "결제대기" | "결제완료" | "배송중" | "배송완료" | "취소됨";
};
