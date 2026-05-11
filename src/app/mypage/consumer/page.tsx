import OrderList from "./orders/components/OrderList";

export default function ConsumerPage() {
  return (
    <div>
      <h1 className="sr-only">마이페이지</h1>

      <section className="flex flex-col gap-4 p-6 w-full bg-white mb-20">
        <h2 className="font-semibold px-5 sr-only">최근 주문 내역</h2>
        <OrderList />
      </section>
    </div>
  );
}
