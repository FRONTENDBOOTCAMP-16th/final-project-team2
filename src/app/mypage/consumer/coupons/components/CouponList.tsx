'use client'

import { UserCouponCombined } from '@/app/mypage/types/coupon'
import CouponItem from './CouponItem'

import { useProductFilter } from '@/hooks/useFiltering'
import Pagination from '@/app/components/Pagination'

interface Props {
  initialCoupons: UserCouponCombined[]
}

export default function CouponList({ initialCoupons }: Props) {
  const { page } = useProductFilter()
  const itemsPerPage = 5

  const totalCount = initialCoupons.length
  const start = (page - 1) * itemsPerPage
  const currentItems = initialCoupons.slice(start, start + itemsPerPage)

  return (
    <div className="flex flex-col gap-4">
      {currentItems.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {currentItems.map((userCoupon) => (
              <CouponItem key={userCoupon.id} userCoupon={userCoupon} />
            ))}
          </div>

          <Pagination pageSize={itemsPerPage} totalCount={totalCount} />
        </>
      ) : (
        <div className="py-20 text-center text-gray-500">
          사용 가능한 쿠폰이 없습니다.
        </div>
      )}
    </div>
  )
}
