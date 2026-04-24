export type OrderItem = {
  id: number;
  name: string;
  orderDate: string;
  price: number;
  image: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELED";
};
