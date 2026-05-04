import OrderList from "./components/OrderList";

export default function OrdersPage() {
  return (
<<<<<<< HEAD
    <div className="flex flex-col px-5 py-2 w-full bg-white">
      <h1 className="sr-only">주문 내역 조회</h1>
      <div className="flex justify-between">
        <TabFilter
          items={CATEGORIES}
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
        />
        <OrderStatusFilter
          value={selectedStatus}
          statusChange={setSelectedStatus}
        />
      </div>
      <OrderList orders={filteredOrders} />
=======
    <div className="flex flex-col px-6 pt-6 pb-11.25 w-full bg-white ">
      <h1 className="sr-only">주문 내역 조회</h1>
      <OrderList />
>>>>>>> dev
    </div>
  );
}
