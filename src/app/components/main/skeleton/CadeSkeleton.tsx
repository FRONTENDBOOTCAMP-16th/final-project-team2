type CardSkeletonProps = {
  count?: number
}

export default function CardSkeleton({ count = 1 }: CardSkeletonProps) {
  return (
    <>
      <h2
        id="productListLoading"
        aria-labelledby="productListLoading"
        className="sr-only"
      >
        상품 이미지 불러오는 중
      </h2>
      <div className={`grid grid-cols-${count} min-h-63 gap-4`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="productListLoading w-full animate-pulse gap-2"
          >
            <div className="h-71 w-full bg-gray-200" />
            <div className="mt-7 h-4 w-20 rounded bg-gray-200" />
            <div className="mt-6 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </>
  )
}
