export interface OrderItem {
  id: number;
  name: string;
  originalPrice?: number; 
  discountRate: number; 
  price: number;        
  image: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELED";
  orderDate: string;
  category: "writing" | "paper";
}