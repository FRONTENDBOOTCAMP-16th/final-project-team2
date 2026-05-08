export type Coupon = {
  id: string;
  name: string;
  discount_rate: number;
  start_at: string;
  created_at?: string;
  updated_at?: string;
  expired_at: string;
};

export type UserCoupon = {
  id: string;
  user_id: string;
  coupon_id: string;
  is_used: boolean;
  used_at: string | null;
  created_at: string;
};
