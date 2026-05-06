// 원본 쿠폰 정보 (coupons 테이블)
export interface Coupon {
  id: string;
  name: string;
  discount_rate: number;
  start_at: string;
  expired_at: string;
}

// 사용자가 보유한 쿠폰 정보 (user_coupons 테이블 + 원본 쿠폰 정보)
export interface UserCouponCombined {
  id: string; // user_coupons의 고유 ID
  user_id: string;
  coupon_id: string; // 연결된 원본 쿠폰 ID
  is_used: boolean; // 사용 여부 (user_coupons 필드)
  used_at: string | null;
  created_at: string; // 발급 일시

  // JOIN을 통해 가져오는 원본 쿠폰 상세 정보
  coupon_details: Coupon;
}

export interface CouponItemProps {
  userCoupon: UserCouponCombined;
}
