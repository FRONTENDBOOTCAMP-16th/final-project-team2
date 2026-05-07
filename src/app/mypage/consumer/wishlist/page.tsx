import { Suspense } from "react";
import WishListItemsList from "./components/WishListItemsList";
import { dummyOrderItems } from "@/data/dummyOrder";
import MyPageProductSkeleton from "../../components/MypageProductSkeleton";

const HAS_WISH_PRODUCTS = dummyOrderItems.length > 0;

export default function WishlistPage() {
  return (
    <div className="w-full bg-white pt-6 px-6 pb-11.25 ">
      <h1 className="text-2xl font-bold mb-8 sr-only">찜한 상품</h1>
      {HAS_WISH_PRODUCTS ? (
        <Suspense fallback={<MyPageProductSkeleton count={9} />}>
          <WishListItemsList />
        </Suspense>
      ) : (
        <div className="text-red-500 text-center pt-3">
          <p>찜한 상품이 없습니다.</p>{" "}
        </div>
      )}
    </div>
  );
}
