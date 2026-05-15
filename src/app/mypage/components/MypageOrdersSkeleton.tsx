type ProductListSkeletonProps = {
  count?: number
}

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
            className="grid animate-pulse grid-cols-[2fr_1fr_1fr_140px] items-center border-b border-gray-200 py-5"
          >
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-md bg-gray-200" />

              <div className="space-y-3">
                <div className="h-6 w-48 rounded bg-gray-200" />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-6 w-28 rounded bg-gray-200" />
            </div>
            <div className="flex justify-center">
              <div className="h-6 w-24 rounded bg-gray-200" />
            </div>
            <div className="flex justify-center">
              <div className="h-10 w-20 rounded-lg bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
