import { dummyUserCoupons } from '@/data/dummyCouponLists'
import CouponList from './components/CouponList'

export default function CouponPage() {
  // 현재는 더미 데이터를 사용합니다.
  const coupons = dummyUserCoupons

  return (
    <div className="mb-20 flex w-full flex-col bg-white px-18 py-12">
      <h1 className="mb-8 text-2xl font-bold">내 쿠폰함</h1>
      <CouponList initialCoupons={coupons} />
    </div>
  )
}
