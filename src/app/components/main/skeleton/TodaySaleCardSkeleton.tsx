type TodaySaleCardSkeletonProps = {
  count?: number
}

export default function TodaySaleCardSkeleton({
  count = 2,
}: TodaySaleCardSkeletonProps) {
  return (
    <>
      <h2
        id="productListLoading-3"
        aria-labelledby="productListLoading-3"
        className="sr-only"
      >
        상품 이미지 불러오는 중
      </h2>
      <div className="flex w-full gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="productListLoading w-full animate-pulse">
            <div className="h-90 w-full bg-gray-200" />
          </div>
        ))}
      </div>
    </>
  )
}
