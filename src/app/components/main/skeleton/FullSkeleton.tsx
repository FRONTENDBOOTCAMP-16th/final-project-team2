type FullSkeletonProps = {
  count?: number;
};

export default function FullSkeleton({ count = 1 }: FullSkeletonProps) {
  return (
    <section aria-labelledby="productListLoading">
      <h2 id="productListLoading" className="sr-only">
        상품 이미지 불러오는 중
      </h2>

      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse w-full">
          <div className="aspect-square w-full h-163 bg-gray-200" />
        </div>
      ))}
    </section>
  );
}
