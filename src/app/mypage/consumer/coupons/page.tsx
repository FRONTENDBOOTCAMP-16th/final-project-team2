import { dummyUserCoupons } from "@/data/dummyCouponLists";
import CouponList from "./components/CouponList";

export default function CouponPage() {
  // 현재는 더미 데이터를 사용합니다.
  const coupons = dummyUserCoupons;

  return (
    <div className="flex flex-col w-full py-12 px-18 bg-white">
      <h1 className="text-2xl font-bold mb-8">내 쿠폰함</h1>
      <CouponList initialCoupons={coupons} />
    </div>
  );
}
