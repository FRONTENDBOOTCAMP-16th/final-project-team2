import DeliveryProductList from './components/DeliveryProductList'

export default function SellerDeliveryStatusPage() {
  return (
    <section className="mb-11.25 flex w-full flex-col bg-white px-6 pt-6 pb-11.25">
      <h2 className="sr-only">배송 관리 페이지</h2>
      <DeliveryProductList />
    </section>
  )
}
