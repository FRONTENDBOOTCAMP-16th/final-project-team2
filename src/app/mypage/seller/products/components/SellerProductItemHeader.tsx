export default function SellerProductItemHeader() {
  return (
    <div className="flex font-semibold border-b py-3 mb-2">
      <div className="w-3/8">상품명</div>
      <div className="w-1/8">원가</div>
      <div className="w-1/8">총 가격</div>
      <div className="w-1/8">할인율</div>
      <div className="w-2/8">재고</div>
    </div>
  );
}
