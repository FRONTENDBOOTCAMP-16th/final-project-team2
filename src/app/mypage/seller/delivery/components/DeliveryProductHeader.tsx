export default function DeliveryProductHeader() {
  return (
    <div className="overflow-x-auto">
      <div className="mb-2 grid min-w-175 grid-cols-[2fr_2fr_1fr_1fr_1fr_2fr] gap-5 border-b border-gray-300 p-4 font-semibold">
        <p>주문번호</p>
        <p>상품명</p>
        <p>주문자</p>
        <p>총 가격</p>
        <p>주문 수량</p>
        <p>주문 상태</p>
      </div>
    </div>
  )
}
