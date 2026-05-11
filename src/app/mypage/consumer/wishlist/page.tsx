import WishListItemsList from "./components/WishListItemsList";

export default function WishlistPage() {
  return (
    <div className="w-full bg-white pt-6 px-6 pb-11.25 ">
      <h1 className="text-2xl font-bold mb-8 sr-only">찜한 상품</h1>

      <WishListItemsList />
    </div>
  );
}
