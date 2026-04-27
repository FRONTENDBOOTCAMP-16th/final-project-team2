import { dummyOrders } from "@/data/dummyOrder";
import OrderList from "./orders/components/OrderList";

const hasProducts = dummyOrders.length > 0
const MAX_PRODUCT_COUNT = 4

export default function ConsumerPage() {


  return (
    <div className="flex-col gap-3">
      <h1 className="sr-only">마이페이지</h1>

      {/* 주문한 상품 없을 시, 없다는 안내 문구, 최근 주문한 4건만 마이 페이지 메인에서 볼 수 있도록 함 */}

      <section className="flex flex-col gap-4 p-6 max-w-4xl m-auto mt-10 bg-white">
        <h2 className="sr-only">주문 내역 섹션</h2>
        {hasProducts ? (
            <>
            <p className="text-xl text-red-500 font-semibold py-3 px-5 ">
              ※ 최근 주문한 4건의 상품만 표시됩니다.
            </p>
            <OrderList orders={dummyOrders.slice(0, MAX_PRODUCT_COUNT)} />
          </>
          
        ) : (
        <div className="text-red-500 text-center pt-3">
            <p>주문한 상품이 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
