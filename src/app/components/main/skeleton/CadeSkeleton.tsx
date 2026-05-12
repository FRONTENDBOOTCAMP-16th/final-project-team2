type CardSkeletonProps = {
  count?: number;
};

export default function CardSkeleton({ count = 1 }: CardSkeletonProps) {
  return (
    <>
      <h2 id="productListLoading" aria-labelledby="productListLoading" className="sr-only">
        상품 이미지 불러오는 중
      </h2>
      <div className={`grid grid-cols-${count} gap-4 min-h-63`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="productListLoading animate-pulse w-full gap-2">
            <div className="w-full bg-gray-200 h-71" />
            <div className="h-4 bg-gray-200 rounded mt-7 w-20" />
            <div className="h-4 bg-gray-200 rounded mt-6 w-3/4" />
            <div className="h-4 bg-gray-200 rounded mt-2 w-1/2" />
          </div>
        ))}
      </div>
    </>
  );
}
