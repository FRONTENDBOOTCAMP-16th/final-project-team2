import SellerProductItemHeader from './components/SellerProductItemHeader'
import SellerProductItemList from './components/SellerProductItemList'

export default function SellerProductListPage() {
  return (
    <section className="mb-11.25 flex w-full flex-col bg-white px-6 pt-6 pb-11.25">
      <h2 className="sr-only">상품 관리 페이지</h2>
      <SellerProductItemHeader />
      <SellerProductItemList />
    </section>
  )
}
