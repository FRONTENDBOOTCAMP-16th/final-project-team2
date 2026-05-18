type FullSkeletonProps = {
  count?: number
}

export default function FullSkeleton({ count = 1 }: FullSkeletonProps) {
  return (
    <section aria-labelledby="productListLoading-2">
      <h2 id="productListLoading-2" className="sr-only">
        상품 이미지 불러오는 중
      </h2>

      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full animate-pulse">
          <div className="aspect-square h-163 w-full bg-gray-200" />
        </div>
      ))}
    </section>
  )
}
