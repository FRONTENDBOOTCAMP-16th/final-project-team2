export default function SellerProductItemHeader() {
  return (
    <div className="hidden border-b border-gray-200 bg-gray-50/50 px-6 py-4 text-sm font-bold text-gray-600 md:grid md:grid-cols-[4fr_1fr_1fr_1fr_1fr_72px] md:gap-x-3 lg:grid lg:grid-cols-[80px_2fr_1fr_1fr_1fr_1fr_120px] lg:gap-x-3">
      <div className="text-center">상태</div>
      <div className="text-center">상품 정보</div>
      <div className="text-center">원가</div>
      <div className="text-center">총 가격</div>
      <div className="text-center">할인율</div>
      <div className="text-center">재고</div>
      <div />
    </div>
  )
}
