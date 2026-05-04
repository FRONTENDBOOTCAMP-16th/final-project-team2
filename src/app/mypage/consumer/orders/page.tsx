import OrderList from "./components/OrderList";

export default function OrdersPage() {
  return (
    <div className="flex flex-col px-6 pt-6 pb-11.25 w-full bg-white ">
      <h1 className="sr-only">주문 내역 조회</h1>
      <OrderList />
    </div>
  );
}
