import { Suspense } from "react";
import WishListItemsList from "./components/WishListItemsList";
import MyPageProductSkeleton from "../../components/MypageProductSkeleton";

export default function WishlistPage() {
  return (
    <div className="w-full bg-white pt-6 px-6 pb-11.25 ">
      <h1 className="text-2xl font-bold mb-8 sr-only">찜한 상품</h1>
      <Suspense fallback={<MyPageProductSkeleton count={9} />}>
        <WishListItemsList />
      </Suspense>
    </div>
  );
}
