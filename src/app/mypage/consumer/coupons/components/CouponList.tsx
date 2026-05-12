'use client'

import { UserCouponCombined } from '@/app/mypage/types/coupon'
import CouponItem from './CouponItem'
import Pagination from '@/app/mypage/seller/delivery/components/Pagination'
import { usePagination } from '@/hooks/usePagination'
import { useState } from 'react'

interface Props {
  initialCoupons: UserCouponCombined[]
}

export default function CouponList({ initialCoupons }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const { currentItems, totalPages } = usePagination(
    initialCoupons,
    5,
    currentPage,
  )
  return (
    <div className="flex flex-col gap-4">
      {currentItems.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {currentItems.map((userCoupon) => (
              <CouponItem key={userCoupon.id} userCoupon={userCoupon} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="py-20 text-center text-gray-500">
          사용 가능한 쿠폰이 없습니다.
        </div>
      )}
    </div>
  )
}
