import OrderList from './orders/components/OrderList'

export default function ConsumerPage() {
  return (
    <div>
      <h1 className="sr-only">마이페이지</h1>

      <section className="mb-20 flex w-full flex-col gap-4 bg-white p-6">
        <h2 className="sr-only px-5 font-semibold">최근 주문 내역</h2>
        <OrderList />
      </section>
    </div>
  )
}
