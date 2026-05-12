type ProductListSkeletonProps = {
  count?: number
}

export default function MyPageProductSkeleton({
  count = 9,
}: ProductListSkeletonProps) {
  return (
    <section aria-labelledby="productListLoading" className="mt-15">
      <h2 id="productListLoading" className="sr-only">
        찜한 상품 목록 불러오는 중
      </h2>

      <ul className="grid grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <li key={i} className="animate-pulse">
            {/* 이미지 */}
            <div className="aspect-square w-full rounded-lg bg-gray-200" />

            {/* 텍스트 */}
            <div className="mt-3 space-y-2">
              <div className="h-4 w-16 rounded bg-gray-200" />
              <div className="h-6 w-3/4 rounded bg-gray-200" />

              <div className="flex gap-2">
                <div className="h-5 w-12 rounded bg-gray-200" />
                <div className="h-5 w-16 rounded bg-gray-300" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
