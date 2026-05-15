import SellerProductItemList from './products/components/SellerProductItemList'

export default function SellerPage() {
  return (
    <section className="mb-11.25 flex w-full flex-col gap-4 bg-white p-6">
      <h1 className="sr-only">나의 상품</h1>
      <SellerProductItemList />
    </section>
  )
}
