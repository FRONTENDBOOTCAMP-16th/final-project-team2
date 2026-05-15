type ProductListSkeletonProps = {
  count?: number
}

export default function MypageDeliverySkeleton({
  count = 9,
}: ProductListSkeletonProps) {
  return (
    <div className="animate-pulse p-4">
      <h2 id="deliveryListLoading" className="sr-only">
        나의 배송 목록 불러오는 중
      </h2>

      <div className="mb-10 flex items-center gap-6">
        <div className="h-6 w-24 rounded bg-gray-200" />
      </div>
      <div className="border-t border-gray-300">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[140px_2fr_1fr_1fr_120px_100px] items-center gap-3 border-b border-gray-200 py-10"
          >
            <div className="h-6 w-24 rounded bg-gray-200" />

            <div className="h-6 w-20 justify-self-center rounded bg-gray-200" />

            <div className="h-6 w-28 justify-self-center rounded bg-gray-200" />

            <div className="h-6 w-12 justify-self-center rounded bg-gray-200" />

            <div className="h-12 w-24 justify-self-center rounded-lg bg-gray-200" />

            <div className="h-12 w-20 justify-self-center rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  )
}
