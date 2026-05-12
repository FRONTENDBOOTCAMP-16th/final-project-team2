type ProductListSkeletonProps = {
  count?: number;
};

export default function MypageDeliverySkeleton({
  count = 9,
}: ProductListSkeletonProps) {
  return (
    <div className="p-4 animate-pulse">
      <h2 id="deliveryListLoading" className="sr-only">
        나의 배송 목록 불러오는 중
      </h2>

      <div className="flex items-center gap-6 mb-10">
        <div className="h-6 w-10 bg-gray-300 rounded" />
        <div className="h-6 w-24 bg-gray-200 rounded" />
        <div className="h-6 w-24 bg-gray-200 rounded" />
        <div className="h-6 w-24 bg-gray-200 rounded" />
      </div>
      <div className="border-t border-gray-300">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[140px_2fr_1fr_1fr_120px_120px_100px] items-center py-10 border-b border-gray-200"
          >
            <div className="h-6 w-24 bg-gray-200 rounded" />

            <div className="h-6 w-56 bg-gray-200 rounded" />

            <div className="h-6 w-20 bg-gray-200 rounded justify-self-center" />

            <div className="h-6 w-28 bg-gray-200 rounded justify-self-center" />

            <div className="h-6 w-12 bg-gray-200 rounded justify-self-center" />

            <div className="h-12 w-24 bg-gray-200 rounded-lg justify-self-center" />

            <div className="h-12 w-20 bg-gray-200 rounded-lg justify-self-center" />
          </div>
        ))}
      </div>
    </div>
  );
}
