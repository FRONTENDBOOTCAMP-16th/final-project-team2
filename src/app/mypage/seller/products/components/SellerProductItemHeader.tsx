export default function SellerProductItemHeader() {
  return (
    <div className="flex flex-row gap-x-4 px-6 py-4 font-bold text-gray-600 border-b border-gray-200 bg-gray-50/50 text-sm">
      <div className="w-2/5">상품명</div>
      <div className="w-[12%] text-center">원가</div>
      <div className="w-[12%] text-center">총 가격</div>
      <div className="w-[12%] text-center">할인율</div>
      <div className="w-[12%] text-center">재고</div>
      <div className="w-17"></div>
    </div>
  );
}
