export default function DeliveryProductHeader() {
  return (
    <div className="mb-2 hidden grid-cols-[2fr_2fr_1fr_1fr_1fr_2fr] gap-5 border-b border-gray-300 p-4 font-semibold lg:grid">
      <p className="min-w-0">주문번호</p>
      <p className="min-w-0">상품명</p>
      <p className="min-w-0">주문자</p>
      <p className="min-w-0">총 가격</p>
      <p className="min-w-0">주문 수량</p>
      <p className="min-w-0">주문 상태</p>
    </div>
  )
}
