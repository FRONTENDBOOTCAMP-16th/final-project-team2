import { dummyOrderItems } from "@/data/dummyOrder";
import OrderList from "./orders/components/OrderList";

const hasProducts = dummyOrderItems.length > 0;
const MAX_PRODUCT_COUNT = 4;

export default function ConsumerPage() {
  return (
    <div>
      <h1 className="sr-only">마이페이지</h1>

      {/* 주문한 상품 없을 시, 없다는 안내 문구, 최근 주문한 4건만 마이 페이지 메인에서 볼 수 있도록 함 */}

      <section className="flex flex-col gap-4 p-6 w-full bg-white">
        <h2 className="font-semibold px-5">최근 주문 내역</h2>
        {hasProducts ? (
          <OrderList orders={dummyOrderItems.slice(0, MAX_PRODUCT_COUNT)} />
        ) : (
          <div className="text-red-500 text-center pt-3">
            <p>주문한 상품이 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
