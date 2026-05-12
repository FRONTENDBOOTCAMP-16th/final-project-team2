import { UserCouponCombined } from '@/app/mypage/types/coupon'

interface CouponItemProps {
  userCoupon: UserCouponCombined
}

export default function CouponItem({ userCoupon }: CouponItemProps) {
  const { coupon_details, is_used } = userCoupon

  /**
   * 할인 표시 로직:
   * discount_rate가 100 이하이면 % 할인
   * 100보다 크면 원 할인
   */
  const isPercentage = coupon_details.discount_rate <= 100
  const discountDisplay = isPercentage
    ? `${coupon_details.discount_rate}%`
    : `${coupon_details.discount_rate.toLocaleString()}원`

  return (
    <div
      className={`flex w-full items-center justify-between border border-gray-200 p-6 ${
        is_used ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-lg font-medium">{coupon_details.name}</span>
        <span className="text-2xl font-bold text-[#FF6B6B]">
          {discountDisplay} 할인
        </span>

        <p className="text-sm text-[#4A5565]">
          유효기간 : {new Date(coupon_details.expired_at).toLocaleDateString()}
        </p>
      </div>

      {/* is_used 상태에 따라 버튼의 텍스트와 스타일을 동적으로 변경 */}
      <button
        disabled={is_used}
        className={`rounded-xl px-4 py-1.5 text-xs transition-colors ${
          is_used
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {is_used ? '사용완료' : '사용가능'}
      </button>
    </div>
  )
}
