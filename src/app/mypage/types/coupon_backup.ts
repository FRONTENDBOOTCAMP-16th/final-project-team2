import { Coupons, UserCoupons } from '@/app/lib/coupons'

export interface UserCouponCombined extends UserCoupons {
  coupon_details: Coupons
}

export interface CouponItemProps {
  userCoupon: UserCouponCombined
}
