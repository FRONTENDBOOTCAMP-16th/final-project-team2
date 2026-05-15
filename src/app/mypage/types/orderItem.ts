export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  invoice_number: string;
  item_status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELED";
  products: {
    name: string;
    thumbnail_image: string;
    discount_rate: number;
  };
  orders: {
    id: string;
    user_id: string;
    order_status: string;
    total_price: number;
    final_price: number;
    shipping_address: string;
    shipping_phone: string;
    created_at: string;
  };
  email: string;
}
