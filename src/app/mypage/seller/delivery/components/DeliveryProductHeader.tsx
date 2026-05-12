export default function DeliveryProductHeader() {
  return (
    <div className="flex font-semibold border-b border-gray-300 gap-5 p-4 mb-2">
      <div className="w-1/10 shrink-0">주문번호</div>
      <div className="w-3/10 shrink-0 text-center">상품명</div>
      <div className="w-1/10 shrink-0 ">주문자</div>
      <div className="w-1/10 shrink-0 ">총 가격</div>
      <div className="w-1/10 shrink-0 text-center">주문 수량</div>
      <div className="w-2/10 shrink-0 ">주문 상태</div>
    </div>
  )
}
