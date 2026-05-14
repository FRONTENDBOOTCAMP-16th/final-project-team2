import OrderList from './components/OrderList'

export default function OrdersPage() {
  return (
    <div className="mb-20 flex w-full flex-col bg-white px-6 pt-6 pb-11.25">
      <h1 className="sr-only">주문 내역 조회</h1>
      <OrderList />
    </div>
  )
}
