export const SellerProductItemSkeleton = () => (
  <div className="flex animate-pulse flex-row items-center gap-x-4 border-b border-gray-100 px-6 py-8">
    {/* 상품 이미지 및 이름 */}
    <div className="flex w-2/5 items-center gap-4">
      {/* 이미지 */}
      <div className="h-20 w-20 shrink-0 rounded bg-gray-200" />

      <div className="flex w-full items-center gap-2">
        {/* 상태 태그 */}
        <div className="h-4 w-10 shrink-0 rounded bg-gray-200" />
        {/* 상품명 */}
        <div className="h-4 w-full max-w-[120px] rounded bg-gray-200" />
      </div>
    </div>

    {/* 원가, 총 가격, 할인율, 재고 */}
    <div className="flex w-[12%] justify-center">
      <div className="h-4 w-12 rounded bg-gray-100" />
    </div>
    <div className="flex w-[12%] justify-center">
      <div className="h-4 w-14 rounded bg-gray-200" />
    </div>
    <div className="flex w-[12%] justify-center">
      <div className="h-4 w-8 rounded bg-gray-100" />
    </div>
    <div className="flex w-[12%] justify-center">
      <div className="h-4 w-10 rounded bg-gray-100" />
    </div>

    {/* 관리 버튼 */}
    <div className="h-9 w-16 shrink-0 rounded-md bg-gray-200" />
  </div>
)
