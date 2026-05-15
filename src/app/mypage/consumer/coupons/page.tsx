'use client'

import { useUser } from '@/app/mypage/context/UserContext'
import { useUserCoupons } from './hooks/useUserCoupons'
import CouponList from './components/CouponList'
import { SellerProductItemSkeleton } from '@/app/mypage/seller/products/components/SellerProductItemSkeleton'

export default function CouponPage() {
  const { user } = useUser()
  const { coupons, isLoading } = useUserCoupons(user?.id)

  return (
    <div className="mb-20 flex w-full flex-col bg-white px-18 py-12">
      <h1 className="mb-8 text-2xl font-bold">내 쿠폰함</h1>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {/* 스켈레톤 컴포넌트 재사용 */}
          {[1, 2, 3].map((i) => (
            <SellerProductItemSkeleton key={i} />
          ))}
        </div>
      ) : (
        <CouponList initialCoupons={coupons} />
      )}
    </div>
  )
}
