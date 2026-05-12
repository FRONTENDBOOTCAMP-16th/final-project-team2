import ProductsCardList from '@/app/components/ProductsCardList'

type ProductListSkeletonProps = {
  count?: number
}

export default function Skeleton({ count = 12 }: ProductListSkeletonProps) {
  return (
    <section aria-labelledby="productListLoading">
      <h2 id="productListLoading" className="sr-only">
        상품 목록 불러오는 중
      </h2>

      <ProductsCardList>
        {Array.from({ length: count }).map((_, i) => (
          <li key={i} className="animate-pulse">
            <div className="aspect-square w-70.5 bg-gray-200" />

            <div className="mt-4 space-y-2">
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-7 w-60 rounded bg-gray-200" />

              <div className="flex gap-3">
                <div className="h-6 w-12 rounded bg-gray-200" />
                <div className="h-6 w-24 rounded bg-gray-300" />
              </div>
            </div>
          </li>
        ))}
      </ProductsCardList>
    </section>
  )
}
