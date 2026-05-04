import WishListItemsList from "./components/WishListItemsList";
import { dummyOrderItems } from "@/data/dummyOrder";

const HAS_WISH_PRODUCTS = dummyOrderItems.length > 0;

export default function WishlistPage() {
  return (
    <div className="w-full bg-white pt-6 px-6 pb-11.25 ">
      <h1 className="text-2xl font-bold mb-8 sr-only">찜한 상품</h1>
<<<<<<< HEAD
      <div className="flex justify-between py-6">
        <TabFilter
          items={CATEGORIES}
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
        />
        <label htmlFor="filter" className="sr-only">
          필터
        </label>
        <select name="filter" id="filter" className="border py-1 ">
          <option value="lastProduct">등록순</option>
          <option value="popularProduct">인기순</option>
          <option value="highPriceProduct">가격 높은 순</option>
          <option value="lowPriceProduct">가격 낮은 순</option>
        </select>
      </div>
=======
>>>>>>> dev
      {HAS_WISH_PRODUCTS ? (
        <WishListItemsList />
      ) : (
        <div className="text-red-500 text-center pt-3">
          <p>찜한 상품이 없습니다.</p>{" "}
        </div>
      )}
    </div>
  );
}
