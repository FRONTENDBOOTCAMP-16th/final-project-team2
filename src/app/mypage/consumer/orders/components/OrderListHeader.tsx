export default function OrderItemHeader() {
  return (
    <div className="flex font-semibold border-b p-4 mb-2">
      <div className="w-3/6">상품명</div>
      <div className="w-1/6 ">주문일자</div>
      <div className="w-1/6 ">결제 금액</div>
      <div className="w-1/6 ">상태</div>
    </div>
  );
}
