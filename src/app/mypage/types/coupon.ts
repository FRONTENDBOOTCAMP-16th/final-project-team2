// mypage/types/coupon.ts
import { Coupon, UserCoupon } from "@/app/lib/Coupons";

// interface는 type을 물려받아 새로운 기능을 추가하기에 아주 좋습니다.
export interface UserCouponCombined extends UserCoupon {
  coupon_details: Coupon;
}

export interface CouponItemProps {
  userCoupon: UserCouponCombined;
}
