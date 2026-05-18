import SellerProductItemHeader from './components/SellerProductItemHeader'
import SellerProductItemList from './components/SellerProductItemList'

export default function SellerProductListPage() {
  return (
    <section className="mb-11.25 w-full max-w-4xl bg-white p-8">
      <h2 className="p-3 text-xl font-bold">등록 상품 관리</h2>
      <SellerProductItemHeader />
      <SellerProductItemList />
    </section>
  )
}
