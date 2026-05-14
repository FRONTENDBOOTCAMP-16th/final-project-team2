import { Coupons, UserCoupons } from '@/app/lib/coupons.types'

export interface UserCouponCombined extends UserCoupons {
  coupon_details: Coupons
}

export interface CouponItemProps {
  userCoupon: UserCouponCombined
}
