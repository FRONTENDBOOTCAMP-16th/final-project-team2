import { dummyOrderItems } from "@/data/dummyOrder";
import OrderList from "./orders/components/OrderList";

const hasProducts = dummyOrderItems.length > 0;
const MAX_PRODUCT_COUNT = 4;

export default function ConsumerPage() {
  return (
    <div>
      <h1 className="sr-only">마이페이지</h1>

      {/* 주문한 상품 없을 시, 없다는 안내 문구, 최근 주문한 4건만 마이 페이지 메인에서 볼 수 있도록 함 */}
      {/* 헤더와 아이템 리스트 간격이 생겨서 section 부분에서 gap 스타일링을 삭제했습니다. */}
      <section className="flex flex-col w-full bg-white px-6 pt-6 pb-11.25">
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
