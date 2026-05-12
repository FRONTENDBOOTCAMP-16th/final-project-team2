export default function DeliveryProductHeader() {
  return (
    <div className="mb-2 flex gap-8 border-b border-gray-300 p-4 font-semibold">
      <div className="w-1/9">주문번호</div>
      <div className="w-3/9">상품명</div>
      <div className="w-1/9">주문자</div>
      <div className="w-1/9 text-center">총 가격</div>
      <div className="w-1/9">주문 수량</div>
      <div className="w-2/9">주문 상태</div>
    </div>
  )
}
