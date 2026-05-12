type TodaySaleCardSkeletonProps = {
  count?: number;
};

export default function TodaySaleCardSkeleton({ count = 2 }: TodaySaleCardSkeletonProps) {
  return (
    <>
      <h2 id="productListLoading" aria-labelledby="productListLoading" className="sr-only">
        상품 이미지 불러오는 중
      </h2>
      <div className="flex gap-4 w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="productListLoading animate-pulse w-full">
            <div className="w-full bg-gray-200 h-90" />
          </div>
        ))}
      </div>
    </>
  );
}
