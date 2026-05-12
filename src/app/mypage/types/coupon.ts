import { Coupons, UserCoupons } from '@/app/lib/coupons'

type CouponDetails = Pick<
  Coupons,
  'id' | 'name' | 'discount_rate' | 'start_at' | 'expired_at'
>

export interface UserCouponCombined extends UserCoupons {
  coupon_details: CouponDetails
}

export interface CouponItemProps {
  userCoupon: UserCouponCombined
}
