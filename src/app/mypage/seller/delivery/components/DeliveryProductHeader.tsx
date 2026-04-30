export default function DeliveryProductHeader() {
  return (
    <div className="flex font-semibold border-b border-gray-300  gap-8 p-4 mb-2 ">
      <div className="w-1/9 ">주문번호</div>
      <div className="w-3/9">상품명</div>
      <div className="w-1/9">주문자</div>
      <div className="w-1/9 text-center ">총 가격</div>
      <div className="w-1/9 ">주문 수량</div>
      <div className="w-2/9">주문 상태</div>
    </div>
  );
}
