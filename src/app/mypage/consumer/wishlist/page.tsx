import WishListItemsList from './components/WishListItemsList'

export default function WishlistPage() {
  return (
    <div className="w-full bg-white px-6 pt-6 pb-11.25">
      <h1 className="sr-only mb-8 text-2xl font-bold">찜한 상품</h1>

      <WishListItemsList />
    </div>
  )
}
