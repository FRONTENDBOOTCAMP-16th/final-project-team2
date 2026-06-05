export default function OrderItemHeader() {
  return (
    <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:border-b md:p-4 md:font-semibold">
      <p>상품명</p>
      <p className="text-left">주문일자</p>
      <p className="text-center">결제 금액</p>
      <p className="justify-self-center text-center">상태 </p>
    </div>
  )
}
