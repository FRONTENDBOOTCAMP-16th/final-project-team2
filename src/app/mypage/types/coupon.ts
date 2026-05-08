import { Coupon, UserCoupon } from "@/app/lib/Coupons";

export interface UserCouponCombined extends UserCoupon {
  coupon_details: Coupon;
}

export interface CouponItemProps {
  userCoupon: UserCouponCombined;
}
