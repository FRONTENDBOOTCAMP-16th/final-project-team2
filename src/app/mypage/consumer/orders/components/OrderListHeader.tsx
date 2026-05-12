export default function OrderItemHeader() {
  return (
    <div className="mb-2 flex border-b p-4 font-semibold">
      <div className="w-3/6">상품명</div>
      <div className="w-1/6">주문일자</div>
      <div className="w-1/6">결제 금액</div>
      <div className="w-1/6">상태</div>
    </div>
  )
}
