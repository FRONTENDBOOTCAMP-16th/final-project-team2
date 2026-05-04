import { dummyUserCoupons } from "@/data/dummyCouponLists";
import CouponItem from "./components/CouponItem";

export default function Coupon() {
  return (
    <div className="flex flex-col gap-4 w-full py-12 px-18 bg-white">
      {dummyUserCoupons.length > 0 ? (
        dummyUserCoupons.map((userCoupon) => (
          <CouponItem key={userCoupon.id} userCoupon={userCoupon} />
        ))
      ) : (
        <p className="text-gray-500 text-center py-20">
          사용 가능한 쿠폰이 없습니다.
        </p>
      )}
    </div>
  );
}
