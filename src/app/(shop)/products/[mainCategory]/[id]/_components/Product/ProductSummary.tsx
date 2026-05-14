import { Star } from 'lucide-react'
import { Products } from '@/app/lib/products.types'
import { DiscountPrice, PriceFormat } from '@/utils/intl'
import { Reviews } from '@/app/lib/reviews.types'
import { getAverageGrade } from '@/api/review'

interface Props {
  products: Products
  mainCategory: string
  average_grade: number | null
  reviews: Reviews[]
}

const ProductSummary = ({
  products,
  mainCategory,
  reviews,
  average_grade,
}: Props) => {
  // const review_avg = reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.grade, 0) / reviews.length).toFixed(1) : '0.0';
  return (
    <>
      <dl className="space-y-3">
        <dt className="sr-only">제품 타입</dt>
        <dd className="text-lg text-gray-600">{mainCategory}</dd>

        <dt className="sr-only">제품명</dt>
        <dd className="text-3xl font-semibold">{products.name}</dd>
      </dl>
      <dl className="mt-2 flex">
        <dt className="sr-only">평점</dt>
        <dd className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${index < Math.floor(Number(average_grade)) ? 'text-yellow-400' : 'text-gray-200'}`}
              fill={index < 5 ? 'currentColor' : 'none'}
              aria-hidden
            />
          ))}
          <span className="ml-2">
            {average_grade ? `${average_grade}점` : '현재 평점이 없습니다'}
          </span>
        </dd>

        <dt className="sr-only">리뷰 개수</dt>
        <dd className="ml-2">({reviews.length})</dd>
      </dl>

      <div>
        <dl className="mt-9 flex items-center gap-2">
          <dt className="sr-only">정가</dt>
          <dd className="order-2">
            <del className="text-lg text-gray-500">
              {PriceFormat(products.price)}
            </del>
          </dd>

          <dt className="sr-only">할인가</dt>
          <dd className="order-1 text-2xl font-semibold">
            {DiscountPrice(products.price, products.discount_rate)}
          </dd>
        </dl>
        <div className="discountBadge mt-2 flex h-7 w-20.5 items-center justify-center bg-red-500 pt-1 pr-3 pb-1 pl-3">
          <p className="text-white">{products.discount_rate}%</p>
        </div>
      </div>
    </>
  )
}

export default ProductSummary
