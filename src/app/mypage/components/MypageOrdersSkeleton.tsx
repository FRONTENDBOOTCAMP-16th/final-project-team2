type ProductListSkeletonProps = {
  count?: number;
};

export default function MyPageOrdersSkeleton({
  count = 9,
}: ProductListSkeletonProps) {
  return (
    <section aria-labelledby="orderListLoading" className="mt-10">
      <h2 id="orderListLoading" className="sr-only">
        주문 목록 불러오는 중
      </h2>

      <div className="border-t border-gray-300">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_1fr_1fr_140px] items-center py-10 border-b border-gray-200 animate-pulse"
          >
            {/* 상품 정보 */}
            <div className="flex items-center gap-6">
              <div className="w-30 h-30 bg-gray-200 rounded-md" />

              <div className="space-y-3">
                <div className="h-6 w-48 bg-gray-200 rounded" />
                <div className="h-4 w-28 bg-gray-100 rounded" />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-6 w-28 bg-gray-200 rounded" />
            </div>
            <div className="flex justify-center">
              <div className="h-6 w-24 bg-gray-200 rounded" />
            </div>
            <div className="flex justify-center">
              <div className="h-12 w-28 bg-gray-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
